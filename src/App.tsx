import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Organisation } from './components/organisations/Organisation'
import { OrganisationProfile } from './components/organisations/OrganisationProfile'
import { PetDetails } from './components/pets/PetDetails'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/organisations" element={<Organisation />} />
      <Route path="/profile" element={<OrganisationProfile />} />
      <Route path="/pet-details/:petId" element={<PetDetails />} />
    </Routes>
  )
}

export default App
