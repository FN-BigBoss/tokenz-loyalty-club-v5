// TokenZ Loyalty Club v5.0 - Configuration Module
console.log('🔧 Loading TLC Configuration Module v5.0...');

window.TLC_CONFIG = {
    version: '5.0',
    appName: 'TokenZ Loyalty Club',
    shortName: 'TLC',
    
    // Data Storage Configuration (Self-contained in modules)
    dataStorage: {
        type: 'module', // All data stored in JavaScript modules
        autoSave: true, // Auto-save changes to localStorage
        backupEnabled: true, // Enable data backup/export
        syncEnabled: false // Future: sync with external services
    },
    
    // App Configuration
    app: {
        splashDuration: 3000, // 3 seconds
        featuredProductsCount: 10,
        theme: 'light',
        enablePWA: true,
        enableOffline: true
    },
    
    // UI Configuration
    ui: {
        heroSection: {
            enabled: true,
            backgroundImage: 'https://drive.google.com/uc?export=view&id=1example_hero_bg',
            title: 'Welcome to TokenZ Loyalty Club',
            subtitle: 'Discover amazing subscription products from trusted merchants',
            collapseOnScroll: true,
            buttons: [
                { text: 'About', action: 'showAbout', icon: 'ℹ️' },
                { text: 'Subscriptions', action: 'showSubscriptions', icon: '📦' },
                { text: 'Invite Members', action: 'inviteMembers', icon: '👥' },
                { text: 'Invite Merchants', action: 'inviteMerchants', icon: '🏪' }
            ]
        },
        logo: {
            main: 'https://drive.google.com/uc?export=view&id=1example_main_logo',
            splash: 'https://drive.google.com/uc?export=view&id=1example_splash_logo',
            favicon: 'https://drive.google.com/uc?export=view&id=1example_favicon'
        },
        navigation: {
            showInMenu: ['About', 'Subscriptions', 'Invite Members', 'Invite Merchants'],
            mobileBreakpoint: 768
        }
    },
    
    // User Roles and Sample Credentials
    roles: {
        standard: {
            name: 'Standard Member',
            permissions: ['view_products', 'subscribe', 'wishlist', 'follow_merchants', 'view_profile'],
            sampleCredentials: {
                email: 'member@tlc.demo',
                password: 'member123',
                displayName: 'Demo Member',
                memberId: 'TLC001'
            }
        },
        merchant: {
            name: 'Merchant',
            permissions: ['view_products', 'subscribe', 'wishlist', 'follow_merchants', 'view_profile', 'add_products', 'manage_products', 'view_merchant_profile'],
            sampleCredentials: {
                email: 'merchant@tlc.demo',
                password: 'merchant123',
                displayName: 'Demo Merchant',
                memberId: 'TLC002',
                merchantId: 'M001'
            }
        },
        admin: {
            name: 'Administrator',
            permissions: ['all'],
            sampleCredentials: {
                email: 'admin@tlc.demo',
                password: 'admin123',
                displayName: 'Demo Admin',
                memberId: 'TLC003'
            }
        }
    },
    
    // Invite Messages Configuration
    inviteMessages: {
        members: {
            subject: 'Join TokenZ Loyalty Club!',
            message: 'You\'ve been invited to join TokenZ Loyalty Club - discover amazing subscription products and exclusive deals from trusted merchants!',
            fields: [
                { name: 'email', label: 'Email Address', type: 'email', required: true },
                { name: 'mobile', label: 'Mobile Number', type: 'tel', required: false }
            ]
        },
        merchants: {
            subject: 'Partner with TokenZ Loyalty Club!',
            message: 'Join TokenZ Loyalty Club as a merchant partner and reach thousands of loyal subscribers with your amazing products!',
            fields: [
                { name: 'email', label: 'Email Address', type: 'email', required: true },
                { name: 'mobile', label: 'Mobile Number', type: 'tel', required: false },
                { name: 'businessName', label: 'Business Name', type: 'text', required: true }
            ]
        }
    },
    
    // Product Gallery Configuration
    productGallery: {
        sortOptions: [
            { value: 'name', label: 'Alphabetical' },
            { value: 'popularity', label: 'Popularity' },
            { value: 'price_low', label: 'Price: Low to High' },
            { value: 'price_high', label: 'Price: High to Low' },
            { value: 'rating', label: 'Highest Rated' },
            { value: 'newest', label: 'Newest First' }
        ],
        filterOptions: [
            { value: 'all', label: 'All Products' },
            { value: 'subscribed', label: 'My Subscriptions' },
            { value: 'wishlist', label: 'My Wishlist' },
            { value: 'followed_merchants', label: 'Followed Merchants' }
        ],
        itemsPerPage: 12,
        enableInfiniteScroll: true
    },
    
    // Module URLs (GitHub-hosted)
    modules: {
        manager: 'https://raw.githubusercontent.com/fn-bigboss/tokenz-loyalty-club-v5/main/tlc-module-manager-v5.0.js',
        data: 'https://raw.githubusercontent.com/fn-bigboss/tokenz-loyalty-club-v5/main/tlc-data-v5.0.js',
        utils: 'https://raw.githubusercontent.com/fn-bigboss/tokenz-loyalty-club-v5/main/tlc-utils-v5.0.js',
        core: 'https://raw.githubusercontent.com/fn-bigboss/tokenz-loyalty-club-v5/main/tlc-core-v5.0.js',
        ui: 'https://raw.githubusercontent.com/fn-bigboss/tokenz-loyalty-club-v5/main/tlc-ui-v5.0.js',
        styles: 'https://raw.githubusercontent.com/fn-bigboss/tokenz-loyalty-club-v5/main/tlc-styles-v5.0.js'
    },
    
    // Utility Functions
    utils: {
        // Convert Google Drive share URL to direct image URL
        convertGoogleDriveUrl: function(url) {
            if (!url || typeof url !== 'string') return '';
            
            // Handle different Google Drive URL formats
            const patterns = [
                /drive\.google\.com\/file\/d\/([a-zA-Z0-9-_]+)/,
                /drive\.google\.com\/open\?id=([a-zA-Z0-9-_]+)/,
                /docs\.google\.com\/.*\/d\/([a-zA-Z0-9-_]+)/
            ];
            
            for (let pattern of patterns) {
                const match = url.match(pattern);
                if (match) {
                    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
                }
            }
            
            // If already in correct format or external URL, return as-is
            return url;
        },
        
        // Get optimized image URL for different screen sizes
        getOptimizedImageUrl: function(url, size = 'medium') {
            const baseUrl = this.convertGoogleDriveUrl(url);
            if (!baseUrl.includes('drive.google.com')) return baseUrl;
            
            // Add size parameters for Google Drive images
            const sizeParams = {
                small: 's400',
                medium: 's800',
                large: 's1200',
                original: 's0'
            };
            
            return baseUrl + `&sz=${sizeParams[size] || sizeParams.medium}`;
        },
        
        // Generate unique IDs
        generateId: function(prefix = '') {
            return prefix + Date.now().toString(36) + Math.random().toString(36).substr(2);
        },
        
        // Format currency
        formatCurrency: function(amount, currency = 'USD') {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency
            }).format(amount);
        },
        
        // Format date
        formatDate: function(date) {
            return new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }).format(new Date(date));
        }
    },
    
    // Validation Functions
    validate: function() {
        const urls = this.modules;
        return Object.values(urls).every(url => 
            url && 
            typeof url === 'string' && 
            url.startsWith('http') && 
            !url.includes('YOUR_') && 
            !url.includes('_HERE')
        );
    },
    
    getInfo: function() {
        return {
            version: this.version,
            appName: this.appName,
            moduleCount: Object.keys(this.modules).length,
            isValid: this.validate(),
            dataStorageType: this.dataStorage.type,
            featuredProductsCount: this.app.featuredProductsCount
        };
    },
    
    // Admin Configuration Functions
    admin: {
        updateAppSettings: function(settings) {
            if (settings && typeof settings === 'object') {
                Object.assign(window.TLC_CONFIG.app, settings);
                console.log('✅ App settings updated:', settings);
                return true;
            }
            return false;
        },
        
        updateUISettings: function(uiSettings) {
            if (uiSettings && typeof uiSettings === 'object') {
                Object.assign(window.TLC_CONFIG.ui, uiSettings);
                console.log('✅ UI settings updated:', uiSettings);
                return true;
            }
            return false;
        },
        
        exportConfig: function() {
            const config = {
                ...window.TLC_CONFIG,
                modules: undefined // Don't export module URLs
            };
            return JSON.stringify(config, null, 2);
        },
        
        exportData: function() {
            // Export all app data for backup
            const data = {
                products: window.TLC_DATA?.products || [],
                merchants: window.TLC_DATA?.merchants || [],
                members: window.TLC_DATA?.members || [],
                subscriptions: JSON.parse(localStorage.getItem('tlc_subscriptions') || '[]'),
                wishlists: JSON.parse(localStorage.getItem('tlc_wishlists') || '[]'),
                follows: JSON.parse(localStorage.getItem('tlc_follows') || '[]'),
                exportDate: new Date().toISOString()
            };
            return JSON.stringify(data, null, 2);
        },
        
        importData: function(jsonData) {
            try {
                const data = JSON.parse(jsonData);
                // Validate and import data
                if (data.products) window.TLC_DATA.products = data.products;
                if (data.merchants) window.TLC_DATA.merchants = data.merchants;
                if (data.members) window.TLC_DATA.members = data.members;
                if (data.subscriptions) localStorage.setItem('tlc_subscriptions', JSON.stringify(data.subscriptions));
                if (data.wishlists) localStorage.setItem('tlc_wishlists', JSON.stringify(data.wishlists));
                if (data.follows) localStorage.setItem('tlc_follows', JSON.stringify(data.follows));
                
                console.log('✅ Data imported successfully');
                return true;
            } catch (error) {
                console.error('❌ Data import failed:', error);
                return false;
            }
        }
    }
};

// Initialize configuration
console.log('✅ TLC Configuration Module loaded successfully');
console.log('📊 Config Info:', window.TLC_CONFIG.getInfo());

// Export for module system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.TLC_CONFIG;
}
