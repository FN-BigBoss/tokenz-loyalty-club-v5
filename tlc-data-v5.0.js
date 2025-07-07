// TokenZ Loyalty Club - Data Module v5.0
// Complete sample data for TLC application
// Upload this file to Google Drive and use the share URL in the module manager

console.log('📊 Loading TLC Data Module v5.0...');

// Global data namespace
window.TLC_DATA = {
    version: '5.0',
    loadedAt: new Date().toISOString(),
    
    // Sample Products Database
    sampleProducts: [
        {
            id: 1,
            name: "Netflix Premium",
            sku: "NFLX-PREM-001",
            merchant: "Netflix Inc.",
            merchantId: 1,
            price: 15.99,
            currency: "USD",
            billingCycle: "monthly",
            shortDescription: "Stream unlimited movies and TV shows in 4K Ultra HD",
            longDescription: "Netflix Premium offers the ultimate streaming experience with 4K Ultra HD resolution, HDR support, and the ability to watch on up to 4 screens simultaneously. Enjoy Netflix original series, blockbuster movies, documentaries, and kids' content without ads. Download content for offline viewing and get access to Netflix's exclusive premium features.",
            rating: 4.5,
            reviewCount: 2847,
            category: "streaming",
            tags: ["entertainment", "movies", "tv-shows", "4k", "hdr"],
            image: "https://via.placeholder.com/400x250/E50914/FFFFFF?text=Netflix+Premium",
            features: [
                "4K Ultra HD streaming",
                "HDR and Dolby Vision support",
                "Watch on 4 screens at once",
                "Unlimited downloads",
                "No ads",
                "Netflix Originals"
            ],
            isActive: true,
            createdAt: "2024-01-15T10:00:00Z",
            updatedAt: "2024-01-20T15:30:00Z"
        },
        {
            id: 2,
            name: "Spotify Premium",
            sku: "SPOT-PREM-001",
            merchant: "Spotify AB",
            merchantId: 2,
            price: 9.99,
            currency: "USD",
            billingCycle: "monthly",
            shortDescription: "Ad-free music streaming with offline downloads",
            longDescription: "Spotify Premium gives you access to over 100 million songs and 5 million podcasts without ads. Download music for offline listening, get unlimited skips, and enjoy high-quality audio streaming. Create and share playlists, discover new music with personalized recommendations, and connect with friends through Spotify's social features.",
            rating: 4.3,
            reviewCount: 5621,
            category: "streaming",
            tags: ["music", "podcasts", "audio", "offline", "playlists"],
            image: "https://via.placeholder.com/400x250/1DB954/FFFFFF?text=Spotify+Premium",
            features: [
                "100M+ songs ad-free",
                "Offline downloads",
                "Unlimited skips",
                "High-quality audio",
                "Personalized playlists",
                "Podcast access"
            ],
            isActive: true,
            createdAt: "2024-01-10T08:00:00Z",
            updatedAt: "2024-01-18T12:45:00Z"
        },
        {
            id: 3,
            name: "Adobe Creative Cloud",
            sku: "ADBE-CC-001",
            merchant: "Adobe Systems",
            merchantId: 3,
            price: 52.99,
            currency: "USD",
            billingCycle: "monthly",
            shortDescription: "Complete creative suite for professionals and enthusiasts",
            longDescription: "Adobe Creative Cloud includes 20+ industry-leading creative apps including Photoshop, Illustrator, InDesign, Premiere Pro, After Effects, Lightroom, and more. Get access to the latest features, cloud storage, premium fonts, and collaboration tools. Perfect for graphic designers, photographers, video editors, and creative professionals.",
            rating: 4.7,
            reviewCount: 1923,
            category: "software",
            tags: ["design", "photography", "video-editing", "creative", "professional"],
            image: "https://via.placeholder.com/400x250/FF0000/FFFFFF?text=Adobe+Creative+Cloud",
            features: [
                "20+ creative applications",
                "100GB cloud storage",
                "Premium fonts library",
                "Collaboration tools",
                "Mobile apps included",
                "Regular updates"
            ],
            isActive: true,
            createdAt: "2024-01-05T14:00:00Z",
            updatedAt: "2024-01-22T09:15:00Z"
        },
        {
            id: 4,
            name: "Peloton Digital",
            sku: "PELO-DIG-001",
            merchant: "Peloton Interactive",
            merchantId: 4,
            price: 12.99,
            currency: "USD",
            billingCycle: "monthly",
            shortDescription: "Home fitness classes and personalized workouts",
            longDescription: "Access thousands of live and on-demand fitness classes including cycling, running, strength training, yoga, meditation, and stretching. Work out with world-class instructors from the comfort of your home. Track your progress, compete with friends, and join a global fitness community.",
            rating: 4.4,
            reviewCount: 3456,
            category: "fitness",
            tags: ["fitness", "workout", "health", "yoga", "meditation", "cycling"],
            image: "https://via.placeholder.com/400x250/000000/FFFFFF?text=Peloton+Digital",
            features: [
                "Live & on-demand classes",
                "Multiple workout types",
                "Progress tracking",
                "Community features",
                "Mobile & TV apps",
                "New classes daily"
            ],
            isActive: true,
            createdAt: "2024-01-12T11:30:00Z",
            updatedAt: "2024-01-19T16:20:00Z"
        },
        {
            id: 5,
            name: "MasterClass",
            sku: "MSTR-CLS-001",
            merchant: "MasterClass Inc.",
            merchantId: 5,
            price: 15.00,
            currency: "USD",
            billingCycle: "monthly",
            shortDescription: "Learn from the world's best experts and celebrities",
            longDescription: "MasterClass offers online classes taught by world-renowned experts in their fields. Learn cooking from Gordon Ramsay, writing from Margaret Atwood, business from Sara Blakely, and much more. Each class includes video lessons, workbooks, and community access.",
            rating: 4.6,
            reviewCount: 2134,
            category: "education",
            tags: ["learning", "education", "skills", "experts", "celebrities"],
            image: "https://via.placeholder.com/400x250/000000/FFFFFF?text=MasterClass",
            features: [
                "Celebrity instructors",
                "High-quality video lessons",
                "Downloadable workbooks",
                "Community discussions",
                "Mobile & TV access",
                "New classes monthly"
            ],
            isActive: true,
            createdAt: "2024-01-08T13:45:00Z",
            updatedAt: "2024-01-21T10:30:00Z"
        },
        {
            id: 6,
            name: "Notion Pro",
            sku: "NOTN-PRO-001",
            merchant: "Notion Labs",
            merchantId: 6,
            price: 8.00,
            currency: "USD",
            billingCycle: "monthly",
            shortDescription: "All-in-one workspace for productivity and collaboration",
            longDescription: "Notion Pro combines notes, tasks, wikis, and databases into one powerful workspace. Create custom workflows, collaborate with teams, and organize your entire life or business. Features unlimited blocks, file uploads, version history, and advanced permissions.",
            rating: 4.5,
            reviewCount: 1876,
            category: "productivity",
            tags: ["productivity", "notes", "collaboration", "organization", "workspace"],
            image: "https://via.placeholder.com/400x250/000000/FFFFFF?text=Notion+Pro",
            features: [
                "Unlimited blocks & pages",
                "File uploads & storage",
                "Version history",
                "Team collaboration",
                "Custom templates",
                "API integrations"
            ],
            isActive: true,
            createdAt: "2024-01-03T09:00:00Z",
            updatedAt: "2024-01-17T14:15:00Z"
        },
        {
            id: 7,
            name: "Disney+ Premium",
            sku: "DIS-PREM-001",
            merchant: "Disney Entertainment",
            merchantId: 7,
            price: 13.99,
            currency: "USD",
            billingCycle: "monthly",
            shortDescription: "Disney, Pixar, Marvel, Star Wars, and National Geographic content",
            longDescription: "Stream exclusive Disney+ Originals, classic Disney movies, Pixar animations, Marvel superhero content, Star Wars saga, and National Geographic documentaries. Enjoy 4K streaming, multiple user profiles, and downloads for offline viewing.",
            rating: 4.4,
            reviewCount: 4321,
            category: "streaming",
            tags: ["disney", "marvel", "star-wars", "pixar", "family", "entertainment"],
            image: "https://via.placeholder.com/400x250/113CCF/FFFFFF?text=Disney%2B",
            features: [
                "Disney+ Originals",
                "4K & HDR streaming",
                "Up to 7 profiles",
                "Offline downloads",
                "Parental controls",
                "No ads on movies"
            ],
            isActive: true,
            createdAt: "2024-01-14T16:00:00Z",
            updatedAt: "2024-01-23T11:45:00Z"
        },
        {
            id: 8,
            name: "Canva Pro",
            sku: "CANV-PRO-001",
            merchant: "Canva Pty Ltd",
            merchantId: 8,
            price: 14.99,
            currency: "USD",
            billingCycle: "monthly",
            shortDescription: "Professional design tools and premium content",
            longDescription: "Canva Pro provides access to premium templates, stock photos, videos, audio tracks, and advanced design features. Create professional designs with brand kits, background remover, resize magic, and team collaboration tools.",
            rating: 4.6,
            reviewCount: 2987,
            category: "software",
            tags: ["design", "graphics", "templates", "branding", "marketing"],
            image: "https://via.placeholder.com/400x250/00C4CC/FFFFFF?text=Canva+Pro",
            features: [
                "Premium templates",
                "100M+ stock media",
                "Brand kit tools",
                "Background remover",
                "Magic resize",
                "Team collaboration"
            ],
            isActive: true,
            createdAt: "2024-01-11T12:30:00Z",
            updatedAt: "2024-01-20T08:20:00Z"
        }
    ],

    // Sample Merchants Database
    sampleMerchants: [
        {
            id: 1,
            name: "Netflix Inc.",
            slug: "netflix",
            description: "The world's leading streaming entertainment service with over 230 million paid memberships in more than 190 countries enjoying TV series, documentaries and feature films across a wide variety of genres and languages.",
            longDescription: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies and documentaries on thousands of internet-connected devices. You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price.",
            website: "https://netflix.com",
            logo: "https://via.placeholder.com/120x120/E50914/FFFFFF?text=N",
            coverImage: "https://via.placeholder.com/800x300/E50914/FFFFFF?text=Netflix+Cover",
            email: "business@netflix.com",
            phone: "+1-866-579-7172",
            address: "100 Winchester Circle, Los Gatos, CA 95032, USA",
            followers: 15420,
            totalProducts: 3,
            averageRating: 4.5,
            founded: "1997",
            employees: "11,000+",
            headquarters: "Los Gatos, California",
            categories: ["streaming", "entertainment"],
            socialMedia: {
                twitter: "@netflix",
                facebook: "netflix",
                instagram: "netflix",
                linkedin: "netflix"
            },
            isVerified: true,
            isActive: true,
            joinedAt: "2023-01-15T10:00:00Z",
            lastActive: "2024-01-23T14:30:00Z"
        },
        {
            id: 2,
            name: "Spotify AB",
            slug: "spotify",
            description: "A digital music service that gives you access to millions of songs, podcasts and videos from artists all over the world, like Pandora or Apple Music.",
            longDescription: "Spotify is a digital music, podcast, and video service that gives you access to millions of songs and other content from creators all over the world. Basic functions such as playing music are totally free, but you can also choose to upgrade to Spotify Premium.",
            website: "https://spotify.com",
            logo: "https://via.placeholder.com/120x120/1DB954/FFFFFF?text=S",
            coverImage: "https://via.placeholder.com/800x300/1DB954/FFFFFF?text=Spotify+Cover",
            email: "partners@spotify.com",
            phone: "+46-8-120-140-00",
            address: "Regeringsgatan 19, 111 53 Stockholm, Sweden",
            followers: 12350,
            totalProducts: 2,
            averageRating: 4.3,
            founded: "2006",
            employees: "9,000+",
            headquarters: "Stockholm, Sweden",
            categories: ["streaming", "music", "podcasts"],
            socialMedia: {
                twitter: "@spotify",
                facebook: "spotify",
                instagram: "spotify",
                linkedin: "spotify"
            },
            isVerified: true,
            isActive: true,
            joinedAt: "2023-02-10T08:00:00Z",
            lastActive: "2024-01-22T16:15:00Z"
        },
        {
            id: 3,
            name: "Adobe Systems",
            slug: "adobe",
            description: "Leading provider of creative, marketing and document management solutions that empower everyone — from emerging artists to global brands.",
            longDescription: "Adobe is changing the world through digital experiences. We help our customers create, deliver and optimize content and applications. Our creative, marketing and document solutions empower everyone — from emerging artists to global brands — to bring digital creations to life and deliver them to the right person at the right moment for the best results.",
            website: "https://adobe.com",
            logo: "https://via.placeholder.com/120x120/FF0000/FFFFFF?text=A",
            coverImage: "https://via.placeholder.com/800x300/FF0000/FFFFFF?text=Adobe+Cover",
            email: "business@adobe.com",
            phone: "+1-408-536-6000",
            address: "345 Park Avenue, San Jose, CA 95110, USA",
            followers: 8920,
            totalProducts: 5,
            averageRating: 4.7,
            founded: "1982",
            employees: "26,000+",
            headquarters: "San Jose, California",
            categories: ["software", "creative", "design"],
            socialMedia: {
                twitter: "@adobe",
                facebook: "adobe",
                instagram: "adobe",
                linkedin: "adobe"
            },
            isVerified: true,
            isActive: true,
            joinedAt: "2023-01-05T14:00:00Z",
            lastActive: "2024-01-23T09:45:00Z"
        },
        {
            id: 4,
            name: "Peloton Interactive",
            slug: "peloton",
            description: "Connected fitness company that creates immersive, instructor-led boutique fitness experiences in the home through live and on-demand classes.",
            longDescription: "Peloton is the leading interactive fitness platform in the world with a loyal community of more than 6.6 million Members. The company pioneered connected, technology-enabled fitness, and the streaming of immersive, instructor-led boutique classes for its Members anytime, anywhere.",
            website: "https://onepeloton.com",
            logo: "https://via.placeholder.com/120x120/000000/FFFFFF?text=P",
            coverImage: "https://via.placeholder.com/800x300/000000/FFFFFF?text=Peloton+Cover",
            email: "corporate@onepeloton.com",
            phone: "+1-844-737-3566",
            address: "125 West 25th Street, New York, NY 10001, USA",
            followers: 6780,
            totalProducts: 2,
            averageRating: 4.4,
            founded: "2012",
            employees: "2,800+",
            headquarters: "New York, New York",
            categories: ["fitness", "health", "wellness"],
            socialMedia: {
                twitter: "@onepeloton",
                facebook: "onepeloton",
                instagram: "onepeloton",
                linkedin: "peloton-interactive"
            },
            isVerified: true,
            isActive: true,
            joinedAt: "2023-03-12T11:30:00Z",
            lastActive: "2024-01-21T13:20:00Z"
        },
        {
            id: 5,
            name: "MasterClass Inc.",
            slug: "masterclass",
            description: "Online education platform where students can access tutorials and lectures pre-recorded by experts in their respective fields.",
            longDescription: "MasterClass is an American online education subscription platform on which students can access tutorials and lectures pre-recorded by experts in their respective fields. The concept for MasterClass was conceived by David Rogier and Aaron Rasmussen in 2008.",
            website: "https://masterclass.com",
            logo: "https://via.placeholder.com/120x120/000000/FFFFFF?text=M",
            coverImage: "https://via.placeholder.com/800x300/000000/FFFFFF?text=MasterClass+Cover",
            email: "partnerships@masterclass.com",
            phone: "+1-855-981-8208",
            address: "1455 Market Street, San Francisco, CA 94103, USA",
            followers: 5640,
            totalProducts: 1,
            averageRating: 4.6,
            founded: "2015",
            employees: "800+",
            headquarters: "San Francisco, California",
            categories: ["education", "learning", "skills"],
            socialMedia: {
                twitter: "@masterclass",
                facebook: "masterclass",
                instagram: "masterclass",
                linkedin: "masterclass"
            },
            isVerified: true,
            isActive: true,
            joinedAt: "2023-04-08T13:45:00Z",
            lastActive: "2024-01-20T10:30:00Z"
        },
        {
            id: 6,
            name: "Notion Labs",
            slug: "notion",
            description: "Productivity and note-taking web application that offers organizational tools including task management, project tracking, to-do lists, and bookmarking.",
            longDescription: "Notion is a productivity and note-taking web application developed by Notion Labs Inc. It offers organizational tools including task management, project tracking, to-do lists, bookmarking, and more. Users can create custom templates, databases, and workflows to organize their personal and professional lives.",
            website: "https://notion.so",
            logo: "https://via.placeholder.com/120x120/000000/FFFFFF?text=N",
            coverImage: "https://via.placeholder.com/800x300/000000/FFFFFF?text=Notion+Cover",
            email: "partnerships@notion.so",
            phone: "+1-415-294-1111",
            address: "2300 Harrison Street, San Francisco, CA 94110, USA",
            followers: 4320,
            totalProducts: 1,
            averageRating: 4.5,
            founded: "2016",
            employees: "400+",
            headquarters: "San Francisco, California",
            categories: ["productivity", "collaboration", "organization"],
            socialMedia: {
                twitter: "@notionhq",
                facebook: "notionhq",
                instagram: "notionhq",
                linkedin: "notion-so"
            },
            isVerified: true,
            isActive: true,
            joinedAt: "2023-05-03T09:00:00Z",
            lastActive: "2024-01-19T15:45:00Z"
        },
        {
            id: 7,
            name: "Disney Entertainment",
            slug: "disney",
            description: "Global entertainment conglomerate known for its film studios, theme parks, and streaming services including Disney+.",
            longDescription: "The Walt Disney Company is a diversified worldwide entertainment company with operations in four business segments: Media Networks, Parks and Resorts, Studio Entertainment, and Consumer Products & Interactive Media. Disney+ is the company's streaming service featuring Disney, Pixar, Marvel, Star Wars, and National Geographic content.",
            website: "https://disneyplus.com",
            logo: "https://via.placeholder.com/120x120/113CCF/FFFFFF?text=D",
            coverImage: "https://via.placeholder.com/800x300/113CCF/FFFFFF?text=Disney+Cover",
            email: "corporate@disney.com",
            phone: "+1-818-560-1000",
            address: "500 South Buena Vista Street, Burbank, CA 91521, USA",
            followers: 18750,
            totalProducts: 2,
            averageRating: 4.4,
            founded: "1923",
            employees: "190,000+",
            headquarters: "Burbank, California",
            categories: ["streaming", "entertainment", "family"],
            socialMedia: {
                twitter: "@disneyplus",
                facebook: "disneyplus",
                instagram: "disneyplus",
                linkedin: "the-walt-disney-company"
            },
            isVerified: true,
            isActive: true,
            joinedAt: "2023-06-14T16:00:00Z",
            lastActive: "2024-01-23T12:10:00Z"
        },
        {
            id: 8,
            name: "Canva Pty Ltd",
            slug: "canva",
            description: "Online design and publishing platform that allows users to create social media graphics, presentations, posters, documents and other visual content.",
            longDescription: "Canva is an Australian graphic design platform, used to create social media graphics, presentations, posters, documents and other visual content. The app includes templates for users to use. The platform is free to use and offers paid subscriptions like Canva Pro and Canva for Enterprise for additional functionality.",
            website: "https://canva.com",
            logo: "https://via.placeholder.com/120x120/00C4CC/FFFFFF?text=C",
            coverImage: "https://via.placeholder.com/800x300/00C4CC/FFFFFF?text=Canva+Cover",
            email: "partnerships@canva.com",
            phone: "+61-2-8188-8405",
            address: "110 Kippax Street, Surry Hills NSW 2010, Australia",
            followers: 9876,
            totalProducts: 1,
            averageRating: 4.6,
            founded: "2013",
            employees: "4,000+",
            headquarters: "Sydney, Australia",
            categories: ["software", "design", "graphics"],
            socialMedia: {
                twitter: "@canva",
                facebook: "canva",
                instagram: "canva",
                linkedin: "canva"
            },
            isVerified: true,
            isActive: true,
            joinedAt: "2023-07-11T12:30:00Z",
            lastActive: "2024-01-22T14:25:00Z"
        }
    ],

    // Sample User Database
    sampleUsers: {
        'user@tlc.com': {
            email: 'user@tlc.com',
            password: 'user123',
            role: 'standard',
            memberId: 'TLC-001234',
            fullName: 'John Smith',
            firstName: 'John',
            lastName: 'Smith',
            telephone: '+1-555-0123',
            avatar: 'https://via.placeholder.com/100x100/667eea/FFFFFF?text=JS',
            dateOfBirth: '1990-05-15',
            address: {
                street: '123 Main Street',
                city: 'San Francisco',
                state: 'CA',
                zipCode: '94102',
                country: 'USA'
            },
            preferences: {
                notifications: true,
                newsletter: true,
                darkMode: false,
                language: 'en'
            },
            joinedAt: '2023-06-15T10:30:00Z',
            lastLoginAt: '2024-01-23T09:15:00Z',
            isActive: true,
            isVerified: true
        },
        'merchant@tlc.com': {
            email: 'merchant@tlc.com',
            password: 'merchant123',
            role: 'merchant',
            memberId: 'TLC-M-5678',
            fullName: 'Sarah Johnson',
            firstName: 'Sarah',
            lastName: 'Johnson',
            telephone: '+1-555-0456',
            avatar: 'https://via.placeholder.com/100x100/10b981/FFFFFF?text=SJ',
            dateOfBirth: '1985-08-22',
            merchantId: 1,
            companyName: 'Netflix Inc.',
            position: 'Partnership Manager',
            address: {
                street: '100 Winchester Circle',
                city: 'Los Gatos',
                state: 'CA',
                zipCode: '95032',
                country: 'USA'
            },
            preferences: {
                notifications: true,
                newsletter: true,
                darkMode: false,
                language: 'en'
            },
            joinedAt: '2023-01-20T14:45:00Z',
            lastLoginAt: '2024-01-22T16:30:00Z',
            isActive: true,
            isVerified: true
        },
        'admin@tlc.com': {
            email: 'admin@tlc.com',
            password: 'admin123',
            role: 'admin',
            memberId: 'TLC-A-9999',
            fullName: 'Admin User',
            firstName: 'Admin',
            lastName: 'User',
            telephone: '+1-555-0789',
            avatar: 'https://via.placeholder.com/100x100/ef4444/FFFFFF?text=AU',
            dateOfBirth: '1980-12-01',
            address: {
                street: '456 Admin Boulevard',
                city: 'Palo Alto',
                state: 'CA',
                zipCode: '94301',
                country: 'USA'
            },
            permissions: [
                'manage_users',
                'manage_merchants',
                'manage_products',
                'view_analytics',
                'system_settings'
            ],
            preferences: {
                notifications: true,
                newsletter: false,
                darkMode: true,
                language: 'en'
            },
            joinedAt: '2023-01-01T00:00:00Z',
            lastLoginAt: '2024-01-23T08:00:00Z',
            isActive: true,
            isVerified: true
        }
    },

    // Categories and Tags
    categories: [
        { id: 'streaming', name: 'Streaming', icon: '📺', color: '#e50914' },
        { id: 'software', name: 'Software', icon: '💻', color: '#0066cc' },
        { id: 'fitness', name: 'Fitness', icon: '💪', color: '#ff6b35' },
        { id: 'education', name: 'Education', icon: '📚', color: '#4caf50' },
        { id: 'productivity', name: 'Productivity', icon: '⚡', color: '#ff9800' },
        { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: '#9c27b0' },
        { id: 'music', name: 'Music', icon: '🎵', color: '#1db954' },
        { id: 'design', name: 'Design', icon: '🎨', color: '#00c4cc' }
    ],

    // Popular tags
    popularTags: [
        'streaming', 'music', 'design', 'fitness', 'education', 'productivity',
        'entertainment', 'software', 'creative', 'professional', 'mobile',
        'collaboration', 'cloud', 'premium', 'unlimited', 'offline'
    ],

    // Utility functions
    utils: {
        // Get product by ID
        getProductById: function(id) {
            return window.TLC_DATA.sampleProducts.find(product => product.id === parseInt(id));
        },

        // Get merchant by ID
        getMerchantById: function(id) {
            return window.TLC_DATA.sampleMerchants.find(merchant => merchant.id === parseInt(id));
        },

        // Get products by merchant ID
        getProductsByMerchant: function(merchantId) {
            return window.TLC_DATA.sampleProducts.filter(product => product.merchantId === parseInt(merchantId));
        },

        // Get products by category
        getProductsByCategory: function(category) {
            return window.TLC_DATA.sampleProducts.filter(product => product.category === category);
        },

        // Search products
        searchProducts: function(query) {
            const searchTerm = query.toLowerCase();
            return window.TLC_DATA.sampleProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.shortDescription.toLowerCase().includes(searchTerm) ||
                product.merchant.toLowerCase().includes(searchTerm) ||
                product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
            );
        },

        // Sort products
        sortProducts: function(products, sortBy) {
            const sorted = [...products];
            switch(sortBy) {
                case 'name':
                    return sorted.sort((a, b) => a.name.localeCompare(b.name));
                case 'price':
                    return sorted.sort((a, b) => a.price - b.price);
                case 'rating':
                    return sorted.sort((a, b) => b.rating - a.rating);
                case 'reviews':
                    return sorted.sort((a, b) => b.reviewCount - a.reviewCount);
                default:
                    return sorted;
            }
        },

        // Format price
        formatPrice: function(price, currency = 'USD') {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: currency
            }).format(price);
        },

        // Format date
        formatDate: function(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        },

        // Generate random data for testing
        generateRandomProducts: function(count = 5) {
            const names = ['Premium', 'Pro', 'Plus', 'Elite', 'Ultimate', 'Advanced'];
            const services = ['Streaming', 'Design', 'Fitness', 'Learning', 'Music', 'Productivity'];
            const randomProducts = [];

            for (let i = 0; i < count; i++) {
                const name = names[Math.floor(Math.random() * names.length)];
                const service = services[Math.floor(Math.random() * services.length)];
                randomProducts.push({
                    id: 1000 + i,
                    name: `${name} ${service}`,
                    price: Math.floor(Math.random() * 50) + 5,
                    rating: Math.floor(Math.random() * 2) + 3.5,
                    category: service.toLowerCase(),
                    merchant: `${service} Corp`,
                    shortDescription: `Premium ${service.toLowerCase()} service with advanced features`
                });
            }
            return randomProducts;
        }
    },

    // Statistics and metrics
    stats: {
        totalProducts: 8,
        totalMerchants: 8,
        totalUsers: 3,
        averageRating: 4.5,
        totalRevenue: 125000,
        monthlyGrowth: 15.3,
        popularCategories: ['streaming', 'software', 'fitness'],
        topMerchants: [1, 7, 3], // Netflix, Disney, Adobe
        recentSignups: 247,
        activeSubscriptions: 1834
    }
};

// Initialize data validation
console.log('✅ TLC Data Module v5.0 loaded successfully');
console.log(`📊 Loaded ${window.TLC_DATA.sampleProducts.length} products and ${window.TLC_DATA.sampleMerchants.length} merchants`);

// Export for module system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.TLC_DATA;
}

// End of TLC Data Module v5.0