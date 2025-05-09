import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function BuyNow() {
  const { state } = useLocation();
  const product = state?.product;

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">No product selected</h2>
        <Link to="/products" className="text-indigo-600">Back to products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Confirm Purchase</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.images?.[0]?.imageUrl}
            alt={product.name}
            className="w-full rounded-lg object-cover"
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Quantity:</strong> {product.quantity}</p>
          {product.color && <p><strong>Color:</strong> {product.color}</p>}
          {product.size && <p><strong>Size:</strong> {product.size}</p>}
          <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyNow;