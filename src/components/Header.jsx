import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='relative flex flex-col lg:flex-row bg-white px-6 md:px-12 lg:px-24 py-12 md:py-16 mx-4 md:mx-10 lg:mx-20 mt-10 rounded-3xl overflow-hidden shadow-[0_8px_32px_rgba(34,197,94,0.15)]'>
            {/* Subtle Holographic Background Effect */}
            <div className='absolute inset-0 bg-gradient-to-r from-green-200/5 to-lime-200/5 backdrop-blur-sm z-0 animate-holo-shift'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.15),transparent_70%)] opacity-40'></div>
            </div>

            {/* --------- Header Left --------- */}
            <div className='relative lg:w-1/2 flex flex-col justify-center gap-10 z-10'>
                <h1 className='text-4xl md:text-5xl lg:text-6xl font-semibold text-green-700 leading-tight tracking-tight animate-slide-in-left'>
                    <span className='flex items-center gap-2'>
                        <span className='text-3xl transform animate-glow-pulse text-lime-400'>⚡️</span> 
                        Power <span className='text-lime-500 italic'>Green</span>
                    </span>
                    with EnergiPort
                </h1>
                <p className='text-base md:text-lg text-gray-700 font-medium max-w-lg leading-relaxed animate-fade-in-up delay-200'>
                    Discover eco-friendly EV charging stations near you, built for a sustainable, electrified future.
                </p>
                <div className='flex items-center gap-6'>
                    <NavLink 
                        to="/stations" 
                        className='relative bg-green-600 text-white px-8 py-4 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-lime-500 hover:scale-105 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] group overflow-hidden'
                    >
                        <span className='absolute inset-0 bg-lime-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl animate-ripple'></span>
                        Find Stations <img className='w-5 h-5 inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300' src={assets.arrow_icon} alt="Arrow" />
                    </NavLink>
                    <NavLink 
                        to="/about" 
                        className='relative bg-white/90 text-green-600 px-6 py-3 rounded-xl text-base font-semibold transition-all duration-300 hover:bg-lime-100/80 hover:text-lime-500 hover:scale-105 hover:shadow-[0_0_10px_rgba(34,197,94,0.4)] group overflow-hidden'
                    >
                        <span className='absolute inset-0 bg-lime-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl animate-ripple'></span>
                        Learn More
                    </NavLink>
                </div>
            </div>

            {/* --------- Header Right --------- */}
            <div className='relative lg:w-1/2 mt-10 lg:mt-0 flex justify-center items-center z-10'>
                <div className='relative w-full max-w-md aspect-square group'>
                    <div className='absolute inset-0 border-4 border-green-400/50 rounded-xl shadow-[0_0_15px_rgba(34,197,94,0.3)] group-hover:shadow-[0_0_25px_rgba(34,197,94,0.5)] transition-all duration-500'></div>
                    <img 
                        className='relative w-full h-full object-cover rounded-xl transform transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:-translate-y-2 group-hover:rotate-2' 
                        src={assets.appointment_img} 
                        alt="Charging station showcase" 
                    />
                    {/* Holographic Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-r from-green-500/10 to-lime-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl'></div>
                    {/* Decorative Elements */}
                    <div className='absolute -bottom-6 -right-6 w-20 h-20 bg-lime-300/30 rounded-full opacity-50 animate-pulse-slow'></div>
                    <div className='absolute -top-6 -left-6 w-16 h-16 bg-green-200/30 rounded-full opacity-50 animate-pulse-slow delay-300'></div>
                </div>
            </div>

            {/* Custom Tailwind Animation Styles */}
            <style jsx>{`
                @keyframes holo-shift {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-holo-shift {
                    background-size: 200% 200%;
                    animation: holo-shift 12s ease infinite;
                }
                @keyframes pulse-slow {
                    0%, 100% { transform: scale(1); opacity: 0.5; }
                    50% { transform: scale(1.1); opacity: 0.7; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                @keyframes glow-pulse {
                    0%, 100% { opacity: 0.8; }
                    50% { opacity: 1; }
                }
                .animate-glow-pulse {
                    animation: glow-pulse 2s ease-in-out infinite;
                }
                @keyframes ripple {
                    0% { transform: scale(0); opacity: 1; }
                    100% { transform: scale(4); opacity: 0; }
                }
                .animate-ripple {
                    animation: ripple 0.6s linear;
                }
            `}</style>
        </div>
    )
}

export default Header