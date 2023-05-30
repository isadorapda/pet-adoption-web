import { useNavigate } from 'react-router-dom'
import { Pet } from '@/@types/models'
import DogExample from '@/assets/Dog.png'
import { api } from '@/lib/axios'
import dayjs from 'dayjs'

interface Props {
  pet: Pet
  isOrg?: boolean
}

export function PetCard({ pet, isOrg }: Props) {
  const navigate = useNavigate()

  async function tagPetAsAdopted() {
    await api.patch(`/me/pets/${pet.id}`)
  }

  return (
    <div className="bg-light-bg rounded-xl p-1 w-[300px] shadow-card flex flex-col gap-5">
      <img
        src={DogExample}
        alt=""
        onClick={() => navigate(`/pet-details/${pet.id}`)}
        className="cursor-pointer"
      />
      <h1 className="text-dark-blue text-lg font-bold text-center">
        {pet.name}
      </h1>
      <div className="pb-4 flex flex-col  items-center">
        <p className="text-dark-blue">{pet.breed}</p>
        <p className="text-dark-blue lowercase first-letter:uppercase font-semibold p-4">
          {pet.sex}, {pet.age} years, Size: {pet.size}
        </p>
      </div>
      {isOrg && (
        <div className="w-full flex items-center">
          <button
            onClick={tagPetAsAdopted}
            className="w-full flex justify-center cursor-pointer "
          >
            {pet.adopted_at
              ? `Adopted ${dayjs(pet.adopted_at).format('DD/MM/YY')}`
              : 'Mark as adopted'}
          </button>
        </div>
      )}
    </div>
  )
}
