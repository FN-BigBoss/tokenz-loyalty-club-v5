// TokenZ Loyalty Club - UI Components Module v5.0
// Complete user interface components and interactions for TLC application
// Upload this file to Google Drive and use the share URL in the module manager

console.log('🎨 Loading TLC UI Components Module v5.0...');

// Global UI namespace
window.TLC_UI = {
    version: '5.0',
    loadedAt: new Date().toISOString(),
    
    // UI state
    state: {
        currentModal: null,
        mobileMenuOpen: false,
        loadingStates: {},
        animations: {
            enabled: true,
            duration: 300
        }
    },

    // Application initialization
    init: function() {
        console.log('🎨 Initializing TLC UI v5.0...');
        
        // Hide splash screen after delay
        setTimeout(() => {
            this.hideSplashScreen();
        }, 2000);

        // Setup event listeners
        this.setupEventListeners();
        
        // Initialize components
        this.initializeComponents();
        
        console.log('✅ TLC UI v5.0 initialized successfully');
    },

    // Hide splash screen and show appropriate screen
    hideSplashScreen: function() {
        const splashScreen = document.getElementById('splashScreen');
        const loginScreen = document.getElementById('loginScreen');
        const mainApp = document.getElementById('mainApp');
        
        if (splashScreen) {
            splashScreen.style.opacity = '0';
            setTimeout(() => {
                splashScreen.style.display = 'none';
                
                // Check if user is logged in
                if (window.TLC_CORE && window.TLC_CORE.state.isLoggedIn) {
                    this.showMainApp();
                } else {
                    this.showLoginScreen();
                }
            }, 500);
        }
    },

    // Show login screen
    showLoginScreen: function() {
        const loginScreen = document.getElementById('loginScreen');
        const mainApp = document.getElementById('mainApp');
        
        if (loginScreen) {
            loginScreen.classList.remove('hidden');
            loginScreen.style.display = 'flex';
        }
        
        if (mainApp) {
            mainApp.classList.add('hidden');
        }
    },

    // Show main application
    showMainApp: function() {
        const loginScreen = document.getElementById('loginScreen');
        const mainApp = document.getElementById('mainApp');
        
        if (loginScreen) {
            loginScreen.classList.add('hidden');
            loginScreen.style.display = 'none';
        }
        
        if (mainApp) {
            mainApp.classList.remove('hidden');
            this.showSection('home');
            this.updateUserInterface();
        }
    },

    // Setup event listeners
    setupEventListeners: function() {
        // Login form
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', this.handleLogin.bind(this));
        }

        // Invite form
        const inviteForm = document.getElementById('inviteForm');
        if (inviteForm) {
            inviteForm.addEventListener('submit', this.handleInvite.bind(this));
        }

        // Search and filter inputs
        const sortProducts = document.getElementById('sortProducts');
        if (sortProducts) {
            sortProducts.addEventListener('change', (e) => {
                window.TLC_CORE.filters.update({ sortBy: e.target.value });
                this.updateProductDisplay();
            });
        }

        const filterCategory = document.getElementById('filterCategory');
        if (filterCategory) {
            filterCategory.addEventListener('change', (e) => {
                window.TLC_CORE.filters.update({ category: e.target.value });
                this.updateProductDisplay();
            });
        }

        const sortMerchants = document.getElementById('sortMerchants');
        if (sortMerchants) {
            sortMerchants.addEventListener('change', (e) => {
                this.updateMerchantDisplay(e.target.value);
            });
        }

        // Modal backdrop clicks
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                this.closeAllModals();
            }
        });

        // Escape key to close modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        });
    },

    // Initialize components
    initializeComponents: function() {
        // Load initial data displays
        this.updateProductDisplay();
        this.updateMerchantDisplay();
        this.updateStatsDisplay();
    },

    // Handle login form submission
    handleLogin: function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        if (!email || !password) {
            this.showNotification({ message: 'Please enter both email and password', type: 'error' });
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Signing in...';
        submitBtn.disabled = true;

        // Attempt login
        setTimeout(() => {
            if (window.TLC_CORE && window.TLC_CORE.auth) {
                const result = window.TLC_CORE.auth.login(email, password);
                
                if (result.success) {
                    this.showNotification({ message: result.message, type: 'success' });
                    setTimeout(() => {
                        this.showMainApp();
                    }, 1000);
                } else {
                    this.showNotification({ message: result.message, type: 'error' });
                }
            } else {
                this.showNotification({ message: 'System error: Core not loaded', type: 'error' });
            }
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1000);
    },

    // Handle invite form submission
    handleInvite: function(e) {
        e.preventDefault();
        
        const email = document.getElementById('inviteEmail').value;
        const mobile = document.getElementById('inviteMobile').value;
        const message = document.getElementById('inviteMessage').value;
        
        if (!email) {
            this.showNotification({ message: 'Please enter an email address', type: 'error' });
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Send invite
        setTimeout(() => {
            if (window.TLC_CORE && window.TLC_CORE.invites) {
                const success = window.TLC_CORE.invites.send(email, mobile, message);
                
                if (success) {
                    // Reset form
                    e.target.reset();
                    this.closeModal('inviteModal');
                }
            }
            
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    },

    // Show section
    showSection: function(sectionName) {
        // Hide all sections
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.add('hidden');
        });

        // Show target section
        const targetSection = document.getElementById(sectionName + 'Section');
        if (targetSection) {
            targetSection.classList.remove('hidden');
            window.TLC_CORE.state.currentSection = sectionName;
        }

        // Update navigation
        this.updateNavigation(sectionName);
        
        // Close mobile menu
        this.closeMobileMenu();
        
        // Track navigation
        if (window.TLC_CORE && window.TLC_CORE.analytics) {
            window.TLC_CORE.analytics.track('navigation', { section: sectionName });
        }

        // Load section-specific data
        this.loadSectionData(sectionName);
    },

    // Update navigation active state
    updateNavigation: function(activeSection) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('text-indigo-600', 'bg-indigo-50');
            link.classList.add('text-gray-700');
        });

        // Find and highlight active link
        navLinks.forEach(link => {
            const linkText = link.textContent.toLowerCase();
            if (linkText.includes(activeSection) || 
                (activeSection === 'home' && linkText.includes('home')) ||
                (activeSection === 'products' && linkText.includes('products')) ||
                (activeSection === 'merchants' && linkText.includes('merchants')) ||
                (activeSection === 'subscriptions' && linkText.includes('subscriptions')) ||
                (activeSection === 'about' && linkText.includes('about'))) {
                link.classList.remove('text-gray-700');
                link.classList.add('text-indigo-600', 'bg-indigo-50');
            }
        });
    },

    // Load section-specific data
    loadSectionData: function(sectionName) {
        switch(sectionName) {
            case 'home':
                this.updateFeaturedProducts();
                break;
            case 'products':
                this.updateProductDisplay();
                break;
            case 'merchants':
                this.updateMerchantDisplay();
                break;
            case 'subscriptions':
                this.updateSubscriptionDisplay();
                break;
        }
    },

    // Update featured products display
    updateFeaturedProducts: function() {
        const container = document.getElementById('featuredProducts');
        if (!container || !window.TLC_CORE) return;

        const products = window.TLC_CORE.products.getFeatured(4);
        
        if (products.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <div class="text-4xl mb-4">📦</div>
                    <p class="text-gray-600">No featured products available</p>
                </div>
            `;
            return;
        }

        container.innerHTML = products.map(product => this.createProductCard(product)).join('');
    },

    // Update product display
    updateProductDisplay: function() {
        const container = document.getElementById('allProducts');
        if (!container || !window.TLC_CORE) return;

        const filters = window.TLC_CORE.filters.get();
        const products = window.TLC_CORE.products.getAll(filters);
        
        if (products.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <div class="text-4xl mb-4">🔍</div>
                    <p class="text-gray-600">No products found matching your criteria</p>
                    <button onclick="window.TLC_CORE.filters.reset(); window.TLC_UI.updateProductDisplay();" 
                            class="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
                        Clear Filters
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = products.map(product => this.createProductCard(product)).join('');
    },

    // Create product card HTML
    createProductCard: function(product) {
        const isWishlisted = window.TLC_CORE.state.wishlist.includes(product.id);
        const isSubscribed = window.TLC_CORE.state.subscriptions.some(
            sub => sub.productId === product.id && sub.status === 'active'
        );
        
        return `
            <div class="product-card bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow p-6">
                <div class="aspect-w-16 aspect-h-9 mb-4">
                    <div class="w-full h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <span class="text-3xl">${this.getCategoryIcon(product.category)}</span>
                    </div>
                </div>
                
                <div class="space-y-3">
                    <div class="flex justify-between items-start">
                        <h3 class="font-semibold text-gray-900 text-lg">${product.name}</h3>
                        <button onclick="window.TLC_UI.toggleWishlist(${product.id})" 
                                class="text-xl ${isWishlisted ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors">
                            ${isWishlisted ? '❤️' : '🤍'}
                        </button>
                    </div>
                    
                    <p class="text-gray-600 text-sm line-clamp-2">${product.shortDescription}</p>
                    
                    <div class="flex items-center space-x-2">
                        <div class="flex items-center">
                            <span class="text-yellow-400">⭐</span>
                            <span class="text-sm font-medium text-gray-700 ml-1">${product.rating}</span>
                        </div>
                        <span class="text-gray-300">•</span>
                        <span class="text-sm text-gray-600">${product.reviewCount} reviews</span>
                    </div>
                    
                    <div class="flex items-center justify-between">
                        <div>
                            <span class="text-2xl font-bold text-gray-900">
                                ${window.TLC_CORE.utils.formatCurrency(product.price)}
                            </span>
                            <span class="text-sm text-gray-600">/${product.billingCycle}</span>
                        </div>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                            ${product.category}
                        </span>
                    </div>
                    
                    <div class="flex space-x-2 pt-2">
                        <button onclick="window.TLC_UI.showProductModal(${product.id})" 
                                class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                            View Details
                        </button>
                        <button onclick="window.TLC_UI.handleSubscribe(${product.id})" 
                                class="flex-1 ${isSubscribed ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-4 py-2 rounded-lg font-medium transition-colors">
                            ${isSubscribed ? '✓ Subscribed' : 'Subscribe'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    // Update merchant display
    updateMerchantDisplay: function(sortBy = 'name') {
        const container = document.getElementById('allMerchants');
        if (!container || !window.TLC_CORE) return;

        const merchants = window.TLC_CORE.merchants.getAll(sortBy);
        
        if (merchants.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <div class="text-4xl mb-4">🏪</div>
                    <p class="text-gray-600">No merchants available</p>
                </div>
            `;
            return;
        }

        container.innerHTML = merchants.map(merchant => this.createMerchantCard(merchant)).join('');
    },

    // Create merchant card HTML
    createMerchantCard: function(merchant) {
        const isFollowing = window.TLC_CORE.state.following.includes(merchant.id);
        
        return `
            <div class="merchant-card bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow overflow-hidden">
                <div class="h-32 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                    <span class="text-4xl">${this.getMerchantIcon(merchant.name)}</span>
                </div>
                
                <div class="p-6 space-y-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="font-semibold text-gray-900 text-lg">${merchant.name}</h3>
                            ${merchant.isVerified ? '<span class="text-blue-500 text-sm">✓ Verified</span>' : ''}
                        </div>
                        <button onclick="window.TLC_UI.toggleFollow(${merchant.id})" 
                                class="px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                                    isFollowing 
                                        ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' 
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }">
                            ${isFollowing ? '✓ Following' : '+ Follow'}
                        </button>
                    </div>
                    
                    <p class="text-gray-600 text-sm line-clamp-3">${merchant.description}</p>
                    
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span class="text-gray-500">Products:</span>
                            <span class="font-medium text-gray-900 ml-1">${merchant.totalProducts}</span>
                        </div>
                        <div>
                            <span class="text-gray-500">Followers:</span>
                            <span class="font-medium text-gray-900 ml-1">${merchant.followers.toLocaleString()}</span>
                        </div>
                        <div>
                            <span class="text-gray-500">Rating:</span>
                            <span class="font-medium text-gray-900 ml-1">⭐ ${merchant.averageRating}</span>
                        </div>
                        <div>
                            <span class="text-gray-500">Founded:</span>
                            <span class="font-medium text-gray-900 ml-1">${merchant.founded}</span>
                        </div>
                    </div>
                    
                    <div class="flex space-x-2 pt-2">
                        <button onclick="window.TLC_UI.showMerchantModal(${merchant.id})" 
                                class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                            View Details
                        </button>
                        <button onclick="window.TLC_UI.showMerchantProducts(${merchant.id})" 
                                class="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                            View Products
                        </button>
                    </div>
                </div>
            </div>
        `;
    },

    // Update subscription display
    updateSubscriptionDisplay: function() {
        const container = document.getElementById('userSubscriptions');
        if (!container || !window.TLC_CORE) return;

        const subscriptions = window.TLC_CORE.subscriptions.getUserSubscriptions();
        
        if (subscriptions.length === 0) {
            container.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <div class="text-6xl mb-4">📋</div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">No Active Subscriptions</h3>
                    <p class="text-gray-600 mb-6">Start exploring our premium products to find your perfect subscription</p>
                    <button onclick="window.TLC_UI.showSection('products')" 
                            class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                        Browse Products
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = subscriptions.map(subscription => {
            const product = window.TLC_CORE.products.getDetails(subscription.productId);
            if (!product) return '';
            
            return `
                <div class="bg-white rounded-xl shadow-sm border p-6 space-y-4">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="font-semibold text-gray-900 text-lg">${product.name}</h3>
                            <p class="text-gray-600 text-sm">${product.merchant}</p>
                        </div>
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Active
                        </span>
                    </div>
                    
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-500">Amount:</span>
                            <span class="font-medium">${window.TLC_CORE.utils.formatCurrency(subscription.amount)}/${product.billingCycle}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Started:</span>
                            <span class="font-medium">${window.TLC_CORE.utils.formatDate(subscription.startDate)}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">Next Billing:</span>
                            <span class="font-medium">${window.TLC_CORE.utils.formatDate(subscription.nextBilling)}</span>
                        </div>
                    </div>
                    
                    <div class="flex space-x-2 pt-2">
                        <button onclick="window.TLC_UI.showProductModal(${product.id})" 
                                class="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                            View Product
                        </button>
                        <button onclick="window.TLC_UI.handleCancelSubscription('${subscription.id}')" 
                                class="flex-1 bg-red-100 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    },

    // Update stats display
    updateStatsDisplay: function() {
        if (!window.TLC_DATA) return;

        const stats = window.TLC_DATA.stats;
        
        // Update home page stats
        const totalProducts = document.getElementById('totalProducts');
        const totalMerchants = document.getElementById('totalMerchants');
        const totalUsers = document.getElementById('totalUsers');
        
        if (totalProducts) totalProducts.textContent = stats.totalProducts + '+';
        if (totalMerchants) totalMerchants.textContent = stats.totalMerchants + '+';
        if (totalUsers) totalUsers.textContent = stats.totalUsers.toLocaleString() + '+';
    },

    // Modal management
    showModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('hidden');
            modal.style.display = 'flex';
            this.state.currentModal = modalId;
            
            // Add animation class
            const modalContent = modal.querySelector('.modal-enter');
            if (modalContent) {
                modalContent.style.transform = 'scale(0.95)';
                modalContent.style.opacity = '0';
                
                setTimeout(() => {
                    modalContent.style.transform = 'scale(1)';
                    modalContent.style.opacity = '1';
                    modalContent.style.transition = 'all 0.2s ease-out';
                }, 10);
            }
        }
    },

    closeModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            const modalContent = modal.querySelector('.modal-enter');
            if (modalContent) {
                modalContent.style.transform = 'scale(0.95)';
                modalContent.style.opacity = '0';
                
                setTimeout(() => {
                    modal.classList.add('hidden');
                    modal.style.display = 'none';
                    this.state.currentModal = null;
                }, 200);
            } else {
                modal.classList.add('hidden');
                modal.style.display = 'none';
                this.state.currentModal = null;
            }
        }
    },

    closeAllModals: function() {
        const modals = document.querySelectorAll('.modal-backdrop');
        modals.forEach(modal => {
            if (!modal.classList.contains('hidden')) {
                this.closeModal(modal.id);
            }
        });
    },

    // Product modal
    showProductModal: function(productId) {
        const product = window.TLC_CORE.products.getDetails(productId);
        if (!product) return;

        const content = document.getElementById('productContent');
        if (!content) return;

        const isWishlisted = window.TLC_CORE.state.wishlist.includes(product.id);
        const isSubscribed = window.TLC_CORE.state.subscriptions.some(
            sub => sub.productId === product.id && sub.status === 'active'
        );

        content.innerHTML = `
            <div class="grid md:grid-cols-2 gap-8">
                <div>
                    <div class="aspect-w-16 aspect-h-9 mb-6">
                        <div class="w-full h-64 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg flex items-center justify-center">
                            <span class="text-6xl">${this.getCategoryIcon(product.category)}</span>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <h4 class="font-semibold text-gray-900">Features:</h4>
                        <ul class="space-y-2">
                            ${product.features.map(feature => `
                                <li class="flex items-center text-gray-700">
                                    <span class="text-green-500 mr-2">✓</span>
                                    ${feature}
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                
                <div class="space-y-6">
                    <div>
                        <div class="flex justify-between items-start mb-4">
                            <div>
                                <h2 class="text-2xl font-bold text-gray-900">${product.name}</h2>
                                <p class="text-gray-600">${product.merchant}</p>
                            </div>
                            <button onclick="window.TLC_UI.toggleWishlist(${product.id})" 
                                    class="text-2xl ${isWishlisted ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition-colors">
                                ${isWishlisted ? '❤️' : '🤍'}
                            </button>
                        </div>
                        
                        <div class="flex items-center space-x-4 mb-4">
                            <div class="flex items-center">
                                <span class="text-yellow-400 text-lg">⭐</span>
                                <span class="font-medium text-gray-700 ml-1">${product.rating}</span>
                            </div>
                            <span class="text-gray-300">•</span>
                            <span class="text-gray-600">${product.reviewCount} reviews</span>
                            <span class="text-gray-300">•</span>
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                ${product.category}
                            </span>
                        </div>
                        
                        <div class="mb-6">
                            <div class="text-3xl font-bold text-gray-900 mb-1">
                                ${window.TLC_CORE.utils.formatCurrency(product.price)}
                                <span class="text-lg font-normal text-gray-600">/${product.billingCycle}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold text-gray-900 mb-2">Description</h4>
                        <p class="text-gray-700 leading-relaxed">${product.longDescription}</p>
                    </div>
                    
                    <div class="flex space-x-4">
                        <button onclick="window.TLC_UI.handleSubscribe(${product.id})" 
                                class="flex-1 ${isSubscribed ? 'bg-green-600 hover:bg-green-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                            ${isSubscribed ? '✓ Subscribed' : 'Subscribe Now'}
                        </button>
                        <button onclick="window.TLC_UI.showMerchantModal(${product.merchantId})" 
                                class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                            View Merchant
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.showModal('productModal');
    },

    // Merchant modal
    showMerchantModal: function(merchantId) {
        const merchant = window.TLC_CORE.merchants.getDetails(merchantId);
        if (!merchant) return;

        const content = document.getElementById('merchantContent');
        if (!content) return;

        const isFollowing = window.TLC_CORE.state.following.includes(merchant.id);
        const merchantProducts = window.TLC_DATA.utils.getProductsByMerchant(merchant.id);

        content.innerHTML = `
            <div class="space-y-8">
                <div class="text-center">
                    <div class="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-4xl">${this.getMerchantIcon(merchant.name)}</span>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-900">${merchant.name}</h2>
                    ${merchant.isVerified ? '<span class="text-blue-500">✓ Verified Partner</span>' : ''}
                    <p class="text-gray-600 mt-2">${merchant.description}</p>
                </div>
                
                <div class="grid md:grid-cols-2 gap-8">
                    <div class="space-y-4">
                        <h4 class="font-semibold text-gray-900">Company Information</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-500">Founded:</span>
                                <span class="font-medium">${merchant.founded}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Headquarters:</span>
                                <span class="font-medium">${merchant.headquarters}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Employees:</span>
                                <span class="font-medium">${merchant.employees}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Website:</span>
                                <a href="${merchant.website}" target="_blank" class="text-indigo-600 hover:text-indigo-800">Visit Site</a>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <h4 class="font-semibold text-gray-900">Platform Stats</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-500">Products:</span>
                                <span class="font-medium">${merchant.totalProducts}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Followers:</span>
                                <span class="font-medium">${merchant.followers.toLocaleString()}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Average Rating:</span>
                                <span class="font-medium">⭐ ${merchant.averageRating}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Joined:</span>
                                <span class="font-medium">${window.TLC_CORE.utils.formatDate(merchant.joinedAt)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div>
                    <h4 class="font-semibold text-gray-900 mb-4">About ${merchant.name}</h4>
                    <p class="text-gray-700 leading-relaxed">${merchant.longDescription}</p>
                </div>
                
                ${merchantProducts.length > 0 ? `
                    <div>
                        <h4 class="font-semibold text-gray-900 mb-4">Products (${merchantProducts.length})</h4>
                        <div class="grid md:grid-cols-2 gap-4">
                            ${merchantProducts.slice(0, 4).map(product => `
                                <div class="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                    <h5 class="font-medium text-gray-900">${product.name}</h5>
                                    <p class="text-sm text-gray-600 mt-1">${product.shortDescription}</p>
                                    <div class="flex justify-between items-center mt-2">
                                        <span class="font-semibold text-indigo-600">${window.TLC_CORE.utils.formatCurrency(product.price)}</span>
                                        <button onclick="window.TLC_UI.showProductModal(${product.id})" 
                                                class="text-sm text-indigo-600 hover:text-indigo-800">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                        ${merchantProducts.length > 4 ? `
                            <button onclick="window.TLC_UI.showMerchantProducts(${merchant.id})" 
                                    class="mt-4 text-indigo-600 hover:text-indigo-800 font-medium">
                                View All ${merchantProducts.length} Products →
                            </button>
                        ` : ''}
                    </div>
                ` : ''}
                
                <div class="flex space-x-4">
                    <button onclick="window.TLC_UI.toggleFollow(${merchant.id})" 
                            class="flex-1 ${isFollowing ? 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' : 'bg-indigo-600 text-white hover:bg-indigo-700'} px-6 py-3 rounded-lg font-semibold transition-colors">
                        ${isFollowing ? '✓ Following' : '+ Follow Merchant'}
                    </button>
                    <button onclick="window.TLC_UI.showMerchantProducts(${merchant.id})" 
                            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                        View Products
                    </button>
                </div>
            </div>
        `;

        this.showModal('merchantModal');
    },

    // Profile modal
    showProfile: function() {
        if (!window.TLC_CORE.state.isLoggedIn) {
            this.showNotification({ message: 'Please login to view profile', type: 'warning' });
            return;
        }

        const user = window.TLC_CORE.state.currentUser;
        const content = document.getElementById('profileContent');
        if (!content) return;

        content.innerHTML = `
            <div class="space-y-6">
                <div class="text-center">
                    <div class="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span class="text-2xl">${user.firstName.charAt(0)}${user.lastName.charAt(0)}</span>
                    </div>
                    <h2 class="text-xl font-bold text-gray-900">${user.fullName}</h2>
                    <p class="text-gray-600">${user.email}</p>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mt-2">
                        ${user.role.charAt(0).toUpperCase() + user.role.slice(1)} Member
                    </span>
                </div>
                
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="space-y-4">
                        <h4 class="font-semibold text-gray-900">Account Information</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-500">Member ID:</span>
                                <span class="font-medium">${user.memberId}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Phone:</span>
                                <span class="font-medium">${user.telephone}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Joined:</span>
                                <span class="font-medium">${window.TLC_CORE.utils.formatDate(user.joinedAt)}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Last Login:</span>
                                <span class="font-medium">${window.TLC_CORE.utils.formatDate(user.lastLoginAt)}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="space-y-4">
                        <h4 class="font-semibold text-gray-900">Activity Summary</h4>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-500">Active Subscriptions:</span>
                                <span class="font-medium">${window.TLC_CORE.subscriptions.getUserSubscriptions().length}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Wishlist Items:</span>
                                <span class="font-medium">${window.TLC_CORE.state.wishlist.length}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Following:</span>
                                <span class="font-medium">${window.TLC_CORE.state.following.length} merchants</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="border-t pt-6">
                    <div class="flex space-x-4">
                        <button onclick="window.TLC_UI.showSection('subscriptions')" 
                                class="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
                            Manage Subscriptions
                        </button>
                        <button onclick="window.TLC_CORE.auth.logout()" 
                                class="px-4 py-2 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition-colors">
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        `;

        this.showModal('profileModal');
    },

    // Invite modal
    showInviteModal: function(type = 'member') {
        const title = document.getElementById('inviteTitle');
        if (title) {
            title.textContent = type === 'merchant' ? '🏪 Invite Merchant' : '👥 Invite Friend';
        }
        
        this.showModal('inviteModal');
    },

    // Mobile menu toggle
    toggleMenu: function() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            if (this.state.mobileMenuOpen) {
                this.closeMobileMenu();
            } else {
                this.openMobileMenu();
            }
        }
    },

    openMobileMenu: function() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.remove('hidden');
            this.state.mobileMenuOpen = true;
        }
    },

    closeMobileMenu: function() {
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu) {
            mobileMenu.classList.add('hidden');
            this.state.mobileMenuOpen = false;
        }
    },

    // Action handlers
    toggleWishlist: function(productId) {
        if (!window.TLC_CORE.state.isLoggedIn) {
            this.showNotification({ message: 'Please login to manage wishlist', type: 'warning' });
            return;
        }

        const isWishlisted = window.TLC_CORE.state.wishlist.includes(productId);
        
        if (isWishlisted) {
            window.TLC_CORE.products.removeFromWishlist(productId);
        } else {
            window.TLC_CORE.products.addToWishlist(productId);
        }

        // Update displays
        this.updateProductDisplay();
        this.updateFeaturedProducts();
    },

    toggleFollow: function(merchantId) {
        if (!window.TLC_CORE.state.isLoggedIn) {
            this.showNotification({ message: 'Please login to follow merchants', type: 'warning' });
            return;
        }

        const isFollowing = window.TLC_CORE.state.following.includes(merchantId);
        
        if (isFollowing) {
            window.TLC_CORE.merchants.unfollow(merchantId);
        } else {
            window.TLC_CORE.merchants.follow(merchantId);
        }

        // Update displays
        this.updateMerchantDisplay();
    },

    handleSubscribe: function(productId) {
        if (!window.TLC_CORE.state.isLoggedIn) {
            this.showNotification({ message: 'Please login to subscribe', type: 'warning' });
            return;
        }

        const success = window.TLC_CORE.products.subscribe(productId);
        
        if (success) {
            // Update displays
            this.updateProductDisplay();
            this.updateFeaturedProducts();
            this.updateSubscriptionDisplay();
        }
    },

    handleCancelSubscription: function(subscriptionId) {
        if (confirm('Are you sure you want to cancel this subscription?')) {
            const success = window.TLC_CORE.subscriptions.cancel(subscriptionId);
            
            if (success) {
                this.updateSubscriptionDisplay();
            }
        }
    },

    showMerchantProducts: function(merchantId) {
        // Filter products by merchant and show products section
        window.TLC_CORE.filters.update({ merchantId: merchantId });
        this.showSection('products');
        this.closeAllModals();
    },

    toggleFilter: function(filterType) {
        const filters = window.TLC_CORE.filters.get();
        
        if (filterType === 'wishlist') {
            window.TLC_CORE.filters.update({ wishlistOnly: !filters.wishlistOnly });
            const btn = document.getElementById('wishlistFilter');
            if (btn) {
                btn.classList.toggle('bg-red-100');
                btn.classList.toggle('text-red-700');
            }
        } else if (filterType === 'followed') {
            window.TLC_CORE.filters.update({ followedOnly: !filters.followedOnly });
            const btn = document.getElementById('followedFilter');
            if (btn) {
                btn.classList.toggle('bg-indigo-100');
                btn.classList.toggle('text-indigo-700');
            }
        }
        
        this.updateProductDisplay();
        this.updateFeaturedProducts();
    },

    // Notification system
    showNotification: function(notification) {
        const container = document.getElementById('notificationContainer');
        if (!container) return;

        const notificationEl = document.createElement('div');
        notificationEl.id = notification.id || 'notif_' + Date.now();
        notificationEl.className = `notification-toast transform transition-all duration-300 translate-x-full`;
        
        const bgColor = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        }[notification.type] || 'bg-gray-500';

        notificationEl.innerHTML = `
            <div class="${bgColor} text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 max-w-sm">
                <span class="text-xl">
                    ${notification.type === 'success' ? '✅' : 
                      notification.type === 'error' ? '❌' : 
                      notification.type === 'warning' ? '⚠️' : 'ℹ️'}
                </span>
                <span class="flex-1">${notification.message}</span>
                <button onclick="window.TLC_UI.removeNotification('${notificationEl.id}')" 
                        class="text-white hover:text-gray-200 text-xl">×</button>
            </div>
        `;

        container.appendChild(notificationEl);

        // Animate in
        setTimeout(() => {
            notificationEl.classList.remove('translate-x-full');
        }, 100);

        // Auto remove
        setTimeout(() => {
            this.removeNotification(notificationEl.id);
        }, notification.duration || 3000);
    },

    removeNotification: function(notificationId) {
        const notification = document.getElementById(notificationId);
        if (notification) {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    },

    clearNotifications: function() {
        const container = document.getElementById('notificationContainer');
        if (container) {
            container.innerHTML = '';
        }
    },

    // Update user interface based on login state
    updateUserInterface: function() {
        // This method can be called to refresh UI elements based on current state
        this.updateProductDisplay();
        this.updateMerchantDisplay();
        this.updateSubscriptionDisplay();
        this.updateStatsDisplay();
    },

    // Utility functions
    getCategoryIcon: function(category) {
        const icons = {
            streaming: '📺',
            software: '💻',
            fitness: '💪',
            education: '📚',
            productivity: '⚡',
            entertainment: '🎬',
            music: '🎵',
            design: '🎨'
        };
        return icons[category] || '📦';
    },

    getMerchantIcon: function(merchantName) {
        const icons = {
            'Netflix': '🎬',
            'Spotify': '🎵',
            'Adobe': '🎨',
            'Peloton': '💪',
            'MasterClass': '📚',
            'Notion': '📝',
            'Disney': '🏰',
            'Canva': '🎨'
        };
        
        for (const [name, icon] of Object.entries(icons)) {
            if (merchantName.includes(name)) return icon;
        }
        return '🏪';
    }
};

// Global functions for HTML onclick handlers
window.showSection = function(section) {
    window.TLC_UI.showSection(section);
};

window.showProfile = function() {
    window.TLC_UI.showProfile();
};

window.toggleMenu = function() {
    window.TLC_UI.toggleMenu();
};

window.closeModal = function(modalId) {
    window.TLC_UI.closeModal(modalId);
};

window.showInviteModal = function(type) {
    window.TLC_UI.showInviteModal(type);
};

window.toggleFilter = function(filterType) {
    window.TLC_UI.toggleFilter(filterType);
};

// Auto-initialize when loaded
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.TLC_UI.init();
        });
    } else {
        window.TLC_UI.init();
    }
}

// Export for module system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.TLC_UI;
}

console.log('✅ TLC UI Components Module v5.0 loaded successfully');

// End of TLC UI Components Module v5.0