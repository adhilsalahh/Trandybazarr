import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  ArrowUp,  // Added ArrowUp
  Mail
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 sm:gap-6 md:gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm md:text-base font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-1.5 md:space-y-2">
              {['Home', 'About Us', 'Contact Us', 'FAQs'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/\s+/g, '-').replace('faqs', 'faqs')}`}
                    className="text-xs md:text-sm text-white/90 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-sm md:text-base font-semibold mb-3">Customer Service</h3>
            <ul className="space-y-1.5 md:space-y-2">
              {[
                'Shipping Info',
                'Return Policy',
                'Track Order',
                'Size Guide',
                'Privacy Policy'
              ].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-xs md:text-sm text-white/90 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-sm md:text-base font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm">
              <li className="text-white/90">1234 Shopping Street</li>
              <li className="text-white/90">Retail City, RC 12345</li>
              <li className="text-white/90">Phone: (555) 123-4567</li>
              <li className="flex items-center text-white/90">
                <Mail className="h-3 w-3 md:h-4 md:w-4 mr-1.5 md:mr-2" />
                support@shophub.com
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-white text-sm md:text-base font-semibold mb-3">Newsletter</h3>
            <p className="mb-3 text-tiny sm:text-sm">Subscribe to get special offers and updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm rounded-l-lg bg-white/10 border border-white/30 
                         text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700
                               transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-white/20">
          <div className="flex justify-between items-center">
            <div className="flex space-x-6">
              {[ 
                { Icon: Facebook, link: 'https://facebook.com' },
                { Icon: Twitter, link: 'https://twitter.com' },
                { Icon: Instagram, link: 'https://instagram.com' },
                { Icon: Youtube, link: 'https://youtube.com' }
              ].map(({ Icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white transition-colors duration-200"
                >
                  <Icon className="h-4 w-4 md:h-6 md:w-6" />
                </a>
              ))}
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-white/80">
            © {new Date().getFullYear()} ShopHub. All rights reserved.
          </p>
        </div>
      </div>

      {/* Back to top button */}
      <div className="fixed bottom-4 right-4">
        <button
          onClick={scrollToTop}
          className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors duration-200"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      </div>
    </footer>
  );
}