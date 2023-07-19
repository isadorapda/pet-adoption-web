import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { Pet } from '../@types/models'
import DogExample from '../assets/Dog.png'

interface Props {
  pet: Pet
  isOrg?: boolean
  orgId?: string
  tagPetAsAdopted?: (id: string) => Promise<void>
}

export function PetCard({ pet, isOrg, orgId, tagPetAsAdopted }: Props) {
  const navigate = useNavigate()

  return (
    <div className="h-[300px]  bg-light-bg rounded-xl pt-1 px-1 w-[300px] shadow-card flex flex-col gap-2 relative pb-10">
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
      {isOrg && tagPetAsAdopted ? (
        <button
          onClick={() => tagPetAsAdopted(pet.id)}
          className="w-full flex justify-center cursor-pointer "
        >
          {pet.adopted_at
            ? `Adopted at ${dayjs(pet.adopted_at).format('DD/MM/YY')}`
            : 'Mark as adopted'}
        </button>
      ) : (
        <button
          onClick={() => navigate(`/pet-details/${pet.id}`)}
          className="cursor-pointer button-primary w-max py-1 mt-0 absolute bottom-2 left-1/2 -translate-x-1/2 text-sm hover:brightness-95 transition-all"
        >
          Details
        </button>
      )}
    </div>
  )
}
