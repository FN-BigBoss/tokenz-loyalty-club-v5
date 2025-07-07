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
    
    // APP SETTINGS
    app: {
        name: 'TokenZ Loyalty Club',
        version: '5.0',
        debug: true, // Set to false for production
        theme: 'default',
        language: 'en'
    },
    
    // FEATURE FLAGS
    features: {
        analytics: true,
        notifications: true,
        darkMode: false,
        betaFeatures: false
    },
    
    // API SETTINGS (for future use)
    api: {
        baseUrl: '',
        timeout: 30000,
        retries: 3
    }
};

console.log('✅ TLC Configuration v5.0 loaded');

Now I'll update the main HTML file to use this configuration:

Excellent idea! That will make it much easier to manage. Let me create a separate configuration file and update the main HTML to reference it.

First, here's your new configuration file:

Filename: 
tlc-config-v5.0.js

// TokenZ Loyalty Club - Configuration File v5.0
// UPDATE THE URLs BELOW WITH YOUR GOOGLE DRIVE SHAREABLE LINKS
// Upload this file to Google Drive and use its URL in tlc-v5-shell.html

console.log('📋 Loading TLC Configuration v5.0...');

// TLC MODULE CONFIGURATION
// Replace each URL with your Google Drive shareable link
window.TLC_CONFIG = {
    version: '5.0',
    loadedAt: new Date().toISOString(),
    
    // MODULE URLS - EDIT THESE WITH YOUR GOOGLE DRIVE LINKS
    moduleUrls: {
        // Module Manager JavaScript file
        manager: 'YOUR_MODULE_MANAGER_URL_HERE',
        
        // Sample Data JavaScript file  
        data: 'YOUR_DATA_URL_HERE',
        
        // Utilities JavaScript file
        utils: 'YOUR_UTILS_URL_HERE',
        
        // Core Logic JavaScript file
        core: 'YOUR_CORE_URL_HERE',
        
        // UI Components JavaScript file
        ui: 'YOUR_UI_URL_HERE',
        
        // Styles CSS file
        styles: 'YOUR_STYLES_URL_HERE'
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
