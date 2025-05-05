import React from 'react';

export default function BuyNow() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Address Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
          <div className="space-y-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between border p-3 rounded-xl">
                <input
                  type="radio"
                  name="address"
                  id="address1"
                  className="form-radio text-indigo-600"
                />
                <div className="ml-3">
                  <p className="font-medium">Adhil Salah</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Kerala, India - 679584
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border p-3 rounded-xl">
                <input
                  type="radio"
                  name="address"
                  id="address2"
                  className="form-radio text-indigo-600"
                />
                <div className="ml-3">
                  <p className="font-medium">Faster Dev</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Chennai, India - 600001
                  </p>
                </div>
              </div>
            </div>
            <button className="w-full py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add New Address
            </button>
          </div>
        </div>
      </div>

      {/* Shipping Method */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
          <div className="space-y-3">
            <div className="flex justify-between p-3 border rounded-xl">
              <input
                type="radio"
                name="shipping"
                id="standard"
                defaultChecked
                className="form-radio text-indigo-600"
              />
              <div className="ml-3">
                <p className="font-medium">Standard Delivery</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">3-5 days</p>
              </div>
              <p className="ml-auto font-medium">Free</p>
            </div>
            <div className="flex justify-between p-3 border rounded-xl">
              <input
                type="radio"
                name="shipping"
                id="express"
                className="form-radio text-indigo-600"
              />
              <div className="ml-3">
                <p className="font-medium">Express Delivery</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">1-2 days</p>
              </div>
              <p className="ml-auto font-medium">₹99</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="space-y-3">
            <div className="flex justify-between p-3 border rounded-xl">
              <input
                type="radio"
                name="payment"
                id="cod"
                defaultChecked
                className="form-radio text-indigo-600"
              />
              <p className="ml-3 font-medium">Cash on Delivery</p>
            </div>
            <div className="flex justify-between p-3 border rounded-xl">
              <input
                type="radio"
                name="payment"
                id="card"
                className="form-radio text-indigo-600"
              />
              <p className="ml-3 font-medium">Credit/Debit Card</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹500</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹99</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹45</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-medium">
              <span>Total</span>
              <span>₹644</span>
            </div>
            <button className="w-full mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
