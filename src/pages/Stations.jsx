import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const EventPlanners = () => {
  const { speciality: chargerType } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { doctors: chargerExperts } = useContext(AppContext);

  const applyFilter = () => {
    setIsLoading(true);
    if (chargerType) {
      setFilterDoc(chargerExperts.filter(expert => expert.speciality === chargerType));
    } else {
      setFilterDoc(chargerExperts);
    }
    setTimeout(() => setIsLoading(false), 300); // Simulate loading
  };

  useEffect(() => {
    applyFilter();
  }, [chargerExperts, chargerType]);

  return (
    <div className="relative bg-gray-100 min-h-screen">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-green-800 to-green-700 py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-0"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center z-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white flex items-center justify-center gap-3 animate-slide-in">
            <span className="text-3xl text-green-200 animate-pulse">⚡️</span>
            EV Charging Experts
          </h1>
          <p className="mt-4 text-lg sm:text-xl font-medium text-green-100 max-w-lg mx-auto animate-slide-in delay-100">
            Discover top specialists for your EV charging solutions.
          </p>
          <div className="w-20 h-1 bg-green-200 mx-auto rounded-full mt-4 animate-scale-in"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* Filter Button for Mobile */}
          <button
            className={`py-2.5 px-6 rounded-full font-semibold text-base transition-all duration-300 lg:hidden shadow-md ${
              showFilter
                ? 'bg-green-700 text-white'
                : 'bg-white border border-green-100 text-green-800 hover:bg-green-50'
            }`}
            onClick={() => setShowFilter(prev => !prev)}
          >
            {showFilter ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Filter Menu */}
          <div
            className={`flex-shrink-0 ${showFilter ? 'flex' : 'hidden lg:flex'} flex-col gap-4 w-full lg:w-64 lg:sticky lg:top-6`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Charging Types</h3>
              <div className="space-y-2">
                {['Fast Charging', 'Level 2 Charging', 'Home Solutions'].map(type => (
                  <p
                    key={type}
                    onClick={() =>
                      chargerType === type
                        ? navigate('/charger-experts')
                        : navigate(`/charger-experts/${type.toLowerCase().replace(' ', '-')}`)
                    }
                    className={`w-full py-2 px-4 rounded-lg font-medium cursor-pointer transition-all duration-300 text-center ${
                      chargerType === type
                        ? 'bg-green-700 text-white shadow-sm'
                        : 'bg-gray-50 text-green-800 hover:bg-green-100 hover:text-green-900'
                    }`}
                  >
                    {type}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Experts Grid */}
          <div className="w-full">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 animate-pulse">
                    <div className="w-full h-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl"></div>
                    <div className="mt-4 h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="mt-3 h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterDoc.map((item, index) => (
                  <div
                    onClick={() => navigate(`/appointment/${item._id}`)}
                    className="bg-white rounded-2xl shadow-md border border-green-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                    key={index}
                  >
                    <div className="p-4">
                      <div className="relative w-full h-48 overflow-hidden rounded-xl">
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          src={item.image}
                          alt={item.name}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-green-800/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-green-700 mb-2">
                        <span className="w-2 h-2 bg-green-200 rounded-full"></span>
                        <span className="font-medium">Available</span>
                      </div>
                      <h2 className="text-gray-900 text-lg font-semibold mb-1 truncate">{item.name}</h2>
                      <p className="text-gray-500 text-sm mb-4">{item.speciality}</p>
                      <div className="w-full h-0.5 bg-green-100 rounded-full">
                        <div className="h-0.5 bg-green-700 rounded-full w-1/4 transition-all duration-300 group-hover:w-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-green-100 to-green-50 rounded-2xl p-10 shadow-xl">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 animate-slide-in">Get Charged Up!</h3>
            <p className="text-gray-600 text-base mb-6 max-w-md mx-auto animate-slide-in delay-100">
              Connect with our EV charging experts for tailored solutions.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full font-semibold text-base shadow-md hover:shadow-lg transition-all duration-300 animate-slide-in delay-200"
            >
              Contact Us
            </button>
          </div>
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
        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }
        .animate-pulse {
          animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
      `}</style>
    </div>
  );
};

export default EventPlanners;