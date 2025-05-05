import React from 'react';
import { Store } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Store className="mx-auto h-12 w-12 text-indigo-600" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">About Us</h1>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-gray-600 dark:text-gray-400">
              Founded in 2024, ShopHub started with a simple mission: to provide high-quality products
              at affordable prices while delivering an exceptional shopping experience.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-2">Quality First</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We carefully curate our products to ensure they meet our high standards.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-2">Customer Satisfaction</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your satisfaction is our top priority, and we strive to exceed your expectations.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-2">Sustainability</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We're committed to reducing our environmental impact through eco-friendly practices.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-lg mb-2">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We continuously improve our platform to enhance your shopping experience.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}