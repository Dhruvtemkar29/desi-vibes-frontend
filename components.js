// components.js - Updated with Better Mobile Menu Design

const globalStyles = `
    <style>
        /* Container class */
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
            width: 100%;
        }
        
        /* Navbar styles */
        main-navbar {
            display: block;
            background: linear-gradient(135deg, #1a535c 0%, #0d3c44 100%);
            top: 0;
            z-index: 1000;
            width: 100%;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        
        main-navbar .header-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            min-height: 70px;
        }
        
        main-navbar .logo {
            max-width: 180px;
            transition: transform 0.3s ease;
        }
        
        main-navbar .logo:hover {
            transform: scale(1.05);
        }
        
        main-navbar .logo img {
            border-radius: 10px;
            height: 80px;
            width: auto;
            filter: brightness(1.1);
        }
        
        /* Desktop Navigation */
        main-navbar .nav-menu {
            display: flex;
            gap: 35px;
            list-style: none;
            margin: 0;
            padding: 0;
        }
        
        main-navbar .nav-menu a {
            font-size: 16px;
            font-weight: 600;
            position: relative;
            color: rgba(255, 255, 255, 0.9);
            text-decoration: none;
            padding: 8px 0;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: all 0.3s ease;
        }
        
        main-navbar .nav-menu a:hover,
        main-navbar .nav-menu a.active {
            color: #4ecdc4;
        }
        
        main-navbar .nav-menu a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 3px;
            background: linear-gradient(90deg, #4ecdc4, #2d7a87);
            border-radius: 2px;
            transition: width 0.3s ease;
        }
        
        main-navbar .nav-menu a:hover::after,
        main-navbar .nav-menu a.active::after {
            width: 100%;
        }
        
        main-navbar .header-actions {
            display: flex;
            align-items: center;
            gap: 15px;
        }
        
        main-navbar .cart-icon, 
        main-navbar .account-icon {
            font-size: 20px;
            color: rgba(255, 255, 255, 0.9);
            cursor: pointer;
            position: relative;
            text-decoration: none;
            transition: all 0.3s ease;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
        }
        
        main-navbar .cart-icon:hover, 
        main-navbar .account-icon:hover {
            color: #4ecdc4;
            background: rgba(78, 205, 196, 0.2);
            transform: translateY(-2px);
        }
        
        main-navbar .cart-count {
            position: absolute;
            top: -5px;
            right: -5px;
            background: linear-gradient(135deg, #ff6b6b, #ff5252);
            color: white;
            font-size: 10px;
            font-weight: bold;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        /* Mobile Menu Button */
        main-navbar .mobile-menu-btn {
            display: none;
            background: rgba(255, 255, 255, 0.15);
            border: none;
            width: 45px;
            height: 45px;
            border-radius: 12px;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
        }
        
        main-navbar .mobile-menu-btn i {
            font-size: 24px;
            color: white;
            transition: all 0.3s ease;
        }
        
        main-navbar .mobile-menu-btn:hover {
            background: rgba(78, 205, 196, 0.3);
            transform: scale(1.05);
        }
        
        /* Mobile Menu Overlay */
        main-navbar .mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 998;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        main-navbar .mobile-menu-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        
        /* Mobile Navigation Panel */
        main-navbar .mobile-nav-panel {
            position: fixed;
            top: 0;
            right: -280px;
            width: 280px;
            height: 100%;
            background: linear-gradient(180deg, #1a535c 0%, #0d3c44 100%);
            z-index: 999;
            padding: 80px 25px 30px;
            transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: -5px 0 25px rgba(0, 0, 0, 0.3);
            overflow-y: auto;
        }
        
        main-navbar .mobile-nav-panel.active {
            right: 0;
        }
        
        /* Close Button */
        main-navbar .mobile-close-btn {
            position: absolute;
            top: 15px;
            right: 20px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        main-navbar .mobile-close-btn i {
            font-size: 20px;
            color: white;
        }
        
        main-navbar .mobile-close-btn:hover {
            background: rgba(78, 205, 196, 0.3);
            transform: rotate(90deg);
        }
        
        /* Mobile User Info */
        main-navbar .mobile-user-info {
            text-align: center;
            padding-bottom: 25px;
            margin-bottom: 25px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        main-navbar .mobile-user-avatar {
            width: 70px;
            height: 70px;
            background: linear-gradient(135deg, #4ecdc4, #2d7a87);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 12px;
        }
        
        main-navbar .mobile-user-avatar i {
            font-size: 32px;
            color: white;
        }
        
        main-navbar .mobile-user-name {
            font-size: 18px;
            font-weight: 600;
            color: white;
            margin-bottom: 5px;
        }
        
        main-navbar .mobile-user-email {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
        }
        
        /* Mobile Navigation Links */
        main-navbar .mobile-nav-links {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        main-navbar .mobile-nav-links li {
            margin-bottom: 5px;
        }
        
        main-navbar .mobile-nav-links a {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 14px 15px;
            color: rgba(255, 255, 255, 0.85);
            text-decoration: none;
            font-size: 16px;
            font-weight: 500;
            border-radius: 12px;
            transition: all 0.3s ease;
        }
        
        main-navbar .mobile-nav-links a i {
            width: 24px;
            font-size: 18px;
            color: #4ecdc4;
        }
        
        main-navbar .mobile-nav-links a:hover,
        main-navbar .mobile-nav-links a.active {
            background: rgba(78, 205, 196, 0.15);
            color: #4ecdc4;
            transform: translateX(5px);
        }
        
        /* Mobile Logout Button */
        main-navbar .mobile-logout-btn {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        main-navbar .mobile-logout-btn a {
            color: #ff6b6b;
        }
        
        main-navbar .mobile-logout-btn a i {
            color: #ff6b6b;
        }
        
        /* Footer styles */
        main-footer {
            display: block;
            background: linear-gradient(135deg, #0d3c44 0%, #09262c 100%);
            color: #ecf0f1;
            padding: 60px 0 30px;
            margin-top: auto;
            width: 100%;
            border-top: 5px solid #4ecdc4;
        }
        
        main-footer .footer-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1.5fr;
            gap: 40px;
            margin-bottom: 40px;
        }
        
        main-footer .footer-logo {
            max-width: 140px;
            margin-bottom: 20px;
            height: auto;
            filter: brightness(1.2);
        }
        
        main-footer .footer-about p {
            line-height: 1.7;
            font-size: 14px;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 20px;
        }
        
        main-footer .footer-links h3, 
        main-footer .footer-social h3 {
            font-size: 18px;
            margin-bottom: 20px;
            color: white;
            position: relative;
            padding-bottom: 12px;
            font-weight: 600;
        }
        
        main-footer .footer-links h3::after, 
        main-footer .footer-social h3::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 50px;
            height: 3px;
            background: linear-gradient(90deg, #4ecdc4, #2d7a87);
            border-radius: 2px;
        }
        
        main-footer .footer-links ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }
        
        main-footer .footer-links ul li {
            margin-bottom: 10px;
        }
        
        main-footer .footer-links ul li a {
            color: rgba(255, 255, 255, 0.75);
            text-decoration: none;
            transition: all 0.3s ease;
            font-size: 14px;
        }
        
        main-footer .footer-links ul li a:hover {
            color: #4ecdc4;
            padding-left: 5px;
        }
        
        main-footer .social-icons {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
        }
        
        main-footer .social-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            font-size: 16px;
            color: white;
            text-decoration: none;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        main-footer .social-icon:hover {
            background: linear-gradient(135deg, #4ecdc4, #2d7a87);
            transform: translateY(-3px) scale(1.1);
            box-shadow: 0 5px 15px rgba(78, 205, 196, 0.4);
            border-color: transparent;
        }
        
        main-footer .copyright {
            text-align: center;
            padding-top: 25px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            font-size: 13px;
            color: rgba(255, 255, 255, 0.65);
        }
        
        @keyframes bounce {
            0%, 20%, 60%, 100% { transform: translateY(0); }
            40% { transform: translateY(-8px); }
            80% { transform: translateY(-4px); }
        }
        
        .cart-bounce {
            animation: bounce 0.5s ease;
        }
        
        /* Desktop Styles */
        @media (min-width: 769px) {
            main-navbar .mobile-nav-panel,
            main-navbar .mobile-menu-overlay,
            main-navbar .mobile-menu-btn {
                display: none !important;
            }
        }
        
        /* Mobile Styles */
        @media (max-width: 768px) {
            main-navbar .nav-menu {
                display: none !important;
            }
            
            main-navbar .mobile-menu-btn {
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            main-navbar .logo img {
                height: 60px;
                margin-left: 15px;
            }
            
            main-navbar .cart-icon, 
            main-navbar .account-icon {
                width: 38px;
                height: 38px;
                font-size: 18px;
                margin-right: 15px;
            }
            
            main-footer .footer-grid {
                grid-template-columns: 1fr;
                text-align: center;
                gap: 30px;
            }
            
            main-footer .footer-links h3::after,
            main-footer .footer-social h3::after {
                left: 50%;
                transform: translateX(-50%);
            }
            
            main-footer .social-icons {
                justify-content: center;
            }
        }
    </style>
`;

