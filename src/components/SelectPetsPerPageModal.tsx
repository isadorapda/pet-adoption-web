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
    <div className="h-screen w-screen z-[1000] fixed top-0 left-0 bg-opaque-black flex items-center justify-center p-8">
      <div
        ref={modalRef}
        className="w-full bg-white p-5 flex items-center rounded-md flex-col gap-2"
      >
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 w-full">
          <h4>Select pets per page </h4>
          <button onClick={() => setIsModalOpen(false)} className="text-sm">
            <IconClose />
          </button>
        </div>
        <ul className="flex flex-col gap-2 w-full">
          {options.map((option) => (
            <li
              key={option.value}
              className={`list-none border-b border-gray-300 pb-2 flex items-center relative`}
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
