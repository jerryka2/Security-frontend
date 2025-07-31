import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopEvents = () => {
    const navigate = useNavigate()
    const { doctors: events } = useContext(AppContext) // reusing the same context assuming backend remains unchanged

    return (
        <div className='flex flex-col items-center gap-8 my-16 text-gray-800 md:mx-10'>
            <h1 className='text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 animate-fade-in-down'>
                Featured Events You Can’t Miss
            </h1>
            <p className='sm:w-1/2 text-center text-base md:text-lg font-medium leading-relaxed text-gray-600 animate-fade-in-up delay-200'>
                Explore exciting upcoming events and secure your spot before they’re gone!
            </p>

            <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8 px-4 sm:px-0'>
                {events.slice(0, 10).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => { navigate(`/appointment/${item._id}`); window.scrollTo(0, 0) }}
                        className='border border-orange-100/50 rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-3 hover:shadow-2xl transition-all duration-400 ease-in-out bg-white group'
                    >
                        <div className='relative'>
                            <img
                                src={item.image}
                                alt={item.name}
                                className='w-full h-40 sm:h-48 object-cover rounded-t-2xl group-hover:scale-105 transition-transform duration-400 ease-in-out'
                            />
                            <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-t-2xl'></div>
                            <div className='absolute -bottom-3 -right-3 w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full opacity-75 animate-pulse delay-100'></div>
                            <div className='absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-75 animate-pulse delay-300'></div>
                        </div>
                        <div className='p-5'>
                            <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-red-500'}`}>
                                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <p>{item.available ? 'Seats Available' : 'Sold Out'}</p>
                            </div>
                            <p className='text-gray-800 text-lg font-semibold tracking-wide mt-3'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={() => { navigate('/events'); window.scrollTo(0, 0) }}
                className='bg-gradient-to-r from-orange-400 to-pink-400 text-white px-14 py-3 rounded-full mt-12 font-semibold hover:bg-gradient-to-r hover:from-orange-500 hover:to-pink-500 hover:shadow-xl hover:scale-105 transition-all duration-300'
            >
                View All Events
            </button>
        </div>
    )
}

export default TopEvents