// Navbar Component
class Navbar extends HTMLElement {
    constructor() {
        super();
        this.cartCount = 0;
        this.isLoggedIn = false;
        this.user = null;
    }
    
    async connectedCallback() {
        await this.render();
        this.attachEventListeners();
        await this.loadCartCount();
        await this.checkAuthStatus();
        this.listenForUpdates();
    }
    
    async render() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        this.innerHTML = globalStyles + `
            <div class="container header-container">
                <div class="logo">
                    <a href="index.html">
                        <img src="images/logo.png" alt="Desi Vibes">
                    </a>
                </div>
                
                <button class="mobile-menu-btn" id="mobileMenuBtn">
                    <i class="fas fa-bars"></i>
                </button>
                
                <ul class="nav-menu" id="navMenu">
                    <li><a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}">Home</a></li>
                    <li><a href="shop.html" class="${currentPage === 'shop.html' || currentPage === 'product.html' ? 'active' : ''}">Shop</a></li>
                    <li><a href="about.html" class="${currentPage === 'about.html' ? 'active' : ''}">About Us</a></li>
                    <li><a href="contact.html" class="${currentPage === 'contact.html' ? 'active' : ''}">Contact</a></li>
                </ul>
                
                <div class="header-actions">
                    <a href="cart.html" class="cart-icon" id="cartIcon">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count" id="cartCount">0</span>
                    </a>
                    <a href="account.html" class="account-icon" id="accountIcon">
                        <i class="fas fa-user"></i>
                    </a>
                </div>
            </div>
            
            <!-- Mobile Menu Overlay -->
            <div class="mobile-menu-overlay" id="mobileOverlay"></div>
            
            <!-- Mobile Navigation Panel -->
            <div class="mobile-nav-panel" id="mobilePanel">
                <button class="mobile-close-btn" id="mobileCloseBtn">
                    <i class="fas fa-times"></i>
                </button>
                
                <div class="mobile-user-info" id="mobileUserInfo">
                    <div class="mobile-user-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="mobile-user-name" id="mobileUserName">Guest User</div>
                    <div class="mobile-user-email" id="mobileUserEmail">Login to your account</div>
                </div>
                
                <ul class="mobile-nav-links">
                    <li><a href="index.html" class="${currentPage === 'index.html' ? 'active' : ''}"><i class="fas fa-home"></i> Home</a></li>
                    <li><a href="shop.html" class="${currentPage === 'shop.html' || currentPage === 'product.html' ? 'active' : ''}"><i class="fas fa-store"></i> Shop</a></li>
                    <li><a href="about.html" class="${currentPage === 'about.html' ? 'active' : ''}"><i class="fas fa-info-circle"></i> About Us</a></li>
                    <li><a href="contact.html" class="${currentPage === 'contact.html' ? 'active' : ''}"><i class="fas fa-envelope"></i> Contact</a></li>
                    <li><a href="cart.html"><i class="fas fa-shopping-cart"></i> Cart <span id="mobileCartCount" style="margin-left: auto; background: #ff5252; padding: 2px 8px; border-radius: 20px; font-size: 12px;">0</span></a></li>
                    <li><a href="account.html"><i class="fas fa-user"></i> My Account</a></li>
                    <li id="mobileLogoutLi" style="display: none;"><a href="#" id="mobileLogoutBtn"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
                </ul>
                
                <div class="mobile-logout-btn" id="mobileLoginPrompt">
                    <a href="account.html"><i class="fas fa-sign-in-alt"></i> Login / Register</a>
                </div>
            </div>
        `;
    }

    listenForUpdates() {
    // Listen for cart updates from API
    document.addEventListener('cartUpdated', (event) => {
        console.log('Cart updated event received:', event.detail);
        if (event.detail && event.detail.total_items !== undefined) {
            this.cartCount = event.detail.total_items;
            this.updateCartCount();
        } else {
            this.loadCartCount();
        }
    });
    
    // Listen for auth changes (login/logout)
    document.addEventListener('authChanged', () => {
        console.log('Auth changed event received');
        this.checkAuthStatus();
        this.loadCartCount();
    });
    
    // Listen for storage events (when cart changes in another tab)
    window.addEventListener('storage', (event) => {
        if (event.key === 'desi_vibes_guest_cart' || event.key === 'desi_vibes_token') {
            console.log('Storage event detected, reloading cart count');
            this.loadCartCount();
        }
    });
    
    // Also listen for page visibility changes (when user returns to tab)
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            console.log('Tab became visible, updating cart count');
            this.loadCartCount();
        }
    });
}
    
    async loadCartCount() {
        try {
            if (!window.DesiVibesAPI.isLoggedIn()) {
                this.cartCount = 0;
                this.updateCartCount();
                return;
            }
            
            const response = await window.DesiVibesAPI.cart.getCart();
            if (response.success && response.cart) {
                this.cartCount = response.cart.total_items || 0;
                this.updateCartCount();
            }
        } catch (error) {
            console.error('Failed to load cart count:', error);
            this.cartCount = 0;
            this.updateCartCount();
        }
    }
    
    updateCartCount() {
        const cartCountSpan = this.querySelector('#cartCount');
        const mobileCartSpan = this.querySelector('#mobileCartCount');
        
        if (cartCountSpan) {
            cartCountSpan.textContent = this.cartCount;
            cartCountSpan.classList.add('cart-bounce');
            setTimeout(() => cartCountSpan.classList.remove('cart-bounce'), 500);
        }
        
        if (mobileCartSpan) {
            mobileCartSpan.textContent = this.cartCount;
        }
    }

    
    
    async checkAuthStatus() {
        this.isLoggedIn = window.DesiVibesAPI.isLoggedIn();
        this.user = window.DesiVibesAPI.getCurrentUser();
        
        // Update desktop account icon
        const accountIcon = this.querySelector('#accountIcon');
        if (accountIcon) {
            if (this.isLoggedIn && this.user) {
                accountIcon.innerHTML = `<i class="fas fa-user-check"></i>`;
                accountIcon.title = `Welcome, ${this.user.name}`;
            } else {
                accountIcon.innerHTML = `<i class="fas fa-user"></i>`;
                accountIcon.title = 'Login / Register';
            }
        }
        
        // Update mobile user info
        const mobileUserName = this.querySelector('#mobileUserName');
        const mobileUserEmail = this.querySelector('#mobileUserEmail');
        const mobileLogoutLi = this.querySelector('#mobileLogoutLi');
        const mobileLoginPrompt = this.querySelector('#mobileLoginPrompt');
        
        if (this.isLoggedIn && this.user) {
            if (mobileUserName) mobileUserName.textContent = this.user.name || 'User';
            if (mobileUserEmail) mobileUserEmail.textContent = this.user.email || '';
            if (mobileLogoutLi) mobileLogoutLi.style.display = 'block';
            if (mobileLoginPrompt) mobileLoginPrompt.style.display = 'none';
        } else {
            if (mobileUserName) mobileUserName.textContent = 'Guest User';
            if (mobileUserEmail) mobileUserEmail.textContent = 'Login to your account';
            if (mobileLogoutLi) mobileLogoutLi.style.display = 'none';
            if (mobileLoginPrompt) mobileLoginPrompt.style.display = 'block';
        }
    }
    
    attachEventListeners() {
        const mobileBtn = this.querySelector('#mobileMenuBtn');
        const mobilePanel = this.querySelector('#mobilePanel');
        const mobileOverlay = this.querySelector('#mobileOverlay');
        const mobileClose = this.querySelector('#mobileCloseBtn');
        const mobileLogoutBtn = this.querySelector('#mobileLogoutBtn');
        
        // Open mobile menu
        if (mobileBtn && mobilePanel && mobileOverlay) {
            mobileBtn.addEventListener('click', () => {
                mobilePanel.classList.add('active');
                mobileOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }
        
        // Close mobile menu
        const closeMenu = () => {
            if (mobilePanel) mobilePanel.classList.remove('active');
            if (mobileOverlay) mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };
        
        if (mobileClose) mobileClose.addEventListener('click', closeMenu);
        if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);
        
        // Mobile logout
        if (mobileLogoutBtn) {
            mobileLogoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.DesiVibesAPI.logout();
                closeMenu();
                window.location.reload();
            });
        }
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobilePanel && mobilePanel.classList.contains('active')) {
                closeMenu();
            }
        });
    }
    
    listenForUpdates() {
        document.addEventListener('cartUpdated', () => {
            this.loadCartCount();
        });
        
        document.addEventListener('authChanged', () => {
            this.checkAuthStatus();
            this.loadCartCount();
        });
    }
    
}

