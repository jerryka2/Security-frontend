import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='relative flex flex-col lg:flex-row bg-gradient-to-br from-white to-gray-100 px-6 md:px-12 lg:px-24 py-12 md:py-16 mx-4 md:mx-10 lg:mx-20 mt-10 rounded-3xl shadow-2xl overflow-hidden'>
            {/* Glassmorphism Background Effect */}
            <div className='absolute inset-0 bg-white/20 backdrop-blur-md z-0'></div>

            {/* --------- Header Left --------- */}
            <div className='relative lg:w-1/2 flex flex-col justify-center gap-10 z-10'>
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-400 leading-tight tracking-tight animate-slide-in-left drop-shadow-md'>
                    Create <span className='text-orange-400 italic'>Amazing</span> Events <br /> with Expert Planners
                </h1>
                <p className='text-base md:text-lg text-gray-800 font-medium max-w-lg leading-relaxed animate-fade-in-up delay-200 drop-shadow-sm'>
                    Team up with top planners to craft joyful, stress-free events tailored to your vision.
                </p>
                <div className='flex items-center gap-6'>
                    <a 
                        href='#services' 
                        className='flex items-center gap-3 bg-orange-500 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg animate-pulse-slow tracking-wide'
                    >
                        Start Planning <img className='w-5 h-5' src={assets.arrow_icon} alt="Arrow" />
                    </a>
                    <a 
                        href='#events' 
                        className='text-orange-500 font-semibold text-base hover:text-orange-600 transition-colors duration-300 relative group tracking-wide'
                    >
                        See Events
                        <span className='absolute left-0 bottom-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300'></span>
                    </a>
                </div>
            </div>

            {/* --------- Header Right --------- */}
            <div className='relative lg:w-1/2 mt-10 lg:mt-0 flex justify-center items-center z-10'>
                <div className='relative w-full max-w-sm aspect-square'>
                    <img 
                        className='w-full h-full object-cover rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-500 ease-in-out border-4 border-orange-200' 
                        src={assets.appointment_img} 
                        alt="Event showcase" 
                    />
                    {/* Decorative Overlay */}
                    <div className='absolute -bottom-4 -right-4 w-20 h-20 bg-orange-200 rounded-full opacity-60 animate-pulse'></div>
                    <div className='absolute -top-4 -left-4 w-16 h-16 bg-orange-100 rounded-full opacity-60 animate-pulse delay-300'></div>
                </div>
            </div>
        </div>
    )
}

export default Header