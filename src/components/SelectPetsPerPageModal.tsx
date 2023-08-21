import { MdClose as IconClose, MdCheck as IconSelected } from 'react-icons/md'
import { Option } from '../styles/selectStyles'
import usePetsContext from '../hooks/usePetsContext'
import { Limit } from '../context/petsContext'
import { useRef } from 'react'
import useOnClickOutside from '../hooks/useClickOutside'

interface PetsPageModalProps {
  setIsModalOpen: (open: boolean) => void
  options: Array<Option>
}

export function SelectPetsPerPageModal({
  setIsModalOpen,
  options,
}: PetsPageModalProps) {
  const { internalLimit, setInternalLimit } = usePetsContext()
  const modalRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(modalRef, () => setIsModalOpen(false))

  return (
    <div aria-modal="true" className="modal-opaque-background">
      <div ref={modalRef} className="modal-select-container">
        <section className="modal-select-content-item">
          <h4>Select pets per page</h4>
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
          {options.map((option) => (
            <li
              key={option.value}
              className={`list-none modal-select-content-item relative`}
              onClick={() => {
                if (option.value === Limit.ALL) {
                  setInternalLimit(Limit.ALL)
                  return
                }
                setInternalLimit(Number(option.value) as Limit)
                setIsModalOpen(false)
              }}
            >
              {option.value === internalLimit.toString() ? (
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
