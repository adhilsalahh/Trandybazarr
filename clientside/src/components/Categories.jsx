import React from 'react';
import { Link } from 'react-router-dom';
import {
  Shirt, Watch, Smartphone, Laptop, Home, ShoppingBag,
} from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
  {
    id: '1',
    name: 'Fashion',
    icon: Shirt,
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600',
    itemCount: 520,
  },
  {
    id: '2',
    name: 'Accessories',
    icon: Watch,
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=600',
    itemCount: 230,
  },
  {
    id: '3',
    name: 'Phones',
    icon: Smartphone,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600',
    itemCount: 180,
  },
  {
    id: '4',
    name: 'Electronics',
    icon: Laptop,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=600',
    itemCount: 340,
  },
  {
    id: '5',
    name: 'Home & Living',
    icon: Home,
    image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=600',
    itemCount: 420,
  },
  {
    id: '6',
    name: 'All Categories',
    icon: ShoppingBag,
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=600',
    itemCount: 1800,
  },
];

function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/category/${category.name.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl bg-white transition duration-300"
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition duration-300 flex flex-col justify-end p-4">
                    <div className="flex items-center gap-2 text-white">
                      <Icon className="w-6 h-6 text-white" />
                      <h3 className="text-lg font-bold">{category.name}</h3>
                    </div>
                    <p className="text-sm text-white mt-1">{category.itemCount}+ items</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;
