import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from '@/assets/paw.webp'

export function Navbar() {
  const location = useLocation()
  return (
    <div className="w-screen absolute top-0 bg-light-bg py-4 px-14 flex justify-end items-center">
      <div className=" absolute left-14 top-0 h-full flex items-center">
        <Link to="/">
          <img src={Logo} alt="Logo" className="w-[5vw]" />
        </Link>
      </div>
      <NavLink
        to="/organisations"
        style={({ isActive }) =>
          isActive ? { visibility: 'hidden' } : { visibility: 'visible' }
        }
      >
        <button className="button-primary mt-0">
          {location.pathname === '/profile' ? 'Logout' : 'Organisations'}
        </button>
      </NavLink>
    </div>
  )
}
