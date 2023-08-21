import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { OrganisationProfile } from './pages/OrganisationProfile'
import { ViewPetDetails } from './pages/ViewPetDetails'
import { EditPetDetails } from './pages/EditPetDetails'
import { EditOrganisationProfile } from './pages/EditOrganisationProfile'
import { RegisterOrganisation } from './components/RegisterOrg'
import { LoginOrganisation } from './pages/LoginOrg'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginOrganisation />} />
      <Route path="/register" element={<RegisterOrganisation />} />
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
