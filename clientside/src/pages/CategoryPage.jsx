import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Filter, ChevronLeft, ChevronRight, Star, Heart, ShoppingCart } from 'lucide-react';
import { useShop } from '../context/useShop';

function CategoryPage({ Products }) {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Filter products by category
  const categoryProducts = Products.filter(
    product => product.category.toLowerCase() === category.toLowerCase()
  );

  // Sort products
  const sortedProducts = [...categoryProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  // Pagination
  const itemsPerPage = 12;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const currentProducts = sortedProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Get similar products based on category and type
  const getSimilarProducts = (product) => {
    return Products.filter(p => 
      p.category === product.category && 
      p._id !== product._id
    ).slice(0, 4);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold capitalize mb-8">{category.replace('-', ' ')}</h1>
      
      <div className="flex justify-between mb-8">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="featured">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div key={product._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <Link to={`/product/${product._id}`} className="block relative">
              <img
                src={product.images[0].imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleWishlist(product);
                  showToast(`${product.name} ${wishlist.includes(product) ? 'removed from' : 'added to'} wishlist`);
                }}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors duration-200"
              >
                <Heart
                  className={`w-5 h-5 ${
                    wishlist.includes(product) ? 'text-red-500 fill-current' : 'text-gray-400'
                  }`}
                />
              </button>
            </Link>
            <div className="p-4">
              <Link to={`/product/${product._id}`}>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 hover:text-indigo-600">
                  {product.name}
                </h3>
              </Link>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-1 text-sm text-gray-500">({product.reviews})</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    ${product.price}
                  </span>
                  {product.discountPrice && (
                    <span className="ml-2 text-sm text-gray-500 line-through">
                      ${product.discountPrice}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    addToCart(product);
                    showToast(`${product.name} added to cart`);
                  }}
                  className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors duration-200"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border rounded-lg mr-2 disabled:opacity-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 mx-1 rounded-lg ${
                currentPage === i + 1
                  ? 'bg-indigo-600 text-white'
                  : 'border hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 border rounded-lg ml-2 disabled:opacity-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Toast Notification */}
      <div
        className={`fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg 
                   transform transition-transform duration-300 ${
                     showNotification ? 'translate-y-0' : 'translate-y-24'
                   }`}
      >
        {notificationMessage}
      </div>
    </div>
  );
}

export default CategoryPage;