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
      onClick={() => navigate(`/pets/${pet.id}/details`)}
      className="bg-light-bg rounded-xl p-1 w-[300px] shadow-card"
    >
      <img src={DogExample} alt="" />
      <h1 className="text-dark-blue text-lg font-bold text-center py-8">
        {pet.name}
      </h1>
    </div>
  )
}
