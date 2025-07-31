import { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, userData, logout } = useContext(AppContext)

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className='flex items-center justify-between py-4 px-6 bg-white text-orange-600 sticky top-0 z-50 shadow-lg'>
      {/* Brand Name */}
      <span onClick={() => navigate('/')} className='font-extrabold text-3xl tracking-tight cursor-pointer hover:text-orange-400 transition-colors duration-300'>EventVibe</span>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex items-center gap-6 font-semibold'>
        <NavLink to='/' className={({ isActive }) => `px-4 py-2 rounded-md transition-all duration-300 ${isActive ? 'bg-orange-100 text-orange-700' : 'hover:bg-orange-100 hover:text-orange-700'}`}>
          Home
        </NavLink>
        <NavLink to='doctors' className={({ isActive }) => `px-4 py-2 rounded-md transition-all duration-300 ${isActive ? 'bg-orange-100 text-orange-700' : 'hover:bg-orange-100 hover:text-orange-700'}`}>
          Events
        </NavLink>
        <NavLink to='/about' className={({ isActive }) => `px-4 py-2 rounded-md transition-all duration-300 ${isActive ? 'bg-orange-100 text-orange-700' : 'hover:bg-orange-100 hover:text-orange-700'}`}>
          Abouts
        </NavLink>
        <NavLink to='/contact' className={({ isActive }) => `px-4 py-2 rounded-md transition-all duration-300 ${isActive ? 'bg-orange-100 text-orange-700' : 'hover:bg-orange-100 hover:text-orange-700'}`}>
          Contact
        </NavLink>
      </ul>

      {/* User Actions */}
      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div className='relative group'>
            <div className='flex items-center gap-2 cursor-pointer'>
              <img className='w-8 h-8 rounded-full object-cover border-2 border-orange-200 group-hover:border-orange-400 transition-all duration-300' src={userData.image} alt="" />
              <span className='text-sm font-medium'>{userData.name}</span>
            </div>
            <div className='absolute right-0 top-10 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300'>
              <div className='p-4 flex flex-col gap-2'>
                <p onClick={() => navigate('/my-profile')} className='hover:bg-orange-100 hover:text-orange-600 px-3 py-2 rounded-md cursor-pointer transition-all duration-200'>
                  My Profile
                </p>
                <p onClick={() => navigate('/my-appointments')} className='hover:bg-orange-100 hover:text-orange-600 px-3 py-2 rounded-md cursor-pointer transition-all duration-200'>
                  My Events
                </p>
                <p onClick={handleLogout} className='hover:bg-red-100 hover:text-red-600 px-3 py-2 rounded-md cursor-pointer transition-all duration-200'>
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/login')} className='bg-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300'>
            Sign In
          </button>
        )}
        <button onClick={() => setShowMenu(true)} className='md:hidden p-2 rounded-md hover:bg-orange-100 transition-all duration-300'>
          <img className='w-6' src={assets.menu_icon} alt="" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-white/95 transition-all duration-500 ${showMenu ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className='flex justify-between p-6'>
          <span className='font-extrabold text-2xl text-orange-600'>EventVibe</span>
          <button onClick={() => setShowMenu(false)} className='p-2 rounded-md hover:bg-orange-100'>
            <img className='w-6' src={assets.cross_icon} alt="" />
          </button>
        </div>
        <ul className='flex flex-col items-center gap-4 mt-10'>
          <NavLink onClick={() => setShowMenu(false)} to='/' className={({ isActive }) => `w-full text-center py-3 text-lg font-semibold text-orange-600 ${isActive ? 'bg-orange-100' : 'hover:bg-orange-100'}`}>
            Home
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/doctors' className={({ isActive }) => `w-full text-center py-3 text-lg font-semibold text-orange-600 ${isActive ? 'bg-orange-100' : 'hover:bg-orange-100'}`}>
            Events
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/services' className={({ isActive }) => `w-full text-center py-3 text-lg font-semibold text-orange-600 ${isActive ? 'bg-orange-100' : 'hover:bg-orange-100'}`}>
            Services
          </NavLink>
          <NavLink onClick={() => setShowMenu(false)} to='/contact' className={({ isActive }) => `w-full text-center py-3 text-lg font-semibold text-orange-600 ${isActive ? 'bg-orange-100' : 'hover:bg-orange-100'}`}>
            Contact
          </NavLink>
          {!token && (
            <button onClick={() => { navigate('/login'); setShowMenu(false); }} className='w-3/4 mt-6 bg-orange-600 text-white py-3 rounded-full font-semibold hover:bg-orange-500 transition-all duration-300'>
              Sign In
            </button>
          )}
        </ul>
      </div>
    </div>
  )
}

export default Navbar