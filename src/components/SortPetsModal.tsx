import { useRef } from 'react'
import { MdClose as IconClose, MdCheck as IconSelected } from 'react-icons/md'
import usePetsContext from '../hooks/usePetsContext'
import { sortPetsOptions } from '../constants/optionsSelect'
import useOnClickOutside from '../hooks/useClickOutside'

interface SortModalProps {
  setIsModalOpen: (open: boolean) => void
}

export function SortPetsModal({ setIsModalOpen }: SortModalProps) {
  const { setSortPets, sortPets } = usePetsContext()
  const modalRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(modalRef, () => setIsModalOpen(false))

  return (
    <div aria-modal="true" className="modal-opaque-background">
      <div ref={modalRef} className="modal-select-container">
        <section className="modal-select-content-item">
          <h4>Select order</h4>
          <button
            aria-label="Close menu"
            type="button"
            title="Close menu"
            onClick={() => setIsModalOpen(false)}
            className="text-sm"
          >
            <IconClose />
          </button>
        </section>
        <ul className="flex flex-col gap-2 w-full">
          {sortPetsOptions.map((option) => (
            <li
              key={option.value}
              className={`list-none modal-select-content-item relative`}
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
                <IconSelected
                  aria-label="Selected option"
                  className="absolute left-0"
                />
              ) : null}
              <span className="ml-6">{option.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
