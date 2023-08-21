import { useEffect, useState } from 'react'
import { SearchPetForm } from '../components/SearchPetForm'
import Pets from '../assets/pets.png'
import { PetCard } from '../components/PetCard'
import usePetsContext from '../hooks/usePetsContext'
import { Loader } from '../components/Loader'
import { AlertModal } from '../components/AlertModal'
import { PageOptionsContainer } from '../components/PageOptionsContainer'
import { Pagination } from '../components/Pagination'

const EMPTY_RESULTS_MESSAGE = {
  title: 'Sorry',
  content: 'we culd not find any furry friend matching your search.',
}

export function Home() {
  const { pets, pageData } = usePetsContext()
  const [isLoading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (pets.length) {
      scrollTo({
        top: 800,
        behavior: 'smooth',
      })
    }
  }, [pets])

  return (
    <div className="section-wrapper min-h-screen flex-col items-center px-1 lg:px-24 bg-main-red">
      <div className="flex flex-col lg:gap-6 md:grid md:grid-cols-2 p-7 lg:p-20">
        <div className="flex flex-col gap-7 text-white font-primary">
          <h1 className="text-3xl lg:text-5xl">Rehoming</h1>
          <h2 className="lg:text-xl font-light md:w-[70%]">
            Could you give a pet a forever home? Browse our furry friends
            looking for a new start.
          </h2>
          <div className="w-[50vw] md:w-[30vw] lg:w-[25vw] md:pt-20 lg:pt-10 max-[767px]:mb-10 max-[767px]:mx-auto">
            <img src={Pets} alt="Six happy dogs" />
          </div>
        </div>
        <SearchPetForm
          setLoading={setLoading}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : pets.length ? (
        <div className="w-screen min-h-screen px-6 lg:px-28 py-10 bg-white flex flex-col items-center">
          <header className="pb-10 flex flex-col w-full items-center md:justify-center gap-5">
            <h3 className="header-3 lg:text-2xl">
              We found {pageData.count} furry friends!
            </h3>
            <PageOptionsContainer />
          </header>
          <main className="grid-pet-cards">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </main>
          <Pagination />
        </div>
      ) : null}
      {isModalOpen && (
        <AlertModal
          setIsModalOpen={setIsModalOpen}
          message={EMPTY_RESULTS_MESSAGE}
        />
      )}
    </div>
  )
}
