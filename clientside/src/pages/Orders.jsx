import React from 'react';
import { Package,} from 'lucide-react';

function Orders() {
  const orders = []; // Replace with actual orders

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No orders yet</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Start shopping to see your orders here</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Orders will be mapped here */}
        </div>
      )}
    </div>
  );
}

export default Orders;