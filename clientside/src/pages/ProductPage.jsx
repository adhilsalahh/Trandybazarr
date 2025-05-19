import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { useShop } from '../context/useShop';

function ProductPage({ Products }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = Products.find(p => p._id === id);
  const { addToCart, toggleWishlist, wishlist } = useShop();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleBuyNow = () => {
    const selectedProduct = {
      ...product,
      quantity,
      color: selectedColor,
      size: selectedSize,
    };
    navigate('/buy-now', { state: { product: selectedProduct } });
  };

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/products" className="text-indigo-600 hover:text-indigo-500">
          Browse all products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4 relative">
          <div className="bg-gray-100 rounded-lg overflow-hidden relative">
            <img
              src={product.images[selectedImage].imageUrl}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
            <button
              onClick={() => {
                toggleWishlist(product);
                showToast(`${product.name} ${wishlist.includes(product) ? 'removed from' : 'added to'} wishlist`);
              }}
              className="absolute top-4 left-4 p-2 bg-white rounded-full shadow hover:bg-gray-100"
            >
              <Heart className={`w-6 h-6 ${wishlist.includes(product) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
            </button>

          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`rounded-lg overflow-hidden ${
                  selectedImage === index ? 'ring-2 ring-indigo-500' : ''
                }`}
              >
            
                <img
                  src={image.imageUrl}
                  alt={product.name}
                  className="w-full h-24 object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span>({product.reviews} reviews)</span>
          </div>

          <div className="text-3xl font-bold">${product.price}</div>

          <div className="space-y-2">
            <label className="block font-medium">Select Color:</label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full"
            >
              <option value="">Select</option>
              {product.colors?.map((color, index) => (
                <option key={index} value={color}>{color}</option>
              ))}
            </select>

            <label className="block font-medium mt-4">Select Size:</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full"
            >
              <option value="">Select</option>
              {product.sizes?.map((size, index) => (
                <option key={index} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={handleBuyNow}
              className="bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
            >
              Buy Now
            </button>
            <button
              onClick={() => {
                addToCart({ ...product, quantity });
                showToast(`${product.name} added to cart`);
              }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Add to Cart
            </button>
          </div>

          <div className="prose">
            <h3 className="text-lg font-semibold">Description</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg">
          {notificationMessage}
        </div>
      )}
    </div>
  );
}

export default ProductPage;
