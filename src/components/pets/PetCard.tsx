import { useNavigate } from 'react-router-dom'
import { Pet } from '@/@types/models'
import DogExample from '@/assets/Dog.png'
import dayjs from 'dayjs'

interface Props {
  pet: Pet
  isOrg?: boolean
  orgId?: string
  tagPetAsAdopted?: (id: string) => Promise<void>
}

export function PetCard({ pet, isOrg, orgId, tagPetAsAdopted }: Props) {
  const navigate = useNavigate()

  return (
    <div className="h-[45vh] bg-light-bg rounded-xl p-1 w-[300px] shadow-card flex flex-col gap-2 relative pb-8">
      <img
        src={DogExample}
        alt=""
        onClick={() =>
          isOrg
            ? navigate(`/organisation/${orgId}/pet-details/${pet.id}`)
            : navigate(`/pet-details/${pet.id}`)
        }
        className="cursor-pointer"
      />
      <h1 className="text-dark-blue text-lg font-bold text-center">
        {pet.name}
      </h1>
      <div className=" flex flex-col  items-center gap-3">
        <p className="text-dark-blue capitalize">
          {pet.breed?.replace('_', ' ')}
        </p>
        <p className="text-dark-blue lowercase first-letter:uppercase font-semibold">
          {pet.sex} | {pet.age} years | Size: {pet.size}
        </p>
      </div>
      {isOrg && tagPetAsAdopted && (
        <div className="w-full flex items-center py-4 absolute bottom-0">
          <button
            onClick={() => tagPetAsAdopted(pet.id)}
            className="w-full flex justify-center cursor-pointer "
          >
            {pet.adopted_at
              ? `Adopted at ${dayjs(pet.adopted_at).format('DD/MM/YY')}`
              : 'Mark as adopted'}
          </button>
        </div>
      )}
    </div>
  )
}
