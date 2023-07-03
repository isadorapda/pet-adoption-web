import { LoginOrganisation } from '../components/LoginOrg'
import { RegisterOrganisation } from '../components/RegisterOrg'

export function Organisation() {
  return (
    <div className="p-10 md:p-20 bg-main-red w-screen flex flex-col h-full items-center justify-center">
      <div className="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-24 w-full justify-center mt-20">
        <LoginOrganisation />
        <RegisterOrganisation />
      </div>
    </div>
  )
}
