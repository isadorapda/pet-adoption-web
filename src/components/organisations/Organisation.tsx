import { LoginOrganisation } from './LoginOrg'
import { RegisterOrganisation } from './RegisterOrg'

export function Organisation() {
  return (
    <div className="mt-20 p-20 bg-main-red w-screen flex flex-col h-full items-center justify-center">
      <div className="grid grid-cols-2 gap-24 w-full justify-center">
        <LoginOrganisation />
        <RegisterOrganisation />
      </div>
    </div>
  )
}
