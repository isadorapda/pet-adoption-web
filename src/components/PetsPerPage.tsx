import { useState } from 'react'
import Select from 'react-select'
import { Limit } from '../context/petsContext'
import usePetsContext from '../hooks/usePetsContext'
import { customStyles, Option } from '../styles/selectStyles'
import { useWindowWidth } from '../hooks/useWindowWidth'
import { SelectPetsPerPageModal } from './SelectPetsPerPageModal'

export function PetsPerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setInternalLimit } = usePetsContext()

  const width = useWindowWidth()
  const isMobile = width < 768

  const optionsSelect: Array<Option> = Object.values(Limit)
    .filter((value) => typeof value === 'number' || value === 'All')
    .map((limitValue) => {
      return {
        label: `${limitValue}`,
        value: `${limitValue}`,
      }
    })
  return (
    <>
      {isMobile ? (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="gap-1 button-secondary mt-0 w-1/2"
          >
            Pets per page
          </button>
          {isModalOpen && (
            <SelectPetsPerPageModal
              setIsModalOpen={setIsModalOpen}
              options={optionsSelect}
            />
          )}
        </>
      ) : (
        <div className=" flex lg:flex-row items-center gap-1 lg:gap-3 md:w-max">
          <h3 className="text-sm lg:text-base">Pets per page:</h3>
          <Select
            defaultValue={optionsSelect[0]}
            isSearchable={false}
            styles={customStyles}
            options={optionsSelect}
            isMulti={false}
            onChange={(selected) => {
              if (selected && selected.value === Limit.ALL) {
                setInternalLimit(Limit.ALL)
                return
              }
              setInternalLimit(Number(selected?.value) as Limit)
            }}
          />
        </div>
      )}
    </>
  )
}
