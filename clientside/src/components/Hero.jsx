import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200',
    title: 'Summer Collection 2024',
    subtitle: 'Up to 50% Off on Selected Items',
    cta: 'Shop Collection',
    description: 'Discover our latest summer essentials, from breezy dresses to stylish accessories.'
  },
  {
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1200',
    title: 'Tech Essentials',
    subtitle: 'Latest Gadgets & Accessories',
    cta: 'Shop Now',
    description: 'Explore our curated selection of premium tech products and smart devices.'
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const slideRef = useRef(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      nextSlide();
    } else {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      ref={slideRef}
      className="relative h-[400px] sm:h-[500px] overflow-hidden touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${index === currentSlide ? 'translate-x-0' : 'translate-x-full'}`}
          style={{ touchAction: 'pan-y pinch-zoom' }}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </div>
          <div className="relative h-full flex items-center justify-center text-white px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div>
                <h2 className="text-2xl sm:text-5xl lg:text-7xl font-bold mb-2 sm:mb-6">{slide.title}</h2>
                <p className="text-lg sm:text-2xl lg:text-4xl font-light">{slide.subtitle}</p>
              </div>
              <p className="text-xs sm:text-xl lg:text-2xl max-w-3xl mx-auto text-gray-200">{slide.description}</p>
              <div className="flex items-center justify-center">
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full text-sm sm:text-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="hidden sm:block absolute left-12 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-5 rounded-full transition-all duration-300 transform hover:scale-110"
      >
        <ChevronLeft className="h-8 w-8" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden sm:block absolute right-12 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-5 rounded-full transition-all duration-300 transform hover:scale-110"
      >
        <ChevronRight className="h-8 w-8" />
      </button>

      <div className="absolute bottom-4 sm:bottom-12 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'}`}
          />
        ))}
      </div>
    </div>
  );
}
