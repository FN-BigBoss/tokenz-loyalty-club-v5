// TokenZ Loyalty Club v5.0 - UI Components Module
console.log('🎨 Loading TLC UI Components Module v5.0...');

window.TLC_UI = {
    version: '5.0',
    initialized: false,
    currentModal: null,
    
    // Initialize UI module
    init: function(container) {
        if (this.initialized) return;
        
        console.log('🚀 Initializing TLC UI Components...');
        this.container = container || document.body;
        this.setupEventListeners();
        this.showSplashScreen();
        this.initialized = true;
        console.log('✅ TLC UI Components initialized');
    },
    
    // Splash Screen (3 seconds)
    showSplashScreen: function() {
        const splashHtml = `
            <div id="splashScreen" class="fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center z-50">
                <div class="text-center text-white">
                    <div class="mb-8">
                        <div class="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center animate-pulse">
                            <span class="text-4xl">🎯</span>
                        </div>
                        <h1 class="text-4xl font-bold mb-2 animate-fade-in">TokenZ Loyalty Club</h1>
                        <p class="text-xl opacity-90 animate-fade-in-delay">Discover Amazing Subscriptions</p>
                    </div>
                    <div class="flex justify-center">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                </div>
            </div>
        `;
        
        this.container.innerHTML = splashHtml;
        
        // Auto-transition to login after 3 seconds
        setTimeout(() => {
            this.showLoginScreen();
        }, window.TLC_CONFIG?.app?.splashDuration || 3000);
    },
    
    // Login Screen
    showLoginScreen: function() {
        const roles = window.TLC_CONFIG?.roles || {};
        const credentialsHtml = Object.keys(roles).map(roleKey => {
            const role = roles[roleKey];
            return `
                <div class="bg-gray-50 p-3 rounded-lg mb-2">
                    <div class="font-medium text-sm text-gray-700">${role.name}</div>
                    <div class="text-xs text-gray-500">
                        Email: ${role.sampleCredentials.email}<br>
                        Password: ${role.sampleCredentials.password}
                    </div>
                </div>
            `;
        }).join('');
        
        const loginHtml = `
            <div id="loginScreen" class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div class="max-w-md w-full space-y-8">
                    <div class="text-center">
                        <div class="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                            <span class="text-2xl text-white">🎯</span>
                        </div>
                        <h2 class="text-3xl font-bold text-gray-900">Welcome to TLC</h2>
                        <p class="mt-2 text-gray-600">Sign in to your account</p>
                    </div>
                    
                    <form id="loginForm" class="mt-8 space-y-6">
                        <div class="space-y-4">
                            <div>
                                <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
                                <input id="email" name="email" type="email" required 
                                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            </div>
                            <div>
                                <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
                                <input id="password" name="password" type="password" required 
                                       class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                            </div>
                        </div>
                        
                        <button type="submit" class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            Sign In
                        </button>
                    </form>
                    
                    <div class="mt-6">
                        <div class="text-sm text-gray-600 mb-3">Sample Credentials for Testing:</div>
                        ${credentialsHtml}
                    </div>
                </div>
            </div>
        `;
        
        this.container.innerHTML = loginHtml;
        this.setupLoginForm();
    },
    
    // Main Application Interface
    showMainApp: function() {
        const user = window.TLC_UTILS.auth.getCurrentUser();
        const config = window.TLC_CONFIG?.ui || {};
        
        const mainAppHtml = `
            <div id="mainApp" class="min-h-screen bg-gray-50">
                <!-- Header -->
                <header class="bg-white shadow-sm sticky top-0 z-40">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div class="flex justify-between items-center h-16">
                            <div class="flex items-center">
                                <div class="text-2xl mr-3">🎯</div>
                                <h1 class="text-xl font-bold text-gray-900">TokenZ Loyalty Club</h1>
                            </div>
                            
                            <!-- Desktop Navigation -->
                            <nav class="hidden md:flex space-x-8">
                                <button onclick="TLC_UI.showAbout()" class="text-gray-500 hover:text-gray-900">About</button>
                                <button onclick="TLC_UI.showSubscriptions()" class="text-gray-500 hover:text-gray-900">Subscriptions</button>
                                <button onclick="TLC_UI.showInviteModal('members')" class="text-gray-500 hover:text-gray-900">Invite Members</button>
                                <button onclick="TLC_UI.showInviteModal('merchants')" class="text-gray-500 hover:text-gray-900">Invite Merchants</button>
                            </nav>
                            
                            <!-- User Menu -->
                            <div class="flex items-center space-x-4">
                                <span class="text-sm text-gray-600">Welcome, ${user?.fullName || 'User'}</span>
                                <button onclick="TLC_UI.showProfileModal()" class="text-gray-500 hover:text-gray-900">
                                    👤 Profile
                                </button>
                                <button onclick="TLC_UI.logout()" class="text-gray-500 hover:text-gray-900">
                                    🚪 Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
                
                <!-- Hero Section -->
                <section id="heroSection" class="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16 transition-all duration-300">
                    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 class="text-4xl font-bold mb-4">${config.heroSection?.title || 'Welcome to TokenZ Loyalty Club'}</h2>
                        <p class="text-xl mb-8 opacity-90">${config.heroSection?.subtitle || 'Discover amazing subscription products'}</p>
                        <div class="flex flex-wrap justify-center gap-4">
                            <button onclick="TLC_UI.showAbout()" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100">
                                ℹ️ About
                            </button>
                            <button onclick="TLC_UI.showSubscriptions()" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100">
                                📦 Subscriptions
                            </button>
                            <button onclick="TLC_UI.showInviteModal('members')" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100">
                                👥 Invite Members
                            </button>
                            <button onclick="TLC_UI.showInviteModal('merchants')" class="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100">
                                🏪 Invite Merchants
                            </button>
                        </div>
                    </div>
                </section>
                
                <!-- Main Content -->
                <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <!-- Featured Products Section -->
                    <section class="mb-12">
                        <div class="flex justify-between items-center mb-6">
                            <h3 class="text-2xl font-bold text-gray-900">Featured Products</h3>
                            <div class="flex space-x-4">
                                <button onclick="TLC_UI.showAllProducts()" class="text-blue-600 hover:text-blue-800 font-medium">
                                    View All Products
                                </button>
                                <button onclick="TLC_UI.showAllMerchants()" class="text-blue-600 hover:text-blue-800 font-medium">
                                    View All Merchants
                                </button>
                            </div>
                        </div>
                        
                        <!-- Product Gallery -->
                        <div id="featuredProducts" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            <!-- Products will be loaded here -->
                        </div>
                    </section>
                </main>
                
                <!-- Mobile Menu -->
                <div id="mobileMenu" class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
                    <div class="grid grid-cols-4 gap-1 p-2">
                        <button onclick="TLC_UI.showAbout()" class="p-3 text-center text-gray-600">
                            <div class="text-lg">ℹ️</div>
                            <div class="text-xs">About</div>
                        </button>
                        <button onclick="TLC_UI.showSubscriptions()" class="p-3 text-center text-gray-600">
                            <div class="text-lg">📦</div>
                            <div class="text-xs">Subscriptions</div>
                        </button>
                        <button onclick="TLC_UI.showInviteModal('members')" class="p-3 text-center text-gray-600">
                            <div class="text-lg">👥</div>
                            <div class="text-xs">Invite</div>
                        </button>
                        <button onclick="TLC_UI.showProfileModal()" class="p-3 text-center text-gray-600">
                            <div class="text-lg">👤</div>
                            <div class="text-xs">Profile</div>
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        this.container.innerHTML = mainAppHtml;
        this.loadFeaturedProducts();
        this.setupScrollHandler();
    },
    
    // Product Components
    createProductTile: function(product) {
        const user = window.TLC_UTILS.auth.getCurrentUser();
        const status = window.TLC_CORE.products.getStatusForUser(product.id, user?.id);
        
        return `
            <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div class="aspect-w-16 aspect-h-9 bg-gray-200">
                    <img src="${window.TLC_UTILS.images.convertGoogleDriveUrl(product.imageUrl)}" 
                         alt="${product.name}" 
                         class="w-full h-48 object-cover"
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                </div>
                <div class="p-4">
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="font-semibold text-gray-900 text-sm">${product.name}</h4>
                        <button onclick="TLC_UI.toggleWishlist('${product.id}')" 
                                class="text-lg ${status.wishlisted ? 'text-red-500' : 'text-gray-400'} hover:text-red-500">
                            ${status.wishlisted ? '❤️' : '🤍'}
                        </button>
                    </div>
                    <p class="text-xs text-gray-600 mb-2">${product.sku}</p>
                    <p class="text-sm text-blue-600 mb-2 cursor-pointer hover:underline" 
                       onclick="TLC_UI.showMerchantModal('${product.merchantId}')">${product.merchantName}</p>
                    <p class="text-sm text-gray-600 mb-3">${window.TLC_UTILS.format.truncate(product.shortDescription, 80)}</p>
                    
                    <div class="flex items-center justify-between mb-3">
                        <span class="text-lg font-bold text-gray-900">${window.TLC_UTILS.format.currency(product.price)}</span>
                        <div class="flex items-center text-sm text-gray-600">
                            <span class="text-yellow-500">${window.TLC_UTILS.format.stars(product.rating)}</span>
                            <span class="ml-1">(${product.reviewCount})</span>
                        </div>
                    </div>
                    
                    <div class="flex space-x-2">
                        <button onclick="TLC_UI.toggleSubscription('${product.id}')" 
                                class="flex-1 px-3 py-2 text-sm font-medium rounded-md ${status.subscribed ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'} hover:opacity-90">
                            ${status.subscribed ? '✅ Subscribed' : '📦 Subscribe'}
                        </button>
                        <button onclick="TLC_UI.showProductModal('${product.id}')" 
                                class="px-3 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50">
                            View
                        </button>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Product Gallery with Filters
    showAllProducts: function() {
        const products = window.TLC_CORE.products.getAll();
        const categories = window.TLC_DATA?.categories || [];
        const sortOptions = window.TLC_CONFIG?.productGallery?.sortOptions || [];
        const filterOptions = window.TLC_CONFIG?.productGallery?.filterOptions || [];
        
        const galleryHtml = `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex justify-between items-center mb-4">
                            <h2 class="text-2xl font-bold text-gray-900">All Products</h2>
                            <button onclick="TLC_UI.closeModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                        </div>
                        
                        <!-- Filters and Sort -->
                        <div class="flex flex-wrap gap-4 mb-4">
                            <select id="productFilter" onchange="TLC_UI.filterProducts()" class="px-3 py-2 border border-gray-300 rounded-md">
                                ${filterOptions.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
                            </select>
                            <select id="productSort" onchange="TLC_UI.sortProducts()" class="px-3 py-2 border border-gray-300 rounded-md">
                                ${sortOptions.map(option => `<option value="${option.value}">${option.label}</option>`).join('')}
                            </select>
                            <input type="text" id="productSearch" placeholder="Search products..." 
                                   onkeyup="TLC_UI.searchProducts()" 
                                   class="px-3 py-2 border border-gray-300 rounded-md flex-1 min-w-0">
                        </div>
                    </div>
                    
                    <div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                        <div id="productGallery" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            ${products.map(product => this.createProductTile(product)).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.showModal(galleryHtml);
    },
    
    // Product Detail Modal
    showProductModal: function(productId) {
        const product = window.TLC_CORE.products.getById(productId);
        if (!product) return;
        
        const user = window.TLC_UTILS.auth.getCurrentUser();
        const status = window.TLC_CORE.products.getStatusForUser(productId, user?.id);
        const merchant = window.TLC_CORE.merchants.getById(product.merchantId);
        
        const modalHtml = `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex justify-between items-start">
                            <div>
                                <h2 class="text-2xl font-bold text-gray-900 mb-2">${product.name}</h2>
                                <p class="text-gray-600">SKU: ${product.sku}</p>
                            </div>
                            <button onclick="TLC_UI.closeModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                        </div>
                    </div>
                    
                    <div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <!-- Product Image -->
                            <div>
                                <img src="${window.TLC_UTILS.images.convertGoogleDriveUrl(product.imageUrl)}" 
                                     alt="${product.name}" 
                                     class="w-full h-64 object-cover rounded-lg"
                                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                            </div>
                            
                            <!-- Product Details -->
                            <div>
                                <div class="mb-4">
                                    <span class="text-3xl font-bold text-gray-900">${window.TLC_UTILS.format.currency(product.price)}</span>
                                    <span class="text-gray-600 ml-2">per ${product.customAttributes?.subscriptionType || 'month'}</span>
                                </div>
                                
                                <div class="flex items-center mb-4">
                                    <span class="text-yellow-500 text-lg">${window.TLC_UTILS.format.stars(product.rating)}</span>
                                    <span class="ml-2 text-gray-600">${product.rating} (${product.reviewCount} reviews)</span>
                                    <button class="ml-4 text-blue-600 hover:underline">Write Review</button>
                                </div>
                                
                                <div class="mb-4">
                                    <span class="text-gray-600">By: </span>
                                    <button onclick="TLC_UI.showMerchantModal('${product.merchantId}')" 
                                            class="text-blue-600 hover:underline font-medium">${product.merchantName}</button>
                                </div>
                                
                                <div class="mb-6">
                                    <h4 class="font-semibold text-gray-900 mb-2">Description</h4>
                                    <p class="text-gray-600">${product.longDescription}</p>
                                </div>
                                
                                <!-- Custom Attributes -->
                                ${Object.keys(product.customAttributes || {}).length > 0 ? `
                                    <div class="mb-6">
                                        <h4 class="font-semibold text-gray-900 mb-2">Details</h4>
                                        <div class="space-y-2">
                                            ${Object.entries(product.customAttributes).map(([key, value]) => `
                                                <div class="flex justify-between">
                                                    <span class="text-gray-600 capitalize">${key.replace(/([A-Z])/g, ' $1')}:</span>
                                                    <span class="font-medium">${value}</span>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                                
                                <!-- Action Buttons -->
                                <div class="flex space-x-4">
                                    <button onclick="TLC_UI.toggleSubscription('${product.id}')" 
                                            class="flex-1 px-6 py-3 font-medium rounded-lg ${status.subscribed ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'} hover:opacity-90">
                                        ${status.subscribed ? '✅ Unsubscribe' : '📦 Subscribe'}
                                    </button>
                                    <button onclick="TLC_UI.toggleWishlist('${product.id}')" 
                                            class="px-6 py-3 font-medium border rounded-lg ${status.wishlisted ? 'border-red-500 text-red-500' : 'border-gray-300 text-gray-700'} hover:bg-gray-50">
                                        ${status.wishlisted ? '❤️ Remove' : '🤍 Wishlist'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.showModal(modalHtml);
    },
    
    // Merchant Detail Modal
    showMerchantModal: function(merchantId) {
        const merchant = window.TLC_CORE.merchants.getById(merchantId);
        if (!merchant) return;
        
        const user = window.TLC_UTILS.auth.getCurrentUser();
        const status = window.TLC_CORE.merchants.getStatusForUser(merchantId, user?.id);
        const products = window.TLC_CORE.products.getByMerchant(merchantId);
        
        const modalHtml = `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex justify-between items-start">
                            <div class="flex items-center">
                                <img src="${window.TLC_UTILS.images.convertGoogleDriveUrl(merchant.logoUrl)}" 
                                     alt="${merchant.name}" 
                                     class="w-16 h-16 rounded-lg mr-4"
                                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5Mb2dvPC90ZXh0Pjwvc3ZnPg=='">
                                <div>
                                    <h2 class="text-2xl font-bold text-gray-900">${merchant.name}</h2>
                                    <p class="text-gray-600">${merchant.category}</p>
                                </div>
                            </div>
                            <button onclick="TLC_UI.closeModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                        </div>
                    </div>
                    
                    <div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <!-- Merchant Info -->
                            <div class="lg:col-span-2">
                                <div class="mb-6">
                                    <h4 class="font-semibold text-gray-900 mb-2">About</h4>
                                    <p class="text-gray-600">${merchant.description}</p>
                                </div>
                                
                                <div class="mb-6">
                                    <h4 class="font-semibold text-gray-900 mb-2">Contact</h4>
                                    <div class="space-y-2">
                                        <div><span class="text-gray-600">Website:</span> 
                                            <a href="${merchant.website}" target="_blank" class="text-blue-600 hover:underline ml-2">${merchant.website}</a>
                                        </div>
                                        <div><span class="text-gray-600">Email:</span> 
                                            <a href="mailto:${merchant.contactEmail}" class="text-blue-600 hover:underline ml-2">${merchant.contactEmail}</a>
                                        </div>
                                        ${merchant.phone ? `<div><span class="text-gray-600">Phone:</span> <span class="ml-2">${merchant.phone}</span></div>` : ''}
                                    </div>
                                </div>
                                
                                ${merchant.specialties?.length > 0 ? `
                                    <div class="mb-6">
                                        <h4 class="font-semibold text-gray-900 mb-2">Specialties</h4>
                                        <div class="flex flex-wrap gap-2">
                                            ${merchant.specialties.map(specialty => `
                                                <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">${specialty}</span>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                                
                                <!-- Products -->
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-4">Products (${products.length})</h4>
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        ${products.map(product => `
                                            <div class="border border-gray-200 rounded-lg p-4 hover:shadow-md cursor-pointer" 
                                                 onclick="TLC_UI.closeModal(); setTimeout(() => TLC_UI.showProductModal('${product.id}'), 100)">
                                                <h5 class="font-medium text-gray-900">${product.name}</h5>
                                                <p class="text-sm text-gray-600 mt-1">${window.TLC_UTILS.format.truncate(product.shortDescription, 60)}</p>
                                                <div class="flex justify-between items-center mt-2">
                                                    <span class="font-bold text-blue-600">${window.TLC_UTILS.format.currency(product.price)}</span>
                                                    <span class="text-yellow-500 text-sm">${window.TLC_UTILS.format.stars(product.rating)}</span>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Sidebar -->
                            <div>
                                <div class="bg-gray-50 rounded-lg p-4 mb-6">
                                    <div class="text-center mb-4">
                                        <div class="text-2xl font-bold text-gray-900">${merchant.rating}</div>
                                        <div class="text-yellow-500">${window.TLC_UTILS.format.stars(merchant.rating)}</div>
                                        <div class="text-sm text-gray-600">${merchant.followerCount} followers</div>
                                    </div>
                                    
                                    <button onclick="TLC_UI.toggleMerchantFollow('${merchant.id}')" 
                                            class="w-full px-4 py-2 font-medium rounded-lg ${status.followed ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'} hover:opacity-90">
                                        ${status.followed ? '✅ Following' : '👥 Follow'}
                                    </button>
                                </div>
                                
                                ${merchant.certifications?.length > 0 ? `
                                    <div class="mb-6">
                                        <h5 class="font-semibold text-gray-900 mb-2">Certifications</h5>
                                        <div class="space-y-2">
                                            ${merchant.certifications.map(cert => `
                                                <div class="flex items-center">
                                                    <span class="text-green-500 mr-2">✓</span>
                                                    <span class="text-sm text-gray-600">${cert}</span>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                                
                                ${Object.keys(merchant.socialMedia || {}).length > 0 ? `
                                    <div>
                                        <h5 class="font-semibold text-gray-900 mb-2">Social Media</h5>
                                        <div class="space-y-2">
                                            ${Object.entries(merchant.socialMedia).map(([platform, handle]) => `
                                                <div class="text-sm">
                                                    <span class="text-gray-600 capitalize">${platform}:</span>
                                                    <span class="text-blue-600 ml-1">${handle}</span>
                                                </div>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.showModal(modalHtml);
    },
    
    // Profile Modal
    showProfileModal: function() {
        const user = window.TLC_UTILS.auth.getCurrentUser();
        if (!user) return;
        
        const profile = window.TLC_CORE.members.getProfile(user.id);
        const subscriptions = profile?.subscriptions || [];
        const wishlist = profile?.wishlist || [];
        const followedMerchants = profile?.followedMerchants || [];
        
        const modalHtml = `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex justify-between items-center">
                            <h2 class="text-2xl font-bold text-gray-900">My Profile</h2>
                            <button onclick="TLC_UI.closeModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                        </div>
                    </div>
                    
                    <div class="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                        <div class="text-center mb-6">
                            <div class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span class="text-2xl text-white">👤</span>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900">${profile?.fullName || 'User'}</h3>
                            <p class="text-gray-600">${profile?.role || 'Member'}</p>
                            <p class="text-sm text-gray-500">Member ID: ${profile?.id || 'N/A'}</p>
                        </div>
                        
                        <div class="space-y-6">
                            <!-- Contact Info -->
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-3">Contact Information</h4>
                                <div class="space-y-2">
                                    <div><span class="text-gray-600">Email:</span> <span class="ml-2">${profile?.email || 'N/A'}</span></div>
                                    <div><span class="text-gray-600">Phone:</span> <span class="ml-2">${profile?.phone || 'N/A'}</span></div>
                                    <div><span class="text-gray-600">Join Date:</span> <span class="ml-2">${window.TLC_UTILS.format.date(profile?.joinDate) || 'N/A'}</span></div>
                                </div>
                            </div>
                            
                            <!-- Quick Actions -->
                            <div>
                                <h4 class="font-semibold text-gray-900 mb-3">Quick Actions</h4>
                                <div class="grid grid-cols-3 gap-4">
                                    <button onclick="TLC_UI.showUserSubscriptions()" class="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50">
                                        <div class="text-2xl mb-2">📦</div>
                                        <div class="text-sm font-medium">Subscriptions</div>
                                        <div class="text-xs text-gray-500">${subscriptions.length} active</div>
                                    </button>
                                    <button onclick="TLC_UI.showUserWishlist()" class="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50">
                                        <div class="text-2xl mb-2">❤️</div>
                                        <div class="text-sm font-medium">Wishlist</div>
                                        <div class="text-xs text-gray-500">${wishlist.length} items</div>
                                    </button>
                                    <button onclick="TLC_UI.showUserFollows()" class="p-4 text-center border border-gray-200 rounded-lg hover:bg-gray-50">
                                        <div class="text-2xl mb-2">👥</div>
                                        <div class="text-sm font-medium">Following</div>
                                        <div class="text-xs text-gray-500">${followedMerchants.length} merchants</div>
                                    </button>
                                </div>
                            </div>
                            
                            <!-- Role-specific Actions -->
                            ${user.role === 'merchant' ? `
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-3">Merchant Actions</h4>
                                    <button onclick="TLC_UI.showAddProductModal()" class="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                        ➕ Add New Product
                                    </button>
                                </div>
                            ` : ''}
                            
                            ${user.role === 'admin' ? `
                                <div>
                                    <h4 class="font-semibold text-gray-900 mb-3">Admin Actions</h4>
                                    <div class="space-y-2">
                                        <button onclick="TLC_UI.showAddMerchantModal()" class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                            🏪 Create New Merchant
                                        </button>
                                        <button onclick="TLC_UI.showAdminConfig()" class="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                                            ⚙️ Configuration
                                        </button>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.showModal(modalHtml);
    },
    
    // Invite Modal
    showInviteModal: function(type) {
        const config = window.TLC_CONFIG?.inviteMessages?.[type];
        if (!config) return;
        
        const modalHtml = `
            <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
                    <div class="p-6 border-b border-gray-200">
                        <div class="flex justify-between items-center">
                            <h2 class="text-xl font-bold text-gray-900">Invite ${type === 'members' ? 'Members' : 'Merchants'}</h2>
                            <button onclick="TLC_UI.closeModal()" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
                        </div>
                    </div>
                    
                    <form id="inviteForm" class="p-6">
                        <div class="mb-4">
                            <label class="block text-sm font-medium text-gray-700 mb-2">Message</label>
                            <textarea readonly class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm">${config.message}</textarea>
                        </div>
                        
                        <div class="space-y-4">
                            ${config.fields.map(field => `
                                <div>
                                    <label for="${field.name}" class="block text-sm font-medium text-gray-700 mb-1">
                                        ${field.label} ${field.required ? '*' : ''}
                                    </label>
                                    <input type="${field.type}" 
                                           id="${field.name}" 
                                           name="${field.name}" 
                                           ${field.required ? 'required' : ''}
                                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                </div>
                            `).join('')}
                        </div>
                        
                        <div class="mt-6 flex space-x-3">
                            <button type="submit" class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                Send Invitation
                            </button>
                            <button type="button" onclick="TLC_UI.closeModal()" class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        this.showModal(modalHtml);
        this.setupInviteForm(type);
    },
    
    // Utility Functions
    loadFeaturedProducts: function() {
        const featuredProducts = window.TLC_CORE.products.getFeatured();
        const container = document.getElementById('featuredProducts');
        if (container) {
            container.innerHTML = featuredProducts.map(product => this.createProductTile(product)).join('');
        }
    },
    
    setupScrollHandler: function() {
        const heroSection = document.getElementById('heroSection');
        if (!heroSection) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (scrolled > 100) {
                heroSection.style.transform = `translateY(${rate}px)`;
                heroSection.style.opacity = Math.max(0, 1 - scrolled / 300);
            }
        });
    },
    
    setupLoginForm: function() {
        const form = document.getElementById('loginForm');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const email = formData.get('email');
            const password = formData.get('password');
            
            const result = window.TLC_UTILS.auth.login(email, password);
            if (result.success) {
                window.TLC_CORE.init();
                this.showMainApp();
            } else {
                window.TLC_UTILS.notifications.toast(result.message, 'error');
            }
        });
    },
    
    setupInviteForm: function(type) {
        const form = document.getElementById('inviteForm');
        if (!form) return;
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const inviteData = {};
            
            for (let [key, value] of formData.entries()) {
                inviteData[key] = value;
            }
            
            const result = type === 'members' 
                ? window.TLC_CORE.invitations.inviteMembers(inviteData)
                : window.TLC_CORE.invitations.inviteMerchants(inviteData);
            
            if (result.success) {
                this.closeModal();
            } else {
                window.TLC_UTILS.notifications.toast(result.message, 'error');
            }
        });
    },
    
    setupEventListeners: function() {
        // Close modal on escape key
        window.addEventListener('tlc:closeModal', () => {
            this.closeModal();
        });
        
        // Handle navigation events
        window.addEventListener('tlc:navigate', (e) => {
            const { view, params } = e.detail;
            // Handle navigation based on view
        });
    },
    
    // Action Handlers
    toggleSubscription: function(productId) {
        const user = window.TLC_UTILS.auth.getCurrentUser();
        if (!user) return;
        
        const status = window.TLC_CORE.products.getStatusForUser(productId, user.id);
        const result = status.subscribed 
            ? window.TLC_CORE.products.unsubscribe(productId, user.id)
            : window.TLC_CORE.products.subscribe(productId, user.id);
        
        if (result.success) {
            // Refresh the current view
            this.refreshCurrentView();
        }
    },
    
    toggleWishlist: function(productId) {
        const user = window.TLC_UTILS.auth.getCurrentUser();
        if (!user) return;
        
        const status = window.TLC_CORE.products.getStatusForUser(productId, user.id);
        const result = status.wishlisted 
            ? window.TLC_CORE.products.removeFromWishlist(productId, user.id)
            : window.TLC_CORE.products.addToWishlist(productId, user.id);
        
        if (result.success) {
            this.refreshCurrentView();
        }
    },
    
    toggleMerchantFollow: function(merchantId) {
        const user = window.TLC_UTILS.auth.getCurrentUser();
        if (!user) return;
        
        const status = window.TLC_CORE.merchants.getStatusForUser(merchantId, user.id);
        const result = status.followed 
            ? window.TLC_CORE.merchants.unfollow(merchantId, user.id)
            : window.TLC_CORE.merchants.follow(merchantId, user.id);
        
        if (result.success) {
            this.refreshCurrentView();
        }
    },
    
    // Modal Management
    showModal: function(html) {
        const existingModal = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50');
        if (existingModal) {
            existingModal.remove();
        }
        
        document.body.insertAdjacentHTML('beforeend', html);
        this.currentModal = document.querySelector('.fixed.inset-0.bg-black.bg-opacity-50:last-child');
    },
    
    closeModal: function() {
        if (this.currentModal) {
            this.currentModal.remove();
            this.currentModal = null;
        }
    },
    
    refreshCurrentView: function() {
        // Refresh featured products
        this.loadFeaturedProducts();
        
        // If modal is open, refresh its content
        if (this.currentModal) {
            // This would need specific refresh logic based on modal type
        }
    },
    
    logout: function() {
        window.TLC_UTILS.auth.logout();
        this.showLoginScreen();
    },
    
    // Placeholder functions for additional features
    showAbout: function() {
        window.TLC_UTILS.notifications.toast('About page coming soon!', 'info');
    },
    
    showSubscriptions: function() {
        this.showUserSubscriptions();
    },
    
    showAllMerchants: function() {
        window.TLC_UTILS.notifications.toast('All merchants view coming soon!', 'info');
    },
    
    showUserSubscriptions: function() {
        window.TLC_UTILS.notifications.toast('User subscriptions view coming soon!', 'info');
    },
    
    showUserWishlist: function() {
        window.TLC_UTILS.notifications.toast('User wishlist view coming soon!', 'info');
    },
    
    showUserFollows: function() {
        window.TLC_UTILS.notifications.toast('User follows view coming soon!', 'info');
    },
    
    showAddProductModal: function() {
        window.TLC_UTILS.notifications.toast('Add product modal coming soon!', 'info');
    },
    
    showAddMerchantModal: function() {
        window.TLC_UTILS.notifications.toast('Add merchant modal coming soon!', 'info');
    },
    
    showAdminConfig: function() {
        window.TLC_UTILS.notifications.toast('Admin configuration coming soon!', 'info');
    },
    
    filterProducts: function() {
        window.TLC_UTILS.notifications.toast('Product filtering coming soon!', 'info');
    },
    
    sortProducts: function() {
        window.TLC_UTILS.notifications.toast('Product sorting coming soon!', 'info');
    },
    
    searchProducts: function() {
        window.TLC_UTILS.notifications.toast('Product search coming soon!', 'info');
    }
};

// Initialize UI components
console.log('✅ TLC UI Components Module loaded successfully');

// Export for module system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.TLC_UI;
}
