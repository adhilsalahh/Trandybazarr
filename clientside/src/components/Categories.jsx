import React from 'react';
import { Link } from 'react-router-dom';
import { Shirt, Watch, Smartphone, Laptop, Home, ShoppingBag } from 'lucide-react';

const categories = [
  { id: '1', name: 'Fashion', icon: Shirt, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=600', itemCount: 520 },
  { id: '2', name: 'Accessories', icon: Watch,    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=600', itemCount: 230 },
  { id: '3', name: 'Phones', icon: Smartphone,    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600', itemCount: 180 },
  { id: '4', name: 'Electronics', icon: Laptop,    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=600', itemCount: 340 },
  { id: '5', name: 'Home & Living', icon: Home,     image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&q=80&w=600', itemCount: 420 },
  { id: '6', name: 'All Categories', icon: ShoppingBag,   image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=600', itemCount: 1800 },
];

function Categories() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                to={`/category/${category.name.toLowerCase()}`}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow"
              >
                <Icon className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
                <h3 className="text-lg font-semibold">{category.name}</h3>
                <p className="text-gray-600">{category.itemCount}+ items</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;