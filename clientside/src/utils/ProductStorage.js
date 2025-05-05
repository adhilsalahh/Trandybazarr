// Utility functions for product storage
export const getStoredProducts = () => {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
};

export const addProduct = (product) => {
  const products = getStoredProducts();
  const newProduct = {
    ...product,
    id: `custom-${Date.now()}`,
    rating: 4.5,
    reviews: 0,
    features: [],
    specs: {},
    inStock: true,
    images: product.images.length > 0 ? product.images : [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600'
    ]
  };
  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  return newProduct;
};

export const getAllProducts = () => {
  const storedProducts = getStoredProducts();
  return storedProducts;
};