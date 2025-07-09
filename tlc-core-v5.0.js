// TokenZ Loyalty Club v5.0 - Core Logic Module
console.log('⚙️ Loading TLC Core Logic Module v5.0...');

window.TLC_CORE = {
    version: '5.0',
    initialized: false,
    
    // Initialize core module
    init: function() {
        if (this.initialized) return;
        
        console.log('🚀 Initializing TLC Core Logic...');
        this.setupEventListeners();
        this.initialized = true;
        console.log('✅ TLC Core Logic initialized');
    },
    
    // Product management
    products: {
        // Get all products
        getAll: function() {
            return window.TLC_DATA?.products || [];
        },
        
        // Get product by ID
        getById: function(id) {
            return window.TLC_DATA?.getProductById(id);
        },
        
        // Get featured products (randomized)
        getFeatured: function(count = 10) {
            const products = this.getAll();
            const shuffled = window.TLC_UTILS.utils.shuffle(products);
            return shuffled.slice(0, count);
        },
        
        // Get products by merchant
        getByMerchant: function(merchantId) {
            return window.TLC_DATA?.getProductsByMerchant(merchantId) || [];
        },
        
        // Get products by category
        getByCategory: function(category) {
            return window.TLC_DATA?.getProductsByCategory(category) || [];
        },
        
        // Search products
        search: function(query) {
            return window.TLC_DATA?.searchProducts(query) || [];
        },
        
        // Filter products based on user preferences
        filterForUser: function(products, filterType, userId) {
            if (!userId || !window.TLC_UTILS.auth.isLoggedIn()) {
                return products;
            }
            
            switch (filterType) {
                case 'subscribed':
                    const subscriptions = window.TLC_UTILS.storage.getSubscriptions(userId);
                    return products.filter(p => subscriptions.includes(p.id));
                    
                case 'wishlist':
                    const wishlist = window.TLC_UTILS.storage.getWishlist(userId);
                    return products.filter(p => wishlist.includes(p.id));
                    
                case 'followed_merchants':
                    const followed = window.TLC_UTILS.storage.getFollowedMerchants(userId);
                    return products.filter(p => followed.includes(p.merchantId));
                    
                default:
                    return products;
            }
        },
        
        // Sort products
        sort: function(products, sortBy) {
            switch (sortBy) {
                case 'name':
                    return window.TLC_UTILS.utils.sortBy(products, 'name');
                    
                case 'popularity':
                    return window.TLC_UTILS.utils.sortBy(products, 'reviewCount', 'desc');
                    
                case 'price_low':
                    return window.TLC_UTILS.utils.sortBy(products, 'price');
                    
                case 'price_high':
                    return window.TLC_UTILS.utils.sortBy(products, 'price', 'desc');
                    
                case 'rating':
                    return window.TLC_UTILS.utils.sortBy(products, 'rating', 'desc');
                    
                case 'newest':
                    return products.reverse(); // Assuming products are ordered by creation date
                    
                default:
                    return products;
            }
        },
        
        // Get product status for current user
        getStatusForUser: function(productId, userId) {
            if (!userId) return { subscribed: false, wishlisted: false };
            
            const subscriptions = window.TLC_UTILS.storage.getSubscriptions(userId);
            const wishlist = window.TLC_UTILS.storage.getWishlist(userId);
            
            return {
                subscribed: subscriptions.includes(productId),
                wishlisted: wishlist.includes(productId)
            };
        },
        
        // Subscribe to product
        subscribe: function(productId, userId) {
            if (!userId || !window.TLC_UTILS.auth.hasPermission('subscribe')) {
                return { success: false, message: 'Permission denied' };
            }
            
            const product = this.getById(productId);
            if (!product) {
                return { success: false, message: 'Product not found' };
            }
            
            const success = window.TLC_UTILS.storage.addSubscription(userId, productId);
            if (success) {
                window.TLC_UTILS.notifications.toast(`Subscribed to ${product.name}!`, 'success');
                return { success: true, message: 'Subscription added' };
            }
            
            return { success: false, message: 'Already subscribed' };
        },
        
        // Unsubscribe from product
        unsubscribe: function(productId, userId) {
            if (!userId || !window.TLC_UTILS.auth.hasPermission('subscribe')) {
                return { success: false, message: 'Permission denied' };
            }
            
            const product = this.getById(productId);
            if (!product) {
                return { success: false, message: 'Product not found' };
            }
            
            const success = window.TLC_UTILS.storage.removeSubscription(userId, productId);
            if (success) {
                window.TLC_UTILS.notifications.toast(`Unsubscribed from ${product.name}`, 'info');
                return { success: true, message: 'Subscription removed' };
            }
            
            return { success: false, message: 'Not subscribed' };
        },
        
        // Add to wishlist
        addToWishlist: function(productId, userId) {
            if (!userId || !window.TLC_UTILS.auth.hasPermission('wishlist')) {
                return { success: false, message: 'Permission denied' };
            }
            
            const product = this.getById(productId);
            if (!product) {
                return { success: false, message: 'Product not found' };
            }
            
            const success = window.TLC_UTILS.storage.addToWishlist(userId, productId);
            if (success) {
                window.TLC_UTILS.notifications.toast(`Added ${product.name} to wishlist!`, 'success');
                return { success: true, message: 'Added to wishlist' };
            }
            
            return { success: false, message: 'Already in wishlist' };
        },
        
        // Remove from wishlist
        removeFromWishlist: function(productId, userId) {
            if (!userId || !window.TLC_UTILS.auth.hasPermission('wishlist')) {
                return { success: false, message: 'Permission denied' };
            }
            
            const product = this.getById(productId);
            if (!product) {
                return { success: false, message: 'Product not found' };
            }
            
            const success = window.TLC_UTILS.storage.removeFromWishlist(userId, productId);
            if (success) {
                window.TLC_UTILS.notifications.toast(`Removed ${product.name} from wishlist`, 'info');
                return { success: true, message: 'Removed from wishlist' };
            }
            
            return { success: false, message: 'Not in wishlist' };
        }
    },
    
    // Merchant management
    merchants: {
        // Get all merchants
        getAll: function() {
            return window.TLC_DATA?.merchants || [];
        },
        
        // Get merchant by ID
        getById: function(id) {
            return window.TLC_DATA?.getMerchantById(id);
        },
        
        // Search merchants
        search: function(query) {
            return window.TLC_DATA?.searchMerchants(query) || [];
        },
        
        // Get merchant status for current user
        getStatusForUser: function(merchantId, userId) {
            if (!userId) return { followed: false };
            
            const followed = window.TLC_UTILS.storage.getFollowedMerchants(userId);
            return { followed: followed.includes(merchantId) };
        },
        
        // Follow merchant
        follow: function(merchantId, userId) {
            if (!userId || !window.TLC_UTILS.auth.hasPermission('follow_merchants')) {
                return { success: false, message: 'Permission denied' };
            }
            
            const merchant = this.getById(merchantId);
            if (!merchant) {
                return { success: false, message: 'Merchant not found' };
            }
            
            const success = window.TLC_UTILS.storage.followMerchant(userId, merchantId);
            if (success) {
                window.TLC_UTILS.notifications.toast(`Now following ${merchant.name}!`, 'success');
                return { success: true, message: 'Following merchant' };
            }
            
            return { success: false, message: 'Already following' };
        },
        
        // Unfollow merchant
        unfollow: function(merchantId, userId) {
            if (!userId || !window.TLC_UTILS.auth.hasPermission('follow_merchants')) {
                return { success: false, message: 'Permission denied' };
            }
            
            const merchant = this.getById(merchantId);
            if (!merchant) {
                return { success: false, message: 'Merchant not found' };
            }
            
            const success = window.TLC_UTILS.storage.unfollowMerchant(userId, merchantId);
            if (success) {
                window.TLC_UTILS.notifications.toast(`Unfollowed ${merchant.name}`, 'info');
                return { success: true, message: 'Unfollowed merchant' };
            }
            
            return { success: false, message: 'Not following' };
        },
        
        // Add new product (merchant only)
        addProduct: function(productData, userId) {
            if (!userId || !window.TLC_UTILS.auth.hasPermission('add_products')) {
                return { success: false, message: 'Permission denied' };
            }
            
            const user = window.TLC_UTILS.auth.getCurrentUser();
            if (!user.merchantId) {
                return { success: false, message: 'Merchant ID required' };
            }
            
            // Validate required fields
            const required = ['name', 'sku', 'price', 'shortDescription', 'category'];
            for (let field of required) {
                if (!productData[field]) {
                    return { success: false, message: `${field} is required` };
                }
            }
            
            // Create new product
            const newProduct = {
                id: window.TLC_UTILS.utils.generateId('P'),
                merchantId: user.merchantId,
                merchantName: window.TLC_CORE.merchants.getById(user.merchantId)?.name || 'Unknown',
                currency: 'USD',
                rating: 0,
                reviewCount: 0,
                isActive: true,
                customAttributes: {},
                tags: [],
                ...productData
            };
            
            // Add to data (in real app, this would save to backend)
            window.TLC_DATA.products.push(newProduct);
            
            window.TLC_UTILS.notifications.toast(`Product "${newProduct.name}" added successfully!`, 'success');
            return { success: true, product: newProduct };
        }
    },
    
    // Member management
    members: {
        // Get member profile
        getProfile: function(userId) {
            const member = window.TLC_DATA?.getMemberById(userId);
            if (!member) return null;
            
            // Add dynamic data
            return {
                ...member,
                subscriptions: window.TLC_UTILS.storage.getSubscriptions(userId),
                wishlist: window.TLC_UTILS.storage.getWishlist(userId),
                followedMerchants: window.TLC_UTILS.storage.getFollowedMerchants(userId)
            };
        },
        
        // Update member profile
        updateProfile: function(userId, updates) {
            if (!userId || !window.TLC_UTILS.auth.hasPermission('view_profile')) {
                return { success: false, message: 'Permission denied' };
            }
            
            // In real app, this would update backend
            const member = window.TLC_DATA?.getMemberById(userId);
            if (member) {
                Object.assign(member, updates);
                window.TLC_UTILS.notifications.toast('Profile updated successfully!', 'success');
                return { success: true };
            }
            
            return { success: false, message: 'Member not found' };
        }
    },
    
    // Admin functions
    admin: {
        // Create new merchant (admin only)
        createMerchant: function(merchantData, userId) {
            if (!userId || !window.TLC_UTILS.auth.hasPermission('all')) {
                return { success: false, message: 'Admin permission required' };
            }
            
            // Validate required fields
            const required = ['name', 'description', 'contactEmail', 'category'];
            for (let field of required) {
                if (!merchantData[field]) {
                    return { success: false, message: `${field} is required` };
                }
            }
            
            // Create new merchant
            const newMerchant = {
                id: window.TLC_UTILS.utils.generateId('M'),
                joinDate: new Date().toISOString().split('T')[0],
                isActive: true,
                rating: 0,
                followerCount: 0,
                productCount: 0,
                specialties: [],
                certifications: [],
                socialMedia: {},
                ...merchantData
            };
            
            // Add to data (in real app, this would save to backend)
            window.TLC_DATA.merchants.push(newMerchant);
            
            window.TLC_UTILS.notifications.toast(`Merchant "${newMerchant.name}" created successfully!`, 'success');
            return { success: true, merchant: newMerchant };
        },
        
        // Get system statistics
        getStats: function() {
            const products = window.TLC_DATA?.products || [];
            const merchants = window.TLC_DATA?.merchants || [];
            const members = window.TLC_DATA?.members || [];
            
            return {
                totalProducts: products.length,
                activeProducts: products.filter(p => p.isActive).length,
                totalMerchants: merchants.length,
                activeMerchants: merchants.filter(m => m.isActive).length,
                totalMembers: members.length,
                activeMembers: members.filter(m => m.isActive).length,
                categories: [...new Set(products.map(p => p.category))].length,
                averageRating: products.reduce((sum, p) => sum + p.rating, 0) / products.length || 0
            };
        }
    },
    
    // Invitation system
    invitations: {
        // Send member invitation
        inviteMembers: function(inviteData) {
            const config = window.TLC_CONFIG?.inviteMessages?.members;
            if (!config) return { success: false, message: 'Configuration not found' };
            
            // Validate required fields
            for (let field of config.fields) {
                if (field.required && !inviteData[field.name]) {
                    return { success: false, message: `${field.label} is required` };
                }
            }
            
            // Validate email
            if (inviteData.email && !window.TLC_UTILS.validate.email(inviteData.email)) {
                return { success: false, message: 'Invalid email address' };
            }
            
            // Validate phone if provided
            if (inviteData.mobile && !window.TLC_UTILS.validate.phone(inviteData.mobile)) {
                return { success: false, message: 'Invalid phone number' };
            }
            
            // In real app, this would send actual invitation
            console.log('📧 Member invitation sent:', inviteData);
            window.TLC_UTILS.notifications.toast('Member invitation sent successfully!', 'success');
            
            return { success: true, message: 'Invitation sent' };
        },
        
        // Send merchant invitation
        inviteMerchants: function(inviteData) {
            const config = window.TLC_CONFIG?.inviteMessages?.merchants;
            if (!config) return { success: false, message: 'Configuration not found' };
            
            // Validate required fields
            for (let field of config.fields) {
                if (field.required && !inviteData[field.name]) {
                    return { success: false, message: `${field.label} is required` };
                }
            }
            
            // Validate email
            if (inviteData.email && !window.TLC_UTILS.validate.email(inviteData.email)) {
                return { success: false, message: 'Invalid email address' };
            }
            
            // Validate phone if provided
            if (inviteData.mobile && !window.TLC_UTILS.validate.phone(inviteData.mobile)) {
                return { success: false, message: 'Invalid phone number' };
            }
            
            // In real app, this would send actual invitation
            console.log('📧 Merchant invitation sent:', inviteData);
            window.TLC_UTILS.notifications.toast('Merchant invitation sent successfully!', 'success');
            
            return { success: true, message: 'Invitation sent' };
        }
    },
    
    // Navigation and routing
    navigation: {
        currentView: 'splash',
        
        // Navigate to view
        navigateTo: function(view, params = {}) {
            console.log(`🧭 Navigating to: ${view}`, params);
            
            this.currentView = view;
            
            // Update URL if needed
            if (params.productId) {
                window.TLC_UTILS.url.setParam('product', params.productId);
            } else if (params.merchantId) {
                window.TLC_UTILS.url.setParam('merchant', params.merchantId);
            }
            
            // Trigger navigation event
            window.dispatchEvent(new CustomEvent('tlc:navigate', {
                detail: { view, params }
            }));
        },
        
        // Get current view
        getCurrentView: function() {
            return this.currentView;
        },
        
        // Handle back navigation
        goBack: function() {
            window.history.back();
        }
    },
    
    // Event handling
    setupEventListeners: function() {
        // Handle escape key for modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                window.dispatchEvent(new CustomEvent('tlc:closeModal'));
            }
        });
        
        // Handle authentication state changes
        window.addEventListener('tlc:authChanged', (e) => {
            console.log('🔐 Auth state changed:', e.detail);
        });
        
        // Handle navigation events
        window.addEventListener('tlc:navigate', (e) => {
            console.log('🧭 Navigation event:', e.detail);
        });
    }
};

// Initialize core module
console.log('✅ TLC Core Logic Module loaded successfully');

// Export for module system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.TLC_CORE;
}
