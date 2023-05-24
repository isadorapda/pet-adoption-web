import { useNavigate } from 'react-router-dom'
import { Pet } from '../../@types/models'
import DogExample from '../../assets/Dog.png'

interface Props {
  pet: Pet
}

export function PetCard({ pet }: Props) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => navigate(`/pet-details/${pet.id}`)}
      className="bg-light-bg rounded-xl p-1 w-[300px] shadow-card flex flex-col gap-5"
    >
      <img src={DogExample} alt="" />
      <h1 className="text-dark-blue text-lg font-bold text-center">
        {pet.name}
      </h1>
      <div className="pb-4 flex flex-col  items-center">
        <p className="text-dark-blue">{pet.breed}</p>
        <p className="text-dark-blue lowercase first-letter:uppercase font-semibold p-4">
          {pet.sex}, {pet.age} years, Size: {pet.size}
        </p>
      </div>
    </div>
  )
}
