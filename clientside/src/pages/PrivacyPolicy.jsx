import React from 'react';
import { Shield } from 'lucide-react';

function PrivacyPolicy() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <Shield className="mx-auto h-12 w-12 text-indigo-600" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Privacy Policy</h1>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Personal Information</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We collect information that you provide directly to us, including name, email address,
                shipping address, and payment information.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Usage Information</h3>
              <p className="text-gray-600 dark:text-gray-400">
                We collect information about how you use our website, including browsing history,
                search queries, and interaction with products.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>• Process your orders and payments</li>
              <li>• Send order confirmations and updates</li>
              <li>• Provide customer support</li>
              <li>• Improve our website and services</li>
              <li>• Send marketing communications (with your consent)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Data Security</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-gray-600 dark:text-gray-400">
              We implement appropriate security measures to protect your personal information
              from unauthorized access, disclosure, or destruction.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPolicy;