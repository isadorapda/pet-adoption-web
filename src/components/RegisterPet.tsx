import { useRef, useState } from 'react'
import { GrClose as IconClose } from 'react-icons/gr'
import { RegisteredAlertModal } from './RegisteredAlert'
import { RegisterPetForm } from './RegisterPetForm'
import useOnClickOutside from '../hooks/useClickOutside'

interface Props {
  orgId: string
  setIsSideMenuOpen: (value: boolean) => void
}

const SUCCESS_MESAGE = {
  title: 'Success!',
  content: 'Your pet has been registered.',
}

export function RegisterPet({ orgId, setIsSideMenuOpen }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const registerPetFormRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(registerPetFormRef, () => setIsSideMenuOpen(false))
  return (
    <div
      aria-modal="true"
      className="fixed top-0 left-0 bg-opaque-white w-screen h-full"
    >
      <div ref={registerPetFormRef} className="bg-main-red side-menu-form">
        <button
          aria-label="Click to close menu"
          title="Close"
          type="button"
          className="absolute left-6 lg:left-10 top-6 lg:top-10"
          onClick={() => setIsSideMenuOpen(false)}
        >
          <IconClose aria-hidden="true" />
        </button>
        <h1 className="text-xl lg:text-2xl font-bold mb-6">
          Register a new pet
        </h1>
        <RegisterPetForm orgId={orgId} setIsModalOpen={setIsModalOpen} />
        {isModalOpen && (
          <RegisteredAlertModal
            setIsSideMenuOpen={setIsSideMenuOpen}
            setIsModalOpen={setIsModalOpen}
            message={SUCCESS_MESAGE}
          />
        )}
      </div>
    </div>
  )
}
