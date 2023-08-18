import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { CgProfile as IconProfile } from 'react-icons/cg'
import Logo from '../assets/rehome.png'
import { MenuProfileOptions } from './MenuProfile'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  return (
    <div className="w-screen absolute top-0 bg-light-bg py-4 px-8 md:px-14 flex justify-end items-center h-16">
      <div className=" absolute left-8 md:left-14 top-0 h-full flex items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-[8vw] md:w-[4vw]" />
        </Link>
      </div>
      <NavLink
        to="/login"
        style={({ isActive }) =>
          isActive ? { visibility: 'hidden' } : { visibility: 'visible' }
        }
      >
        <button
          className={`${
            location.pathname === '/'
              ? 'button-primary px-3 md:px-4 py-1 md:py-3 text-sm md:text-base'
              : 'hidden'
          }  mt-0`}
        >
          {location.pathname === '/' && 'Organisations'}
        </button>
      </NavLink>
      {location.pathname === '/profile' && (
        <div className="relative">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <IconProfile />
          </button>
          {isMenuOpen && <MenuProfileOptions setIsMenuOpen={setIsMenuOpen} />}
        </div>
      )}
    </div>
  )
}
