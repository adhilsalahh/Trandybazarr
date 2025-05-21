import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Features from './components/Features';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';
import Layout from './components/Layout';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Help from './pages/Help';
import ShippingInfo from './pages/ShippingInfo';
import ReturnPolicy from './pages/ReturnPolicy';
import Checkout from './pages/Checkout';
import BuyNow from './pages/BuyNow';
import TrackOrder from './pages/TrackOrder';
import ForgotPassword from './pages/ForgotPassword';
import AddressList from './pages/AddressList';
import SupplierLogin from './pages/SupplierLogin';
import SupplierRegister from './pages/SupplierRegister';
import SizeGuide from './pages/SizeGuide';
import PrivacyPolicy from './pages/PrivacyPolicy';
import About from './pages/About';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';

function ScrollToTopWrapper() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
}

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchProducts = async (retryCount = 0, delay = 1000) => {
    try {
      setLoading(true);
      const response = await fetch('https://trendybazarr.onrender.com/api/data/gets');

      if (response.status === 429) {
        if (retryCount < 3) {
          await new Promise((resolve) => setTimeout(resolve, delay));
          return fetchProducts(retryCount + 1, delay * 2);
        } else {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data.data || []);
      setError(null);
    } catch (err) {
      console.error('Fetch Error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto"></div>
  //         <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button
            onClick={fetchProducts}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router basename="/TrendyBazarr">
      <ScrollToTopWrapper />
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <Layout>
          <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <Routes>
              <Route
                path="/"
                element={
                  <main>
                    <Hero />
                    <Features />
                    <Categories />
                    <FeaturedProducts Products={products} />
                  </main>
                }
              />
              <Route path="/category/:category" element={<CategoryPage Products={products} />} />
              <Route path="/product/:id" element={<ProductPage Products={products} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/buy-now" element={<BuyNow />} />
              <Route path="/help" element={<Help />} />
              <Route path="/shipping-info" element={<ShippingInfo />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/track-order" element={<TrackOrder />} />
              <Route path="/size-guide" element={<SizeGuide />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/about-us" element={<About />} />
              <Route path="/contact-us" element={<Contact />} />
              <Route path="/faqs" element={<FAQ />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/address-list" element={<AddressList />} />
              <Route path="/supplier/login" element={<SupplierLogin />} />
              <Route path="/supplier/register" element={<SupplierRegister />} />
            </Routes>
            <Footer />
          </div>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
