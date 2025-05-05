
import React from 'react';
import { HelpCircle, Truck, RotateCcw, Phone, Mail } from 'lucide-react';

function Help() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <HelpCircle className="mx-auto h-12 w-12 text-indigo-600" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">How can we help you?</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Find answers to common questions and get support</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <Truck className="h-8 w-8 text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Shipping Information</h3>
          <p className="text-gray-600 dark:text-gray-400">Learn about our shipping methods, costs, and delivery times.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <RotateCcw className="h-8 w-8 text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Returns & Refunds</h3>
          <p className="text-gray-600 dark:text-gray-400">Find out how to return items and get your refund.</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <Phone className="h-8 w-8 text-indigo-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Contact Support</h3>
          <p className="text-gray-600 dark:text-gray-400">Get in touch with our customer support team.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Contact Us</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-6 w-6 text-indigo-600 mr-3" />
              <span className="text-gray-600 dark:text-gray-400">support@shophub.com</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-6 w-6 text-indigo-600 mr-3" />
              <span className="text-gray-600 dark:text-gray-400">1-800-SHOP-HUB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;