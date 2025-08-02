import React from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='md:mx-10 text-gray-800'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-12 my-10 mt-32 text-sm'>
        {/* Text Logo & Description */}
        <div className='animate-fade-in-up'>
          <h1 className='mb-5 text-2xl md:text-3xl font-semibold text-green-600 cursor-pointer hover:text-green-500 transition-all duration-300 hover:scale-105 flex items-center gap-2 tracking-wide'>
            <span className='text-xl transform hover:rotate-12 transition-transform duration-300'>⚡️</span> EnergiPort
          </h1>
          <p className='w-full md:w-2/3 leading-6 text-gray-600 font-medium'>
            EnergiPort powers your journey with sustainable EV charging solutions. Discover nearby stations, charge smart, and drive green!
          </p>
        </div>

        {/* Company Links */}
        <div className='animate-fade-in-up delay-100'>
          <p className='text-xl font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-lime-400'>
            ENERGIPORT
          </p>
          <ul className='flex flex-col gap-3'>
            <NavLink 
              to="/" 
              className={({ isActive }) => `px-2 py-1 text-gray-700 font-medium hover:text-green-600 hover:bg-green-100/50 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] ${isActive ? 'text-green-600 bg-green-100/50' : ''}`}
            >
              Home
            </NavLink>
            <NavLink 
              to="/stations" 
              className={({ isActive }) => `px-2 py-1 text-gray-700 font-medium hover:text-green-600 hover:bg-green-100/50 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] ${isActive ? 'text-green-600 bg-green-100/50' : ''}`}
            >
              Find Stations
            </NavLink>
            <NavLink 
              to="/add-station" 
              className={({ isActive }) => `px-2 py-1 text-gray-700 font-medium hover:text-green-600 hover:bg-green-100/50 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] ${isActive ? 'text-green-600 bg-green-100/50' : ''}`}
            >
              Add Station
            </NavLink>
            <NavLink 
              to="/privacy" 
              className={({ isActive }) => `px-2 py-1 text-gray-700 font-medium hover:text-green-600 hover:bg-green-100/50 rounded-md transition-all duration-300 hover:scale-105 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] ${isActive ? 'text-green-600 bg-green-100/50' : ''}`}
            >
              Privacy Policy
            </NavLink>
          </ul>
        </div>

        {/* Contact Info */}
        <div className='animate-fade-in-up delay-200'>
          <p className='text-xl font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-lime-400'>
            GET IN TOUCH
          </p>
          <ul className='flex flex-col gap-3'>
            <li className='px-2 py-1 text-gray-700 font-medium hover:text-green-600 hover:bg-green-100/50 hover:scale-105 rounded-md transition-all duration-300'>
              +977-9812345678
            </li>
            <li className='px-2 py-1 text-gray-700 font-medium hover:text-green-600 hover:bg-green-100/50 hover:scale-105 rounded-md transition-all duration-300'>
              support@energiport.com
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div>
        <hr className='border-green-200/50' />
        <p className='py-5 text-sm text-center text-green-600 font-medium'>
          © 2025 <span className='font-semibold hover:text-green-500 transition-colors duration-300'>EnergiPort</span> — All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer