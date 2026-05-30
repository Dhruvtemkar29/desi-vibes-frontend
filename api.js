// api.js - Desi Vibes API Service

// ============ HARDCODE YOUR RAILWAY BACKEND URL ============
// IMPORTANT: Replace this with your actual Railway backend URL
const API_BASE_URL = 'https://desi-vibes-backend-production.up.railway.app/api';

console.log('🌐 Desi Vibes API URL:', API_BASE_URL);

// ============ HELPER FUNCTIONS ============

const getToken = () => localStorage.getItem('desi_vibes_token');
const setToken = (token) => localStorage.setItem('desi_vibes_token', token);
const removeToken = () => localStorage.removeItem('desi_vibes_token');

const getUser = () => {
    const userStr = localStorage.getItem('desi_vibes_user');
    return userStr ? JSON.parse(userStr) : null;
};

const setUser = (user) => localStorage.setItem('desi_vibes_user', JSON.stringify(user));
const removeUser = () => localStorage.removeItem('desi_vibes_user');

// ============ CORE FETCH FUNCTION ============

const fetchAPI = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getToken();
    
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };
    
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const config = {
        ...options,
        headers
    };
    
    try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        if (!response.ok) {
            if (response.status === 401 && token) {
                logout();
                if (window.location.pathname.includes('account.html') || 
                    window.location.pathname.includes('cart.html')) {
                    window.location.href = 'account.html';
                }
            }
            throw new Error(data.message || 'Something went wrong');
        }
        
        return data;
    } catch (error) {
        console.error(`API Error (${endpoint}):`, error);
        throw error;
    }
};

// ============ AUTH API ============

const authAPI = {
    register: async (userData) => {
        const response = await fetchAPI('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
        
        if (response.success && response.token) {
            setToken(response.token);
            setUser(response.user);
        }
        return response;
    },
    
    login: async (email, password) => {
        const response = await fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        
        if (response.success && response.token) {
            setToken(response.token);
            setUser(response.user);
        }
        return response;
    },
    
    getMe: async () => {
        const response = await fetchAPI('/auth/me');
        if (response.success) {
            setUser(response.user);
        }
        return response;
    },
    
    updateProfile: async (profileData) => {
        const response = await fetchAPI('/auth/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData)
        });
        
        if (response.success && response.user) {
            setUser(response.user);
        }
        return response;
    },
    
    changePassword: async (current_password, new_password) => {
        return await fetchAPI('/auth/change-password', {
            method: 'POST',
            body: JSON.stringify({ current_password, new_password })
        });
    },
    
    logout: () => {
        removeToken();
        removeUser();
    },
    
    isLoggedIn: () => {
        return !!getToken();
    },
    
    getCurrentUser: getUser
};

// ============ PRODUCTS API ============

const productAPI = {
    getProducts: async (filters = {}) => {
        const params = new URLSearchParams(filters).toString();
        const endpoint = `/products${params ? `?${params}` : ''}`;
        return await fetchAPI(endpoint);
    },
    
    getProduct: async (id) => {
        return await fetchAPI(`/products/${id}`);
    },
    
    search: async (query) => {
        return await fetchAPI(`/products/search?q=${encodeURIComponent(query)}`);
    },
    
    getCategories: async () => {
        return await fetchAPI('/products/categories');
    },
    
    getSuggestions: async (query) => {
        return await fetchAPI(`/products/suggestions?q=${encodeURIComponent(query)}`);
    }
};

// ============ CART API ============

