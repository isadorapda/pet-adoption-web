import { useEffect, useState } from 'react'
import { BiSortAlt2 as IconSort } from 'react-icons/bi'
import { SearchPetForm } from '../components/SearchPetForm'
import Pets from '../assets/pets.png'
import { PetCard } from '../components/PetCard'
import usePetsContext from '../hooks/usePetsContext'
import { Pagination } from '../components/Pagination'
import { Loader } from '../components/Loader'
import { AlertModal } from '../components/AlertModal'
import { SortPetsHomepageSelect } from '../components/SortPetsHomepage'

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
    <div className="flex min-h-screen flex-col items-center py-10 px-1 lg:p-24 bg-main-red mt-10">
      <div className="flex flex-col lg:gap-6 md:grid md:grid-cols-2 p-7 lg:p-20">
        <div className="flex flex-col gap-7">
          <h1 className="text-white font-primary text-3xl lg:text-5xl">
            Rehoming
          </h1>
          <h2 className="text-white font-primary lg:text-xl font-light md:w-[70%]">
            Could you give a pet a forever home? Browse our furry friends
            looking for a new start.
          </h2>
          <div className="w-[50vw] md:w-[30vw] lg:w-[25vw] md:pt-20 lg:pt-10  mb-10 md:mb-0 mx-auto md:mx-0">
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
          <div className="pb-8 md:pb-16 lg:py-10 flex flex-col w-full  items-center gap-5">
            <div>
              <h3 className="header-3 lg:text-2xl">
                We found {pageData.count} furry friends!
              </h3>
            </div>
            <div className="flex flex-col items-center gap-5 md:flex-row w-screen md:w-full px-5 relative">
              <Pagination />
              <div className="w-screen md:w-max px-5 md:px-0 md:absolute left-0 flex items-center gap-3">
                <IconSort title="Sort Pets" />
                <div className="w-full lg:w-[20vw] ">
                  <SortPetsHomepageSelect />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-auto gap-y-10 gap-x-6 w-full items-center md:justify-items-center">
            {pets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
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
