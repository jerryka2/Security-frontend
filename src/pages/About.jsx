import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-green-900 to-teal-700 py-14 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-15 z-0"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white flex items-center justify-center gap-3">
            <span className="text-2xl sm:text-3xl text-lime-300 animate-pulse">⚡️</span>
            Our EV Charging Network
          </h1>
          <p className="mt-3 text-base sm:text-lg font-medium text-gray-100 leading-relaxed max-w-xl mx-auto">
            Leading the charge with innovative, sustainable EV charging solutions.
          </p>
          <div className="w-16 h-1 bg-lime-300 mx-auto rounded-full mt-3 animate-scale-in"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-14">
        {/* About Section */}
        <div className="relative mb-12">
          <div className="grid md:grid-cols-5 gap-6 items-start">
            <div className="md:col-span-3 relative z-10">
              <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-green-600 animate-slide-in">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Who We Are</h2>
                <p className="text-base sm:text-lg font-medium text-gray-700 leading-relaxed mb-4">
                  Our EV Charging Network is transforming the way electric vehicles are powered, offering fast, reliable, and eco-friendly charging across the nation.
                </p>
                <p className="text-base sm:text-lg font-medium text-gray-700 leading-relaxed">
                  With state-of-the-art technology and a commitment to renewable energy, we ensure every charge supports a sustainable future.
                </p>
              </div>
            </div>
            <div className="md:col-span-2 relative">
              <div className="relative">
                <img
                  className="w-full h-auto rounded-xl shadow-lg border border-green-200/30"
                  src={assets.about_image}
                  alt="EV Charging Network"
                />
                <div className="absolute inset-0 border-4 border-lime-300/30 rounded-xl -z-10 transform -translate-x-3 translate-y-3"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-green-50 rounded-xl p-6 shadow-md border-l-4 border-green-600 mb-12 animate-slide-in delay-200">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">Our Mission</h3>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            To empower drivers with a seamless, green, and accessible EV charging experience, paving the way for a cleaner tomorrow.
          </p>
        </div>

        {/* Why Choose Us Section */}
        <div className="text-center mb-10">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 animate-slide-in">
            Why Choose Our Network
          </h2>
          <div className="w-12 h-1 bg-green-600 mx-auto rounded-full animate-scale-in"></div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              title: 'High-Speed Charging',
              description: 'Power up quickly with our cutting-edge, ultra-fast stations.',
              icon: '⚡',
            },
            {
              title: 'Eco-Friendly Energy',
              description: 'Charge sustainably with renewable energy sources.',
              icon: '🌿',
            },
            {
              title: 'Nationwide Coverage',
              description: 'Access our stations anywhere, anytime.',
              icon: '🗺️',
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 border border-green-100 group"
            >
              <div className="text-3xl mb-3 text-green-600">{feature.icon}</div>
              <h3 className="text-base font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-xs leading-relaxed">{feature.description}</p>
              <div className="mt-3 w-full h-0.5 bg-green-100 rounded-full">
                <div className="h-0.5 bg-green-600 rounded-full w-1/3 transition-all duration-300 group-hover:w-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Tailwind Animation Styles */}
      <style jsx>{`
        @keyframes slide-in {
          0% {
            opacity: 0;
            transform: translateY(12px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.5s ease-out;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes scale-in {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default About;