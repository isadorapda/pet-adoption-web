import { Link, NavLink, useLocation } from 'react-router-dom'
import { CgProfile as IconProfile } from 'react-icons/cg'
import Logo from '@/assets/rehome.png'
import { useState } from 'react'
import { MenuProfileOptions } from './MenuProfile'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  return (
    <div className="w-screen absolute top-0 bg-light-bg py-4 px-14 flex justify-end items-center h-[10vh]">
      <div className=" absolute left-14 top-0 h-full flex items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-[9vw] lg:w-[4vw]" />
        </Link>
      </div>
      <NavLink
        to="/organisations"
        style={({ isActive }) =>
          isActive ? { visibility: 'hidden' } : { visibility: 'visible' }
        }
      >
        <button
          className={`${
            location.pathname === '/' ? 'button-primary ' : 'hidden'
          }  mt-0`}
        >
          {location.pathname === '/' && 'Organisations'}
        </button>
        {/* {location.pathname === '/profile' ? (
          <div className="relative">
            <button onClick={() => setIsMenuOpen(true)}>
              <IconProfile />
            </button>
            {isMenuOpen && <MenuProfileOptions />}
          </div>
        ) : (
          'Organisations'
        )} */}
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
