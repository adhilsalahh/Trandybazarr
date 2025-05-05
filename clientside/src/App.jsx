import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Features from './components/Features';
import FeaturedProducts from './components/FeaturedProducts';
import Footer from './components/Footer';
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
import Layout from './components/Layout';
import Products from './pages/Products';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import AdminPanel from './pages/AdminPanel';

function App() {

const [Products, setProducts] = useState([]);
const Product_DATA_GET = async () => {
  try {
    const response = await fetch('https://trendybazarr.onrender.com/api/data/gets');
    const data = await response.json();
    console.log(data);
    setProducts(data.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    React.useEffect(() => {
      Product_DATA_GET();

    }, [pathname]);
  
    return null;
  };

  return (
    <Router basename="/TrendyBazarr">
      <ScrollToTop />
      <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
        <Layout>
          <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <Routes>
              <Route path="/" element={
                <main>
                  <div>
                    <Hero />
                    <Features />
                    <Categories />
                    <FeaturedProducts Products={Products} />
                  </div>
                </main>
              } />
              <Route path="/products" element={<Products Products={Products} />} />
              <Route path="/category/:category" element={<CategoryPage Products={Products} />} />
              <Route path="/product/:id" element={<ProductPage Products={Products} />} />
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
              <Route path="/admin/dashboard" element={<AdminPanel />} />
            </Routes>
            <Footer />
          </div>
        </Layout>
      </div>
    </Router>
  );
}

export default App;