import { Link } from 'react-router-dom'
export function Navbar() {
  return (
    <div className="w-screen absolute top-0 bg-light-bg p-10 flex ">
      <Link to="/organisations">Organisations</Link>
    </div>
  )
}
