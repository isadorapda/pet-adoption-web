import { useState } from 'react'
import { GrClose as IconClose } from 'react-icons/gr'
import { RegisteredAlertModal } from './RegisteredAlert'
import { RegisterPetForm } from './RegisterPetForm'

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

  return (
    <div className="bg-main-red px-12 py-16 xl:p-20 h-screen w-screen md:w-2/3 lg:w-[40vw] absolute overflow-auto right-0 top-0 shadow-card animate-fadeInRight">
      <button
        className="absolute cursor-pointer left-6 lg:left-10 top-6 lg:top-10"
        onClick={() => setIsSideMenuOpen(false)}
      >
        <IconClose />
      </button>
      <h1 className="text-xl lg:text-2xl font-bold mb-6">Register a new pet</h1>
      <RegisterPetForm orgId={orgId} setIsModalOpen={setIsModalOpen} />
      {isModalOpen && (
        <RegisteredAlertModal
          setIsSideMenuOpen={setIsSideMenuOpen}
          setIsModalOpen={setIsModalOpen}
          message={SUCCESS_MESAGE}
        />
      )}
    </div>
  )
}
