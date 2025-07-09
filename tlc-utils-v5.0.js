// TokenZ Loyalty Club v5.0 - Utilities Module
console.log('🛠️ Loading TLC Utilities Module v5.0...');

window.TLC_UTILS = {
    version: '5.0',
    
    // Authentication utilities
    auth: {
        currentUser: null,
        
        // Login with sample credentials
        login: function(email, password) {
            const roles = window.TLC_CONFIG?.roles || {};
            
            // Check against sample credentials
            for (let roleKey in roles) {
                const role = roles[roleKey];
                if (role.sampleCredentials.email === email && role.sampleCredentials.password === password) {
                    // Find member data
                    const member = window.TLC_DATA?.members?.find(m => m.email === email);
                    if (member) {
                        this.currentUser = {
                            ...member,
                            role: roleKey,
                            permissions: role.permissions
                        };
                        localStorage.setItem('tlc_current_user', JSON.stringify(this.currentUser));
                        console.log('✅ User logged in:', this.currentUser.fullName);
                        return { success: true, user: this.currentUser };
                    }
                }
            }
            
            console.log('❌ Login failed for:', email);
            return { success: false, message: 'Invalid credentials' };
        },
        
        // Logout
        logout: function() {
            this.currentUser = null;
            localStorage.removeItem('tlc_current_user');
            console.log('✅ User logged out');
        },
        
        // Check if user is logged in
        isLoggedIn: function() {
            if (!this.currentUser) {
                const stored = localStorage.getItem('tlc_current_user');
                if (stored) {
                    this.currentUser = JSON.parse(stored);
                }
            }
            return !!this.currentUser;
        },
        
        // Check user permissions
        hasPermission: function(permission) {
            if (!this.currentUser) return false;
            if (this.currentUser.permissions.includes('all')) return true;
            return this.currentUser.permissions.includes(permission);
        },
        
        // Get current user
        getCurrentUser: function() {
            return this.currentUser;
        }
    },
    
    // Local storage utilities for user data
    storage: {
        // Subscriptions
        getSubscriptions: function(userId) {
            const key = `tlc_subscriptions_${userId}`;
            return JSON.parse(localStorage.getItem(key) || '[]');
        },
        
        setSubscriptions: function(userId, subscriptions) {
            const key = `tlc_subscriptions_${userId}`;
            localStorage.setItem(key, JSON.stringify(subscriptions));
        },
        
        addSubscription: function(userId, productId) {
            const subscriptions = this.getSubscriptions(userId);
            if (!subscriptions.includes(productId)) {
                subscriptions.push(productId);
                this.setSubscriptions(userId, subscriptions);
                console.log('✅ Added subscription:', productId);
                return true;
            }
            return false;
        },
        
        removeSubscription: function(userId, productId) {
            const subscriptions = this.getSubscriptions(userId);
            const index = subscriptions.indexOf(productId);
            if (index > -1) {
                subscriptions.splice(index, 1);
                this.setSubscriptions(userId, subscriptions);
                console.log('✅ Removed subscription:', productId);
                return true;
            }
            return false;
        },
        
        // Wishlist
        getWishlist: function(userId) {
            const key = `tlc_wishlist_${userId}`;
            return JSON.parse(localStorage.getItem(key) || '[]');
        },
        
        setWishlist: function(userId, wishlist) {
            const key = `tlc_wishlist_${userId}`;
            localStorage.setItem(key, JSON.stringify(wishlist));
        },
        
        addToWishlist: function(userId, productId) {
            const wishlist = this.getWishlist(userId);
            if (!wishlist.includes(productId)) {
                wishlist.push(productId);
                this.setWishlist(userId, wishlist);
                console.log('✅ Added to wishlist:', productId);
                return true;
            }
            return false;
        },
        
        removeFromWishlist: function(userId, productId) {
            const wishlist = this.getWishlist(userId);
            const index = wishlist.indexOf(productId);
            if (index > -1) {
                wishlist.splice(index, 1);
                this.setWishlist(userId, wishlist);
                console.log('✅ Removed from wishlist:', productId);
                return true;
            }
            return false;
        },
        
        // Followed merchants
        getFollowedMerchants: function(userId) {
            const key = `tlc_followed_${userId}`;
            return JSON.parse(localStorage.getItem(key) || '[]');
        },
        
        setFollowedMerchants: function(userId, followed) {
            const key = `tlc_followed_${userId}`;
            localStorage.setItem(key, JSON.stringify(followed));
        },
        
        followMerchant: function(userId, merchantId) {
            const followed = this.getFollowedMerchants(userId);
            if (!followed.includes(merchantId)) {
                followed.push(merchantId);
                this.setFollowedMerchants(userId, followed);
                console.log('✅ Following merchant:', merchantId);
                return true;
            }
            return false;
        },
        
        unfollowMerchant: function(userId, merchantId) {
            const followed = this.getFollowedMerchants(userId);
            const index = followed.indexOf(merchantId);
            if (index > -1) {
                followed.splice(index, 1);
                this.setFollowedMerchants(userId, followed);
                console.log('✅ Unfollowed merchant:', merchantId);
                return true;
            }
            return false;
        }
    },
    
    // Image utilities
    images: {
        // Convert Google Drive URLs
        convertGoogleDriveUrl: function(url) {
            if (!url || typeof url !== 'string') return '';
            
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
            
            return url;
        },
        
        // Get optimized image URL
        getOptimizedUrl: function(url, size = 'medium') {
            const baseUrl = this.convertGoogleDriveUrl(url);
            if (!baseUrl.includes('drive.google.com')) return baseUrl;
            
            const sizeParams = {
                small: 's400',
                medium: 's800',
                large: 's1200',
                original: 's0'
            };
            
            return baseUrl + `&sz=${sizeParams[size] || sizeParams.medium}`;
        },
        
        // Create image element with error handling
        createImageElement: function(url, alt = '', className = '') {
            const img = document.createElement('img');
            img.src = this.convertGoogleDriveUrl(url);
            img.alt = alt;
            img.className = className;
            
            // Add error handling
            img.onerror = function() {
                this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==';
                this.alt = 'Image not available';
            };
            
            return img;
        }
    },
    
    // Formatting utilities
    format: {
        // Currency formatting
        currency: function(amount, currency = 'USD') {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency
            }).format(amount);
        },
        
        // Date formatting
        date: function(date, options = {}) {
            const defaultOptions = {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            };
            return new Intl.DateTimeFormat('en-US', { ...defaultOptions, ...options }).format(new Date(date));
        },
        
        // Rating stars
        stars: function(rating, maxStars = 5) {
            const fullStars = Math.floor(rating);
            const hasHalfStar = rating % 1 >= 0.5;
            const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);
            
            return '★'.repeat(fullStars) + 
                   (hasHalfStar ? '☆' : '') + 
                   '☆'.repeat(emptyStars);
        },
        
        // Truncate text
        truncate: function(text, length = 100, suffix = '...') {
            if (text.length <= length) return text;
            return text.substring(0, length).trim() + suffix;
        },
        
        // Phone number formatting
        phone: function(phone) {
            const cleaned = phone.replace(/\D/g, '');
            if (cleaned.length === 10) {
                return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
            }
            return phone;
        }
    },
    
    // Validation utilities
    validate: {
        email: function(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        },
        
        phone: function(phone) {
            const cleaned = phone.replace(/\D/g, '');
            return cleaned.length >= 10;
        },
        
        required: function(value) {
            return value && value.toString().trim().length > 0;
        },
        
        minLength: function(value, min) {
            return value && value.toString().length >= min;
        },
        
        maxLength: function(value, max) {
            return !value || value.toString().length <= max;
        }
    },
    
    // DOM utilities
    dom: {
        // Create element with attributes
        createElement: function(tag, attributes = {}, content = '') {
            const element = document.createElement(tag);
            
            Object.keys(attributes).forEach(key => {
                if (key === 'className') {
                    element.className = attributes[key];
                } else if (key === 'innerHTML') {
                    element.innerHTML = attributes[key];
                } else {
                    element.setAttribute(key, attributes[key]);
                }
            });
            
            if (content) {
                element.textContent = content;
            }
            
            return element;
        },
        
        // Show/hide elements
        show: function(element) {
            if (typeof element === 'string') {
                element = document.getElementById(element);
            }
            if (element) {
                element.classList.remove('hidden');
                element.style.display = '';
            }
        },
        
        hide: function(element) {
            if (typeof element === 'string') {
                element = document.getElementById(element);
            }
            if (element) {
                element.classList.add('hidden');
            }
        },
        
        // Toggle element visibility
        toggle: function(element) {
            if (typeof element === 'string') {
                element = document.getElementById(element);
            }
            if (element) {
                element.classList.toggle('hidden');
            }
        },
        
        // Add event listener with cleanup
        addEvent: function(element, event, handler) {
            if (typeof element === 'string') {
                element = document.getElementById(element);
            }
            if (element) {
                element.addEventListener(event, handler);
                return () => element.removeEventListener(event, handler);
            }
        }
    },
    
    // URL utilities
    url: {
        // Get URL parameters
        getParams: function() {
            const params = {};
            const urlParams = new URLSearchParams(window.location.search);
            for (let [key, value] of urlParams) {
                params[key] = value;
            }
            return params;
        },
        
        // Set URL parameter
        setParam: function(key, value) {
            const url = new URL(window.location);
            url.searchParams.set(key, value);
            window.history.pushState({}, '', url);
        },
        
        // Remove URL parameter
        removeParam: function(key) {
            const url = new URL(window.location);
            url.searchParams.delete(key);
            window.history.pushState({}, '', url);
        }
    },
    
    // Notification utilities
    notifications: {
        // Show toast notification
        toast: function(message, type = 'info', duration = 3000) {
            const toast = document.createElement('div');
            toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transition-all duration-300 transform translate-x-full`;
            
            const colors = {
                success: 'bg-green-500 text-white',
                error: 'bg-red-500 text-white',
                warning: 'bg-yellow-500 text-black',
                info: 'bg-blue-500 text-white'
            };
            
            toast.className += ` ${colors[type] || colors.info}`;
            toast.innerHTML = `
                <div class="flex items-center justify-between">
                    <span>${message}</span>
                    <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-lg">&times;</button>
                </div>
            `;
            
            document.body.appendChild(toast);
            
            // Animate in
            setTimeout(() => {
                toast.classList.remove('translate-x-full');
            }, 100);
            
            // Auto remove
            setTimeout(() => {
                toast.classList.add('translate-x-full');
                setTimeout(() => toast.remove(), 300);
            }, duration);
        }
    },
    
    // Utility functions
    utils: {
        // Generate unique ID
        generateId: function(prefix = '') {
            return prefix + Date.now().toString(36) + Math.random().toString(36).substr(2);
        },
        
        // Debounce function
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
        
        // Deep clone object
        deepClone: function(obj) {
            return JSON.parse(JSON.stringify(obj));
        },
        
        // Shuffle array
        shuffle: function(array) {
            const shuffled = [...array];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        },
        
        // Sort array by property
        sortBy: function(array, property, direction = 'asc') {
            return [...array].sort((a, b) => {
                let aVal = a[property];
                let bVal = b[property];
                
                if (typeof aVal === 'string') {
                    aVal = aVal.toLowerCase();
                    bVal = bVal.toLowerCase();
                }
                
                if (direction === 'desc') {
                    return bVal > aVal ? 1 : -1;
                }
                return aVal > bVal ? 1 : -1;
            });
        }
    }
};

// Initialize utilities
console.log('✅ TLC Utilities Module loaded successfully');

// Auto-restore user session
if (window.TLC_UTILS.auth.isLoggedIn()) {
    console.log('🔐 User session restored:', window.TLC_UTILS.auth.getCurrentUser()?.fullName);
}

// Export for module system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.TLC_UTILS;
}
