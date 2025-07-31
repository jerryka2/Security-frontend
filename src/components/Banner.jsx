import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div className='relative flex bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-3xl px-6 sm:px-10 md:px-14 lg:px-16 my-20 md:mx-10 overflow-hidden group'>
      {/* ------- Left Side ------- */}
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-20 lg:pl-6 animate-slide-in-left z-10'>
        <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-extrabold text-white leading-tight tracking-wide'>
          <p>Plan Epic Events</p>
          <p className='mt-2'>With EventVibe’s Top Planners</p>
        </div>
        <button
          onClick={() => { navigate('/login'); window.scrollTo(0, 0) }}
          className='bg-white text-sm sm:text-base text-orange-600 font-semibold px-10 py-3 rounded-full mt-8 hover:bg-orange-50 hover:shadow-xl hover:scale-105 transition-all duration-300'
        >
          Get Started Now
        </button>
      </div>

      {/* ------- Right Side (Image Centered in Banner) ------- */}
      <div className='hidden md:block md:w-1/2 lg:w-[400px] relative'>
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px]'>
            <img
              className='w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500 ease-in-out'
              src={assets.event_banner_img || assets.appointment_img}
              alt="Event Banner"
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl'></div>
            <div className='absolute -top-4 -left-4 w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full opacity-75 animate-pulse delay-100'></div>
            <div className='absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-75 animate-pulse delay-300'></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Banner