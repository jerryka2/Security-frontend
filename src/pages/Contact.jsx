import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="relative bg-gradient-to-br from-white to-orange-50 min-h-screen overflow-hidden">
      {/* Header Section */}
      <div className='relative bg-gradient-to-r from-orange-500 to-pink-500 text-white py-12'>
        <div className='absolute inset-0 bg-white/15 backdrop-blur-md z-0'></div>
        <div className='relative max-w-5xl mx-auto px-4 text-center z-10'>
          <h1 className='text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-200 mb-3 animate-bounce-in drop-shadow-md'>
            Let’s Make It Happen
          </h1>
          <p className='text-orange-50 text-base md:text-lg font-medium leading-relaxed animate-fade-in-up delay-200 max-w-xl mx-auto'>
            Reach out to our EventVibe team to plan a celebration that shines!
          </p>
          <div className='w-20 h-1 bg-orange-400 mx-auto mt-4 rounded-full animate-scale-in'></div>
        </div>
      </div>

      <div className='max-w-5xl mx-auto px-4 py-16'>
        {/* Contact Content */}
        <div className='grid md:grid-cols-2 gap-10 items-start'>
          {/* Contact Image */}
          <div className='relative group'>
            <img
              className='w-full max-w-sm h-auto rounded-2xl shadow-lg border-3 border-orange-100 transform group-hover:scale-105 group-hover:rotate-2 transition-all duration-500 ease-in-out'
              src={assets.contact_image}
              alt="EventVibe Contact"
            />
            <div className='absolute -bottom-4 -right-4 w-16 h-16 bg-orange-200 rounded-full opacity-70 animate-pulse-slow'></div>
            <div className='absolute -top-4 -left-4 w-12 h-12 bg-pink-200 rounded-full opacity-70 animate-pulse-slow delay-300'></div>
          </div>

          {/* Contact Information */}
          <div className='space-y-6'>
            <div>
              <h2 className='text-2xl font-extrabold text-gray-800 mb-6 animate-slide-in-right drop-shadow-sm'>
                Connect with Us
              </h2>

              <div className='space-y-6'>
                <div className='relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100 hover:border-orange-300 hover:shadow-xl hover:scale-102 transition-all duration-400 animate-slide-in-right delay-100 group'>
                  <div className='absolute -top-3 -left-3 w-6 h-6 bg-orange-200 rounded-full opacity-60 animate-pulse'></div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-3 flex items-center'>
                    <span className='w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3 text-white text-xl'>
                      📍
                    </span>
                    Visit Us
                  </h3>
                  <p className='text-gray-600 ml-13 text-sm leading-relaxed'>
                    123 Celebration Lane <br />
                    Suite 200, New York, NY
                  </p>
                </div>

                <div className='relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100 hover:border-orange-300 hover:shadow-xl hover:scale-102 transition-all duration-400 animate-slide-in-right delay-200 group'>
                  <div className='absolute -top-3 -left-3 w-6 h-6 bg-orange-200 rounded-full opacity-60 animate-pulse'></div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-3 flex items-center'>
                    <span className='w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3 text-white text-xl'>
                      📞
                    </span>
                    Call Us
                  </h3>
                  <p className='text-gray-600 ml-13 text-sm leading-relaxed'>
                    Tel: (212) 555-0123 <br />
                    Mobile: (212) 555-0987
                  </p>
                </div>

                <div className='relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-orange-100 hover:border-orange-300 hover:shadow-xl hover:scale-102 transition-all duration-400 animate-slide-in-right delay-300 group'>
                  <div className='absolute -top-3 -left-3 w-6 h-6 bg-orange-200 rounded-full opacity-60 animate-pulse'></div>
                  <h3 className='text-lg font-semibold text-gray-800 mb-3 flex items-center'>
                    <span className='w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center mr-3 text-white text-xl'>
                      ✉️
                    </span>
                    Email Us
                  </h3>
                  <p className='text-gray-600 ml-13 text-sm leading-relaxed'>
                    hello@eventvibe.com
                  </p>
                </div>
              </div>
            </div>

            <div className='relative bg-orange-50/80 backdrop-blur-sm rounded-xl p-6 border-l-4 border-orange-400 shadow-lg hover:shadow-xl hover:scale-102 transition-all duration-400 animate-slide-in-right delay-400 group'>
              <div className='absolute -top-3 -left-3 w-6 h-6 bg-pink-200 rounded-full opacity-60 animate-pulse'></div>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>Join the Fun</h3>
              <p className='text-gray-700 text-sm leading-relaxed mb-4'>
                Love planning epic events? Join EventVibe and create magic with us!
              </p>
              <button className='bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:shadow-lg animate-bounce-slow tracking-wide'>
                Explore Roles
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact