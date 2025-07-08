// TokenZ Loyalty Club - Configuration File v5.0
// Update the URLs below with your Google Drive shareable links
// Upload this file to Google Drive and use its URL in the main HTML

console.log('⚙️ Loading TLC Configuration v5.0...');

// CONFIGURATION - UPDATE THESE URLS WITH YOUR GOOGLE DRIVE LINKS
window.TLC_CONFIG = {
    version: '5.0',
    
    // MODULE URLS - Replace with your Google Drive shareable URLs
    modules: {
        manager: 'https://raw.githubusercontent.com/fn-bigboss/tokenz-loyalty-club-v5/main/tlc-module-manager-v5.0.js',
        data: 'https://raw.githubusercontent.com/fn-bigboss/tokenz-loyalty-club-v5/main/tlc-sample-data-v5.0.js',
        utils: 'https://raw.githubusercontent.com/fn-bigboss/tokenz-loyalty-club-v5/main/tlc-utils-v5.0.js',
        core: 'https://raw.githubusercontent.com/fn-bigboss/tokenz-loyalty-club-v5/main/tlc-core-v5.0.js',
        ui: 'https://raw.githubusercontent.com/fn-bigboss/tokenz-loyalty-club-v5/main/tlc-ui-components-v5.0.js',
        styles: 'https://raw.githubusercontent.com/fn-bigboss/tokenz-loyalty-club-v5/main/tlc-styles-v5.0.js'
    },
    
    // FILE MAPPING REFERENCE (for your convenience)
    fileMapping: {
        manager: 'tlc-module-manager-v5.0.js',
        data: 'tlc-data-v5.0.js', 
        utils: 'tlc-utils-v5.0.js',
        core: 'tlc-core-v5.0.js',
        ui: 'tlc-ui-v5.0.js',
        styles: 'tlc-styles-v5.0.css'
    },
    
    // APPLICATION SETTINGS
    settings: {
        appName: 'TokenZ Loyalty Club',
        version: '5.0',
        environment: 'production',
        debug: false,
        
        // Loading settings
        loadingTimeout: 30000, // 30 seconds
        retryAttempts: 3,
        retryDelay: 2000, // 2 seconds
        
        // UI settings
        animationDuration: 300,
        notificationTimeout: 5000,
        autoSaveInterval: 30000 // 30 seconds
    },
    
    // FEATURE FLAGS
    features: {
        enableAnalytics: true,
        enableNotifications: true,
        enableOfflineMode: false,
        enableBetaFeatures: false,
        enableDebugMode: false
    },
    
    // API ENDPOINTS (if needed in future)
    api: {
        baseUrl: '',
        timeout: 10000,
        retries: 3
    }
};

// Validation function
window.TLC_CONFIG.validate = function() {
    const urls = this.moduleUrls;
    const missing = [];
    
    for (const [key, url] of Object.entries(urls)) {
        if (!url || url.includes('YOUR_') || url.includes('_URL_HERE')) {
            missing.push(key);
        }
    }
    
    if (missing.length > 0) {
        console.warn('⚠️ Missing configuration URLs:', missing);
        return false;
    }
    
    console.log('✅ TLC Configuration validated successfully');
    return true;
};

// Helper function to get module URL
window.TLC_CONFIG.getModuleUrl = function(moduleName) {
    return this.moduleUrls[moduleName] || null;
};

// Helper function to check if feature is enabled
window.TLC_CONFIG.isFeatureEnabled = function(featureName) {
    return this.features[featureName] || false;
};

console.log('✅ TLC Configuration v5.0 loaded successfully');

// End of TLC Configuration v5.0
