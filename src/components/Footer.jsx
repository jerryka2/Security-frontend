import React from 'react'

const Footer = () => {
  return (
    <div className='md:mx-10 text-gray-800'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        {/* Text Logo & Description */}
        <div className='animate-fade-in-up'>
          <h1 className='mb-5 text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-transparent bg-clip-text'>
            EventVibe
          </h1>
          <p className='w-full md:w-2/3 leading-6 text-gray-600'>
            EventVibe connects you with the most exciting experiences — from music festivals to business conferences. Join the vibe and never miss out!
          </p>
        </div>

        {/* Company Links */}
        <div className='animate-fade-in-up delay-100'>
          <p className='text-xl font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500'>
            EVENTVIBE
          </p>
          <ul className='flex flex-col gap-3'>
            <li className='hover:text-orange-600 hover:translate-x-1 transition-all duration-300 cursor-pointer'>Home</li>
            <li className='hover:text-orange-600 hover:translate-x-1 transition-all duration-300 cursor-pointer'>Explore Events</li>
            <li className='hover:text-orange-600 hover:translate-x-1 transition-all duration-300 cursor-pointer'>Create Event</li>
            <li className='hover:text-orange-600 hover:translate-x-1 transition-all duration-300 cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className='animate-fade-in-up delay-200'>
          <p className='text-xl font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500'>
            GET IN TOUCH
          </p>
          <ul className='flex flex-col gap-3'>
            <li className='hover:text-orange-600 hover:translate-x-1 transition-all duration-300'>+977-9812345678</li>
            <li className='hover:text-orange-600 hover:translate-x-1 transition-all duration-300'>support@eventvibe.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div>
        <hr className='border-orange-200/50' />
        <p className='py-5 text-sm text-center text-orange-600 font-medium'>
          © 2025 <span className='font-semibold'>EventVibe</span> — All Rights Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer