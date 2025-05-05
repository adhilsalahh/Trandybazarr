import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ShoppingCart, 
  ShoppingBag,
  Heart, 
  User, 
  Globe, 
  Sun, 
  Moon,
  Menu,
  HelpCircle
} from 'lucide-react';
import { useShop } from '../context/useShop';

const mockProducts = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600',
    category: 'Electronics',
    rating: 4.5,
    reviews: 128,
    description: 'High-quality wireless headphones with noise cancellation.',
    inStock: true
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
    category: 'Accessories',
    rating: 4.8,
    reviews: 256,
    description: 'Feature-rich smartwatch with health tracking capabilities.',
    inStock: true
  },
  {
    id: '3',
    name: 'Premium Backpack',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600',
    category: 'Fashion',
    rating: 4.2,
    reviews: 89,
    description: 'Durable and stylish backpack for everyday use.',
    inStock: true
  }
];

export default function Header({ isDarkMode, toggleDarkMode }) {
  const { cartCount } = useShop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const results = mockProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(query ? results : []);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      // Navigate to search results page or handle search
      console.log('Search for:', searchQuery);
      setSearchResults([]);
      setSearchQuery('');
    }
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowUserMenu(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowUserMenu(false);
    }, 200);
  };

  const handleMenuItemClick = () => {
    setShowUserMenu(false);
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-blue-900 shadow-lg flex flex-col">
      <div className="w-full">
        <nav className="flex items-center h-16 md:h-20 gap-4">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:bg-white/10 rounded-full transition-all duration-300 p-2"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center transform hover:scale-105 transition-all duration-300">
            <div className="flex items-center pl-5">
              <div className="w-8 h-8 md:w-12 md:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 
                           rounded-lg flex items-center justify-center transform rotate-12 hover:rotate-0 
                           transition-all duration-300">
                <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <div>
                <h1 className="ml-2 md:ml-3 text-3xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-200 
                             to-orange-100 bg-clip-text text-transparent hover:from-orange-100 
                             hover:to-yellow-200 transition-all duration-300">
                  Trendy Bazar
                </h1>
                <span className="hidden sm:block ml-3 text-sm md:text-sm text-gray-100">Fashion & Lifestyle</span>
              </div>
            </div>
          </Link>

          {/* Mobile Icons */}
          <div className="flex items-center gap-2 ml-auto md:hidden">
            <Link to="/cart" className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 relative">
              <ShoppingCart className="h-6 w-6 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-orange-500 rounded-full w-5 h-5 
                               text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/login" className="p-2 hover:bg-white/10 rounded-full transition-all duration-300">
              <User className="h-6 w-6 text-white" />
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 items-center justify-center max-w-4xl">
            <form onSubmit={handleSearchSubmit} className="w-full max-w-3xl mr-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full min-w-[600px] px-6 py-3 rounded-full border border-white/30 bg-white/10 
                         text-white placeholder-white/70 text-base focus:ring-2 focus:ring-white
                         focus:border-white/50 transition-all duration-300 hover:bg-white/20"
                />
                <Search className="absolute right-6 top-3.5 h-5 w-5 text-white/70" />
                {searchResults.length > 0 && (
                  <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                    {searchResults.map((result) => (
                      <Link
                        key={result.id}
                        to={`/product/${result.id}`}
                        onClick={() => {
                          setSearchResults([]);
                          setSearchQuery('');
                          window.scrollTo(0, 0);
                        }}
                        className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <img 
                          src={result.image} 
                          alt={result.name} 
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{result.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">${result.price}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Navigation Icons */}
          <div className="hidden md:flex items-center gap-4">
            <button onClick={toggleDarkMode} className="p-2 hover:bg-white/10 rounded-full transition-all duration-300">
              {isDarkMode ? <Sun className="h-7 w-7 text-white" /> : <Moon className="h-7 w-7 text-white" />}
            </button>
          
            <Link to="/help" className="p-2 hover:bg-white/10 rounded-full transition-all duration-300">
              <Globe className="h-7 w-7 text-white" />
            </Link>

            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={dropdownRef}
            >
              <button className="p-2 hover:bg-white/10 rounded-full transition-all duration-300">
                <User className="h-7 w-7 text-white" />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 
                             ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {[
                      { name: 'Login', path: '/login' },
                      { name: 'Register', path: '/register' },
                      { name: 'My Profile', path: '/profile' },
                      { name: 'Address List', path: '/address-list' },
                      { name: 'Orders', path: '/orders' },
                      { name: 'Wishlist', path: '/wishlist' }
                    ].map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={handleMenuItemClick}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 relative
                                 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300
                                 hover:text-indigo-600 dark:hover:text-indigo-400
                                 after:content-[''] after:absolute after:w-0 after:h-full 
                                 after:bg-indigo-50 dark:after:bg-indigo-900/20 after:left-0 after:top-0 
                                 hover:after:w-full after:transition-all after:duration-300 after:-z-10"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link to="/wishlist" className="p-2 hover:bg-white/10 rounded-full transition-all duration-300">
              <Heart className="h-7 w-7 text-white" />
            </Link>

            <Link to="/cart" className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 relative">
              <ShoppingCart className="h-7 w-7 text-white" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-orange-500 rounded-full w-6 h-6 
                               text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

        </nav>

        {/* Mobile Search Bar */}
        <div className="md:hidden py-2">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2.5 rounded-full border border-white/30 bg-white/10 
                         text-white placeholder-white/70 text-sm focus:ring-2 focus:ring-white"
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-white/70" />
            </div>
          </form>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-white dark:bg-gray-900 shadow-lg z-40 
                     overflow-y-auto animate-slide-down px-4 py-4">
          {/* Mobile Search */}
          <div className="mb-4">
            <form onSubmit={handleSearchSubmit}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                           dark:bg-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500"
                />
                <Search className="absolute right-4 top-3 h-5 w-5 text-white/70" />
              </div>
            </form>
            {searchResults.length > 0 && (
              <div className="mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    to={`/product/${result.id}`}
                    onClick={() => {
                      setSearchResults([]);
                      setSearchQuery('');
                      setIsMenuOpen(false);
                      window.scrollTo(0, 0);
                    }}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <img 
                      src={result.image} 
                      alt={result.name} 
                      className="w-10 h-10 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-medium text-sm text-gray-900 dark:text-white">{result.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">${result.price}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <div className="px-2 py-2 space-y-1">
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Account</div>
              {[
                { name: 'Login', path: '/login' },
                { name: 'Register', path: '/register' },
                { name: 'My Profile', path: '/profile' },
                { name: 'Address List', path: '/address-list' },
                { name: 'Orders', path: '/orders' },
                { name: 'Wishlist', path: '/wishlist' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={handleMenuItemClick}
                  className="flex items-center px-3 py-1 text-xs text-gray-700 dark:text-gray-200 
                           hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg 
                           transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Shopping</div>
              <Link
                to="/cart"
                onClick={handleMenuItemClick}
                className="flex items-center justify-between px-3 py-1 text-xs text-gray-700 dark:text-gray-200 
                         hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg 
                         transition-colors duration-200"
              >
                <span className="flex items-center">
                  <ShoppingCart className="w-4 h-4 mr-3" />
                  Cart
                </span>
                {cartCount > 0 && (
                  <span className="bg-indigo-600 text-white rounded-full px-1.5 py-0.5 text-[10px]">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                to="/wishlist"
                onClick={handleMenuItemClick}
                className="flex items-center px-3 py-1 text-xs text-gray-700 dark:text-gray-200 
                         hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg 
                         transition-colors duration-200"
              >
                <Heart className="w-4 h-4 mr-3" />
                Wishlist
              </Link>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Settings</div>
              <button
                onClick={() => {
                  toggleDarkMode();
                  handleMenuItemClick();
                }}
                className="flex items-center w-full px-3 py-1 text-xs text-gray-700 dark:text-gray-200 
                         hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg 
                         transition-colors duration-200"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 mr-3" />
                ) : (
                  <Moon className="w-4 h-4 mr-3" />
                )}
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </button>
              <Link
                to="/help"
                onClick={handleMenuItemClick}
                className="flex items-center px-3 py-1 text-xs text-gray-700 dark:text-gray-200 
                         hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-lg 
                         transition-colors duration-200"
              >
                <HelpCircle className="w-4 h-4 mr-3" />
                Help
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}