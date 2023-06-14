import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Organisation } from './pages/Organisation'
import { OrganisationProfile } from './pages/OrganisationProfile'
import { ViewPetDetails } from './pages/ViewPetDetails'
import { EditPetDetails } from './pages/EditPetDetails'
import { EditOrganisationProfile } from './pages/EditOrganisationProfile'
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/organisations" element={<Organisation />} />
      <Route path="/profile" element={<OrganisationProfile />} />
      <Route path="/pet-details/:petId" element={<ViewPetDetails />} />
      <Route
        path="/organisation/:orgId/pet-details/:petId"
        element={<EditPetDetails />}
      />
      <Route
        path="/organisation/:orgId/edit-profile"
        element={<EditOrganisationProfile />}
      />
    </Routes>
  )
}

export default App
