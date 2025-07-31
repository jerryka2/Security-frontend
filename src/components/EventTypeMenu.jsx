import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const EventTypeMenu = () => {
    const eventTypes = [
        { eventType: 'Weddings', image: assets.group_profiles },
        { eventType: 'Birthdays', image: assets.contact_image },
        { eventType: 'Corporate Events', image: assets.about_image }
    ]

    return (
        <div id='event-types' className='relative flex flex-col items-center gap-10 py-24 text-gray-800'>
            <h1 className='text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 animate-fade-in-down'>
                Plan Your Dream Event
            </h1>
            <p className='sm:w-2/3 md:w-1/2 text-center text-lg md:text-xl font-medium leading-relaxed animate-fade-in-up delay-200 text-gray-600'>
                Discover curated event types and partner with expert planners for a celebration that shines!
            </p>
            <div className='flex flex-wrap justify-center gap-10 pt-8 w-full max-w-6xl'>
                {eventTypes.map((item, index) => (
                    <Link
                        to={`/events/${item.eventType.toLowerCase().replace(' ', '-')}`}
                        onClick={() => window.scrollTo(0, 0)}
                        className='flex flex-col items-center text-base font-semibold cursor-pointer flex-shrink-0 group hover:-translate-y-3 transition-all duration-500 ease-in-out'
                        key={index}
                    >
                        <div className='relative w-28 sm:w-36 md:w-48 mb-4'>
                            <img
                                className='w-full h-28 sm:h-36 md:h-48 object-cover rounded-2xl shadow-xl border-2 border-orange-100/50 group-hover:shadow-2xl group-hover:border-pink-300 group-hover:scale-105 transition-all duration-400 ease-in-out'
                                src={item.image}
                                alt={item.eventType}
                            />
                            <div className='absolute -bottom-3 -right-3 w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-400 rounded-full opacity-75 animate-pulse delay-100'></div>
                            <div className='absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-75 animate-pulse delay-300'></div>
                            <div className='absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400'></div>
                        </div>
                        <p className='text-orange-500 group-hover:text-pink-600 transition-colors duration-300 tracking-wide font-bold'>
                            {item.eventType}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default EventTypeMenu