import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Organisation } from './components/organisations/Organisation'
import { OrganisationProfile } from './components/organisations/OrganisationProfile'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/organisations" element={<Organisation />} />
      <Route path="/profile" element={<OrganisationProfile />} />
    </Routes>
  )
}

export default App
