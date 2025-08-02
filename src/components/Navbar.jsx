import { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const { token, userData, logout } = useContext(AppContext)

  const handleLogout = async () => {
    await logout()
  }

  return (
    <nav className="flex items-center justify-between py-4 px-6 lg:px-16 bg-gradient-to-b from-green-50/90 to-white/90 backdrop-blur-xl sticky top-0 z-50 border-b border-green-100/30 shadow-[0_2px_12px_rgba(34,197,94,0.1)]">
      {/* Brand Name */}
      <span 
        onClick={() => navigate('/')} 
        className="text-2xl lg:text-3xl font-semibold text-green-600 cursor-pointer hover:text-green-500 transition-all duration-300 hover:scale-105 flex items-center gap-2 tracking-wide"
      >
        <span className="text-xl transform hover:rotate-12 transition-transform duration-300">⚡️</span> EnergiPort
      </span>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-8 font-medium text-base tracking-tight">
        <NavLink 
          to="/" 
          className={({ isActive }) => `relative px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-100/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] ${isActive ? 'text-green-600 bg-green-100/50 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-500' : ''}`}
        >
          Home
        </NavLink>
        <NavLink 
          to="/doctors" 
          className={({ isActive }) => `relative px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-100/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] ${isActive ? 'text-green-600 bg-green-100/50 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-500' : ''}`}
        >
          Charging Stations
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => `relative px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-100/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] ${isActive ? 'text-green-600 bg-green-100/50 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-500' : ''}`}
        >
          About
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => `relative px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-green-100/50 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_8px_rgba(34,197,94,0.3)] ${isActive ? 'text-green-600 bg-green-100/50 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-500' : ''}`}
        >
          Contact
        </NavLink>
      </ul>

      {/* User Actions */}
      <div className="flex items-center gap-4 lg:gap-6">
        {token && userData ? (
          <div className="relative group">
            <div className="flex items-center gap-2 cursor-pointer">
              <img 
                className="w-9 h-9 rounded-full object-cover border-2 border-green-200 group-hover:border-green-400 group-hover:shadow-[0_0_10px_rgba(34,197,94,0.4)] transition-all duration-300" 
                src={userData.image} 
                alt="" 
              />
              <span className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-all duration-300 hidden sm:block tracking-tight">
                {userData.name}
              </span>
            </div>
            <div className="absolute right-0 top-10 mt-2 w-52 bg-white/95 rounded-xl shadow-lg border border-green-100/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="p-4 flex flex-col gap-2">
                <p 
                  onClick={() => navigate('/my-profile')} 
                  className="px-3 py-2 text-gray-700 font-medium hover:bg-green-100/50 hover:text-green-600 hover:scale-105 rounded-md cursor-pointer transition-all duration-200"
                >
                  My Profile
                </p>
                <p 
                  onClick={() => navigate('my-appointments')} 
                  className="px-3 py-2 text-gray-700 font-medium hover:bg-green-100/50 hover:text-green-600 hover:scale-105 rounded-md cursor-pointer transition-all duration-200"
                >
                  My Charging
                </p>
                <p 
                  onClick={handleLogout} 
                  className="px-3 py-2 text-gray-700 font-medium hover:bg-red-100/50 hover:text-red-600 hover:scale-105 rounded-md cursor-pointer transition-all duration-200"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => navigate('/login')} 
            className="relative bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold overflow-hidden group hover:bg-green-500 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_12px_rgba(34,197,94,0.5)]"
          >
            <span className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            Sign In
          </button>
        )}
        <button 
          onClick={() => setShowMenu(true)} 
          className="md:hidden p-2 rounded-full hover:bg-green-100/50 hover:scale-110 transition-all duration-200"
        >
          <span className="text-xl text-green-600">🌿</span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 bg-white/95 backdrop-blur-lg transition-all duration-400 ${showMenu ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'}`}>
        <div className="flex justify-between p-6">
          <span className="text-2xl font-semibold text-green-600 flex items-center gap-2 tracking-wide">
            <span className="text-xl transform hover:rotate-12 transition-transform duration-300">⚡️</span> EnergiPort
          </span>
          <button 
            onClick={() => setShowMenu(false)} 
            className="p-2 rounded-full hover:bg-green-100/50 hover:scale-110 transition-all duration-200"
          >
            <span className="text-xl text-green-600">✕</span>
          </button>
        </div>
        <ul className="flex flex-col items-center gap-6 mt-12">
          <NavLink 
            onClick={() => setShowMenu(false)} 
            to="/" 
            className={({ isActive }) => `w-4/5 text-center py-3 text-lg text-gray-700 font-medium hover:bg-green-100/50 hover:text-green-600 hover:scale-105 rounded-lg transition-all duration-200 ${isActive ? 'text-green-600 bg-green-100/50' : ''}`}
          >
            Home
          </NavLink>
          <NavLink 
            onClick={() => setShowMenu(false)} 
            to="/stations" 
            className={({ isActive }) => `w-4/5 text-center py-3 text-lg text-gray-700 font-medium hover:bg-green-100/50 hover:text-green-600 hover:scale-105 rounded-lg transition-all duration-200 ${isActive ? 'text-green-600 bg-green-100/50' : ''}`}
          >
            Charging Stations
          </NavLink>
          <NavLink 
            onClick={() => setShowMenu(false)} 
            to="/about" 
            className={({ isActive }) => `w-4/5 text-center py-3 text-lg text-gray-700 font-medium hover:bg-green-100/50 hover:text-green-600 hover:scale-105 rounded-lg transition-all duration-200 ${isActive ? 'text-green-600 bg-green-100/50' : ''}`}
          >
            About
          </NavLink>
          <NavLink 
            onClick={() => setShowMenu(false)} 
            to="/contact" 
            className={({ isActive }) => `w-4/5 text-center py-3 text-lg text-gray-700 font-medium hover:bg-green-100/50 hover:text-green-600 hover:scale-105 rounded-lg transition-all duration-200 ${isActive ? 'text-green-600 bg-green-100/50' : ''}`}
          >
            Contact
          </NavLink>
          {!token && (
            <button 
              onClick={() => { navigate('/login'); setShowMenu(false); }} 
              className="w-4/5 mt-8 bg-green-600 text-white py-3 rounded-full text-lg font-semibold relative overflow-hidden group hover:bg-green-500 hover:shadow-[0_0_12px_rgba(34,197,94,0.5)] hover:scale-105 transition-all duration-300"
            >
              <span className="absolute inset-0 bg-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              Sign In
            </button>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar