import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className="relative flex bg-green-50/50 backdrop-blur-md rounded-2xl border border-green-200/60 shadow-[0_4px_12px_rgba(34,197,94,0.15)] px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 my-12 md:mx-8 overflow-hidden">
      {/* ------- Left Side ------- */}
      <div className="flex-1 py-4 sm:py-6 md:py-8 lg:py-10 lg:pl-4">
        <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-green-700 leading-tight animate-fade-in-left">
          <p>Charge with Ease ⚡️</p>
          <p className="mt-1">Using EnergiPort’s Network</p>
        </div>
        <p className="text-sm sm:text-base text-gray-600 font-medium mt-2 animate-fade-in-left delay-100">
          Access fast, reliable EV charging stations anytime, anywhere.
        </p>
        <button
          onClick={() => { navigate('/login'); window.scrollTo(0, 0) }}
          className="bg-green-600 text-white text-sm sm:text-base font-medium px-6 py-2.5 rounded-lg mt-4 hover:bg-lime-600 hover:shadow-[0_4px_14px_rgba(34,197,94,0.25)] hover:scale-102 transition-all duration-300"
        >
          Get Started Now
        </button>
      </div>

      {/* ------- Right Side (Image Centered in Banner) ------- */}
      <div className="hidden md:block md:w-1/2 lg:w-[340px]">
        <div className="flex items-center justify-center h-full">
          <div className="relative w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-[280px] lg:h-[280px]">
            <img
              className="w-full h-full object-cover rounded-lg border border-green-200/60 shadow-[0_2px_8px_rgba(34,197,94,0.1)] hover:scale-102 transition-transform duration-300"
              src={assets.event_banner_img || assets.appointment_img}
              alt="Charging Banner"
            />
          </div>
        </div>
      </div>

      {/* Custom Tailwind Animation Styles */}
      <style jsx>{`
        @keyframes fade-in-left {
          0% { opacity: 0; transform: translateX(-10px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-left {
          animation: fade-in-left 0.5s ease-out;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </div>
  )
}

export default Banner