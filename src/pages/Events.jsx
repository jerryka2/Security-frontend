import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const EventPlanners = () => {
  const { speciality: eventType } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate()
  const { doctors: eventPlanners } = useContext(AppContext)

  const applyFilter = () => {
    if (eventType) {
      setFilterDoc(eventPlanners.filter(planner => planner.speciality === eventType))
    } else {
      setFilterDoc(eventPlanners)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [eventPlanners, eventType])

  return (
    <div className="relative bg-gradient-to-br from-white via-orange-50 to-pink-50 min-h-screen overflow-hidden">
      {/* Header Section */}
      <div className='relative bg-gradient-to-r from-orange-700 to-pink-700 text-white py-12'>
        <div className='absolute inset-0 bg-white/20 backdrop-blur-xl z-0'></div>
        <div className='relative max-w-6xl mx-auto px-6 text-center z-10'>
          <h1 className='text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-200 mb-3 animate-slide-in-down drop-shadow-2xl'>
            Meet Our Event Maestros
          </h1>
          <p className='text-orange-100 text-lg md:text-xl font-medium leading-relaxed animate-fade-in-up delay-200 max-w-lg mx-auto'>
            Discover planners who turn your vision into unforgettable celebrations!
          </p>
          <div className='w-24 h-1 bg-orange-300 mx-auto mt-4 rounded-full animate-scale-in'></div>
        </div>
      </div>

      <div className='max-w-6xl mx-auto px-6 py-12'>
        <div className='flex flex-col sm:flex-row items-start gap-6'>
          {/* Filter Button for Mobile */}
          <button 
            className={`py-2 px-5 border rounded-full font-semibold text-base transition-all duration-300 sm:hidden shadow-md ${showFilter ? 'bg-orange-600 text-white border-orange-600' : 'bg-white border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-400 hover:shadow-lg hover:scale-105'}`} 
            onClick={() => setShowFilter(prev => !prev)}
          >
            {showFilter ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Filter Menu */}
          <div className={`flex-shrink-0 ${showFilter ? 'flex' : 'hidden sm:flex'} flex-col gap-3 text-base text-gray-700 w-full sm:w-64`}>
            <div className='bg-white/95 backdrop-blur-md rounded-lg shadow-md p-5 border border-orange-100 hover:shadow-lg hover:border-orange-300 transition-all duration-300'>
              <h3 className='text-lg font-semibold text-gray-800 mb-3 flex items-center'>
                <span className='w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center mr-2 text-white text-base'>🎉</span>
                Event Types
              </h3>
              <div className='space-y-2'>
                {['Weddings', 'Birthdays', 'Corporate Events'].map((type) => (
                  <p 
                    key={type}
                    onClick={() => eventType === type ? navigate('/event-planners') : navigate(`/event-planners/${type.toLowerCase().replace(' ', '-')}`)} 
                    className={`w-full py-2 px-4 border rounded-full font-medium cursor-pointer transition-all duration-200 text-center ${eventType === type ? 'bg-orange-600 text-white border-orange-600' : 'bg-white text-gray-700 border-orange-200 hover:bg-orange-50 hover:border-orange-400 hover:shadow-md hover:scale-105'}`}
                  >
                    {type}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Planners Grid */}
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filterDoc.map((item, index) => (
              <div 
                onClick={() => navigate(`/appointment/${item._id}`)} 
                className='relative bg-white/95 backdrop-blur-md border border-orange-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 group'
                key={index}
              >
                <div className='relative bg-orange-50/70 p-4'>
                  <img 
                    className='w-full h-40 object-cover rounded-md border-2 border-orange-200 group-hover:border-orange-400 group-hover:scale-105 group-hover:-rotate-2 transition-all duration-300' 
                    src={item.image} 
                    alt={item.name} 
                  />
                  <div className='absolute -top-2 -right-2 w-5 h-5 bg-orange-300 rounded-full opacity-80 animate-pulse-slow'></div>
                  <div className='absolute -bottom-2 -left-2 w-5 h-5 bg-pink-300 rounded-full opacity-80 animate-pulse-slow delay-200'></div>
                </div>
                <div className='p-5'>
                  <div className='flex items-center gap-2 text-sm text-center text-orange-600 mb-2'>
                    <span className='w-2 h-2 bg-orange-600 rounded-full'></span>
                    <span>Available</span>
                  </div>
                  <h2 className='text-gray-800 text-lg font-semibold mb-1 truncate'>{item.name}</h2>
                  <p className='text-gray-600 text-sm mb-2'>{item.speciality}</p>
                  <div className='mt-2 pt-2 border-t border-orange-100'>
                    <p className='text-orange-600 font-semibold text-sm group-hover:text-orange-700 group-hover:scale-105 transition-all duration-300 hover:underline'>View Profile →</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventPlanners