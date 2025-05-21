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
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product?.colors?.length) setSelectedColor(product.colors[0]);
    if (product?.sizes?.length) setSelectedSize(product.sizes[0]);
  }, [id, product]);

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      showToast('Please select a size');
      return;
    }
    const selectedProduct = {
      ...product,
      quantity,
      color: selectedColor,
      size: selectedSize,
    };
    navigate('/buy-now', { state: { product: selectedProduct } });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      showToast('Please select a size');
      return;
    }
    addToCart({ ...product, quantity, color: selectedColor, size: selectedSize });
    showToast(`${product.name} added to cart`);
  };

  const handleImageHover = (e) => {
    if (!zoomImage) return;
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
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

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      user: 'John Doe',
      rating: 4,
      date: '2023-05-15',
      title: 'Great product!',
      comment: 'The quality is excellent and it fits perfectly. Very satisfied with my purchase.',
      verified: true
    },
    {
      id: 2,
      user: 'Jane Smith',
      rating: 5,
      date: '2023-04-28',
      title: 'Absolutely love it!',
      comment: 'Exceeded my expectations. The color is exactly as shown in the pictures.',
      verified: false
    },
    {
      id: 3,
      user: 'Robert Johnson',
      rating: 3,
      date: '2023-03-10',
      title: 'Good but could be better',
      comment: 'The material is nice but the sizing runs a bit small. Would recommend ordering a size up.',
      verified: true
    }
  ];

  return(
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/" className="text-gray-700 hover:text-gray-900 text-sm">
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <Link to="/products" className="ml-1 text-gray-700 hover:text-gray-900 text-sm">
                Products
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="ml-1 text-gray-500 text-sm">{product.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4 relative">
          <div 
            className="bg-gray-100 rounded-lg overflow-hidden relative cursor-zoom-in"
            onMouseEnter={() => setZoomImage(true)}
            onMouseLeave={() => setZoomImage(false)}
            onMouseMove={handleImageHover}
          >
            <img
              src={product.images[selectedImage].imageUrl}
              alt={product.name}
              className="w-full h-[500px] object-contain"
            />
            {zoomImage && (
              <div 
                className="hidden lg:block absolute top-0 left-[calc(100%+20px)] w-full h-full bg-no-repeat bg-contain bg-white border"
                style={{
                  backgroundImage: `url(${product.images[selectedImage].imageUrl})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  width: '500px',
                  height: '500px',
                  left: 'calc(100% + 20px)'
                }}
              />
            )}
            
            <div className="absolute top-4 left-4 flex flex-col space-y-2">
              <button
                onClick={() => {
                  toggleWishlist(product);
                  showToast(`${product.name} ${wishlist.includes(product) ? 'removed from' : 'added to'} wishlist`);
                }}
                className="p-2 bg-white rounded-full shadow hover:bg-gray-100"
              >
                <Heart className={`w-5 h-5 ${wishlist.includes(product) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
              </button>
            </div>
            
            {product.discountPrice && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-indigo-500' : 'border-transparent'
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

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{product.name}</h1>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
              <span className="ml-1 text-sm text-gray-600">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-sm text-gray-500">({product.reviews || reviews.length} reviews)</span>
            {product.stock === 'in_stock' ? (
              <span className="text-sm text-green-600">In Stock</span>
            ) : (
              <span className="text-sm text-red-600">Out of Stock</span>
            )}
          </div>

          <div className="space-y-2">
            {product.discountPrice ? (
              <>
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-900">₹{product.discountPrice}</span>
                  <span className="text-xl text-gray-500 line-through">₹{product.price}</span>
                 <span className="text-green-600 font-medium">
  {`${Math.round(((product.price - product.discountPrice) / product.price) * 100)}% off`}
</span>
                </div>
                <div className="text-sm text-gray-500">Inclusive of all taxes</div>
              </>
            ) : (
              <>
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
                <div className="text-sm text-gray-500">Inclusive of all taxes</div>
              </>
            )}
          </div>

          {/* Offers */}
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-gray-900">Available offers</h3>
            <div className="flex items-start">
              <div className="flex-shrink-0 text-green-600 mt-1">
                <Check className="w-4 h-4" />
              </div>
              <p className="ml-2 text-sm text-gray-600">
                <span className="font-medium">Bank Offer</span> 10% off on Axis Bank Credit Card and EMI Transactions, up to ₹1,250. On orders of ₹5,000 and above
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 text-green-600 mt-1">
                <Check className="w-4 h-4" />
              </div>
              <p className="ml-2 text-sm text-gray-600">
                <span className="font-medium">Special Price</span> Get extra 5% off (price inclusive of discount)
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 text-green-600 mt-1">
                <Check className="w-4 h-4" />
              </div>
              <p className="ml-2 text-sm text-gray-600">
                <span className="font-medium">Partner Offer</span> Sign up for Pay Later and get Gift Card worth ₹100
              </p>
            </div>
          </div>

          {/* Color Selection */}
          {product.colors?.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block font-medium text-gray-900">Color:</label>
                <span className="text-sm text-gray-500">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${selectedColor === color ? 'border-indigo-500' : 'border-gray-300'}`}
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes?.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block font-medium text-gray-900">Size:</label>
                <button className="text-sm text-indigo-600 hover:text-indigo-500">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
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
          )}

          {/* Quantity */}
          <div className="space-y-2">
            <label className="block font-medium text-gray-900">Quantity:</label>
            <div className="flex items-center border rounded-md w-max">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-4 py-1 text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock !== 'in_stock'}
              className={`py-3 px-4 rounded-lg font-medium ${
                product.stock === 'in_stock'
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              disabled={product.stock !== 'in_stock'}
              className={`py-3 px-4 rounded-lg font-medium ${
                product.stock === 'in_stock'
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Buy Now
            </button>
          </div>

          {/* Delivery Info */}
          <div className="border rounded-lg p-4 space-y-3">
            <h3 className="font-medium text-gray-900">Delivery Options</h3>
            <div className="flex items-start">
              <div className="flex-shrink-0 text-gray-400 mt-1">
                <Check className="w-4 h-4" />
              </div>
              <p className="ml-2 text-sm text-gray-600">
                <span className="font-medium">Free Delivery</span> on orders over ₹499
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 text-gray-400 mt-1">
                <Check className="w-4 h-4" />
              </div>
              <p className="ml-2 text-sm text-gray-600">
                <span className="font-medium">Cash on Delivery</span> available
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 text-gray-400 mt-1">
                <Check className="w-4 h-4" />
              </div>
              <p className="ml-2 text-sm text-gray-600">
                <span className="font-medium">7 days</span> easy returns
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12 border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('description')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'description'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('specifications')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'specifications'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'reviews'
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Reviews ({reviews.length})
          </button>
        </nav>
      </div>

      <div className="py-8">
        {activeTab === 'description' && (
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold mb-4">Product Description</h3>
            <p className="text-gray-700">{product.description}</p>
            
            {product.material && (
              <div className="mt-4">
                <h4 className="font-medium">Material & Care</h4>
                <p className="text-gray-700">{product.material}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Product Specifications</h3>
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-1/3">Brand</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.brand || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Type</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.Producttype}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Style</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.Type}</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sizes</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.sizes?.join(', ') || 'Not specified'}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Colors</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {product.colors?.join(', ') || 'Not specified'}
                    </td>
                  </tr>
                  {product.dimensions && (
                    <>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Dimensions</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.dimensions.height} x {product.dimensions.width} x {product.dimensions.depth} cm
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Weight</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {product.weight} grams
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Customer Reviews</h3>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                Write a Review
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="text-xl font-bold text-center mb-2">
                  {product.rating.toFixed(1)} out of 5
                </h4>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-center text-gray-600 text-sm">
                  {reviews.length} global ratings
                </p>

                <div className="mt-6 space-y-3">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = reviews.filter(r => Math.floor(r.rating) === star).length;
                    const percentage = (count / reviews.length) * 100;
                    
                    return (
                      <div key={star} className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 w-8">{star} star</span>
                        <div className="flex-1 mx-2 h-2.5 bg-gray-200 rounded-full">
                          <div
                            className="h-2.5 bg-yellow-400 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-500 w-8">{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <h4 className="font-medium text-gray-900">{review.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">by {review.user} on {review.date}</p>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in-up">
          {notificationMessage}
        </div>
      )}
    </div>
    );
  }
  
export default ProductPage;