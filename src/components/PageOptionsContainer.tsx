import { PetsPerPage } from './PetsPerPage'
import { SortPetsHomepageSelect } from './SortPetsHomepage'

export function PageOptionsContainer() {
  return (
    <div className="flex items-center justify-between md:justify-center xl:justify-end gap-5 w-full px-5">
      <PetsPerPage />
      <SortPetsHomepageSelect />
    </div>
  )
}
