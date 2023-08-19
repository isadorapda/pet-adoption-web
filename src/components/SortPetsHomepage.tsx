import { useState } from 'react'
import Select from 'react-select'
import { BiSortAlt2 as IconSort } from 'react-icons/bi'
import { sortPetsOptions } from '../constants/optionsSelect'
import usePetsContext from '../hooks/usePetsContext'
import { useWindowWidth } from '../hooks/useWindowWidth'
import { SortPetsModal } from './SortPetsModal'

export function SortPetsHomepageSelect() {
  const { setSortPets } = usePetsContext()
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
          <Select
            options={sortPetsOptions}
            placeholder="Sort pets by..."
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                borderRadius: '6px',
                fontSize: '1rem',
                padding: '0 2px',
                width: '100%',
              }),
              menu: (baseStyles) => ({
                ...baseStyles,

                width: 'max-content',
              }),
              menuList: (baseStyles) => ({
                ...baseStyles,
                borderRadius: '2px',
                width: 'max-content',
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                background: state.isFocused
                  ? '#e6e7e99c'
                  : state.isSelected
                  ? 'rgba(246, 128, 132, 0.2)'
                  : 'white',
                color: 'black',
                borderRadius: '2px',
                width: 'max-content',
              }),
            }}
            onChange={(selected) =>
              selected &&
              setSortPets({ field: selected?.field, order: selected.order })
            }
          />
        </div>
      )}
    </>
  )
}
