// TokenZ Loyalty Club v5.0 - Configuration Module
console.log('🔧 Loading TLC Configuration Module v5.0...');

window.TLC_CONFIG = {
    version: '5.0',
    appName: 'TokenZ Loyalty Club',
    shortName: 'TLC',
    
    // Google Sheets Configuration
    googleSheets: {
        defaultSheetId: '1jcBZWRLFCs6AGuOI7PuNVkQLuHQE90q18Prb3mMRYuk',
        currentSheetId: '1jcBZWRLFCs6AGuOI7PuNVkQLuHQE90q18Prb3mMRYuk', // Can be changed by admin
        apiKey: '', // Will be configured by admin
        ranges: {
            products: 'Products!A:Z',
            merchants: 'Merchants!A:Z',
            members: 'Members!A:Z',
            config: 'Config!A:Z'
        }
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
            backgroundImage: 'https://drive.google.com/uc?export=view&id=YOUR_HERO_IMAGE_ID',
            title: 'Welcome to TokenZ Loyalty Club',
            subtitle: 'Discover amazing subscription products from trusted merchants',
            buttons: [
                { text: 'About', action: 'showAbout' },
                { text: 'Subscriptions', action: 'showSubscriptions' },
                { text: 'Invite Members', action: 'inviteMembers' },
                { text: 'Invite Merchants', action: 'inviteMerchants' }
            ]
        },
        logo: {
            main: 'https://drive.google.com/uc?export=view&id=YOUR_LOGO_ID',
            splash: 'https://drive.google.com/uc?export=view&id=YOUR_SPLASH_LOGO_ID',
            favicon: 'https://drive.google.com/uc?export=view&id=YOUR_FAVICON_ID'
        }
    },
    
    // User Roles and Sample Credentials
    roles: {
        standard: {
            name: 'Standard Member',
            permissions: ['view_products', 'subscribe', 'wishlist', 'follow_merchants'],
            sampleCredentials: {
                email: 'member@tlc.demo',
                password: 'member123',
                displayName: 'Demo Member'
            }
        },
        merchant: {
            name: 'Merchant',
            permissions: ['view_products', 'subscribe', 'wishlist', 'follow_merchants', 'add_products', 'manage_products'],
            sampleCredentials: {
                email: 'merchant@tlc.demo',
                password: 'merchant123',
                displayName: 'Demo Merchant'
            }
        },
        admin: {
            name: 'Administrator',
            permissions: ['all'],
            sampleCredentials: {
                email: 'admin@tlc.demo',
                password: 'admin123',
                displayName: 'Demo Admin'
            }
        }
    },
    
    // Invite Messages Configuration
    inviteMessages: {
        members: {
            subject: 'Join TokenZ Loyalty Club!',
            message: 'You\'ve been invited to join TokenZ Loyalty Club - discover amazing subscription products and exclusive deals!',
            fields: ['email', 'mobile']
        },
        merchants: {
            subject: 'Partner with TokenZ Loyalty Club!',
            message: 'Join TokenZ Loyalty Club as a merchant partner and reach thousands of loyal subscribers!',
            fields: ['email', 'mobile', 'businessName']
        }
    },
    
    // Module URLs (GitHub-hosted)
    modules: {
        manager: 'https://raw.githubusercontent.com/fn-bigboss/tokenz-loyalty-club-v5/main/tlc-module-manager-v5.0.js',
        data: 'https://raw.githubusercontent.com/fn-bigboss/tokenz-loyalty-club-v5/main/tlc-sample-data-v5.0.js',
        utils: 'https://raw.githubusercontent.com/fn-bigboss/tokenz-loyalty-club-v5/main/tlc-utils-v5.0.js',
        core: 'https://raw.githubusercontent.com/fn-bigboss/tokenz-loyalty-club-v5/main/tlc-core-v5.0.js',
        ui: 'https://raw.githubusercontent.com/fn-bigboss/tokenz-loyalty-club-v5/main/tlc-ui-components-v5.0.js',
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
            googleSheetsConfigured: !!this.googleSheets.apiKey,
            currentSheetId: this.googleSheets.currentSheetId
        };
    },
    
    // Admin Configuration Functions
    admin: {
        updateGoogleSheetId: function(newSheetId) {
            if (newSheetId && typeof newSheetId === 'string') {
                window.TLC_CONFIG.googleSheets.currentSheetId = newSheetId;
                console.log('✅ Google Sheet ID updated:', newSheetId);
                return true;
            }
            return false;
        },
        
        updateApiKey: function(apiKey) {
            if (apiKey && typeof apiKey === 'string') {
                window.TLC_CONFIG.googleSheets.apiKey = apiKey;
                console.log('✅ Google Sheets API key updated');
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
        
        downloadTemplate: function() {
            const template = {
                sheets: {
                    Products: {
                        columns: ['ID', 'Name', 'SKU', 'MerchantID', 'MerchantName', 'Price', 'Currency', 'ShortDescription', 'LongDescription', 'ImageURL', 'Category', 'Rating', 'ReviewCount', 'IsActive', 'CustomAttributes'],
                        sampleData: [
                            ['P001', 'Premium Coffee Subscription', 'COFFEE-001', 'M001', 'Bean & Brew Co.', '29.99', 'USD', 'Monthly premium coffee delivery', 'Get freshly roasted premium coffee beans delivered monthly...', 'YOUR_PRODUCT_IMAGE_URL', 'Food & Beverage', '4.5', '127', 'TRUE', '{"roast":"medium","origin":"colombia"}']
                        ]
                    },
                    Merchants: {
                        columns: ['ID', 'Name', 'Description', 'Website', 'LogoURL', 'ContactEmail', 'IsActive', 'JoinDate', 'Category'],
                        sampleData: [
                            ['M001', 'Bean & Brew Co.', 'Premium coffee roasters since 1995', 'https://beanandbrewco.com', 'YOUR_MERCHANT_LOGO_URL', 'contact@beanandbrewco.com', 'TRUE', '2024-01-15', 'Food & Beverage']
                        ]
                    },
                    Members: {
                        columns: ['ID', 'Email', 'FullName', 'Role', 'JoinDate', 'IsActive', 'SponsorID', 'Phone'],
                        sampleData: [
                            ['U001', 'member@tlc.demo', 'Demo Member', 'standard', '2024-01-01', 'TRUE', '', '+1234567890']
                        ]
                    },
                    Config: {
                        columns: ['Key', 'Value', 'Description'],
                        sampleData: [
                            ['app_name', 'TokenZ Loyalty Club', 'Application name'],
                            ['hero_title', 'Welcome to TokenZ Loyalty Club', 'Hero section title'],
                            ['hero_subtitle', 'Discover amazing subscription products', 'Hero section subtitle']
                        ]
                    }
                }
            };
            
            console.log('📋 Google Sheets Template:', template);
            return template;
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
