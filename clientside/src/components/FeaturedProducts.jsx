import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Percent } from 'lucide-react';
import { useShop } from '../context/useShop';

export default function FeaturedProducts({ Products }) {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const { toggleWishlist, addToCart, wishlist } = useShop();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const calculateDiscount = (price, discountPrice) => {
    if (!discountPrice) return null;
    const originalPrice = parseFloat(price);
    const discounted = parseFloat(discountPrice);
    const savings = originalPrice - discounted;
    const percentage = ((savings / originalPrice) * 100).toFixed(0);
    return {
      savings: savings.toFixed(2),
      percentage
    };
  };

  return (
    <section className="py-16 bg-teal-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">
              Fashion Collection
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-tiny sm:text-lg">
              Discover our latest fashion trends with special offers
            </p>
          </div>
          <div className="hidden sm:flex items-center space-x-2 bg-indigo-100 dark:bg-indigo-900/50 px-4 py-2 rounded-lg">
            <Percent className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-indigo-600 dark:text-indigo-400 font-medium">Limited Time Offers</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-6 lg:gap-8">
          {Products.map((product) => {
            const discount = calculateDiscount(product.price, product.discountPrice);
            return (
              <div
                key={product._id}
                className="group bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md overflow-hidden 
                         transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <Link to={`/product/${product._id}`} className="block relative">
                  <img
                    src={product.images[0].imageUrl}
                    alt={product.name}
                    className="w-full aspect-square object-cover transform transition-transform 
                             duration-500 group-hover:scale-110"
                  />
                  {discount && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                      -{discount.percentage}%
                    </div>
                  )}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(product);
                      showToast(`${product.name} ${wishlist.some(item => item._id === product._id) ? 'removed from' : 'added to'} wishlist`);
                    }}
                    className="absolute top-2 right-2 p-1.5 sm:p-2 rounded-full bg-white dark:bg-gray-800 
                             shadow-md hover:scale-110 transition-all duration-200 opacity-0 
                             group-hover:opacity-100"
                  >
                    <Heart
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        wishlist.some(item => item._id === product._id)
                          ? 'text-red-500 fill-current'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </Link>
                <div className="p-2 sm:p-4">
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.brand || 'Unknown Brand'}</div>
                  <h3 className="text-sm sm:text-lg font-semibold text-gray-900 dark:text-white mb-1 sm:mb-2 truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-1 sm:mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-2.5 h-2.5 sm:w-4 sm:h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 sm:ml-2 text-xxs sm:text-sm text-gray-500 dark:text-gray-400">
                      ({product.reviews})
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1 mb-2">
                    {product.discountPrice ? (
                      <>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm sm:text-xl font-bold text-gray-900 dark:text-white">
                            ₹{product.discountPrice}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-500 line-through">
                            ₹{product.price}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm text-green-600 font-medium">
                          Save ₹{discount.savings} ({discount.percentage}% off)
                        </span>
                      </>
                    ) : (
                      <span className="text-sm sm:text-xl font-bold text-gray-900 dark:text-white">
                        ₹{product.price}
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product);
                      showToast(`${product.name} added to cart`);
                    }}
                    className="w-full py-1.5 sm:py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 
                             transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-sm font-medium">Add to Cart</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toast Notification */}
      <div
        className={`fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg 
                   transform transition-transform duration-300 ${showNotification ? 'translate-y-0' : 'translate-y-24'}`}
      >
        {notificationMessage}
      </div>
    </section>
  );
}