// TokenZ Loyalty Club v5.0 - Sample Data Module
console.log('📊 Loading TLC Sample Data Module v5.0...');

window.TLC_DATA = {
    version: '5.0',
    lastUpdated: '2024-12-19',
    
    // Sample Products (10 items as specified)
    products: [
        {
            id: 'P001',
            name: 'Premium Coffee Subscription',
            sku: 'COFFEE-PREM-001',
            merchantId: 'M001',
            merchantName: 'Bean & Brew Co.',
            price: 29.99,
            currency: 'USD',
            shortDescription: 'Monthly delivery of freshly roasted premium coffee beans from around the world.',
            longDescription: 'Experience the world\'s finest coffee with our Premium Coffee Subscription. Each month, we carefully select and roast premium beans from different regions, delivering them fresh to your door. Our expert roasters ensure perfect flavor profiles, and each shipment includes tasting notes and brewing recommendations. Perfect for coffee enthusiasts who want to explore new flavors and support sustainable farming practices.',
            imageUrl: 'https://drive.google.com/uc?export=view&id=1coffee_premium_image',
            category: 'Food & Beverage',
            rating: 4.8,
            reviewCount: 247,
            isActive: true,
            customAttributes: {
                roastLevel: 'Medium',
                origin: 'Various',
                bagSize: '12oz',
                subscriptionType: 'Monthly',
                shippingIncluded: true
            },
            tags: ['coffee', 'premium', 'subscription', 'organic']
        },
        {
            id: 'P002',
            name: 'Artisan Soap Collection',
            sku: 'SOAP-ART-002',
            merchantId: 'M002',
            merchantName: 'Pure Elements',
            price: 24.99,
            currency: 'USD',
            shortDescription: 'Handcrafted natural soaps made with organic ingredients and essential oils.',
            longDescription: 'Pamper your skin with our Artisan Soap Collection, featuring handcrafted soaps made from the finest organic ingredients. Each bar is carefully formulated with natural oils, butters, and botanicals to nourish and cleanse your skin. Our collection includes lavender, eucalyptus, charcoal, and honey oat varieties. All soaps are cruelty-free, paraben-free, and made in small batches to ensure quality.',
            imageUrl: 'https://drive.google.com/uc?export=view&id=1soap_artisan_image',
            category: 'Health & Beauty',
            rating: 4.6,
            reviewCount: 189,
            isActive: true,
            customAttributes: {
                ingredients: 'Organic',
                scentOptions: 4,
                barWeight: '4oz',
                subscriptionType: 'Bi-monthly',
                crueltyFree: true
            },
            tags: ['soap', 'organic', 'handmade', 'natural']
        },
        {
            id: 'P003',
            name: 'Tech Gadget Box',
            sku: 'TECH-BOX-003',
            merchantId: 'M003',
            merchantName: 'Gadget Galaxy',
            price: 49.99,
            currency: 'USD',
            shortDescription: 'Monthly surprise box of the latest tech gadgets and accessories.',
            longDescription: 'Stay ahead of the tech curve with our Tech Gadget Box! Each month, receive a curated selection of the latest gadgets, accessories, and tech innovations. From smartphone accessories to smart home devices, portable chargers to wireless earbuds, each box contains 3-5 items worth over $80. Perfect for tech enthusiasts, early adopters, and anyone who loves discovering new technology.',
            imageUrl: 'https://drive.google.com/uc?export=view&id=1tech_gadget_image',
            category: 'Technology',
            rating: 4.4,
            reviewCount: 156,
            isActive: true,
            customAttributes: {
                itemCount: '3-5 items',
                totalValue: '$80+',
                subscriptionType: 'Monthly',
                returnPolicy: '30 days',
                warranty: 'Included'
            },
            tags: ['technology', 'gadgets', 'surprise', 'innovation']
        },
        {
            id: 'P004',
            name: 'Gourmet Spice Journey',
            sku: 'SPICE-GOUR-004',
            merchantId: 'M004',
            merchantName: 'Spice Route Trading',
            price: 19.99,
            currency: 'USD',
            shortDescription: 'Explore world cuisines with authentic spices and recipe cards.',
            longDescription: 'Embark on a culinary adventure with our Gourmet Spice Journey! Each month, discover authentic spices from different regions around the world. Every shipment includes 3-4 premium spice blends, detailed information about their origins, and exclusive recipe cards created by professional chefs. Transform your cooking and explore new flavors from India, Morocco, Thailand, Mexico, and beyond.',
            imageUrl: 'https://drive.google.com/uc?export=view&id=1spice_gourmet_image',
            category: 'Food & Beverage',
            rating: 4.7,
            reviewCount: 203,
            isActive: true,
            customAttributes: {
                spiceCount: '3-4 blends',
                origin: 'Global',
                recipeCards: 'Included',
                subscriptionType: 'Monthly',
                shelfLife: '2 years'
            },
            tags: ['spices', 'cooking', 'international', 'gourmet']
        },
        {
            id: 'P005',
            name: 'Fitness Gear Essentials',
            sku: 'FIT-GEAR-005',
            merchantId: 'M005',
            merchantName: 'FitLife Pro',
            price: 39.99,
            currency: 'USD',
            shortDescription: 'Monthly fitness accessories and workout gear for home and gym.',
            longDescription: 'Elevate your fitness routine with our Fitness Gear Essentials subscription! Each month, receive carefully selected workout accessories, resistance bands, yoga props, and fitness tools. Our expert trainers curate items that complement different workout styles, from strength training to yoga, HIIT to pilates. Each box includes workout guides and tips to maximize your fitness journey.',
            imageUrl: 'https://drive.google.com/uc?export=view&id=1fitness_gear_image',
            category: 'Health & Fitness',
            rating: 4.5,
            reviewCount: 178,
            isActive: true,
            customAttributes: {
                gearType: 'Accessories',
                workoutGuides: 'Included',
                subscriptionType: 'Monthly',
                skillLevel: 'All levels',
                returnPolicy: '60 days'
            },
            tags: ['fitness', 'workout', 'accessories', 'health']
        },
        {
            id: 'P006',
            name: 'Book Club Premium',
            sku: 'BOOK-PREM-006',
            merchantId: 'M006',
            merchantName: 'Literary Lounge',
            price: 34.99,
            currency: 'USD',
            shortDescription: 'Curated monthly book selection with exclusive author content.',
            longDescription: 'Join our Book Club Premium for a literary adventure! Each month, receive a carefully selected book from various genres, along with exclusive author interviews, discussion guides, and bookmarks. Our literary experts choose both bestsellers and hidden gems, ensuring a diverse reading experience. Perfect for book lovers who want to discover new authors and engage with a community of readers.',
            imageUrl: 'https://drive.google.com/uc?export=view&id=1book_club_image',
            category: 'Books & Media',
            rating: 4.9,
            reviewCount: 312,
            isActive: true,
            customAttributes: {
                bookType: 'Hardcover',
                genres: 'Various',
                authorContent: 'Exclusive',
                subscriptionType: 'Monthly',
                communityAccess: true
            },
            tags: ['books', 'reading', 'literature', 'community']
        },
        {
            id: 'P007',
            name: 'Plant Parent Kit',
            sku: 'PLANT-KIT-007',
            merchantId: 'M002',
            merchantName: 'Pure Elements',
            price: 27.99,
            currency: 'USD',
            shortDescription: 'Everything you need to grow and care for beautiful houseplants.',
            longDescription: 'Become the ultimate plant parent with our Plant Parent Kit! Each month, receive a new houseplant along with everything needed for its care - premium potting soil, decorative pot, plant food, and detailed care instructions. Our plant experts select varieties suitable for different light conditions and skill levels. Transform your space into a green oasis while learning about plant care.',
            imageUrl: 'https://drive.google.com/uc?export=view&id=1plant_kit_image',
            category: 'Home & Garden',
            rating: 4.3,
            reviewCount: 145,
            isActive: true,
            customAttributes: {
                plantType: 'Houseplants',
                potIncluded: true,
                careGuide: 'Detailed',
                subscriptionType: 'Monthly',
                lightRequirement: 'Various'
            },
            tags: ['plants', 'gardening', 'home', 'green']
        },
        {
            id: 'P008',
            name: 'Craft Beer Discovery',
            sku: 'BEER-DISC-008',
            merchantId: 'M001',
            merchantName: 'Bean & Brew Co.',
            price: 44.99,
            currency: 'USD',
            shortDescription: 'Explore craft breweries with curated beer selections and tasting notes.',
            longDescription: 'Discover the world of craft beer with our Craft Beer Discovery subscription! Each month, explore beers from different craft breweries across the country. Receive 6-8 unique craft beers, detailed tasting notes, brewery stories, and food pairing suggestions. Our beer experts select a mix of styles from IPAs to stouts, lagers to sours, ensuring a comprehensive tasting experience.',
            imageUrl: 'https://drive.google.com/uc?export=view&id=1craft_beer_image',
            category: 'Food & Beverage',
            rating: 4.6,
            reviewCount: 198,
            isActive: true,
            customAttributes: {
                beerCount: '6-8 bottles',
                beerStyles: 'Various',
                tastingNotes: 'Included',
                subscriptionType: 'Monthly',
                ageRestriction: '21+'
            },
            tags: ['beer', 'craft', 'brewery', 'tasting']
        },
        {
            id: 'P009',
            name: 'Pet Pamper Box',
            sku: 'PET-PAM-009',
            merchantId: 'M005',
            merchantName: 'FitLife Pro',
            price: 32.99,
            currency: 'USD',
            shortDescription: 'Monthly treats, toys, and accessories for your beloved pets.',
            longDescription: 'Spoil your furry friends with our Pet Pamper Box! Each month, your pet receives a selection of premium treats, engaging toys, and useful accessories. We cater to both dogs and cats with size-appropriate items. All treats are made with natural ingredients, toys are safety-tested, and accessories are both functional and stylish. Make your pet\'s month special with surprises they\'ll love.',
            imageUrl: 'https://drive.google.com/uc?export=view&id=1pet_pamper_image',
            category: 'Pets',
            rating: 4.7,
            reviewCount: 234,
            isActive: true,
            customAttributes: {
                petType: 'Dogs & Cats',
                itemCount: '4-6 items',
                treatType: 'Natural',
                subscriptionType: 'Monthly',
                sizeOptions: 'Small/Medium/Large'
            },
            tags: ['pets', 'treats', 'toys', 'accessories']
        },
        {
            id: 'P010',
            name: 'Mindfulness & Wellness',
            sku: 'MIND-WELL-010',
            merchantId: 'M006',
            merchantName: 'Literary Lounge',
            price: 36.99,
            currency: 'USD',
            shortDescription: 'Self-care products and mindfulness tools for mental wellness.',
            longDescription: 'Prioritize your mental wellness with our Mindfulness & Wellness subscription. Each month, receive carefully curated self-care products including aromatherapy items, meditation tools, wellness teas, journals, and mindfulness guides. Our wellness experts select items that promote relaxation, stress relief, and mental clarity. Perfect for anyone looking to incorporate more mindfulness into their daily routine.',
            imageUrl: 'https://drive.google.com/uc?export=view&id=1mindfulness_image',
            category: 'Health & Wellness',
            rating: 4.8,
            reviewCount: 167,
            isActive: true,
            customAttributes: {
                itemType: 'Self-care',
                meditationTools: 'Included',
                aromatherapy: true,
                subscriptionType: 'Monthly',
                guidesIncluded: true
            },
            tags: ['wellness', 'mindfulness', 'self-care', 'meditation']
        }
    ],
    
    // Sample Merchants (6 items as specified)
    merchants: [
        {
            id: 'M001',
            name: 'Bean & Brew Co.',
            description: 'Premium coffee roasters and craft beverage specialists since 1995. We source the finest beans from sustainable farms worldwide and roast them to perfection. Our passion for coffee extends beyond the cup - we\'re committed to supporting coffee farming communities and environmental sustainability.',
            website: 'https://beanandbrewco.com',
            logoUrl: 'https://drive.google.com/uc?export=view&id=1bean_brew_logo',
            contactEmail: 'contact@beanandbrewco.com',
            phone: '+1-555-COFFEE-1',
            isActive: true,
            joinDate: '2024-01-15',
            category: 'Food & Beverage',
            location: 'Portland, Oregon',
            rating: 4.7,
            followerCount: 1247,
            productCount: 2,
            specialties: ['Coffee', 'Craft Beer', 'Artisan Beverages'],
            certifications: ['Organic', 'Fair Trade', 'Rainforest Alliance'],
            socialMedia: {
                instagram: '@beanandbrewco',
                facebook: 'BeanAndBrewCo',
                twitter: '@beanbrewco'
            }
        },
        {
            id: 'M002',
            name: 'Pure Elements',
            description: 'Handcrafted natural products for body, home, and garden. We believe in the power of pure, organic ingredients to enhance your daily life. From artisan soaps to plant care products, everything we create is made with love, sustainability, and your wellbeing in mind.',
            website: 'https://pureelements.com',
            logoUrl: 'https://drive.google.com/uc?export=view&id=1pure_elements_logo',
            contactEmail: 'hello@pureelements.com',
            phone: '+1-555-PURE-123',
            isActive: true,
            joinDate: '2024-02-01',
            category: 'Health & Beauty',
            location: 'Asheville, North Carolina',
            rating: 4.6,
            followerCount: 892,
            productCount: 2,
            specialties: ['Natural Skincare', 'Handmade Soaps', 'Plant Care', 'Aromatherapy'],
            certifications: ['Organic', 'Cruelty-Free', 'Vegan'],
            socialMedia: {
                instagram: '@pureelements',
                facebook: 'PureElementsNatural',
                pinterest: 'pureelements'
            }
        },
        {
            id: 'M003',
            name: 'Gadget Galaxy',
            description: 'Your destination for the latest and greatest in technology. We scour the globe to find innovative gadgets, cutting-edge accessories, and emerging tech products. Our team of tech enthusiasts tests everything to ensure quality and functionality before it reaches our customers.',
            website: 'https://gadgetgalaxy.com',
            logoUrl: 'https://drive.google.com/uc?export=view&id=1gadget_galaxy_logo',
            contactEmail: 'support@gadgetgalaxy.com',
            phone: '+1-555-TECH-999',
            isActive: true,
            joinDate: '2024-01-20',
            category: 'Technology',
            location: 'Austin, Texas',
            rating: 4.4,
            followerCount: 2156,
            productCount: 1,
            specialties: ['Smart Devices', 'Mobile Accessories', 'Gaming Gear', 'Home Automation'],
            certifications: ['FCC Approved', 'CE Certified'],
            socialMedia: {
                instagram: '@gadgetgalaxy',
                youtube: 'GadgetGalaxyTech',
                twitter: '@gadgetgalaxy'
            }
        },
        {
            id: 'M004',
            name: 'Spice Route Trading',
            description: 'Authentic spices and seasonings from around the world. Our spice hunters travel to remote regions to source the finest, most aromatic spices directly from farmers and traditional markets. We bring you the authentic flavors that have been treasured for generations.',
            website: 'https://spiceroutetrading.com',
            logoUrl: 'https://drive.google.com/uc?export=view&id=1spice_route_logo',
            contactEmail: 'info@spiceroutetrading.com',
            phone: '+1-555-SPICE-01',
            isActive: true,
            joinDate: '2024-02-10',
            category: 'Food & Beverage',
            location: 'San Francisco, California',
            rating: 4.8,
            followerCount: 756,
            productCount: 1,
            specialties: ['International Spices', 'Spice Blends', 'Cooking Ingredients', 'Recipe Development'],
            certifications: ['Organic', 'Non-GMO', 'Kosher'],
            socialMedia: {
                instagram: '@spiceroutetrading',
                facebook: 'SpiceRouteTrading',
                pinterest: 'spiceroute'
            }
        },
        {
            id: 'M005',
            name: 'FitLife Pro',
            description: 'Professional fitness equipment and wellness products for active lifestyles. Whether you\'re a beginner starting your fitness journey or a professional athlete, we provide high-quality gear and accessories to help you achieve your goals. Fitness is our passion, and your success is our mission.',
            website: 'https://fitlifepro.com',
            logoUrl: 'https://drive.google.com/uc?export=view&id=1fitlife_pro_logo',
            contactEmail: 'team@fitlifepro.com',
            phone: '+1-555-FITLIFE',
            isActive: true,
            joinDate: '2024-01-25',
            category: 'Health & Fitness',
            location: 'Denver, Colorado',
            rating: 4.5,
            followerCount: 1834,
            productCount: 2,
            specialties: ['Fitness Equipment', 'Workout Accessories', 'Pet Fitness', 'Wellness Products'],
            certifications: ['ISO 9001', 'Safety Tested'],
            socialMedia: {
                instagram: '@fitlifepro',
                youtube: 'FitLifeProFitness',
                tiktok: '@fitlifepro'
            }
        },
        {
            id: 'M006',
            name: 'Literary Lounge',
            description: 'A haven for book lovers and literary enthusiasts. We curate exceptional reading experiences through carefully selected books, exclusive author content, and wellness products that complement the reading lifestyle. Our mission is to foster a love of literature and create meaningful connections between readers and authors.',
            website: 'https://literarylounge.com',
            logoUrl: 'https://drive.google.com/uc?export=view&id=1literary_lounge_logo',
            contactEmail: 'books@literarylounge.com',
            phone: '+1-555-BOOKS-99',
            isActive: true,
            joinDate: '2024-02-05',
            category: 'Books & Media',
            location: 'Brooklyn, New York',
            rating: 4.9,
            followerCount: 2847,
            productCount: 2,
            specialties: ['Book Curation', 'Author Interviews', 'Reading Accessories', 'Wellness Products'],
            certifications: ['Independent Bookstore Alliance'],
            socialMedia: {
                instagram: '@literarylounge',
                facebook: 'LiteraryLounge',
                goodreads: 'literary-lounge'
            }
        }
    ],
    
    // Sample Members (for testing different roles)
    members: [
        {
            id: 'TLC001',
            email: 'member@tlc.demo',
            fullName: 'Demo Member',
            role: 'standard',
            joinDate: '2024-01-01',
            isActive: true,
            sponsorId: '',
            phone: '+1-555-MEMBER',
            subscriptions: ['P001', 'P004'],
            wishlist: ['P002', 'P006', 'P010'],
            followedMerchants: ['M001', 'M004', 'M006'],
            profileImage: 'https://drive.google.com/uc?export=view&id=1member_avatar',
            preferences: {
                categories: ['Food & Beverage', 'Books & Media'],
                notifications: true,
                newsletter: true
            }
        },
        {
            id: 'TLC002',
            email: 'merchant@tlc.demo',
            fullName: 'Demo Merchant',
            role: 'merchant',
            joinDate: '2024-01-15',
            isActive: true,
            sponsorId: '',
            phone: '+1-555-MERCHANT',
            merchantId: 'M001',
            subscriptions: ['P008'],
            wishlist: ['P003', 'P005'],
            followedMerchants: ['M002', 'M003'],
            profileImage: 'https://drive.google.com/uc?export=view&id=1merchant_avatar',
            preferences: {
                categories: ['Technology', 'Health & Fitness'],
                notifications: true,
                newsletter: true
            }
        },
        {
            id: 'TLC003',
            email: 'admin@tlc.demo',
            fullName: 'Demo Admin',
            role: 'admin',
            joinDate: '2024-01-01',
            isActive: true,
            sponsorId: '',
            phone: '+1-555-ADMIN',
            subscriptions: [],
            wishlist: [],
            followedMerchants: [],
            profileImage: 'https://drive.google.com/uc?export=view&id=1admin_avatar',
            preferences: {
                categories: ['All'],
                notifications: true,
                newsletter: true
            }
        }
    ],
    
    // Categories for filtering
    categories: [
        { id: 'food-beverage', name: 'Food & Beverage', icon: '🍽️' },
        { id: 'health-beauty', name: 'Health & Beauty', icon: '💄' },
        { id: 'technology', name: 'Technology', icon: '📱' },
        { id: 'health-fitness', name: 'Health & Fitness', icon: '💪' },
        { id: 'books-media', name: 'Books & Media', icon: '📚' },
        { id: 'home-garden', name: 'Home & Garden', icon: '🏡' },
        { id: 'pets', name: 'Pets', icon: '🐕' },
        { id: 'health-wellness', name: 'Health & Wellness', icon: '🧘' }
    ],
    
    // Utility functions for data access
    getProductById: function(id) {
        return this.products.find(product => product.id === id);
    },
    
    getMerchantById: function(id) {
        return this.merchants.find(merchant => merchant.id === id);
    },
    
    getMemberById: function(id) {
        return this.members.find(member => member.id === id);
    },
    
    getProductsByMerchant: function(merchantId) {
        return this.products.filter(product => product.merchantId === merchantId);
    },
    
    getProductsByCategory: function(category) {
        return this.products.filter(product => product.category === category);
    },
    
    getFeaturedProducts: function(count = 10) {
        // Randomize and return specified number of products
        const shuffled = [...this.products].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    },
    
    searchProducts: function(query) {
        const searchTerm = query.toLowerCase();
        return this.products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.shortDescription.toLowerCase().includes(searchTerm) ||
            product.merchantName.toLowerCase().includes(searchTerm) ||
            product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    },
    
    searchMerchants: function(query) {
        const searchTerm = query.toLowerCase();
        return this.merchants.filter(merchant => 
            merchant.name.toLowerCase().includes(searchTerm) ||
            merchant.description.toLowerCase().includes(searchTerm) ||
            merchant.category.toLowerCase().includes(searchTerm)
        );
    }
};

// Initialize data
console.log('✅ TLC Sample Data Module loaded successfully');
console.log('📊 Data Summary:', {
    products: window.TLC_DATA.products.length,
    merchants: window.TLC_DATA.merchants.length,
    members: window.TLC_DATA.members.length,
    categories: window.TLC_DATA.categories.length
});

// Export for module system
if (typeof module !== 'undefined' && module.exports) {
    module.exports = window.TLC_DATA;
}
