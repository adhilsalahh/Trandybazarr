import React from 'react';
import { Link } from 'react-router-dom';

const collections = [
  {
    id: '1',
    name: 'Summer Essentials',
    description: 'Beat the heat in style',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1200',
    link: '/category/summer-essentials'
  },
  {
    id: '2',
    name: 'Workwear Edit',
    description: 'Professional looks for every day',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=1200',
    link: '/category/workwear-edit'
  },
  {
    id: '3',
    name: 'Active & Sport',
    description: 'Performance meets style',
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&q=80&w=1200',
    link: '/category/active-sport'
  }
];

export default function Features() {
  return (
    <section className="py-16 bg-teal-50/50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            Trending Collections
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-tiny sm:text-lg">
            Discover our latest curated collections
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={collection.link}
              className="group flex flex-col"
            >
              <div className="relative overflow-hidden rounded-lg sm:rounded-2xl aspect-[1/1] sm:aspect-[4/5]">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="mt-2 sm:mt-3 text-center">
                <h3 className="text-sm sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {collection.name}
                </h3>
                <p className="mt-0.5 sm:mt-1 text-tiny sm:text-sm text-gray-600 dark:text-gray-400">
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}