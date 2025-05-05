import React from 'react';
import { RotateCcw } from 'lucide-react';

export default function ReturnPolicy() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <RotateCcw className="mx-auto h-12 w-12 text-indigo-600" />
        <h1 className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">Return Policy</h1>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">Return Window</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <p className="text-gray-600 dark:text-gray-400">
              Items can be returned within 30 days of delivery for a full refund.
              The item must be unused and in the same condition that you received it.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Return Process</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">1. Initiate Return</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Log into your account and select the order containing the item you wish to return.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">2. Print Label</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Print the prepaid return shipping label provided.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">3. Ship Item</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Pack the item securely and attach the return label.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">4. Refund</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Once we receive and inspect the item, we'll process your refund.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Non-Returnable Items</h2>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
              <li>Personalized items</li>
              <li>Intimate apparel</li>
              <li>Health and personal care items</li>
              <li>Items marked as final sale</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
