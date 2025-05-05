import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useShop } from '../context/useShop';

function Checkout() {
  const { cart } = useShop();
  const [expandedSections, setExpandedSections] = useState({
    address: true,
    payment: false,
    coupon: false,
    summary: false
  });
  const [isLoggedIn] = useState(false); // Replace with actual auth state
  const [selectedAddress, setSelectedAddress] = useState('');
  const [saveAddress, setSaveAddress] = useState(false);

  const savedAddresses = [
    {
      id: '1',
      name: 'John Doe',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip: '10001',
      country: 'United States'
    },
    {
      id: '2',
      name: 'John Doe',
      street: '456 Park Ave',
      city: 'Los Angeles',
      state: 'CA',
      zip: '90001',
      country: 'United States'
    }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  };

  const calculateShipping = (subtotal) => {
    return subtotal > 100 ? 0 : 10;
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.1; // 10% tax
  };

  const subtotal = calculateSubtotal();
  const shipping = calculateShipping(subtotal);
  const tax = calculateTax(subtotal);
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full p-6 shadow-lg">
        {/* Billing Address */}
        <div className="mb-8 border-b pb-8">
          <button
            onClick={() => toggleSection('address')}
            className="w-full flex items-center justify-between text-lg font-semibold mb-4 
                     hover:text-indigo-600 transition-colors duration-200 group"
          >
            <span className="flex items-center">
              <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center 
                           justify-center mr-3 text-indigo-600 dark:text-indigo-400 
                           group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 
                           transition-colors duration-200">1</span>
              Shipping Address
            </span>
            {expandedSections.address ? 
              <ChevronUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400 
                                 group-hover:transform group-hover:-translate-y-1 transition-transform duration-200" /> : 
              <ChevronDown className="w-5 h-5 text-indigo-600 dark:text-indigo-400 
                                   group-hover:transform group-hover:translate-y-1 transition-transform duration-200" />
            }
          </button>
          
          {expandedSections.address && (
            <div className="space-y-4">
              {isLoggedIn && savedAddresses.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Saved Addresses</h4>
                  <div className="space-y-2">
                    {savedAddresses.map(address => (
                      <label key={address.id} className="flex items-start space-x-3 p-3 border rounded-lg 
                                                     cursor-pointer hover:border-indigo-500 
                                                     hover:shadow-md transition-all duration-200 
                                                     hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                        <input
                          type="radio"
                          name="address"
                          value={address.id}
                          checked={selectedAddress === address.id}
                          onChange={(e) => setSelectedAddress(e.target.value)}
                          className="mt-1 text-indigo-600"
                        />
                        <div>
                          <p className="font-medium">{address.name}</p>
                          <p className="text-sm text-gray-600">{address.street}</p>
                          <p className="text-sm text-gray-600">{`${address.city}, ${address.state} ${address.zip}`}</p>
                          <p className="text-sm text-gray-600">{address.country}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  <div className="mt-4">
                    <button className="text-indigo-600 hover:text-indigo-700 font-medium 
                                   transition-colors duration-200 hover:underline">
                      + Add New Address
                    </button>
                  </div>
                </div>
              )}

              {(!isLoggedIn || selectedAddress === 'new') && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 
                             focus:border-transparent transition-all duration-200 
                             hover:border-indigo-300"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 
                             focus:border-transparent transition-all duration-200 
                             hover:border-indigo-300"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Street Address"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="State/Province"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="ZIP/Postal Code"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <select className="w-full px-4 py-2 border rounded-lg">
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                  </select>
                </div>
              )}

              {!isLoggedIn && (
                <label className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    checked={saveAddress}
                    onChange={(e) => setSaveAddress(e.target.checked)}
                    className="rounded text-indigo-600"
                  />
                  <span className="ml-2">Save this address to your address list for future use</span>
                </label>
              )}
            </div>
          )}
        </div>
        
        <label className="flex items-center mt-4">
          <input type="checkbox" className="rounded text-indigo-600" />
          <span className="ml-2">Same as Shipping Address</span>
        </label>
        
        {/* Payment Method */}
        <div className="mb-8 border-b pb-8">
          <button
            onClick={() => toggleSection('payment')}
            className="w-full flex items-center justify-between text-lg font-semibold mb-4 
                     hover:text-indigo-600 transition-colors duration-200 group"
          >
            <span className="flex items-center">
              <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center 
                           justify-center mr-3 text-indigo-600 dark:text-indigo-400 
                           group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 
                           transition-colors duration-200">2</span>
              Payment Method
            </span>
            {expandedSections.payment ? 
              <ChevronUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400 
                                 group-hover:transform group-hover:-translate-y-1 transition-transform duration-200" /> : 
              <ChevronDown className="w-5 h-5 text-indigo-600 dark:text-indigo-400 
                                   group-hover:transform group-hover:translate-y-1 transition-transform duration-200" />
            }
          </button>
          
          {expandedSections.payment && (
            <div className="space-y-4">
              <div className="border rounded-lg p-4 hover:border-indigo-500 hover:shadow-md 
                           transition-all duration-200">
                <label className="flex items-center">
                  <input type="radio" name="payment" className="text-indigo-600" />
                  <span className="ml-2">Credit/Debit Card</span>
                </label>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <label className="flex items-center">
                  <input type="radio" name="payment" className="text-indigo-600" />
                  <span className="ml-2">UPI/Net Banking</span>
                </label>
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="UPI ID or Select Bank"
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <label className="flex items-center">
                  <input type="radio" name="payment" className="text-indigo-600" />
                  <span className="ml-2">Cash on Delivery</span>
                </label>
              </div>
            </div>
          )}
        </div>
        
        {/* Coupon Code */}
        <div className="mb-8 border-b pb-8">
          <button
            onClick={() => toggleSection('coupon')}
            className="w-full flex items-center justify-between text-lg font-semibold mb-4 
                     hover:text-indigo-600 transition-colors duration-200 group"
          >
            <span className="flex items-center">
              <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center 
                           justify-center mr-3 text-indigo-600 dark:text-indigo-400 
                           group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 
                           transition-colors duration-200">3</span>
              Apply Coupon
            </span>
            {expandedSections.coupon ? 
              <ChevronUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400 
                                 group-hover:transform group-hover:-translate-y-1 transition-transform duration-200" /> : 
              <ChevronDown className="w-5 h-5 text-indigo-600 dark:text-indigo-400 
                                   group-hover:transform group-hover:translate-y-1 transition-transform duration-200" />
            }
          </button>
          
          {expandedSections.coupon && (
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter coupon code"
                className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 
                         focus:border-transparent transition-all duration-200 
                         hover:border-indigo-300 uppercase"
              />
              <button
                className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 
                         transform hover:scale-105 transition-all duration-200 
                         hover:shadow-md active:scale-95"
              >
                Apply
              </button>
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="mb-8 border-b pb-8">
          <button
            onClick={() => toggleSection('summary')}
            className="w-full flex items-center justify-between text-lg font-semibold mb-4 
                     hover:text-indigo-600 transition-colors duration-200 group"
          >
            <span className="flex items-center">
              <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center 
                           justify-center mr-3 text-indigo-600 dark:text-indigo-400 
                           group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800 
                           transition-colors duration-200">4</span>
              Order Summary
            </span>
            {expandedSections.summary ? 
              <ChevronUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400 
                                 group-hover:transform group-hover:-translate-y-1 transition-transform duration-200" /> : 
              <ChevronDown className="w-5 h-5 text-indigo-600 dark:text-indigo-400 
                                   group-hover:transform group-hover:translate-y-1 transition-transform duration-200" />
            }
          </button>
          
          {expandedSections.summary && (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center p-4 rounded-lg 
                                          hover:bg-gray-50 dark:hover:bg-gray-700/50 
                                          transition-colors duration-200">
                  <div className="flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div className="ml-4">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                    </div>
                  </div>
                  <span className="font-medium">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:justify-between">
          <Link
            to="/cart"
            className="w-full sm:w-auto px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 
                     transition-all duration-200 hover:border-indigo-300 
                     hover:text-indigo-600 text-center"
          >
            Back to Cart
          </Link>
          <button
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 
                     transform hover:scale-105 transition-all duration-200 
                     hover:shadow-md active:scale-95"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;