// ============ UNIVERSAL CART BADGE UPDATE FUNCTION ============
// This will work on every page

function updateAllCartBadges() {
    let count = 0;
    
    // Try to get from logged-in user first
    if (window.DesiVibesAPI && window.DesiVibesAPI.isLoggedIn && window.DesiVibesAPI.isLoggedIn()) {
        // For logged-in users, will be updated via API
        if (window.DesiVibesAPI.cart && window.DesiVibesAPI.cart.getCart) {
            window.DesiVibesAPI.cart.getCart().then(response => {
                if (response.success && response.cart) {
                    count = response.cart.total_items || 0;
                    updateBadgesUI(count);
                }
            }).catch(() => {
                // Fallback to guest cart
                count = getGuestCartCount();
                updateBadgesUI(count);
            });
        } else {
            count = getGuestCartCount();
            updateBadgesUI(count);
        }
    } else {
        // Guest user - read from localStorage
        count = getGuestCartCount();
        updateBadgesUI(count);
    }
    
    function getGuestCartCount() {
        const guestCart = JSON.parse(localStorage.getItem('desi_vibes_guest_cart') || '[]');
        return guestCart.reduce((sum, item) => sum + (item.quantity || 1), 0);
    }
    
    function updateBadgesUI(count) {
        console.log('🛒 Updating cart badges to:', count);
        
        // Update desktop cart badge
        const desktopBadge = document.querySelector('.cart-count');
        if (desktopBadge) {
            desktopBadge.textContent = count;
            desktopBadge.classList.add('cart-bounce');
            setTimeout(() => desktopBadge.classList.remove('cart-bounce'), 500);
        }
        
        // Update mobile cart badge (if exists)
        const mobileBadge = document.querySelector('#mobileCartCount');
        if (mobileBadge) {
            mobileBadge.textContent = count;
        }
        
        // Also update any element with class cart-count
        document.querySelectorAll('.cart-count').forEach(el => {
            if (el !== desktopBadge) {
                el.textContent = count;
            }
        });
    }
}

