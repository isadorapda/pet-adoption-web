import { useState } from 'react'
import { BiSortAlt2 as IconSort } from 'react-icons/bi'
import { useWindowWidth } from '../hooks/useWindowWidth'
import { SortPetsModal } from './SortPetsModal'
import { SelectSortPets } from './SelectSortPets'

export function SortPetsHomepageSelect() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const width = useWindowWidth()
  const isMobile = width < 768
  return (
    <>
      {isMobile ? (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="gap-1 button-secondary mt-0 w-1/2 "
          >
            <IconSort /> Sort
          </button>
          {isModalOpen && <SortPetsModal setIsModalOpen={setIsModalOpen} />}
        </>
      ) : (
        <div className="w-max px-5 md:px-0 flex items-center gap-3">
          <SelectSortPets />
        </div>
      )}
    </>
  )
}
