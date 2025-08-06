import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const ChargingTypeMenu = () => {
  const chargingTypes = [
    { type: 'Fast Charging', image: assets.appointment_img },
    { type: 'Standard Charging', image: assets.contact_image },
    { type: 'Solar Charging', image: assets.about_image },
  ];

  return (
    <div
      id="charging-types"
      className="relative flex flex-col items-center gap-16 py-24 bg-gradient-to-b from-gray-100 to-gray-50 text-gray-800 overflow-hidden"
    >
      {/* Header Section */}
      <div className="text-center px-6 max-w-3xl animate-fade-in">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-green-700 flex items-center justify-center gap-3">
          <span className="text-3xl text-lime-400 animate-glow">⚡️</span>
          Power Your Drive
        </h1>
        <p className="mt-5 text-lg sm:text-xl font-medium text-gray-600 leading-relaxed">
          Discover EnergiPort's sustainable charging solutions tailored for you.
        </p>
      </div>

      {/* Charging Type Cards */}
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl px-6">
        {chargingTypes.map((item, index) => (
          <NavLink
            to={`/charging/${item.type.toLowerCase().replace(' ', '-')}`}
            onClick={() => window.scrollTo(0, 0)}
            className="flex flex-col items-center w-full sm:w-80 group cursor-pointer transition-all duration-400"
            key={index}
          >
            <div className="relative w-full h-56 bg-white rounded-2xl shadow-lg group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-400 overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-600 ease-out"
                src={item.image}
                alt={item.type}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
              <div className="absolute top-4 right-4 w-6 h-6 bg-lime-400 rounded-full opacity-0 group-hover:opacity-80 animate-ping"></div>
            </div>
            <p className="mt-5 text-xl font-semibold text-green-700 group-hover:text-lime-500 transition-colors duration-300 tracking-tight">
              {item.type}
            </p>
          </NavLink>
        ))}
      </div>

      {/* Subtle Background Decoration */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/light-wool.png')] opacity-5 pointer-events-none"></div>

      {/* Custom Tailwind Animation Styles */}
      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        @keyframes glow {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-glow {
          animation: glow 2.5s ease-in-out infinite;
        }
        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 0.8;
          }
          75% {
            transform: scale(2);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        .animate-ping {
          animation: ping 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ChargingTypeMenu;