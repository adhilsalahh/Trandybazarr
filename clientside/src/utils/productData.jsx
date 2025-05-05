


 export const products = {
  // Fashion
  'fashion-1': {
    id: 'fashion-1',
    name: 'Designer Summer Dress',
    price: 159.99,
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1583759136431-9d70db2eb04c?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.8,
    reviews: 245,
    description: 'Elegant designer summer dress crafted from premium lightweight fabric. Features a flattering A-line silhouette with delicate floral patterns.',
    specs: {
      'Material': '100% Premium Cotton',
      'Style': 'A-Line Dress',
      'Pattern': 'Floral Print',
      'Length': 'Midi',
      'Care Instructions': 'Machine wash cold',
      'Sizes Available': 'XS to XL',
      'Country of Origin': 'Italy'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Sage Green', code: '#74917C' },
      { name: 'Dusty Rose', code: '#D8A7B1' },
      { name: 'Sky Blue', code: '#95B8D1' }
    ],
    features: [
      'Premium lightweight fabric',
      'Breathable material',
      'Side pockets',
      'Adjustable waist tie',
      'Hidden back zipper'
    ],
    inStock: true
  },
  'fashion-2': {
    id: 'fashion-2',
    name: 'Leather Jacket',
    price: 199.99,
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.7,
    reviews: 189,
    description: 'Premium leather jacket with a modern cut and exceptional craftsmanship.',
    specs: {
      'Material': 'Genuine Leather',
      'Style': 'Biker Jacket',
      'Lining': '100% Polyester',
      'Closure': 'YKK Zipper',
      'Care Instructions': 'Professional leather clean',
      'Sizes Available': 'S to XXL',
      'Country of Origin': 'Italy'
    },
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Black', code: '#000000' },
      { name: 'Brown', code: '#8B4513' }
    ],
    features: [
      'Genuine leather construction',
      'Multiple pockets',
      'Quilted lining',
      'Heavy-duty zippers',
      'Adjustable waist'
    ],
    inStock: true
  },
  'fashion-3': {
    id: 'fashion-3',
    name: 'Denim Jeans',
    price: 89.99,
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.6,
    reviews: 312,
    description: 'Classic denim jeans with a perfect fit and premium quality construction.',
    specs: {
      'Material': '98% Cotton, 2% Elastane',
      'Style': 'Slim Fit',
      'Rise': 'Mid Rise',
      'Wash': 'Medium Blue',
      'Care Instructions': 'Machine wash cold',
      'Sizes Available': '28-38',
      'Country of Origin': 'USA'
    },
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: [
      { name: 'Medium Blue', code: '#4169E1' },
      { name: 'Dark Blue', code: '#191970' }
    ],
    features: [
      'Premium denim fabric',
      'Stretch comfort',
      'Reinforced stitching',
      'Classic 5-pocket design',
      'Branded hardware'
    ],
    inStock: true
  },
  'fashion-4': {
    id: 'fashion-4',
    name: 'Summer Dress',
    price: 79.99,
    category: 'Fashion',
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.5,
    reviews: 156,
    description: 'Light and breezy summer dress perfect for warm days and casual outings.',
    specs: {
      'Material': '100% Cotton',
      'Style': 'Sundress',
      'Pattern': 'Solid',
      'Length': 'Knee Length',
      'Care Instructions': 'Machine wash cold',
      'Sizes Available': 'XS to XL',
      'Country of Origin': 'India'
    },
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'White', code: '#FFFFFF' },
      { name: 'Yellow', code: '#FFD700' },
      { name: 'Pink', code: '#FFB6C1' }
    ],
    features: [
      'Lightweight cotton fabric',
      'Adjustable straps',
      'Side pockets',
      'Lined bodice',
      'Elastic back'
    ],
    inStock: true
  },

  // Electronics
  'electronics-1': {
    id: 'electronics-1',
    name: 'Wireless Noise-Canceling Headphones',
    price: 299.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.8,
    reviews: 325,
    description: 'Premium wireless headphones with active noise cancellation, delivering crystal-clear sound quality and exceptional comfort.',
    specs: {
      'Bluetooth Version': '5.2',
      'Battery Life': '40 hours',
      'Noise Cancellation': 'Active ANC',
      'Driver Size': '40mm',
      'Weight': '250g',
      'Charging Time': '2 hours',
      'Water Resistance': 'IPX4'
    },
    inStock: true
  },
  'electronics-2': {
    id: 'electronics-2',
    name: '4K Smart TV',
    price: 799.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.7,
    reviews: 189,
    description: 'Ultra HD 4K Smart TV with HDR support and built-in streaming apps.',
    specs: {
      'Screen Size': '55 inches',
      'Resolution': '4K Ultra HD',
      'HDR': 'Yes',
      'Smart Features': 'Built-in WiFi, Voice Control',
      'Refresh Rate': '120Hz',
      'HDMI Ports': '4',
      'USB Ports': '2'
    },
    inStock: true
  },

  // Phones
  'phones-1': {
    id: 'phones-1',
    name: 'Premium Smartphone',
    price: 999.99,
    category: 'Phones',
    images: [
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.9,
    reviews: 452,
    description: 'Flagship smartphone with advanced camera system and powerful performance.',
    specs: {
      'Screen': '6.7" OLED',
      'Processor': 'Latest Gen Chipset',
      'RAM': '8GB',
      'Storage': '256GB',
      'Camera': '48MP Main + 12MP Ultra-wide',
      'Battery': '4500mAh',
      'OS': 'Latest Android/iOS'
    },
    inStock: true
  },
  'phones-2': {
    id: 'phones-2',
    name: 'Smart Watch Pro',
    price: 349.99,
    category: 'Phones',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.6,
    reviews: 287,
    description: 'Advanced smartwatch with health tracking and cellular connectivity.',
    specs: {
      'Display': '1.9" AMOLED',
      'Battery Life': '18 hours',
      'Water Resistance': '50m',
      'GPS': 'Built-in',
      'Heart Rate': 'Continuous monitoring',
      'Connectivity': 'Cellular + WiFi',
      'Compatibility': 'iOS/Android'
    },
    inStock: true
  },

  // Accessories
  'accessories-1': {
    id: 'accessories-1',
    name: 'Designer Watch',
    price: 199.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.7,
    reviews: 156,
    description: 'Elegant designer watch with premium materials and classic design.',
    specs: {
      'Case Material': 'Stainless Steel',
      'Band Material': 'Genuine Leather',
      'Movement': 'Quartz',
      'Water Resistance': '30m',
      'Case Size': '42mm',
      'Warranty': '2 years',
      'Origin': 'Switzerland'
    },
    inStock: true
  },
  'accessories-2': {
    id: 'accessories-2',
    name: 'Premium Sunglasses',
    price: 159.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.5,
    reviews: 98,
    description: 'Designer sunglasses with UV protection and polarized lenses.',
    specs: {
      'Frame Material': 'Acetate',
      'Lens': 'Polarized',
      'UV Protection': '100%',
      'Frame Size': 'Medium',
      'Style': 'Aviator',
      'Includes': 'Case & Cleaning Cloth',
      'Warranty': '1 year'
    },
    inStock: true
  },

  // Home & Living
  'home-1': {
    id: 'home-1',
    name: 'Smart Home Hub',
    price: 129.99,
    category: 'Home & Living',
    images: [
      'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1507646227500-4d389b0012be?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.6,
    reviews: 234,
    description: 'Central smart home controller with voice control and automation features.',
    specs: {
      'Compatibility': 'Alexa, Google Assistant',
      'Connectivity': 'WiFi, Bluetooth',
      'Power': 'DC Adapter',
      'Range': '30m',
      'Voice Control': 'Yes',
      'App Control': 'iOS/Android',
      'Automation': 'Custom Routines'
    },
    inStock: true
  },
  'home-2': {
    id: 'home-2',
    name: 'Modern Coffee Table',
    price: 299.99,
    category: 'Home & Living',
    images: [
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1554295405-abb8fd54f153?auto=format&fit=crop&q=80&w=600'
    ],
    rating: 4.8,
    reviews: 167,
    description: 'Contemporary coffee table with sleek design and premium materials.',
    specs: {
      'Material': 'Solid Wood, Glass',
      'Dimensions': '120x60x45cm',
      'Style': 'Modern',
      'Assembly': 'Required',
      'Weight Capacity': '50kg',
      'Finish': 'Natural Wood',
      'Storage': 'Lower Shelf'
    },
    inStock: true
  }
};
