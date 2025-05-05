import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

function Layout({ children }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {children}
      <button
        onClick={scrollToTop}
        type="button"
        aria-label="Scroll to top"
        className={`fixed bottom-4 right-4 p-3 bg-indigo-600 text-white rounded-full shadow-lg z-50
                   hover:bg-indigo-700 transition-all duration-300 ${
                     showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'
                   }`}
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
}

export default Layout;