import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, ChevronRight, ChevronLeft, Check, X } from 'lucide-react';
import { useShop } from '../context/useShop';

function ProductPage({ Products }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = Products.find(p => p._id === id);
  const { addToCart, toggleWishlist, wishlist } = useShop();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product?.images?.length > 0) {
      setSelectedColor(product.images[0].color);
    }
    if (product?.size?.values?.length > 0) {
      setSelectedSize(product.size.values[0]);
    }
    // Check if product is in wishlist
    setIsFavorite(wishlist.some(item => item._id === product?._id));
  }, [product, wishlist]);

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/" className="text-indigo-600 hover:text-indigo-500">
          Return to Home
        </Link>
      </div>
    );
  }

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast('Please select a size');
      return;
    }
    if (!selectedColor) {
      showToast('Please select a color');
      return;
    }
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize
    });
    showToast('Added to cart successfully');
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      showToast('Please select a size');
      return;
    }
    if (!selectedColor) {
      showToast('Please select a color');
      return;
    }
    navigate('/buy-now', {
      state: {
        product: {
          ...product,
          quantity,
          color: selectedColor,
          size: selectedSize
        }
      }
    });
  };

  const handleImageHover = (e) => {
    if (!zoomImage) return;
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const toggleFavorite = () => {
    toggleWishlist(product);
    showToast(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  };

  // Get similar products based on category
  const similarProducts = Products.filter(p => 
    p.category === product.category && p._id !== product._id
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Product Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div 
            className="relative overflow-hidden rounded-lg bg-gray-100"
            onMouseEnter={() => setZoomImage(true)}
            onMouseLeave={() => setZoomImage(false)}
            onMouseMove={handleImageHover}
          >
            {/* Favorite Button */}
            <button
              onClick={toggleFavorite}
              className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart 
                className={`w-6 h-6 ${isFavorite ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
              />
            </button>
            
            <img
              src={product.images[selectedImage].imageUrl}
              alt={product.name}
              className="w-full h-[500px] object-contain cursor-zoom-in"
            />
            {zoomImage && (
              <div 
                className="hidden lg:block absolute top-0 left-[calc(100%+20px)] w-[500px] h-[500px] 
                         bg-white border rounded-lg overflow-hidden shadow-xl z-20"
                style={{
                  backgroundImage: `url(${product.images[selectedImage].imageUrl})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundSize: '200%',
                  backgroundRepeat: 'no-repeat'
                }}
              />
            )}
            
            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
                <button
                  onClick={() => setSelectedImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors z-10"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>
              </>
            )}
          </div>

          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
                <img
                  src={image.imageUrl}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviews || 0} reviews)
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-3xl font-bold text-gray-900">
              ₹{product.discountPrice || product.price}
            </p>
            {product.discountPrice && (
              <p className="text-sm text-gray-500">
                <span className="line-through">₹{product.price}</span>
                <span className="ml-2 text-green-600">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off
                </span>
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedColor(image.color);
                      setSelectedImage(index);
                    }}
                    className={`relative w-10 h-10 rounded-full ${
                      selectedColor === image.color
                        ? 'ring-2 ring-indigo-500 ring-offset-2'
                        : ''
                    }`}
                    style={{ backgroundColor: image.color }}
                  >
                    <span className="sr-only">{image.color}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.size.values.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium ${
                      selectedSize === size
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="mt-2 flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 border rounded-md"
                >
                  -
                </button>
                <span className="text-lg font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 border rounded-md"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 
                     transition-colors duration-200"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 
                     transition-colors duration-200"
            >
              Buy Now
            </button>
          </div>

          <div className="prose max-w-none">
            <h3 className="text-lg font-medium">Product Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {similarProducts.map((similarProduct) => (
            <Link
              key={similarProduct._id}
              to={`/product/${similarProduct._id}`}
              className="group"
            >
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={similarProduct.images[0].imageUrl}
                  alt={similarProduct.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform 
                         duration-300"
                />
              </div>
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-900">{similarProduct.name}</h3>
                <p className="text-sm text-gray-500">₹{similarProduct.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

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

export default ProductPage;