const cartAPI = {
    getCart: async () => {
        if (!authAPI.isLoggedIn()) {
            return { success: true, cart: { items: [], subtotal: 0, total_items: 0, item_count: 0 } };
        }
        return await fetchAPI('/cart');
    },
    
    addToCart: async (productId, quantity = 1) => {
        if (!authAPI.isLoggedIn()) {
            const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
            const existingItem = guestCart.find(item => item.product_id === productId);
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                guestCart.push({ product_id: productId, quantity });
            }
            localStorage.setItem('guest_cart', JSON.stringify(guestCart));
            
            document.dispatchEvent(new CustomEvent('cartUpdated', { 
                detail: { total_items: guestCart.reduce((sum, i) => sum + i.quantity, 0) }
            }));
            
            return { success: true, cart_count: guestCart.reduce((sum, i) => sum + i.quantity, 0) };
        }
        
        const response = await fetchAPI('/cart/add', {
            method: 'POST',
            body: JSON.stringify({ product_id: productId, quantity })
        });
        
        if (response.success) {
            document.dispatchEvent(new CustomEvent('cartUpdated', { 
                detail: { total_items: response.cart_count }
            }));
        }
        
        return response;
    },
    
    updateQuantity: async (itemId, quantity) => {
        if (!authAPI.isLoggedIn()) {
            return { success: true };
        }
        
        return await fetchAPI(`/cart/item/${itemId}`, {
            method: 'PUT',
            body: JSON.stringify({ quantity })
        });
    },
    
    removeItem: async (itemId) => {
        if (!authAPI.isLoggedIn()) {
            return { success: true };
        }
        
        return await fetchAPI(`/cart/item/${itemId}`, {
            method: 'DELETE'
        });
    },
    
    clearCart: async () => {
        if (!authAPI.isLoggedIn()) {
            localStorage.removeItem('guest_cart');
            document.dispatchEvent(new CustomEvent('cartUpdated', { detail: { total_items: 0 } }));
            return { success: true };
        }
        
        return await fetchAPI('/cart/clear', {
            method: 'DELETE'
        });
    },
    
    syncGuestCart: async () => {
        const guestCart = JSON.parse(localStorage.getItem('guest_cart') || '[]');
        if (guestCart.length === 0) return;
        
        for (const item of guestCart) {
            await cartAPI.addToCart(item.product_id, item.quantity);
        }
        
        localStorage.removeItem('guest_cart');
        return await cartAPI.getCart();
    }
};

// ============ ORDERS API ============

const orderAPI = {
    createOrder: async (orderData) => {
        return await fetchAPI('/orders/create', {
            method: 'POST',
            body: JSON.stringify(orderData)
        });
    },
    
    getOrders: async () => {
        return await fetchAPI('/orders');
    },
    
    getOrder: async (orderId) => {
        return await fetchAPI(`/orders/${orderId}`);
    },
    
    cancelOrder: async (orderId) => {
        return await fetchAPI(`/orders/${orderId}/cancel`, {
            method: 'POST'
        });
    },
    
    trackOrder: async (orderNumber) => {
        return await fetchAPI(`/orders/track/${orderNumber}`);
    }
};

// ============ CONTACT API ============

const contactAPI = {
    submit: async (formData) => {
        return await fetchAPI('/contact', {
            method: 'POST',
            body: JSON.stringify(formData)
        });
    }
};

// ============ COUPON API ============

const couponAPI = {
    validate: async (code, subtotal) => {
        return await fetchAPI('/coupons/validate', {
            method: 'POST',
            body: JSON.stringify({ code, subtotal })
        });
    }
};

// ============ REVIEWS API ============

const reviewAPI = {
    getReviews: async (productId) => {
        return await fetchAPI(`/products/${productId}/reviews`);
    },
    
    submitReview: async (productId, reviewData) => {
        return await fetchAPI(`/products/${productId}/reviews`, {
            method: 'POST',
            body: JSON.stringify(reviewData)
        });
    }
};

// ============ LOGOUT ============

const logout = () => {
    authAPI.logout();
    document.dispatchEvent(new CustomEvent('authChanged', { detail: { isLoggedIn: false } }));
    window.location.href = 'index.html';
};

// ============ EXPORT ============

window.DesiVibesAPI = {
    auth: authAPI,
    products: productAPI,
    cart: cartAPI,
    orders: orderAPI,
    contact: contactAPI,
    coupons: couponAPI,
    reviews: reviewAPI,
    logout,
    getToken,
    isLoggedIn: authAPI.isLoggedIn,
    getCurrentUser: authAPI.getCurrentUser,
    getBackendUrl: () => API_BASE_URL
};

console.log('✅ Desi Vibes API Service Loaded');
console.log('📍 Backend URL:', API_BASE_URL);