// Override the addToCart function globally
if (window.DesiVibesAPI && window.DesiVibesAPI.cart) {
    const originalAddToCart = window.DesiVibesAPI.cart.addToCart;
    window.DesiVibesAPI.cart.addToCart = async function(productId, quantity) {
        const result = await originalAddToCart(productId, quantity);
        // Update badge after adding to cart
        setTimeout(() => updateAllCartBadges(), 50);
        return result;
    };
}

// Listen for cart updates
document.addEventListener('cartUpdated', () => {
    setTimeout(() => updateAllCartBadges(), 50);
});

// Listen for localStorage changes (cross-tab sync)
window.addEventListener('storage', (e) => {
    if (e.key === 'desi_vibes_guest_cart' || e.key === 'desi_vibes_token') {
        setTimeout(() => updateAllCartBadges(), 100);
    }
});

// Update cart badge when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => updateAllCartBadges(), 200);
});

// Also update when page becomes visible (user returns to tab)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        setTimeout(() => updateAllCartBadges(), 100);
    }
});

// Footer Component
class Footer extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        this.innerHTML = globalStyles + `
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-about">
                        <img src="images/logo.png" alt="Desi Vibes" class="footer-logo">
                        <p><strong><em>"Desi Vibes brings the best of nature to your skin with handmade, organic soaps. Inspired by traditional ingredients, our soaps nourish, hydrate, and restore with every use."</em></strong></p>
                    </div>
                    
                    <div class="footer-links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="shop.html">Shop</a></li>
                            <li><a href="about.html">About Us</a></li>
                            <li><a href="contact.html">Contact</a></li>
                            <li><a href="cart.html">Cart</a></li>
                            <li><a href="account.html">My Account</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-links">
                        <h3>Policies</h3>
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Shipping Policy</a></li>
                            <li><a href="#">Returns Policy</a></li>
                            <li><a href="#">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    
                    <div class="footer-social">
                        <h3>Connect With Us</h3>
                        <div class="social-icons">
                            <a href="#" class="social-icon"><i class="fab fa-facebook-f"></i></a>
                            <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                            <a href="#" class="social-icon"><i class="fab fa-youtube"></i></a>
                            <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                        </div>
                        <p style="margin-top: 20px; font-size: 13px;">
                            <i class="fas fa-envelope"></i> support@desi-vibes.com<br>
                            <i class="fas fa-phone"></i> +91 76690 35666
                        </p>
                    </div>
                </div>
                
                <div class="copyright">
                    <p>Copyright © ${new Date().getFullYear()} Desi Vibes | All Rights Reserved</p>
                    <p>Handcrafted with ❤️ in India</p>
                </div>
            </div>
        `;
    }
}

// Register components
customElements.define('main-navbar', Navbar);
customElements.define('main-footer', Footer);

console.log('✅ Components loaded with backend integration');