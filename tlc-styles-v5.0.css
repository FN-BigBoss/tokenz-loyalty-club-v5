// TokenZ Loyalty Club v5.0 - Styles Module
console.log('🎨 Loading TLC Styles Module v5.0...');

window.TLC_STYLES = {
    version: '5.0',
    initialized: false,
    
    // Initialize styles module
    init: function() {
        if (this.initialized) return;
        
        console.log('🚀 Initializing TLC Styles...');
        this.injectStyles();
        this.initialized = true;
        console.log('✅ TLC Styles initialized');
    },
    
    // Inject all styles into the document
    injectStyles: function() {
        const styleElement = document.createElement('style');
        styleElement.id = 'tlc-styles';
        styleElement.textContent = this.getAllStyles();
        document.head.appendChild(styleElement);
    },
    
    // Get all combined styles
    getAllStyles: function() {
        return `
            ${this.baseStyles}
            ${this.componentStyles}
            ${this.animationStyles}
            ${this.responsiveStyles}
            ${this.utilityStyles}
        `;
    },
    
    // Base styles and resets
    baseStyles: `
        /* TLC Base Styles */
        * {
            box-sizing: border-box;
        }
        
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
        }
        
        /* Scrollbar Styling */
        ::-webkit-scrollbar {
            width: 8px;
        }
        
        ::-webkit-scrollbar-track {
            background: #f1f5f9;
        }
        
        ::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
        
        /* Focus styles */
        button:focus,
        input:focus,
        textarea:focus,
        select:focus {
            outline: 2px solid #3b82f6;
            outline-offset: 2px;
        }
        
        /* Selection styles */
        ::selection {
            background-color: #3b82f6;
            color: white;
        }
    `,
    
    // Component-specific styles
    componentStyles: `
        /* TLC Component Styles */
        
        /* Splash Screen */
        #splashScreen {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        #splashScreen .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        /* Login Screen */
        #loginScreen {
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            min-height: 100vh;
        }
        
        #loginScreen .max-w-md {
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            padding: 2rem;
        }
        
        /* Header */
        header {
            backdrop-filter: blur(10px);
            background-color: rgba(255, 255, 255, 0.95);
            border-bottom: 1px solid rgba(229, 231, 235, 0.8);
        }
        
        /* Hero Section */
        #heroSection {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
            overflow: hidden;
        }
        
        #heroSection::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            pointer-events: none;
        }
        
        /* Product Cards */
        .product-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            transition: all 0.3s ease;
            overflow: hidden;
        }
        
        .product-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .product-card img {
            transition: transform 0.3s ease;
        }
        
        .product-card:hover img {
            transform: scale(1.05);
        }
        
        /* Merchant Cards */
        .merchant-card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
            border: 1px solid #e5e7eb;
        }
        
        .merchant-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            border-color: #3b82f6;
        }
        
        /* Buttons */
        .btn-primary {
            background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
        }
        
        .btn-primary::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
            transition: left 0.5s;
        }
        
        .btn-primary:hover::before {
            left: 100%;
        }
        
        .btn-primary:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.4);
        }
        
        .btn-secondary {
            background: white;
            color: #3b82f6;
            border: 2px solid #3b82f6;
            border-radius: 8px;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-secondary:hover {
            background: #3b82f6;
            color: white;
            transform: translateY(-1px);
        }
        
        .btn-success {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-success:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.4);
        }
        
        .btn-danger {
            background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .btn-danger:hover {
            transform: translateY(-1px);
            box-shadow: 0 10px 15px -3px rgba(239, 68, 68, 0.4);
        }
        
        /* Form Elements */
        .form-input {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: white;
        }
        
        .form-input:focus {
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        
        .form-input:invalid {
            border-color: #ef4444;
        }
        
        .form-label {
            display: block;
            font-weight: 600;
            color: #374151;
            margin-bottom: 0.5rem;
        }
        
        /* Modals */
        .modal-overlay {
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(4px);
        }
        
        .modal-content {
            background: white;
            border-radius: 16px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            max-height: 90vh;
            overflow: hidden;
        }
        
        .modal-header {
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            border-bottom: 1px solid #e5e7eb;
        }
        
        /* Toast Notifications */
        .toast {
            background: white;
            border-radius: 8px;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            border-left: 4px solid #3b82f6;
            padding: 1rem;
            margin-bottom: 0.5rem;
            position: relative;
            overflow: hidden;
        }
        
        .toast.success {
            border-left-color: #10b981;
        }
        
        .toast.error {
            border-left-color: #ef4444;
        }
        
        .toast.warning {
            border-left-color: #f59e0b;
        }
        
        .toast::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 4px;
            background: linear-gradient(to bottom, transparent, rgba(59, 130, 246, 0.2), transparent);
            animation: toast-pulse 2s ease-in-out infinite;
        }
        
        /* Rating Stars */
        .rating-stars {
            color: #fbbf24;
            font-size: 1.125rem;
            letter-spacing: 0.1em;
        }
        
        /* Tags and Badges */
        .tag {
            display: inline-block;
            background: #e0e7ff;
            color: #3730a3;
            padding: 0.25rem 0.75rem;
            border-radius: 9999px;
            font-size: 0.875rem;
            font-weight: 500;
            margin: 0.125rem;
        }
        
        .badge {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        
        .badge.success {
            background: #d1fae5;
            color: #065f46;
        }
        
        .badge.warning {
            background: #fef3c7;
            color: #92400e;
        }
        
        .badge.info {
            background: #dbeafe;
            color: #1e40af;
        }
        
        /* Loading States */
        .loading {
            position: relative;
            overflow: hidden;
        }
        
        .loading::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            animation: loading-shimmer 1.5s infinite;
        }
        
        .spinner {
            width: 2rem;
            height: 2rem;
            border: 2px solid #e5e7eb;
            border-top: 2px solid #3b82f6;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        /* Mobile Menu */
        #mobileMenu {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-top: 1px solid rgba(229, 231, 235, 0.8);
        }
        
        /* Gradient Backgrounds */
        .gradient-blue {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .gradient-purple {
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
        }
        
        .gradient-green {
            background: linear-gradient(135deg, #d299c2 0%, #fef9d3 100%);
        }
        
        /* Image Overlays */
        .image-overlay {
            position: relative;
            overflow: hidden;
        }
        
        .image-overlay::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .image-overlay:hover::after {
            opacity: 1;
        }
    `,
    
    // Animation styles
    animationStyles: `
        /* TLC Animations */
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInDelay {
            0%, 50% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInFromLeft {
            from {
                opacity: 0;
                transform: translateX(-100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInFromRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideInFromTop {
            from {
                opacity: 0;
                transform: translateY(-100px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes slideInFromBottom {
            from {
                opacity: 0;
                transform: translateY(100px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                opacity: 1;
            }
            50% {
                opacity: 0.5;
            }
        }
        
        @keyframes spin {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
        
        @keyframes bounce {
            0%, 20%, 53%, 80%, 100% {
                transform: translate3d(0, 0, 0);
            }
            40%, 43% {
                transform: translate3d(0, -30px, 0);
            }
            70% {
                transform: translate3d(0, -15px, 0);
            }
            90% {
                transform: translate3d(0, -4px, 0);
            }
        }
        
        @keyframes shake {
            0%, 100% {
                transform: translateX(0);
            }
            10%, 30%, 50%, 70%, 90% {
                transform: translateX(-10px);
            }
            20%, 40%, 60%, 80% {
                transform: translateX(10px);
            }
        }
        
        @keyframes loading-shimmer {
            0% {
                left: -100%;
            }
            100% {
                left: 100%;
            }
        }
        
        @keyframes toast-pulse {
            0%, 100% {
                opacity: 0.5;
            }
            50% {
                opacity: 1;
            }
        }
        
        @keyframes scale-in {
            from {
                opacity: 0;
                transform: scale(0.9);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes scale-out {
            from {
                opacity: 1;
                transform: scale(1);
            }
            to {
                opacity: 0;
                transform: scale(0.9);
            }
        }
        
        /* Animation Classes */
        .animate-fade-in {
            animation: fadeIn 0.6s ease-out;
        }
        
        .animate-fade-in-delay {
            animation: fadeInDelay 1.2s ease-out;
        }
        
        .animate-slide-in-left {
            animation: slideInFromLeft 0.6s ease-out;
        }
        
        .animate-slide-in-right {
            animation: slideInFromRight 0.6s ease-out;
        }
        
        .animate-slide-in-top {
            animation: slideInFromTop 0.6s ease-out;
        }
        
        .animate-slide-in-bottom {
            animation: slideInFromBottom 0.6s ease-out;
        }
        
        .animate-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        .animate-spin {
            animation: spin 1s linear infinite;
        }
        
        .animate-bounce {
            animation: bounce 1s infinite;
        }
        
        .animate-shake {
            animation: shake 0.5s ease-in-out;
        }
        
        .animate-scale-in {
            animation: scale-in 0.3s ease-out;
        }
        
        .animate-scale-out {
            animation: scale-out 0.3s ease-out;
        }
        
        /* Hover Animations */
        .hover-lift {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .hover-lift:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        
        .hover-scale {
            transition: transform 0.3s ease;
        }
        
        .hover-scale:hover {
            transform: scale(1.05);
        }
        
        .hover-rotate {
            transition: transform 0.3s ease;
        }
        
        .hover-rotate:hover {
            transform: rotate(5deg);
        }
        
        /* Stagger Animations */
        .stagger-children > * {
            animation: fadeIn 0.6s ease-out;
        }
        
        .stagger-children > *:nth-child(1) { animation-delay: 0.1s; }
        .stagger-children > *:nth-child(2) { animation-delay: 0.2s; }
        .stagger-children > *:nth-child(3) { animation-delay: 0.3s; }
        .stagger-children > *:nth-child(4) { animation-delay: 0.4s; }
        .stagger-children > *:nth-child(5) { animation-delay: 0.5s; }
        .stagger-children > *:nth-child(6) { animation-delay: 0.6s; }
        .stagger-children > *:nth-child(7) { animation-delay: 0.7s; }
        .stagger-children > *:nth-child(8) { animation-delay: 0.8s; }
    `,
    
    // Responsive styles
    responsiveStyles: `
        /* TLC Responsive Styles */
        
        /* Mobile First Approach */
        
        /* Small devices (landscape phones, 576px and up) */
        @media (min-width: 576px) {
            .container {
                max-width: 540px;
            }
            
            .hero-title {
                font-size: 2.5rem;
            }
            
            .product-grid {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        /* Medium devices (tablets, 768px and up) */
        @media (min-width: 768px) {
            .container {
                max-width: 720px;
            }
            
            .hero-title {
                font-size: 3rem;
            }
            
            .product-grid {
                grid-template-columns: repeat(3, 1fr);
            }
            
            .modal-content {
                max-width: 80vw;
            }
            
            #mobileMenu {
                display: none;
            }
        }
        
        /* Large devices (desktops, 992px and up) */
        @media (min-width: 992px) {
            .container {
                max-width: 960px;
            }
            
            .hero-title {
                font-size: 3.5rem;
            }
            
            .product-grid {
                grid-template-columns: repeat(4, 1fr);
            }
            
            .modal-content {
                max-width: 70vw;
            }
        }
        
        /* Extra large devices (large desktops, 1200px and up) */
        @media (min-width: 1200px) {
            .container {
                max-width: 1140px;
            }
            
            .hero-title {
                font-size: 4rem;
            }
            
            .product-grid {
                grid-template-columns: repeat(5, 1fr);
            }
            
            .modal-content {
                max-width: 60vw;
            }
        }
        
        /* Extra extra large devices (1400px and up) */
        @media (min-width: 1400px) {
            .container {
                max-width: 1320px;
            }
            
            .product-grid {
                grid-template-columns: repeat(6, 1fr);
            }
        }
        
        /* Mobile Specific Styles */
        @media (max-width: 767px) {
            .mobile-hidden {
                display: none !important;
            }
            
            .mobile-full-width {
                width: 100% !important;
            }
            
            .mobile-text-center {
                text-align: center !important;
            }
            
            .mobile-padding {
                padding: 1rem !important;
            }
            
            .modal-content {
                margin: 1rem;
                max-height: calc(100vh - 2rem);
            }
            
            .hero-section {
                padding: 2rem 1rem !important;
            }
            
            .hero-title {
                font-size: 2rem !important;
            }
            
            .hero-subtitle {
                font-size: 1.125rem !important;
            }
            
            .product-card {
                margin-bottom: 1rem;
            }
            
            .btn-group {
                flex-direction: column;
                gap: 0.5rem;
            }
            
            .btn-group button {
                width: 100%;
            }
        }
        
        /* Tablet Specific Styles */
        @media (min-width: 768px) and (max-width: 1023px) {
            .tablet-hidden {
                display: none !important;
            }
            
            .tablet-grid-2 {
                grid-template-columns: repeat(2, 1fr) !important;
            }
            
            .tablet-grid-3 {
                grid-template-columns: repeat(3, 1fr) !important;
            }
        }
        
        /* Desktop Specific Styles */
        @media (min-width: 1024px) {
            .desktop-hidden {
                display: none !important;
            }
            
            .desktop-grid-4 {
                grid-template-columns: repeat(4, 1fr) !important;
            }
            
            .desktop-grid-5 {
                grid-template-columns: repeat(5, 1fr) !important;
            }
        }
        
        /* Print Styles */
        @media print {
            .no-print {
                display: none !important;
            }
            
            body {
                background: white !important;
                color: black !important;
            }
            
            .modal-overlay {
                display: none !important;
            }
            
            .product-card {
                break-inside: avoid;
                box-shadow: none !important;
                border: 1px solid #ccc !important;
            }
        }
        
        /* High DPI / Retina Displays */
        @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
            .high-dpi-image {
                image-rendering: -webkit-optimize-contrast;
                image-rendering: crisp-edges;
            }
        }
        
        /* Reduced Motion */
        @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
        
        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
            .dark-mode-auto {
                background-color: #1f2937;
                color: #f9fafb;
            }
            
            .dark-mode-auto .bg-white {
                background-color: #374151 !important;
            }
            
            .dark-mode-auto .text-gray-900 {
                color: #f9fafb !important;
            }
            
            .dark-mode-auto .border-gray-200 {
                border-color: #4b5563 !important;
            }
        }
    `,
    
    // Utility styles
    utilityStyles: `
        /* TLC Utility Styles */
        
        /* Display */
        .hidden { display: none !important; }
        .block { display: block !important; }
        .inline { display: inline !important; }
        .inline-block { display: inline-block !important; }
        .flex { display: flex !important; }
        .inline-flex { display: inline-flex !important; }
        .grid { display: grid !important; }
        
        /* Flexbox */
        .flex-row { flex-direction: row !important; }
        .flex-col { flex-direction: column !important; }
        .flex-wrap { flex-wrap: wrap !important; }
        .flex-nowrap { flex-wrap: nowrap !important; }
        .items-start { align-items: flex-start !important; }
        .items-center { align-items: center !important; }
        .items-end { align-items: flex-end !important; }
        .justify-start { justify-content: flex-start !important; }
        .justify-center { justify-content: center !important; }
        .justify-end { justify-content: flex-end !important; }
        .justify-between { justify-content: space-between !important; }
        .justify-around { justify-content: space-around !important; }
        .flex-1 { flex: 1 1 0% !important; }
        .flex-auto { flex: 1 1 auto !important; }
        .flex-none { flex: none !important; }
        
        /* Grid */
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
        .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)) !important; }
        .grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; }
        .grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)) !important; }
        .grid-cols-6 { grid-template-columns: repeat(6, minmax(0, 1fr)) !important; }
        .gap-1 { gap: 0.25rem !important; }
        .gap-2 { gap: 0.5rem !important; }
        .gap-3 { gap: 0.75rem !important; }
        .gap-4 { gap: 1rem !important; }
        .gap-6 { gap: 1.5rem !important; }
        .gap-8 { gap: 2rem !important; }
        
        /* Spacing */
        .m-0 { margin: 0 !important; }
        .m-1 { margin: 0.25rem !important; }
        .m-2 { margin: 0.5rem !important; }
        .m-3 { margin: 0.75rem !important; }
        .m-4 { margin: 1rem !important; }
        .m-6 { margin: 1.5rem !important; }
        .m-8 { margin: 2rem !important; }
        .mx-auto { margin-left: auto !important; margin-right: auto !important; }
        .mb-2 { margin-bottom: 0.5rem !important; }
        .mb-3 { margin-bottom: 0.75rem !important; }
        .mb-4 { margin-bottom: 1rem !important; }
        .mb-6 { margin-bottom: 1.5rem !important; }
        .mb-8 { margin-bottom: 2rem !important; }
        .mt-2 { margin-top: 0.5rem !important; }
        .mt-4 { margin-top: 1rem !important; }
        .mt-6 { margin-top: 1.5rem !important; }
        .mt-8 { margin-top: 2rem !important; }
        
        .p-0 { padding: 0 !important; }
        .p-1 { padding: 0.25rem !important; }
        .p-2 { padding: 0.5rem !important; }
        .p-3 { padding: 0.75rem !important; }
        .p-4 { padding: 1rem !important; }
        .p-6 { padding: 1.5rem !important; }
        .p-8 { padding: 2rem !important; }
        .px-2 { padding-left: 0.5rem !important; padding-right: 0.5rem !important; }
        .px-3 { padding-left: 0.75rem !important; padding-right: 0.75rem !important; }
        .px-4 { padding-left: 1rem !important; padding-right: 1rem !important; }
        .px-6 { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
        .py-2 { padding-top: 0.5rem !important; padding-bottom: 0.5rem !important; }
        .py-3 { padding-top: 0.75rem !important; padding-bottom: 0.75rem !important; }
        .py-4 { padding-top: 1rem !important; padding-bottom: 1rem !important; }
        .py-6 { padding-top: 1.5rem !important; padding-bottom: 1.5rem !important; }
        
        /* Typography */
        .text-xs { font-size: 0.75rem !important; line-height: 1rem !important; }
        .text-sm { font-size: 0.875rem !important; line-height: 1.25rem !important; }
        .text-base { font-size: 1rem !important; line-height: 1.5rem !important; }
        .text-lg { font-size: 1.125rem !important; line-height: 1.75rem !important; }
        .text-xl { font-size: 1.25rem !important; line-height: 1.75rem !important; }
        .text-2xl { font-size: 1.5rem !important; line-height: 2rem !important; }
        .text-3xl { font-size: 1.875rem !important; line-height: 2.25rem !important; }
        .text-4xl { font-size: 2.25rem !important; line-height: 2.5rem !important; }
        
        .font-normal { font-weight: 400 !important; }
        .font-medium { font-weight: 500 !important; }
        .font-semibold { font-weight: 600 !important; }
        .font-bold { font-weight: 700 !important; }
        
        .text-left { text-align: left !important; }
        .text-center { text-align: center !important; }
        .text-right { text-align: right !important; }
        
        /* Colors */
        .text-white { color: #ffffff !important; }
        .text-black { color: #000000 !important; }
        .text-gray-500 { color: #6b7280 !important; }
        .text-gray-600 { color: #4b5563 !important; }
        .text-gray-700 { color: #374151 !important; }
        .text-gray-900 { color: #111827 !important; }
        .text-blue-600 { color: #2563eb !important; }
        .text-blue-800 { color: #1e40af !important; }
        .text-green-600 { color: #16a34a !important; }
        .text-red-500 { color: #ef4444 !important; }
        .text-yellow-500 { color: #eab308 !important; }
        
        .bg-white { background-color: #ffffff !important; }
        .bg-gray-50 { background-color: #f9fafb !important; }
        .bg-gray-100 { background-color: #f3f4f6 !important; }
        .bg-gray-200 { background-color: #e5e7eb !important; }
        .bg-blue-50 { background-color: #eff6ff !important; }
        .bg-blue-100 { background-color: #dbeafe !important; }
        .bg-blue-600 { background-color: #2563eb !important; }
        .bg-blue-700 { background-color: #1d4ed8 !important; }
        .bg-green-600 { background-color: #16a34a !important; }
        .bg-red-500 { background-color: #ef4444 !important; }
        
        /* Borders */
        .border { border-width: 1px !important; }
        .border-2 { border-width: 2px !important; }
        .border-t { border-top-width: 1px !important; }
        .border-b { border-bottom-width: 1px !important; }
        .border-gray-200 { border-color: #e5e7eb !important; }
        .border-gray-300 { border-color: #d1d5db !important; }
        .border-blue-600 { border-color: #2563eb !important; }
        
        .rounded { border-radius: 0.25rem !important; }
        .rounded-md { border-radius: 0.375rem !important; }
        .rounded-lg { border-radius: 0.5rem !important; }
        .rounded-xl { border-radius: 0.75rem !important; }
        .rounded-full { border-radius: 9999px !important; }
        
        /* Shadows */
        .shadow { box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important; }
        .shadow-md { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important; }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important; }
        .shadow-xl { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important; }
        
        /* Positioning */
        .relative { position: relative !important; }
        .absolute { position: absolute !important; }
        .fixed { position: fixed !important; }
        .sticky { position: sticky !important; }
        .inset-0 { top: 0 !important; right: 0 !important; bottom: 0 !important; left: 0 !important; }
        .top-0 { top: 0 !important; }
        .right-0 { right: 0 !important; }
        .bottom-0 { bottom: 0 !important; }
        .left-0 { left: 0 !important; }
        
        /* Z-index */
        .z-10 { z-index: 10 !important; }
        .z-20 { z-index: 20 !important; }
        .z-30 { z-index: 30 !important; }
        .z-40 { z-index: 40 !important; }
        .z-50 { z-index: 50 !important; }
        
        /* Width & Height */
        .w-full { width: 100% !important; }
        .w-auto { width: auto !important; }
        .h-full { height: 100% !important; }
        .h-auto { height: auto !important; }
        .min-h-screen { min-height: 100vh !important; }
        .max-w-sm { max-width: 24rem !important; }
        .max-w-md { max-width: 28rem !important; }
        .max-w-lg { max-width: 32rem !important; }
        .max-w-xl { max-width: 36rem !important; }
        .max-w-2xl { max-width: 42rem !important; }
        .max-w-4xl { max-width: 56rem !important; }
        .max-w-6xl { max-width: 72rem !important; }
        .max-w-7xl { max-width: 80rem !important; }
        
        /* Overflow */
        .overflow-hidden { overflow: hidden !important; }
        .overflow-auto { overflow: auto !important; }
        .overflow-y-auto { overflow-y: auto !important; }
        
        /* Cursor */
        .cursor-pointer { cursor: pointer !important; }
        .cursor-not-allowed { cursor: not-allowed !important; }
        
        /* Transitions */
        .transition-all { transition: all 0.3s ease !important; }
        .transition-colors { transition: color 0.3s ease, background-color 0.3s ease !important; }
        .transition-transform { transition: transform 0.3s ease !important; }
        
        /* Hover Effects */
        .hover\\:bg-gray-50:hover { background-color: #f9fafb !important; }
        .hover\\:bg-gray-100:hover { background-color: #f3f4f6 !important; }
        .hover\\:bg-blue-700:hover { background-color: #1d4ed8 !important; }
        .hover\\:text-gray-900:hover { color: #111827 !important; }
        .hover\\:text-blue-800:hover { color: #1e40af !important; }
        .hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important; }
        .hover\\:underline:hover { text-decoration: underline !important; }
        .hover\\:opacity-90:hover { opacity: 0.9 !important; }
        
        /* Focus Effects */
        .focus\\:outline-none:focus { outline: none !important; }
        .focus\\:ring-2:focus { box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5) !important; }
        .focus\\:ring-blue-500:focus { box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5) !important; }
        .focus\\:border-blue-500:focus { border-color: #3b82f6 !important; }
    `
};

// Auto-initialize styles when module loads
window.TLC_STYLES.init();

console.log('✅ TLC Styles Module loaded successfully');

// Export for module system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.TLC_STYLES;
}
