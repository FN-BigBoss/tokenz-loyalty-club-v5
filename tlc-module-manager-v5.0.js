// TokenZ Loyalty Club - Module Manager v5.0
// Handles dynamic loading and management of all TLC modules
// Upload this file to Google Drive and use the share URL in the main HTML

console.log('🔧 Loading TLC Module Manager v5.0...');

// Global Module Manager
window.TLC_MODULE_MANAGER = {
    version: '5.0',
    loadedAt: new Date().toISOString(),
    
    // Module configuration
    modules: {
        data: {
            name: 'Sample Data',
            url: '', // Will be set from main HTML
            loaded: false,
            required: true,
            dependencies: []
        },
        utils: {
            name: 'Utilities',
            url: '', // Will be set from main HTML
            loaded: false,
            required: true,
            dependencies: ['data']
        },
        core: {
            name: 'Core Logic',
            url: '', // Will be set from main HTML
            loaded: false,
            required: true,
            dependencies: ['data', 'utils']
        },
        ui: {
            name: 'UI Components',
            url: '', // Will be set from main HTML
            loaded: false,
            required: true,
            dependencies: ['data', 'utils', 'core']
        },
        styles: {
            name: 'Styles',
            url: '', // Will be set from main HTML
            loaded: false,
            required: true,
            dependencies: [],
            type: 'css'
        }
    },

    // Loading state
    state: {
        totalModules: 5,
        loadedModules: 0,
        failedModules: [],
        isLoading: false,
        loadStartTime: null,
        callbacks: {
            onProgress: null,
            onComplete: null,
            onError: null
        }
    },

    // Initialize module manager
    init: function(moduleUrls, callbacks = {}) {
        console.log('🔧 Initializing TLC Module Manager...');
        
        // Set callbacks
        this.state.callbacks = {
            onProgress: callbacks.onProgress || this.defaultProgressCallback,
            onComplete: callbacks.onComplete || this.defaultCompleteCallback,
            onError: callbacks.onError || this.defaultErrorCallback
        };

        // Set module URLs
        this.setModuleUrls(moduleUrls);
        
        // Start loading
        this.loadAllModules();
    },

    // Set module URLs from configuration
    setModuleUrls: function(urls) {
        for (const [key, url] of Object.entries(urls)) {
            if (this.modules[key]) {
                this.modules[key].url = url;
                console.log(`📝 Set ${key} module URL:`, url.substring(0, 50) + '...');
            }
        }
    },

    // Load all modules in dependency order
    loadAllModules: function() {
        if (this.state.isLoading) {
            console.warn('⚠️ Module loading already in progress');
            return;
        }

        this.state.isLoading = true;
        this.state.loadStartTime = Date.now();
        this.state.loadedModules = 0;
        this.state.failedModules = [];

        console.log('🚀 Starting module loading sequence...');
        this.updateProgress('Starting module loading...');

        // Load modules in dependency order
        this.loadModulesInOrder();
    },

    // Load modules respecting dependencies
    loadModulesInOrder: function() {
        const loadOrder = this.calculateLoadOrder();
        console.log('📋 Module load order:', loadOrder);

        this.loadNextModule(loadOrder, 0);
    },

    // Calculate optimal loading order based on dependencies
    calculateLoadOrder: function() {
        const order = [];
        const visited = new Set();
        const visiting = new Set();

        const visit = (moduleName) => {
            if (visiting.has(moduleName)) {
                throw new Error(`Circular dependency detected involving ${moduleName}`);
            }
            if (visited.has(moduleName)) {
                return;
            }

            visiting.add(moduleName);
            
            const module = this.modules[moduleName];
            if (module && module.dependencies) {
                for (const dep of module.dependencies) {
                    visit(dep);
                }
            }

            visiting.delete(moduleName);
            visited.add(moduleName);
            order.push(moduleName);
        };

        // Visit all modules
        for (const moduleName of Object.keys(this.modules)) {
            visit(moduleName);
        }

        return order;
    },

    // Load next module in sequence
    loadNextModule: function(loadOrder, index) {
        if (index >= loadOrder.length) {
            this.onAllModulesLoaded();
            return;
        }

        const moduleName = loadOrder[index];
        const module = this.modules[moduleName];

        if (!module) {
            console.error(`❌ Module ${moduleName} not found`);
            this.state.failedModules.push(moduleName);
            this.loadNextModule(loadOrder, index + 1);
            return;
        }

        if (module.loaded) {
            console.log(`✅ Module ${moduleName} already loaded, skipping`);
            this.loadNextModule(loadOrder, index + 1);
            return;
        }

        console.log(`📦 Loading module: ${module.name}`);
        this.updateProgress(`Loading ${module.name}...`);

        // Check if dependencies are loaded
        if (!this.areDependenciesLoaded(module)) {
            console.error(`❌ Dependencies not loaded for ${moduleName}`);
            this.state.failedModules.push(moduleName);
            this.loadNextModule(loadOrder, index + 1);
            return;
        }

        // Load the module
        this.loadSingleModule(module, moduleName)
            .then(() => {
                console.log(`✅ Successfully loaded: ${module.name}`);
                module.loaded = true;
                this.state.loadedModules++;
                this.updateProgress(`Loaded ${module.name}`);
                
                // Continue with next module
                setTimeout(() => {
                    this.loadNextModule(loadOrder, index + 1);
                }, 100);
            })
            .catch((error) => {
                console.error(`❌ Failed to load ${module.name}:`, error);
                this.state.failedModules.push(moduleName);
                
                if (module.required) {
                    this.onLoadingError(`Failed to load required module: ${module.name}`);
                    return;
                }
                
                // Continue with next module even if this one failed
                this.loadNextModule(loadOrder, index + 1);
            });
    },

    // Check if module dependencies are loaded
    areDependenciesLoaded: function(module) {
        if (!module.dependencies || module.dependencies.length === 0) {
            return true;
        }

        return module.dependencies.every(depName => {
            const dep = this.modules[depName];
            return dep && dep.loaded;
        });
    },

    // Load a single module
    loadSingleModule: function(module, moduleName) {
        return new Promise((resolve, reject) => {
            if (module.type === 'css') {
                this.loadCSSModule(module.url)
                    .then(resolve)
                    .catch(reject);
            } else {
                this.loadJSModule(module.url)
                    .then(resolve)
                    .catch(reject);
            }
        });
    },

    // Load JavaScript module
    loadJSModule: function(url) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            
            script.onload = () => {
                console.log(`📜 JavaScript module loaded from: ${url.substring(0, 50)}...`);
                resolve();
            };
            
            script.onerror = (error) => {
                console.error(`❌ Failed to load JavaScript from: ${url}`);
                reject(new Error(`Failed to load script: ${url}`));
            };
            
            // Convert Google Drive share URL to direct download URL if needed
            const directUrl = this.convertToDirectUrl(url);
            script.src = directUrl;
            
            document.head.appendChild(script);
        });
    },

    // Load CSS module
    loadCSSModule: function(url) {
        return new Promise((resolve, reject) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.type = 'text/css';
            
            link.onload = () => {
                console.log(`🎨 CSS module loaded from: ${url.substring(0, 50)}...`);
                resolve();
            };
            
            link.onerror = (error) => {
                console.error(`❌ Failed to load CSS from: ${url}`);
                reject(new Error(`Failed to load stylesheet: ${url}`));
            };
            
            // Convert Google Drive share URL to direct download URL if needed
            const directUrl = this.convertToDirectUrl(url);
            link.href = directUrl;
            
            document.head.appendChild(link);
        });
    },

    // Convert Google Drive share URL to direct download URL
    convertToDirectUrl: function(url) {
        if (url.includes('drive.google.com') && url.includes('/file/d/')) {
            const fileId = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
            if (fileId) {
                return `https://drive.google.com/uc?export=download&id=${fileId[1]}`;
            }
        }
        return url;
    },

    // Called when all modules are loaded
    onAllModulesLoaded: function() {
        const loadTime = Date.now() - this.state.loadStartTime;
        const successCount = this.state.loadedModules;
        const failCount = this.state.failedModules.length;

        console.log(`🎉 Module loading complete!`);
        console.log(`📊 Stats: ${successCount} loaded, ${failCount} failed, ${loadTime}ms total`);

        if (failCount > 0) {
            console.warn(`⚠️ Failed modules:`, this.state.failedModules);
        }

        this.state.isLoading = false;
        this.updateProgress('All modules loaded successfully!');

        // Initialize the application
        setTimeout(() => {
            this.initializeApplication();
        }, 500);

        // Call completion callback
        if (this.state.callbacks.onComplete) {
            this.state.callbacks.onComplete({
                success: failCount === 0,
                loaded: successCount,
                failed: failCount,
                failedModules: this.state.failedModules,
                loadTime: loadTime
            });
        }
    },

    // Initialize the main application
    initializeApplication: function() {
        console.log('🚀 Initializing TLC Application...');

        try {
            // Verify all required modules are loaded
            const missingModules = this.getMissingRequiredModules();
            if (missingModules.length > 0) {
                throw new Error(`Missing required modules: ${missingModules.join(', ')}`);
            }

            // Initialize modules in order
            this.initializeModules();

            console.log('✅ TLC Application initialized successfully!');
            
        } catch (error) {
            console.error('❌ Failed to initialize application:', error);
            this.onLoadingError(`Application initialization failed: ${error.message}`);
        }
    },

    // Initialize individual modules
    initializeModules: function() {
        // Initialize Data module
        if (window.TLC_DATA && typeof window.TLC_DATA.init === 'function') {
            console.log('📊 Initializing Data module...');
            window.TLC_DATA.init();
        }

        // Initialize Utils module
        if (window.TLC_UTILS && typeof window.TLC_UTILS.init === 'function') {
            console.log('🛠️ Initializing Utils module...');
            window.TLC_UTILS.init();
        }

        // Initialize Core module
        if (window.TLC_CORE && typeof window.TLC_CORE.init === 'function') {
            console.log('⚙️ Initializing Core module...');
            window.TLC_CORE.init();
        }

        // Initialize UI module (this will handle the final app startup)
        if (window.TLC_UI && typeof window.TLC_UI.init === 'function') {
            console.log('🎨 Initializing UI module...');
            window.TLC_UI.init();
        }
    },

    // Get missing required modules
    getMissingRequiredModules: function() {
        const missing = [];
        for (const [name, module] of Object.entries(this.modules)) {
            if (module.required && !module.loaded) {
                missing.push(name);
            }
        }
        return missing;
    },

    // Handle loading errors
    onLoadingError: function(message) {
        console.error('❌ Module loading error:', message);
        this.state.isLoading = false;
        
        if (this.state.callbacks.onError) {
            this.state.callbacks.onError(message);
        } else {
            this.showErrorMessage(message);
        }
    },

    // Update loading progress
    updateProgress: function(message) {
        const progress = Math.round((this.state.loadedModules / this.state.totalModules) * 100);
        
        if (this.state.callbacks.onProgress) {
            this.state.callbacks.onProgress({
                message: message,
                progress: progress,
                loaded: this.state.loadedModules,
                total: this.state.totalModules
            });
        }

        // Update splash screen if it exists
        this.updateSplashScreen(message, progress);
    },

    // Update splash screen
    updateSplashScreen: function(message, progress) {
        const statusElement = document.getElementById('loadingStatus');
        const progressElement = document.getElementById('loadingProgress');
        
        if (statusElement) {
            statusElement.textContent = message;
        }
        
        if (progressElement) {
            progressElement.textContent = `${progress}%`;
        }
    },

    // Show error message
    showErrorMessage: function(message) {
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #fee2e2;
            border: 2px solid #fca5a5;
            color: #dc2626;
            padding: 2rem;
            border-radius: 0.5rem;
            max-width: 500px;
            text-align: center;
            z-index: 10000;
            font-family: system-ui, sans-serif;
        `;
        
        errorDiv.innerHTML = `
            <h3 style="margin: 0 0 1rem 0; font-size: 1.25rem;">⚠️ Loading Error</h3>
            <p style="margin: 0 0 1rem 0;">${message}</p>
            <button onclick="location.reload()" style="
                background: #dc2626;
                color: white;
                border: none;
                padding: 0.5rem 1rem;
                border-radius: 0.25rem;
                cursor: pointer;
                font-weight: 500;
            ">Reload Page</button>
        `;
        
        document.body.appendChild(errorDiv);
    },

    // Default callbacks
    defaultProgressCallback: function(data) {
        console.log(`📈 Progress: ${data.progress}% - ${data.message}`);
    },

    defaultCompleteCallback: function(data) {
        console.log('🎉 Loading complete:', data);
    },

    defaultErrorCallback: function(message) {
        console.error('❌ Loading error:', message);
    },

    // Utility methods
    getModuleStatus: function() {
        const status = {};
        for (const [name, module] of Object.entries(this.modules)) {
            status[name] = {
                loaded: module.loaded,
                required: module.required,
                dependencies: module.dependencies
            };
        }
        return status;
    },

    // Reload a specific module
    reloadModule: function(moduleName) {
        const module = this.modules[moduleName];
        if (!module) {
            console.error(`❌ Module ${moduleName} not found`);
            return Promise.reject(new Error(`Module ${moduleName} not found`));
        }

        console.log(`🔄 Reloading module: ${module.name}`);
        module.loaded = false;
        
        return this.loadSingleModule(module, moduleName)
            .then(() => {
                module.loaded = true;
                console.log(`✅ Successfully reloaded: ${module.name}`);
            });
    },

    // Check if all modules are loaded
    isFullyLoaded: function() {
        return Object.values(this.modules).every(module => 
            !module.required || module.loaded
        );
    },

    // Get loading statistics
    getStats: function() {
        const total = Object.keys(this.modules).length;
        const loaded = Object.values(this.modules).filter(m => m.loaded).length;
        const failed = this.state.failedModules.length;
        
        return {
            total,
            loaded,
            failed,
            progress: Math.round((loaded / total) * 100),
            isComplete: this.isFullyLoaded(),
            loadTime: this.state.loadStartTime ? Date.now() - this.state.loadStartTime : 0
        };
    }
};

// Global helper functions
window.TLC_LOAD_MODULES = function(moduleUrls, callbacks) {
    return window.TLC_MODULE_MANAGER.init(moduleUrls, callbacks);
};

window.TLC_GET_MODULE_STATUS = function() {
    return window.TLC_MODULE_MANAGER.getModuleStatus();
};

window.TLC_RELOAD_MODULE = function(moduleName) {
    return window.TLC_MODULE_MANAGER.reloadModule(moduleName);
};

// Auto-initialize if DOM is ready
if (typeof window !== 'undefined') {
    console.log('✅ TLC Module Manager v5.0 loaded and ready');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.TLC_MODULE_MANAGER;
}

console.log('✅ TLC Module Manager v5.0 loaded successfully');

// End of TLC Module Manager v5.0