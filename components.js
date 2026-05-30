// components.js - Updated with Backend Integration

// Import API service (assuming api.js is loaded first)
// Make sure to include api.js BEFORE components.js in your HTML

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
            padding: 15px 0;
            min-height: 80px;
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
            height: 90px;
            width: auto;
            filter: brightness(1.1);
        }
        
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
            gap: 25px;
        }
        
        main-navbar .cart-icon, 
        main-navbar .account-icon {
            font-size: 22px;
            color: rgba(255, 255, 255, 0.9);
            cursor: pointer;
            position: relative;
            text-decoration: none;
            transition: all 0.3s ease;
            width: 44px;
            height: 44px;
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
            font-size: 11px;
            font-weight: bold;
            border-radius: 50%;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
        
        main-navbar .mobile-menu-btn {
            display: none;
            font-size: 28px;
            cursor: pointer;
            color: white;
            background: rgba(255, 255, 255, 0.15);
            border: none;
            padding: 12px 15px;
            border-radius: 8px;
            transition: all 0.3s ease;
        }
        
        main-navbar .mobile-menu-btn:hover {
            background: rgba(78, 205, 196, 0.3);
            transform: scale(1.05);
        }
        
        /* Footer styles */
        main-footer {
            display: block;
            background: linear-gradient(135deg, #0d3c44 0%, #09262c 100%);
            color: #ecf0f1;
            padding: 80px 0 30px;
            margin-top: auto;
            width: 100%;
            border-top: 5px solid #4ecdc4;
        }
        
        main-footer .footer-grid {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1.5fr;
            gap: 50px;
            margin-bottom: 40px;
        }
        
        main-footer .footer-logo {
            max-width: 160px;
            margin-bottom: 25px;
            height: auto;
            filter: brightness(1.2);
        }
        
        main-footer .footer-about p {
            line-height: 1.8;
            font-size: 15px;
            color: rgba(255, 255, 255, 0.85);
            margin-bottom: 20px;
        }
        
        main-footer .footer-links h3, 
        main-footer .footer-social h3 {
            font-size: 20px;
            margin-bottom: 25px;
            color: white;
            position: relative;
            padding-bottom: 15px;
            font-weight: 600;
        }
        
        main-footer .footer-links h3::after, 
        main-footer .footer-social h3::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 60px;
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
            margin-bottom: 12px;
        }
        
        main-footer .footer-links ul li a {
            color: rgba(255, 255, 255, 0.85);
            text-decoration: none;
            transition: all 0.3s ease;
            font-size: 15px;
        }
        
        main-footer .footer-links ul li a:hover {
            color: #4ecdc4;
            padding-left: 5px;
        }
        
        main-footer .social-icons {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
        }
        
        main-footer .social-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 44px;
            height: 44px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            font-size: 18px;
            color: white;
            text-decoration: none;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        main-footer .social-icon:hover {
            background: linear-gradient(135deg, #4ecdc4, #2d7a87);
            transform: translateY(-5px) scale(1.1);
            box-shadow: 0 5px 15px rgba(78, 205, 196, 0.4);
            border-color: transparent;
        }
        
        main-footer .copyright {
            text-align: center;
            padding-top: 30px;
            border-top: 1px solid rgba(255, 255, 255, 0.15);
            font-size: 14px;
            color: rgba(255, 255, 255, 0.7);
        }
        
        @keyframes bounce {
            0%, 20%, 60%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            80% { transform: translateY(-5px); }
        }
        
        .cart-bounce {
            animation: bounce 0.5s ease;
        }
        
        @media (max-width: 768px) {
            main-navbar .mobile-menu-btn {
                display: block;
            }
            
            main-navbar .nav-menu {
                position: fixed;
                top: 80px;
                left: 0;
                flex-direction: column;
                background: linear-gradient(135deg, #1a535c 0%, #0d3c44 100%);
                width: 100%;
                padding: 30px 0;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                border-top: 1px solid rgba(255,255,255,0.1);
            }
            
            main-navbar .nav-menu.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            
            main-navbar .nav-menu li {
                text-align: center;
                margin: 15px 0;
            }
            
            main-footer .footer-grid {
                grid-template-columns: 1fr;
                text-align: center;
                gap: 40px;
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
                        <img src="images/logo.png" 
                             alt="Desi Vibes">
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
        `;
    }
    
    async loadCartCount() {
        try {
            const response = await window.DesiVibesAPI.cart.getCart();
            if (response.success && response.cart) {
                this.cartCount = response.cart.total_items || 0;
                this.updateCartCount();
            }
        } catch (error) {
            console.error('Failed to load cart count:', error);
        }
    }
    
    async checkAuthStatus() {
        this.isLoggedIn = window.DesiVibesAPI.isLoggedIn();
        this.user = window.DesiVibesAPI.getCurrentUser();
        
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
    }
    
    updateCartCount() {
        const cartCountSpan = this.querySelector('#cartCount');
        if (cartCountSpan) {
            cartCountSpan.textContent = this.cartCount;
            cartCountSpan.classList.add('cart-bounce');
            setTimeout(() => cartCountSpan.classList.remove('cart-bounce'), 500);
        }
    }
    
    attachEventListeners() {
        const mobileMenuBtn = this.querySelector('#mobileMenuBtn');
        const navMenu = this.querySelector('#navMenu');
        
        if (mobileMenuBtn && navMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
                    ? '<i class="fas fa-times"></i>' 
                    : '<i class="fas fa-bars"></i>';
            });
        }
    }
    
    listenForUpdates() {
        document.addEventListener('cartUpdated', (event) => {
            if (event.detail && event.detail.total_items !== undefined) {
                this.cartCount = event.detail.total_items;
            } else {
                this.loadCartCount();
            }
            this.updateCartCount();
        });
        
        document.addEventListener('authChanged', () => {
            this.checkAuthStatus();
            this.loadCartCount();
        });
    }
}

// Footer Component (unchanged)
class Footer extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        this.innerHTML = globalStyles + `
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-about">
                        <img src="https://desi-vibes.com/wp-content/uploads/2025/04/cropped-cropped-WhatsApp_Image_2024-11-08_at_12.16.42_PM-removebg-preview-2-195x137.png" 
                             alt="Desi Vibes" class="footer-logo">
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
                        <p style="margin-top: 20px;">
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