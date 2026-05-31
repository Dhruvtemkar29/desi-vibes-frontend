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

// ============ CART API (Fixed for Guest Users) ============

const cartAPI = {
    // Get cart (handles both guest and logged-in users)
    getCart: async () => {
        if (!authAPI.isLoggedIn()) {
            // Guest user - get cart from localStorage
            const guestCart = JSON.parse(localStorage.getItem('desi_vibes_guest_cart') || '[]');

            // Calculate totals
            let subtotal = 0;
            const items = guestCart.map(item => {
                const itemTotal = item.price * item.quantity;
                subtotal += itemTotal;
                return {
                    id: item.temp_id || Math.random().toString(36).substr(2, 9),
                    product_id: item.product_id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image,
                    total: itemTotal
                };
            });

            return {
                success: true,
                cart: {
                    items: items,
                    subtotal: subtotal,
                    total_items: items.reduce((sum, item) => sum + item.quantity, 0),
                    item_count: items.length
                }
            };
        }

        // Logged-in user - get from backend
        return await fetchAPI('/cart');
    },

    // Add to cart (handles both guest and logged-in users)
    addToCart: async (productId, quantity = 1) => {
        // First, get product details
        let product = null;
        try {
            const productResponse = await productAPI.getProduct(productId);
            if (productResponse.success) {
                product = productResponse.product;
            }
        } catch (error) {
            console.error('Failed to fetch product:', error);
        }

        if (!authAPI.isLoggedIn()) {
            // Guest user - store in localStorage
            let guestCart = JSON.parse(localStorage.getItem('desi_vibes_guest_cart') || '[]');

            const existingItem = guestCart.find(item => item.product_id === productId);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                guestCart.push({
                    product_id: productId,
                    name: product ? product.name : 'Product',
                    price: product ? product.sale_price : 100,
                    quantity: quantity,
                    image: product ? product.image_url : '',
                    temp_id: Math.random().toString(36).substr(2, 9)
                });
            }

            localStorage.setItem('desi_vibes_guest_cart', JSON.stringify(guestCart));

            // Calculate total items
            const totalItems = guestCart.reduce((sum, item) => sum + item.quantity, 0);

            // Dispatch event for navbar update
            document.dispatchEvent(new CustomEvent('cartUpdated', {
                detail: { total_items: totalItems }
            }));

            // Also trigger a storage event for other tabs
            window.dispatchEvent(new Event('storage'));

            return { success: true, cart_count: totalItems };
        }

        // Logged-in user - use backend
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

    // Update cart item quantity
    updateQuantity: async (itemId, quantity) => {
        if (!authAPI.isLoggedIn()) {
            let guestCart = JSON.parse(localStorage.getItem('desi_vibes_guest_cart') || '[]');
            const itemIndex = guestCart.findIndex(i => i.temp_id === itemId || i.product_id == itemId);

            if (itemIndex !== -1) {
                guestCart[itemIndex].quantity = quantity;
                localStorage.setItem('desi_vibes_guest_cart', JSON.stringify(guestCart));

                const totalItems = guestCart.reduce((sum, item) => sum + item.quantity, 0);
                document.dispatchEvent(new CustomEvent('cartUpdated', {
                    detail: { total_items: totalItems }
                }));
            }
            return { success: true };
        }

        return await fetchAPI(`/cart/item/${itemId}`, {
            method: 'PUT',
            body: JSON.stringify({ quantity })
        });
    },

    // Remove item from cart
    removeItem: async (itemId) => {
        if (!authAPI.isLoggedIn()) {
            let guestCart = JSON.parse(localStorage.getItem('desi_vibes_guest_cart') || '[]');
            const newCart = guestCart.filter(i => i.temp_id !== itemId && i.product_id != itemId);
            localStorage.setItem('desi_vibes_guest_cart', JSON.stringify(newCart));

            const totalItems = newCart.reduce((sum, item) => sum + item.quantity, 0);
            document.dispatchEvent(new CustomEvent('cartUpdated', {
                detail: { total_items: totalItems }
            }));
            return { success: true };
        }

        return await fetchAPI(`/cart/item/${itemId}`, {
            method: 'DELETE'
        });
    },

    // Clear entire cart
    clearCart: async () => {
        if (!authAPI.isLoggedIn()) {
            localStorage.removeItem('desi_vibes_guest_cart');
            document.dispatchEvent(new CustomEvent('cartUpdated', { detail: { total_items: 0 } }));
            return { success: true };
        }

        return await fetchAPI('/cart/clear', {
            method: 'DELETE'
        });
    },

    // Sync guest cart to backend after login
    syncGuestCart: async () => {
        const guestCart = JSON.parse(localStorage.getItem('desi_vibes_guest_cart') || '[]');
        if (guestCart.length === 0) return { success: true };

        for (const item of guestCart) {
            await cartAPI.addToCart(item.product_id, item.quantity);
        }

        localStorage.removeItem('desi_vibes_guest_cart');
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

// ============ REAL-TIME CART SYNC ACROSS TABS ============

// Listen for storage events (when cart changes in another tab)
window.addEventListener('storage', (event) => {
    if (event.key === 'desi_vibes_guest_cart' || event.key === 'desi_vibes_token') {
        // Dispatch cart update event
        document.dispatchEvent(new CustomEvent('cartUpdated'));
        
        // Also update cart count if on cart page
        if (window.location.pathname.includes('cart.html')) {
            window.location.reload();
        }
    }
});

// Function to force cart count update across all components
window.updateCartCount = async () => {
    let count = 0;
    
    if (window.DesiVibesAPI.isLoggedIn()) {
        try {
            const response = await window.DesiVibesAPI.cart.getCart();
            if (response.success && response.cart) {
                count = response.cart.total_items || 0;
            }
        } catch (e) {
            console.error('Failed to get cart count:', e);
        }
    } else {
        const guestCart = JSON.parse(localStorage.getItem('desi_vibes_guest_cart') || '[]');
        count = guestCart.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    // Dispatch event with current count
    document.dispatchEvent(new CustomEvent('cartUpdated', { 
        detail: { total_items: count }
    }));
    
    return count;
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