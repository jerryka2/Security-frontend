import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="relative bg-gradient-to-b from-white to-teal-50 min-h-screen overflow-hidden">
      {/* Header Section with Glowing Effect */}
      <div className="relative bg-gradient-to-r from-green-900 to-teal-800 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit.png')] opacity-10 z-0"></div>
        <div className="absolute inset-0 glow-animation z-0"></div>
        <div className="relative max-w-6xl mx-auto px-4 text-center z-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white flex items-center justify-center gap-3 animate-slide-in">
            <span className="text-3xl text-lime-400 animate-glow">🔋</span>
            Charge Up Your Connection
          </h1>
          <p className="mt-4 text-base sm:text-lg font-medium text-gray-100 leading-relaxed max-w-2xl mx-auto animate-slide-in delay-100">
            Contact our EV Charging Network team to fuel your sustainable future!
          </p>
          <div className="w-28 h-1 bg-lime-400 mx-auto rounded-full mt-4 animate-scale-in"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Contact Content */}
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Contact Image */}
          <div className="relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-xl transform transition-all duration-500 group-hover:scale-105">
              <img
                className="w-full max-w-md h-auto rounded-2xl"
                src={assets.contact_image}
                alt="EV Charging Contact"
              />
              <div className="absolute inset-0 border-4 border-lime-400/40 rounded-2xl -z-10 transform -translate-x-2 translate-y-2 group-hover:-translate-x-3 group-hover:translate-y-3 transition-all duration-500"></div>
              <div className="absolute -bottom-5 -right-5 w-20 h-20 bg-lime-300 rounded-full opacity-60 animate-pulse-slow"></div>
              <div className="absolute -top-5 -left-5 w-14 h-14 bg-teal-300 rounded-full opacity-60 animate-pulse-slow delay-400"></div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-800 mb-6 animate-slide-in drop-shadow-md">
              Reach Out Today
            </h2>

            <div className="grid gap-6">
              {[
                {
                  icon: '📍',
                  title: 'Visit Us',
                  content: (
                    <>
                      123 Celebration Lane <br />
                      Suite 200, New York, NY
                    </>
                  ),
                },
                {
                  icon: '📞',
                  title: 'Call Us',
                  content: (
                    <>
                      Tel: (212) 555-0123 <br />
                      Mobile: (212) 555-0987
                    </>
                  ),
                },
                {
                  icon: '✉️',
                  title: 'Email Us',
                  content: 'hello@evchargingnetwork.com',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="relative bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-teal-100 hover:shadow-2xl hover:scale-102 transition-all duration-400 animate-slide-in tilt-card group"
                  style={{ animationDelay: `${(index + 1) * 100}ms` }}
                >
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-lime-300 rounded-full opacity-60 animate-pulse"></div>
                  <div className="flex items-start">
                    <span className="w-12 h-12 bg-teal-700 rounded-full flex items-center justify-center mr-4 text-white text-xl">
                      {item.icon}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.content}</p>
                    </div>
                  </div>
                  <div className="mt-4 w-full h-0.5 bg-teal-100 rounded-full">
                    <div className="h-0.5 bg-teal-700 rounded-full w-1/3 transition-all duration-300 group-hover:w-full"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative bg-teal-50/80 backdrop-blur-lg rounded-xl p-6 border-l-4 border-teal-700 shadow-lg hover:shadow-2xl hover:scale-102 transition-all duration-400 animate-slide-in delay-400 tilt-card group">
              <div className="absolute -top-3 -left-3 w-6 h-6 bg-lime-300 rounded-full opacity-60 animate-pulse"></div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Power the Future</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Passionate about green energy? Join our EV Charging Network to drive innovation!
              </p>
              <button className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:shadow-lg animate-glow-slow tracking-wide">
                Explore Roles
              </button>
            </div>
          </div>
        </div>

        {/* New Call-to-Action Section */}
        <div className="mt-12 text-center">
          <div className="relative bg-gradient-to-r from-teal-600 to-green-600 rounded-2xl p-8 shadow-xl animate-slide-in delay-500">
            <div className="absolute -top-4 -left-4 w-10 h-10 bg-lime-300 rounded-full opacity-60 animate-pulse-slow"></div>
            <h3 className="text-xl font-semibold text-white mb-3">Ready to Charge Up?</h3>
            <p className="text-gray-100 text-sm leading-relaxed mb-4 max-w-xl mx-auto">
              Contact us now to learn more about our cutting-edge EV charging solutions!
            </p>
            <button className="bg-lime-400 hover:bg-lime-500 text-gray-800 px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg animate-glow-slow tracking-wide">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {/* Custom Tailwind Animation Styles */}
      <style jsx>{`
        @keyframes slide-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.9;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 5px rgba(163, 230, 53, 0.5);
          }
          50% {
            text-shadow: 0 0 15px rgba(163, 230, 53, 0.8);
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        @keyframes glow-slow {
          0%, 100% {
            box-shadow: 0 0 10px rgba(163, 230, 53, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(163, 230, 53, 0.6);
          }
        }
        .animate-glow-slow {
          animation: glow-slow 3s ease-in-out infinite;
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
          animation: scale-in 0.6s ease-out;
        }
        .glow-animation {
          background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="15" cy="15" r="3" fill="%23a3e635" opacity="0.3"/%3E%3Ccircle cx="40" cy="25" r="4" fill="%23a3e635" opacity="0.2"/%3E%3Ccircle cx="65" cy="20" r="2.5" fill="%23a3e635" opacity="0.4"/%3E%3Ccircle cx="85" cy="30" r="3" fill="%23a3e635" opacity="0.3"/%3E%3C/svg%3E');
          background-size: 100px 100px;
          animation: glow 15s linear infinite;
        }
        @keyframes glow {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100px 100px;
          }
        }
        .tilt-card {
          transition: transform 0.3s ease;
        }
        .tilt-card:hover {
          transform: perspective(1000px) rotateX(2deg) rotateY(2deg);
        }
      `}</style>
    </div>
  );
};

export default Contact;