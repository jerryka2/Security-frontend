import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Header Section */}
      <div className='relative bg-gradient-to-r from-orange-500 to-pink-500 text-white py-16 overflow-hidden'>
        <div className='absolute inset-0 bg-white/10 backdrop-blur-sm z-0'></div>
        <div className='relative max-w-6xl mx-auto px-6 text-center z-10'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-200 mb-4 animate-fade-in-down'>
            About EventVibe
          </h1>
          <div className='w-24 h-1 bg-orange-300 mx-auto rounded-full animate-scale-in'></div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto px-6 py-16'>
        {/* About Section */}
        <div className='grid lg:grid-cols-2 gap-12 items-center mb-20'>
          <div className='relative'>
            <img
              className='w-full max-w-md h-auto rounded-2xl shadow-xl border-4 border-orange-100 transform hover:scale-105 transition-transform duration-500 ease-in-out'
              src={assets.about_image}
              alt="EventVibe Showcase"
            />
            <div className='absolute -bottom-4 -right-4 w-20 h-20 bg-orange-200 rounded-full opacity-60 animate-pulse'></div>
          </div>

          <div className='space-y-8'>
            <div className='space-y-4 text-gray-800 leading-relaxed'>
              <p className='text-lg md:text-xl font-medium animate-fade-in-up'>
                Welcome to EventVibe, your go-to for creating unforgettable events with ease! We know planning can be overwhelming, so we connect you with top organizers to make every moment sparkle.
              </p>
              <p className='text-lg md:text-xl font-medium animate-fade-in-up delay-200'>
                At EventVibe, we’re all about bringing joy to event planning. Our platform is packed with tools and expertise to turn your ideas into reality, stress-free and fun!
              </p>
            </div>

            <div className='bg-orange-50 rounded-xl p-6 border-l-4 border-orange-400 shadow-md animate-slide-in-right'>
              <h3 className='text-xl font-semibold text-gray-800 mb-3'>Our Vision</h3>
              <p className='text-gray-700 leading-relaxed'>
                We envision a world where every event is a masterpiece. EventVibe makes planning seamless, connecting you with pros to craft celebrations that shine.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4 animate-fade-in-down'>
            Why Choose EventVibe
          </h2>
          <div className='w-20 h-1 bg-orange-400 mx-auto rounded-full animate-scale-in'></div>
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {[
            {
              title: "Quick Planning",
              description: "Easily plan events that fit your schedule and style.",
              icon: "🎉"
            },
            {
              title: "Top Organizers",
              description: "Work with the best event planners in your area.",
              icon: "⭐"
            },
            {
              title: "Custom Vibes",
              description: "Personalized ideas to make your event truly unique.",
              icon: "✨"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className='bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-orange-100 hover:border-orange-300 hover:scale-105 group'
            >
              <div className='text-4xl mb-4 text-orange-500'>{feature.icon}</div>
              <h3 className='text-xl font-semibold text-gray-800 mb-4'>{feature.title}</h3>
              <p className='text-gray-600 leading-relaxed'>{feature.description}</p>
              <div className='mt-4 w-full h-1 bg-orange-100 rounded-full'>
                <div className='h-1 bg-orange-400 rounded-full w-1/2 transition-all duration-500 group-hover:w-full'></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About