// TokenZ Loyalty Club - Core Logic Module v5.0
// Complete business logic and state management for TLC application
// Upload this file to Google Drive and use the share URL in the module manager

console.log('🧠 Loading TLC Core Logic Module v5.0...');

// Global core namespace
window.TLC_CORE = {
    version: '5.0',
    loadedAt: new Date().toISOString(),
    
    // Application state
    state: {
        currentUser: null,
        currentSection: 'home',
        isLoggedIn: false,
        userRole: null,
        filters: {
            category: '',
            sortBy: 'name',
            searchQuery: '',
            wishlistOnly: false,
            followedOnly: false
        },
        cart: [],
        wishlist: [],
        following: [],
        subscriptions: [],
        notifications: [],
        modals: {
            profile: false,
            product: false,
            merchant: false,
            invite: false
        }
    },

    // Authentication system
    auth: {
        // Login function
        login: function(email, password) {
            console.log('🔐 Attempting login for:', email);
            
            if (!window.TLC_DATA || !window.TLC_DATA.sampleUsers) {
                console.error('❌ TLC_DATA not available');
                return { success: false, message: 'System error: Data not loaded' };
            }

            const user = window.TLC_DATA.sampleUsers[email];
            
            if (!user) {
                console.log('❌ User not found:', email);
                return { success: false, message: 'Invalid email or password' };
            }

            if (user.password !== password) {
                console.log('❌ Invalid password for:', email);
                return { success: false, message: 'Invalid email or password' };
            }

            if (!user.isActive) {
                console.log('❌ Account inactive:', email);
                return { success: false, message: 'Account is inactive' };
            }

            // Successful login
            window.TLC_CORE.state.currentUser = user;
            window.TLC_CORE.state.isLoggedIn = true;
            window.TLC_CORE.state.userRole = user.role;

            // Update last login
            user.lastLoginAt = new Date().toISOString();

            // Load user-specific data
            window.TLC_CORE.loadUserData(user);

            // Save session
            localStorage.setItem('tlc_session_v5', JSON.stringify({
                email: user.email,
                role: user.role,
                loginTime: new Date().toISOString()
            }));

            console.log('✅ Login successful for:', email, 'Role:', user.role);
            return { success: true, user: user, message: 'Login successful' };
        },

        // Logout function
        logout: function() {
            console.log('🚪 Logging out user:', window.TLC_CORE.state.currentUser?.email);
            
            // Clear state
            window.TLC_CORE.state.currentUser = null;
            window.TLC_CORE.state.isLoggedIn = false;
            window.TLC_CORE.state.userRole = null;
            window.TLC_CORE.state.cart = [];
            window.TLC_CORE.state.wishlist = [];
            window.TLC_CORE.state.following = [];
            window.TLC_CORE.state.subscriptions = [];

            // Clear session
            localStorage.removeItem('tlc_session_v5');
            
            // Show login screen
            if (window.TLC_UI && window.TLC_UI.showLoginScreen) {
                window.TLC_UI.showLoginScreen();
            }

            console.log('✅ Logout successful');
        },

        // Check session
        checkSession: function() {
            const session = localStorage.getItem('tlc_session_v5');
            if (!session) return false;

            try {
                const sessionData = JSON.parse(session);
                const loginTime = new Date(sessionData.loginTime);
                const now = new Date();
                const hoursSinceLogin = (now - loginTime) / (1000 * 60 * 60);

                // Session expires after 24 hours
                if (hoursSinceLogin > 24) {
                    localStorage.removeItem('tlc_session_v5');
                    return false;
                }

                // Auto-login if session is valid
                if (window.TLC_DATA && window.TLC_DATA.sampleUsers[sessionData.email]) {
                    const user = window.TLC_DATA.sampleUsers[sessionData.email];
                    window.TLC_CORE.state.currentUser = user;
                    window.TLC_CORE.state.isLoggedIn = true;
                    window.TLC_CORE.state.userRole = user.role;
                    window.TLC_CORE.loadUserData(user);
                    return true;
                }
            } catch (error) {
                console.error('❌ Session check error:', error);
                localStorage.removeItem('tlc_session_v5');
            }

            return false;
        }
    },

    // User data management
    loadUserData: function(user) {
        console.log('📊 Loading user data for:', user.email);

        // Load user's wishlist (sample data)
        window.TLC_CORE.state.wishlist = [1, 3, 5]; // Product IDs

        // Load user's following (sample data)
        window.TLC_CORE.state.following = [1, 2, 7]; // Merchant IDs

        // Load user's subscriptions (sample data)
        window.TLC_CORE.state.subscriptions = [
            {
                id: 'sub_001',
                productId: 1,
                userId: user.email,
                status: 'active',
                startDate: '2024-01-01T00:00:00Z',
                nextBilling: '2024-02-01T00:00:00Z',
                amount: 15.99,
                currency: 'USD'
            },
            {
                id: 'sub_002',
                productId: 2,
                userId: user.email,
                status: 'active',
                startDate: '2023-12-15T00:00:00Z',
                nextBilling: '2024-02-15T00:00:00Z',
                amount: 9.99,
                currency: 'USD'
            }
        ];

        console.log('✅ User data loaded successfully');
    },

    // Product management
    products: {
        // Get all products with filters
        getAll: function(filters = {}) {
            if (!window.TLC_DATA || !window.TLC_DATA.sampleProducts) {
                console.error('❌ Product data not available');
                return [];
            }

            let products = [...window.TLC_DATA.sampleProducts];

            // Apply category filter
            if (filters.category && filters.category !== '') {
                products = products.filter(p => p.category === filters.category);
            }

            // Apply search filter
            if (filters.searchQuery && filters.searchQuery.trim() !== '') {
                const query = filters.searchQuery.toLowerCase();
                products = products.filter(p => 
                    p.name.toLowerCase().includes(query) ||
                    p.shortDescription.toLowerCase().includes(query) ||
                    p.merchant.toLowerCase().includes(query) ||
                    p.tags.some(tag => tag.toLowerCase().includes(query))
                );
            }

            // Apply wishlist filter
            if (filters.wishlistOnly) {
                const wishlist = window.TLC_CORE.state.wishlist;
                products = products.filter(p => wishlist.includes(p.id));
            }

            // Apply following filter
            if (filters.followedOnly) {
                const following = window.TLC_CORE.state.following;
                products = products.filter(p => following.includes(p.merchantId));
            }

            // Apply sorting
            if (filters.sortBy) {
                products = window.TLC_DATA.utils.sortProducts(products, filters.sortBy);
            }

            return products;
        },

        // Get featured products
        getFeatured: function(limit = 4) {
            const products = this.getAll();
            return products
                .filter(p => p.rating >= 4.3)
                .sort((a, b) => b.rating - a.rating)
                .slice(0, limit);
        },

        // Get product details
        getDetails: function(productId) {
            if (!window.TLC_DATA) return null;
            return window.TLC_DATA.utils.getProductById(productId);
        },

        // Add to wishlist
        addToWishlist: function(productId) {
            if (!window.TLC_CORE.state.isLoggedIn) {
                window.TLC_CORE.notifications.show('Please login to add items to wishlist', 'warning');
                return false;
            }

            const wishlist = window.TLC_CORE.state.wishlist;
            if (!wishlist.includes(productId)) {
                wishlist.push(productId);
                window.TLC_CORE.notifications.show('Added to wishlist!', 'success');
                
                // Save to localStorage
                localStorage.setItem('tlc_wishlist_v5', JSON.stringify(wishlist));
                return true;
            } else {
                window.TLC_CORE.notifications.show('Already in wishlist', 'info');
                return false;
            }
        },

        // Remove from wishlist
        removeFromWishlist: function(productId) {
            const wishlist = window.TLC_CORE.state.wishlist;
            const index = wishlist.indexOf(productId);
            if (index > -1) {
                wishlist.splice(index, 1);
                window.TLC_CORE.notifications.show('Removed from wishlist', 'info');
                
                // Save to localStorage
                localStorage.setItem('tlc_wishlist_v5', JSON.stringify(wishlist));
                return true;
            }
            return false;
        },

        // Subscribe to product
        subscribe: function(productId) {
            if (!window.TLC_CORE.state.isLoggedIn) {
                window.TLC_CORE.notifications.show('Please login to subscribe', 'warning');
                return false;
            }

            const product = this.getDetails(productId);
            if (!product) {
                window.TLC_CORE.notifications.show('Product not found', 'error');
                return false;
            }

            // Check if already subscribed
            const existingSubscription = window.TLC_CORE.state.subscriptions.find(
                sub => sub.productId === productId && sub.status === 'active'
            );

            if (existingSubscription) {
                window.TLC_CORE.notifications.show('Already subscribed to this product', 'info');
                return false;
            }

            // Create new subscription
            const newSubscription = {
                id: 'sub_' + Date.now(),
                productId: productId,
                userId: window.TLC_CORE.state.currentUser.email,
                status: 'active',
                startDate: new Date().toISOString(),
                nextBilling: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
                amount: product.price,
                currency: product.currency
            };

            window.TLC_CORE.state.subscriptions.push(newSubscription);
            window.TLC_CORE.notifications.show(`Successfully subscribed to ${product.name}!`, 'success');

            // Save to localStorage
            localStorage.setItem('tlc_subscriptions_v5', JSON.stringify(window.TLC_CORE.state.subscriptions));
            return true;
        }
    },

    // Merchant management
    merchants: {
        // Get all merchants
        getAll: function(sortBy = 'name') {
            if (!window.TLC_DATA || !window.TLC_DATA.sampleMerchants) {
                console.error('❌ Merchant data not available');
                return [];
            }

            let merchants = [...window.TLC_DATA.sampleMerchants];

            // Apply sorting
            switch(sortBy) {
                case 'followers':
                    merchants.sort((a, b) => b.followers - a.followers);
                    break;
                case 'products':
                    merchants.sort((a, b) => b.totalProducts - a.totalProducts);
                    break;
                case 'name':
                default:
                    merchants.sort((a, b) => a.name.localeCompare(b.name));
                    break;
            }

            return merchants;
        },

        // Get merchant details
        getDetails: function(merchantId) {
            if (!window.TLC_DATA) return null;
            return window.TLC_DATA.utils.getMerchantById(merchantId);
        },

        // Follow merchant
        follow: function(merchantId) {
            if (!window.TLC_CORE.state.isLoggedIn) {
                window.TLC_CORE.notifications.show('Please login to follow merchants', 'warning');
                return false;
            }

            const following = window.TLC_CORE.state.following;
            if (!following.includes(merchantId)) {
                following.push(merchantId);
                window.TLC_CORE.notifications.show('Now following merchant!', 'success');
                
                // Save to localStorage
                localStorage.setItem('tlc_following_v5', JSON.stringify(following));
                return true;
            } else {
                window.TLC_CORE.notifications.show('Already following this merchant', 'info');
                return false;
            }
        },

        // Unfollow merchant
        unfollow: function(merchantId) {
            const following = window.TLC_CORE.state.following;
            const index = following.indexOf(merchantId);
            if (index > -1) {
                following.splice(index, 1);
                window.TLC_CORE.notifications.show('Unfollowed merchant', 'info');
                
                // Save to localStorage
                localStorage.setItem('tlc_following_v5', JSON.stringify(following));
                return true;
            }
            return false;
        }
    },

    // Subscription management
    subscriptions: {
        // Get user subscriptions
        getUserSubscriptions: function() {
            if (!window.TLC_CORE.state.isLoggedIn) return [];
            return window.TLC_CORE.state.subscriptions.filter(sub => sub.status === 'active');
        },

        // Cancel subscription
        cancel: function(subscriptionId) {
            const subscription = window.TLC_CORE.state.subscriptions.find(sub => sub.id === subscriptionId);
            if (subscription) {
                subscription.status = 'cancelled';
                subscription.cancelledAt = new Date().toISOString();
                
                const product = window.TLC_CORE.products.getDetails(subscription.productId);
                window.TLC_CORE.notifications.show(`Cancelled subscription to ${product?.name || 'product'}`, 'info');
                
                // Save to localStorage
                localStorage.setItem('tlc_subscriptions_v5', JSON.stringify(window.TLC_CORE.state.subscriptions));
                return true;
            }
            return false;
        },

        // Reactivate subscription
        reactivate: function(subscriptionId) {
            const subscription = window.TLC_CORE.state.subscriptions.find(sub => sub.id === subscriptionId);
            if (subscription && subscription.status === 'cancelled') {
                subscription.status = 'active';
                subscription.reactivatedAt = new Date().toISOString();
                
                const product = window.TLC_CORE.products.getDetails(subscription.productId);
                window.TLC_CORE.notifications.show(`Reactivated subscription to ${product?.name || 'product'}`, 'success');
                
                // Save to localStorage
                localStorage.setItem('tlc_subscriptions_v5', JSON.stringify(window.TLC_CORE.state.subscriptions));
                return true;
            }
            return false;
        }
    },

    // Notification system
    notifications: {
        // Show notification
        show: function(message, type = 'info', duration = 3000) {
            const notification = {
                id: 'notif_' + Date.now(),
                message: message,
                type: type, // success, error, warning, info
                timestamp: new Date().toISOString(),
                duration: duration
            };

            window.TLC_CORE.state.notifications.push(notification);

            // Display notification if UI is available
            if (window.TLC_UI && window.TLC_UI.showNotification) {
                window.TLC_UI.showNotification(notification);
            } else {
                console.log(`📢 ${type.toUpperCase()}: ${message}`);
            }

            // Auto-remove after duration
            setTimeout(() => {
                window.TLC_CORE.notifications.remove(notification.id);
            }, duration);

            return notification.id;
        },

        // Remove notification
        remove: function(notificationId) {
            const index = window.TLC_CORE.state.notifications.findIndex(n => n.id === notificationId);
            if (index > -1) {
                window.TLC_CORE.state.notifications.splice(index, 1);
                
                // Remove from UI if available
                if (window.TLC_UI && window.TLC_UI.removeNotification) {
                    window.TLC_UI.removeNotification(notificationId);
                }
                return true;
            }
            return false;
        },

        // Clear all notifications
        clear: function() {
            window.TLC_CORE.state.notifications = [];
            if (window.TLC_UI && window.TLC_UI.clearNotifications) {
                window.TLC_UI.clearNotifications();
            }
        }
    },

    // Invite system
    invites: {
        // Send invite
        send: function(email, mobile, message, type = 'member') {
            if (!window.TLC_CORE.state.isLoggedIn) {
                window.TLC_CORE.notifications.show('Please login to send invites', 'warning');
                return false;
            }

            if (!email || !email.includes('@')) {
                window.TLC_CORE.notifications.show('Please enter a valid email address', 'error');
                return false;
            }

            // Simulate invite sending
            const invite = {
                id: 'inv_' + Date.now(),
                fromUser: window.TLC_CORE.state.currentUser.email,
                toEmail: email,
                toMobile: mobile,
                message: message,
                type: type,
                status: 'sent',
                sentAt: new Date().toISOString()
            };

            console.log('📧 Sending invite:', invite);
            
            // In a real app, this would make an API call
            setTimeout(() => {
                window.TLC_CORE.notifications.show(`Invite sent to ${email}!`, 'success');
            }, 1000);

            return true;
        }
    },

    // Filter and search management
    filters: {
        // Update filters
        update: function(newFilters) {
            window.TLC_CORE.state.filters = { ...window.TLC_CORE.state.filters, ...newFilters };
            
            // Trigger UI update if available
            if (window.TLC_UI && window.TLC_UI.updateProductDisplay) {
                window.TLC_UI.updateProductDisplay();
            }
        },

        // Reset filters
        reset: function() {
            window.TLC_CORE.state.filters = {
                category: '',
                sortBy: 'name',
                searchQuery: '',
                wishlistOnly: false,
                followedOnly: false
            };
            
            // Trigger UI update if available
            if (window.TLC_UI && window.TLC_UI.updateProductDisplay) {
                window.TLC_UI.updateProductDisplay();
            }
        },

        // Get current filters
        get: function() {
            return { ...window.TLC_CORE.state.filters };
        }
    },

    // Analytics and tracking
    analytics: {
        // Track user action
        track: function(action, data = {}) {
            const event = {
                action: action,
                data: data,
                userId: window.TLC_CORE.state.currentUser?.email || 'anonymous',
                timestamp: new Date().toISOString(),
                sessionId: localStorage.getItem('tlc_session_v5') ? 'active' : 'none'
            };

            console.log('📈 Analytics:', event);
            
            // In a real app, this would send to analytics service
            // For now, just store locally for demo
            const events = JSON.parse(localStorage.getItem('tlc_analytics_v5') || '[]');
            events.push(event);
            
            // Keep only last 100 events
            if (events.length > 100) {
                events.splice(0, events.length - 100);
            }
            
            localStorage.setItem('tlc_analytics_v5', JSON.stringify(events));
        },

        // Get analytics data
        getEvents: function(limit = 50) {
            const events = JSON.parse(localStorage.getItem('tlc_analytics_v5') || '[]');
            return events.slice(-limit);
        }
    },

    // Utility functions
    utils: {
        // Debounce function for search
        debounce: function(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Format currency
        formatCurrency: function(amount, currency = 'USD') {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency
            }).format(amount);
        },

        // Format date
        formatDate: function(dateString, options = {}) {
            const defaultOptions = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };
            return new Date(dateString).toLocaleDateString('en-US', { ...defaultOptions, ...options });
        },

        // Generate unique ID
        generateId: function(prefix = 'id') {
            return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        },

        // Validate email
        validateEmail: function(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        },

        // Deep clone object
        deepClone: function(obj) {
            return JSON.parse(JSON.stringify(obj));
        }
    },

    // Initialize core system
    init: function() {
        console.log('🚀 Initializing TLC Core v5.0...');
        
        // Check for existing session
        const hasSession = this.auth.checkSession();
        
        // Load saved user data from localStorage
        if (hasSession) {
            const savedWishlist = localStorage.getItem('tlc_wishlist_v5');
            if (savedWishlist) {
                this.state.wishlist = JSON.parse(savedWishlist);
            }
            
            const savedFollowing = localStorage.getItem('tlc_following_v5');
            if (savedFollowing) {
                this.state.following = JSON.parse(savedFollowing);
            }
            
            const savedSubscriptions = localStorage.getItem('tlc_subscriptions_v5');
            if (savedSubscriptions) {
                this.state.subscriptions = JSON.parse(savedSubscriptions);
            }
        }
        
        // Track initialization
        this.analytics.track('core_initialized', { version: this.version });
        
        console.log('✅ TLC Core v5.0 initialized successfully');
        console.log('📊 Current state:', this.state);
        
        return true;
    }
};

// Auto-initialize when loaded
if (typeof window !== 'undefined') {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.TLC_CORE.init();
        });
    } else {
        window.TLC_CORE.init();
    }
}

// Export for module system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.TLC_CORE;
}

console.log('✅ TLC Core Logic Module v5.0 loaded successfully');

// End of TLC Core Logic Module v5.0