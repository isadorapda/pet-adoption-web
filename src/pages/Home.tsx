import { SearchPetForm } from '../components/searchPet/SearchPetForm'
import Pets from '../assets/pets.png'
import { PetCard } from '../components/pets/PetCard'
import usePetsContext from '../hooks/usePetsContext'

export function Home() {
  const { pets } = usePetsContext()

  return (
    <div className="flex min-h-screen flex-col items-center py-10 px-1 lg:p-24 bg-main-red mt-10">
      <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 p-10 lg:p-20">
        <div className="flex flex-col gap-7">
          <h1 className="text-white font-primary text-3xl lg:text-5xl">
            Rehoming
          </h1>
          <h2 className="text-white font-primary lg:text-xl font-light lg:w-[70%]">
            Could you give a pet a forever home? Browse our furry friends
            looking for a new start.
          </h2>
          <div className="lg:w-[25vw] pt-20">
            <img src={Pets} alt="" />
          </div>
        </div>
        <SearchPetForm />
      </div>

      {pets.length ? (
        <div className="w-screen h-full p-20 bg-white flex flex-col">
          <div className="grid grid-cols-auto gap-8 w-full">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  )
}
