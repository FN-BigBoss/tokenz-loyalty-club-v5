// TokenZ Loyalty Club - Utilities Module v5.0
// Essential utility functions and helpers for TLC application
// Upload this file to Google Drive and use the share URL in the module manager

console.log('🛠️ Loading TLC Utilities Module v5.0...');

// Global Utilities namespace
window.TLC_UTILS = {
    version: '5.0',
    loadedAt: new Date().toISOString(),
    
    // Initialization
    init: function() {
        console.log('🛠️ Initializing TLC Utilities v5.0...');
        
        // Setup global error handling
        this.setupErrorHandling();
        
        // Initialize performance monitoring
        this.initPerformanceMonitoring();
        
        console.log('✅ TLC Utilities v5.0 initialized successfully');
    },

    // ===== DATE & TIME UTILITIES =====
    date: {
        // Format date for display
        format: function(date, format = 'short') {
            if (!date) return 'N/A';
            
            const d = new Date(date);
            if (isNaN(d.getTime())) return 'Invalid Date';
            
            const options = {
                short: { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                },
                long: { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    weekday: 'long'
                },
                time: { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                },
                datetime: { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit', 
                    minute: '2-digit' 
                }
            };
            
            return d.toLocaleDateString('en-US', options[format] || options.short);
        },

        // Get relative time (e.g., "2 hours ago")
        relative: function(date) {
            if (!date) return 'Unknown';
            
            const now = new Date();
            const past = new Date(date);
            const diffMs = now - past;
            const diffSecs = Math.floor(diffMs / 1000);
            const diffMins = Math.floor(diffSecs / 60);
            const diffHours = Math.floor(diffMins / 60);
            const diffDays = Math.floor(diffHours / 24);
            
            if (diffSecs < 60) return 'Just now';
            if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
            if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
            if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
            if (diffDays < 30) return `${Math.floor(diffDays / 7)} week${Math.floor(diffDays / 7) !== 1 ? 's' : ''} ago`;
            if (diffDays < 365) return `${Math.floor(diffDays / 30)} month${Math.floor(diffDays / 30) !== 1 ? 's' : ''} ago`;
            return `${Math.floor(diffDays / 365)} year${Math.floor(diffDays / 365) !== 1 ? 's' : ''} ago`;
        },

        // Add days to date
        addDays: function(date, days) {
            const result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        },

        // Check if date is today
        isToday: function(date) {
            const today = new Date();
            const checkDate = new Date(date);
            return today.toDateString() === checkDate.toDateString();
        },

        // Get start of day
        startOfDay: function(date = new Date()) {
            const start = new Date(date);
            start.setHours(0, 0, 0, 0);
            return start;
        },

        // Get end of day
        endOfDay: function(date = new Date()) {
            const end = new Date(date);
            end.setHours(23, 59, 59, 999);
            return end;
        }
    },

    // ===== STRING UTILITIES =====
    string: {
        // Capitalize first letter
        capitalize: function(str) {
            if (!str) return '';
            return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        },

        // Convert to title case
        titleCase: function(str) {
            if (!str) return '';
            return str.replace(/\w\S*/g, (txt) => 
                txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            );
        },

        // Truncate string with ellipsis
        truncate: function(str, length = 100, suffix = '...') {
            if (!str || str.length <= length) return str || '';
            return str.substring(0, length).trim() + suffix;
        },

        // Generate slug from string
        slugify: function(str) {
            if (!str) return '';
            return str
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
        },

        // Extract initials
        initials: function(str) {
            if (!str) return '';
            return str
                .split(' ')
                .map(word => word.charAt(0).toUpperCase())
                .join('')
                .substring(0, 3);
        },

        // Clean and validate email
        cleanEmail: function(email) {
            if (!email) return '';
            return email.toLowerCase().trim();
        },

        // Mask sensitive data
        mask: function(str, visibleChars = 4, maskChar = '*') {
            if (!str || str.length <= visibleChars) return str;
            const visible = str.slice(-visibleChars);
            const masked = maskChar.repeat(str.length - visibleChars);
            return masked + visible;
        },

        // Generate random string
        random: function(length = 8, charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
            let result = '';
            for (let i = 0; i < length; i++) {
                result += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            return result;
        }
    },

    // ===== NUMBER UTILITIES =====
    number: {
        // Format currency
        currency: function(amount, currency = 'USD', locale = 'en-US') {
            if (amount === null || amount === undefined || isNaN(amount)) return '$0.00';
            
            try {
                return new Intl.NumberFormat(locale, {
                    style: 'currency',
                    currency: currency,
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                }).format(Number(amount));
            } catch (error) {
                return `$${Number(amount).toFixed(2)}`;
            }
        },

        // Format percentage
        percentage: function(value, decimals = 1) {
            if (value === null || value === undefined || isNaN(value)) return '0%';
            return `${Number(value).toFixed(decimals)}%`;
        },

        // Format large numbers (1K, 1M, etc.)
        compact: function(num) {
            if (num === null || num === undefined || isNaN(num)) return '0';
            
            const number = Number(num);
            if (number < 1000) return number.toString();
            if (number < 1000000) return (number / 1000).toFixed(1) + 'K';
            if (number < 1000000000) return (number / 1000000).toFixed(1) + 'M';
            return (number / 1000000000).toFixed(1) + 'B';
        },

        // Generate random number in range
        random: function(min = 0, max = 100) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },

        // Clamp number between min and max
        clamp: function(num, min, max) {
            return Math.min(Math.max(num, min), max);
        },

        // Round to specific decimal places
        round: function(num, decimals = 2) {
            return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
        }
    },

    // ===== ARRAY UTILITIES =====
    array: {
        // Shuffle array
        shuffle: function(arr) {
            const shuffled = [...arr];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            return shuffled;
        },

        // Get random item from array
        random: function(arr) {
            if (!arr || arr.length === 0) return null;
            return arr[Math.floor(Math.random() * arr.length)];
        },

        // Remove duplicates
        unique: function(arr, key = null) {
            if (!arr) return [];
            
            if (key) {
                const seen = new Set();
                return arr.filter(item => {
                    const value = item[key];
                    if (seen.has(value)) return false;
                    seen.add(value);
                    return true;
                });
            }
            
            return [...new Set(arr)];
        },

        // Group array by key
        groupBy: function(arr, key) {
            if (!arr) return {};
            
            return arr.reduce((groups, item) => {
                const group = item[key];
                groups[group] = groups[group] || [];
                groups[group].push(item);
                return groups;
            }, {});
        },

        // Sort array by multiple criteria
        sortBy: function(arr, ...criteria) {
            if (!arr) return [];
            
            return [...arr].sort((a, b) => {
                for (const criterion of criteria) {
                    let aVal, bVal, desc = false;
                    
                    if (typeof criterion === 'string') {
                        if (criterion.startsWith('-')) {
                            desc = true;
                            aVal = a[criterion.slice(1)];
                            bVal = b[criterion.slice(1)];
                        } else {
                            aVal = a[criterion];
                            bVal = b[criterion];
                        }
                    } else if (typeof criterion === 'function') {
                        aVal = criterion(a);
                        bVal = criterion(b);
                    }
                    
                    if (aVal < bVal) return desc ? 1 : -1;
                    if (aVal > bVal) return desc ? -1 : 1;
                }
                return 0;
            });
        },

        // Chunk array into smaller arrays
        chunk: function(arr, size) {
            if (!arr || size <= 0) return [];
            
            const chunks = [];
            for (let i = 0; i < arr.length; i += size) {
                chunks.push(arr.slice(i, i + size));
            }
            return chunks;
        }
    },

    // ===== OBJECT UTILITIES =====
    object: {
        // Deep clone object
        clone: function(obj) {
            if (obj === null || typeof obj !== 'object') return obj;
            if (obj instanceof Date) return new Date(obj.getTime());
            if (obj instanceof Array) return obj.map(item => this.clone(item));
            if (typeof obj === 'object') {
                const cloned = {};
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        cloned[key] = this.clone(obj[key]);
                    }
                }
                return cloned;
            }
        },

        // Deep merge objects
        merge: function(target, ...sources) {
            if (!target) return {};
            
            const result = this.clone(target);
            
            for (const source of sources) {
                if (!source) continue;
                
                for (const key in source) {
                    if (source.hasOwnProperty(key)) {
                        if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
                            result[key] = this.merge(result[key] || {}, source[key]);
                        } else {
                            result[key] = source[key];
                        }
                    }
                }
            }
            
            return result;
        },

        // Get nested property safely
        get: function(obj, path, defaultValue = undefined) {
            if (!obj || !path) return defaultValue;
            
            const keys = path.split('.');
            let current = obj;
            
            for (const key of keys) {
                if (current === null || current === undefined || !(key in current)) {
                    return defaultValue;
                }
                current = current[key];
            }
            
            return current;
        },

        // Set nested property
        set: function(obj, path, value) {
            if (!obj || !path) return obj;
            
            const keys = path.split('.');
            let current = obj;
            
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                if (!(key in current) || typeof current[key] !== 'object') {
                    current[key] = {};
                }
                current = current[key];
            }
            
            current[keys[keys.length - 1]] = value;
            return obj;
        },

        // Check if object is empty
        isEmpty: function(obj) {
            if (!obj) return true;
            return Object.keys(obj).length === 0;
        },

        // Pick specific keys from object
        pick: function(obj, keys) {
            if (!obj) return {};
            
            const result = {};
            for (const key of keys) {
                if (key in obj) {
                    result[key] = obj[key];
                }
            }
            return result;
        },

        // Omit specific keys from object
        omit: function(obj, keys) {
            if (!obj) return {};
            
            const result = { ...obj };
            for (const key of keys) {
                delete result[key];
            }
            return result;
        }
    },

    // ===== VALIDATION UTILITIES =====
    validate: {
        // Email validation
        email: function(email) {
            if (!email) return false;
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        },

        // Phone validation (basic)
        phone: function(phone) {
            if (!phone) return false;
            const cleaned = phone.replace(/\D/g, '');
            return cleaned.length >= 10 && cleaned.length <= 15;
        },

        // URL validation
        url: function(url) {
            if (!url) return false;
            try {
                new URL(url);
                return true;
            } catch {
                return false;
            }
        },

        // Password strength
        password: function(password) {
            if (!password) return { valid: false, score: 0, feedback: 'Password is required' };
            
            let score = 0;
            const feedback = [];
            
            if (password.length >= 8) score += 1;
            else feedback.push('At least 8 characters');
            
            if (/[a-z]/.test(password)) score += 1;
            else feedback.push('Include lowercase letters');
            
            if (/[A-Z]/.test(password)) score += 1;
            else feedback.push('Include uppercase letters');
            
            if (/\d/.test(password)) score += 1;
            else feedback.push('Include numbers');
            
            if (/[^a-zA-Z\d]/.test(password)) score += 1;
            else feedback.push('Include special characters');
            
            return {
                valid: score >= 4,
                score: score,
                strength: score <= 2 ? 'Weak' : score <= 3 ? 'Medium' : 'Strong',
                feedback: feedback
            };
        },

        // Required field
        required: function(value) {
            if (value === null || value === undefined) return false;
            if (typeof value === 'string') return value.trim().length > 0;
            if (Array.isArray(value)) return value.length > 0;
            return true;
        },

        // Minimum length
        minLength: function(value, min) {
            if (!value) return false;
            return value.toString().length >= min;
        },

        // Maximum length
        maxLength: function(value, max) {
            if (!value) return true;
            return value.toString().length <= max;
        }
    },

    // ===== STORAGE UTILITIES =====
    storage: {
        // Local storage with JSON support
        local: {
            set: function(key, value) {
                try {
                    localStorage.setItem(key, JSON.stringify(value));
                    return true;
                } catch (error) {
                    console.error('Failed to save to localStorage:', error);
                    return false;
                }
            },

            get: function(key, defaultValue = null) {
                try {
                    const item = localStorage.getItem(key);
                    return item ? JSON.parse(item) : defaultValue;
                } catch (error) {
                    console.error('Failed to read from localStorage:', error);
                    return defaultValue;
                }
            },

            remove: function(key) {
                try {
                    localStorage.removeItem(key);
                    return true;
                } catch (error) {
                    console.error('Failed to remove from localStorage:', error);
                    return false;
                }
            },

            clear: function() {
                try {
                    localStorage.clear();
                    return true;
                } catch (error) {
                    console.error('Failed to clear localStorage:', error);
                    return false;
                }
            }
        },

        // Session storage with JSON support
        session: {
            set: function(key, value) {
                try {
                    sessionStorage.setItem(key, JSON.stringify(value));
                    return true;
                } catch (error) {
                    console.error('Failed to save to sessionStorage:', error);
                    return false;
                }
            },

            get: function(key, defaultValue = null) {
                try {
                    const item = sessionStorage.getItem(key);
                    return item ? JSON.parse(item) : defaultValue;
                } catch (error) {
                    console.error('Failed to read from sessionStorage:', error);
                    return defaultValue;
                }
            },

            remove: function(key) {
                try {
                    sessionStorage.removeItem(key);
                    return true;
                } catch (error) {
                    console.error('Failed to remove from sessionStorage:', error);
                    return false;
                }
            },

            clear: function() {
                try {
                    sessionStorage.clear();
                    return true;
                } catch (error) {
                    console.error('Failed to clear sessionStorage:', error);
                    return false;
                }
            }
        }
    },

    // ===== DOM UTILITIES =====
    dom: {
        // Wait for element to exist
        waitForElement: function(selector, timeout = 5000) {
            return new Promise((resolve, reject) => {
                const element = document.querySelector(selector);
                if (element) {
                    resolve(element);
                    return;
                }

                const observer = new MutationObserver(() => {
                    const element = document.querySelector(selector);
                    if (element) {
                        observer.disconnect();
                        resolve(element);
                    }
                });

                observer.observe(document.body, {
                    childList: true,
                    subtree: true
                });

                setTimeout(() => {
                    observer.disconnect();
                    reject(new Error(`Element ${selector} not found within ${timeout}ms`));
                }, timeout);
            });
        },

        // Check if element is visible
        isVisible: function(element) {
            if (!element) return false;
            const rect = element.getBoundingClientRect();
            return rect.width > 0 && rect.height > 0;
        },

        // Smooth scroll to element
        scrollTo: function(element, offset = 0) {
            if (!element) return;
            
            const elementPosition = element.offsetTop - offset;
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        },

        // Copy text to clipboard
        copyToClipboard: function(text) {
            return new Promise((resolve, reject) => {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(text)
                        .then(resolve)
                        .catch(reject);
                } else {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = text;
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                        resolve();
                    } catch (error) {
                        document.body.removeChild(textArea);
                        reject(error);
                    }
                }
            });
        }
    },

    // ===== PERFORMANCE UTILITIES =====
    performance: {
        // Debounce function
        debounce: function(func, wait, immediate = false) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    timeout = null;
                    if (!immediate) func(...args);
                };
                const callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func(...args);
            };
        },

        // Throttle function
        throttle: function(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Measure execution time
        measure: function(name, func) {
            const start = performance.now();
            const result = func();
            const end = performance.now();
            console.log(`⏱️ ${name} took ${(end - start).toFixed(2)}ms`);
            return result;
        },

        // Simple cache implementation
        cache: function(func, ttl = 300000) { // 5 minutes default
            const cache = new Map();
            
            return function(...args) {
                const key = JSON.stringify(args);
                const cached = cache.get(key);
                
                if (cached && Date.now() - cached.timestamp < ttl) {
                    return cached.value;
                }
                
                const result = func.apply(this, args);
                cache.set(key, {
                    value: result,
                    timestamp: Date.now()
                });
                
                return result;
            };
        }
    },

    // ===== ERROR HANDLING =====
    setupErrorHandling: function() {
        // Global error handler
        window.addEventListener('error', (event) => {
            console.error('🚨 Global Error:', {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                error: event.error
            });
        });

        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            console.error('🚨 Unhandled Promise Rejection:', event.reason);
        });
    },

    // ===== PERFORMANCE MONITORING =====
    initPerformanceMonitoring: function() {
        // Monitor page load performance
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('📊 Page Performance:', {
                        loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
                        domReady: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
                        firstByte: Math.round(perfData.responseStart - perfData.fetchStart)
                    });
                }
            }, 0);
        });
    },

    // ===== UTILITY HELPERS =====
    // Generate UUID
    uuid: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },

    // Sleep/delay function
    sleep: function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    // Check if running on mobile
    isMobile: function() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    // Get browser info
    getBrowser: function() {
        const ua = navigator.userAgent;
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        return 'Unknown';
    },

    // Format file size
    formatFileSize: function(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }
};

// Expose commonly used utilities globally for convenience
window.formatCurrency = window.TLC_UTILS.number.currency;
window.formatDate = window.TLC_UTILS.date.format;
window.validateEmail = window.TLC_UTILS.validate.email;
window.debounce = window.TLC_UTILS.performance.debounce;
window.throttle = window.TLC_UTILS.performance.throttle;

// Auto-initialize when loaded
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            // Utils will be initialized by module manager
        });
    }
}

// Export for module system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.TLC_UTILS;
}

console.log('✅ TLC Utilities Module v5.0 loaded successfully');

// End of TLC Utilities Module v5.0