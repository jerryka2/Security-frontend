import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const TopStations = () => {
  const navigate = useNavigate();
  const { doctors: stations } = useContext(AppContext); // assuming backend provides EV charging station data

  return (
    <div className="relative flex flex-col items-center gap-12 py-20 bg-white text-gray-800 md:mx-8 overflow-hidden">
      {/* Header Section */}
      <div className="text-center px-4 max-w-2xl z-10 animate-slide-in">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-700 flex items-center justify-center gap-3">
          <span className="text-2xl sm:text-3xl text-lime-400 animate-glow">⚡️</span>
          Top Charging Stations
        </h1>
        <p className="mt-4 text-base sm:text-lg font-medium text-gray-600 leading-relaxed">
          Find the best EV charging stations for fast, eco-friendly power.
        </p>
      </div>

      {/* Station Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-0 z-10">
        {stations.slice(0, 10).map((item, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(`/appointment/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="bg-white rounded-xl overflow-hidden cursor-pointer shadow-md group hover:shadow-lg hover:-translate-y-2 transition-all duration-300 border border-green-200/50"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-36 sm:h-44 object-cover rounded-t-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl"></div>
            </div>
            <div className="p-4">
              <div className={`flex items-center gap-2 text-sm font-medium ${item.available ? 'text-green-600' : 'text-red-600'}`}>
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-600' : 'bg-red-600'}`}></span>
                <p>{item.available ? 'Available' : 'Occupied'}</p>
              </div>
              <p className="text-gray-800 text-base font-semibold mt-2 truncate">{item.name}</p>
              <p className="text-gray-500 text-xs">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button
        onClick={() => {
          navigate('/doctors');
          window.scrollTo(0, 0);
        }}
        className="bg-green-600 text-white px-10 py-3 rounded-full mt-8 font-semibold text-sm sm:text-base hover:bg-lime-500 hover:shadow-md transition-all duration-300 z-10"
      >
        Explore All Stations
      </button>

      {/* Background Decoration */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-5 pointer-events-none"></div>

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
        @keyframes glow {
          0%, 100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default TopStations;