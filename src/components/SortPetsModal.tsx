import { MdClose as IconClose, MdCheck as IconSelected } from 'react-icons/md'
import usePetsContext from '../hooks/usePetsContext'
import { sortPetsOptions } from '../constants/optionsSelect'

interface SortModalProps {
  setIsModalOpen: (open: boolean) => void
}

export function SortPetsModal({ setIsModalOpen }: SortModalProps) {
  const { setSortPets, sortPets } = usePetsContext()

  return (
    <div className="h-screen w-screen z-[1000] fixed top-0 left-0 bg-opaque-black flex items-center justify-center p-8">
      <div className="w-full bg-white p-5 flex items-center rounded-md flex-col gap-2">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 w-full">
          <h4>Select order </h4>
          <button onClick={() => setIsModalOpen(false)} className="text-sm">
            <IconClose />
          </button>
        </div>
        <ul className="flex flex-col gap-2 w-full">
          {sortPetsOptions.map((option) => (
            <li
              key={option.value}
              className={`list-none border-b border-gray-300 pb-2 flex items-center relative`}
              onClick={() => {
                setSortPets({
                  field: option.field,
                  order: option.order,
                })
                setIsModalOpen(false)
              }}
            >
              {option.field === sortPets?.field &&
              option.order === sortPets?.order ? (
                <IconSelected className="absolute left-0" />
              ) : null}
              <span className="ml-6"> {option.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
