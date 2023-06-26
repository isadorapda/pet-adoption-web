import { useState } from 'react'
import { BiSortAlt2 as IconSort } from 'react-icons/bi'
import { SearchPetForm } from '../components/SearchPet/SearchPetForm'
import Pets from '../assets/pets.png'
import { PetCard } from '../components/Pets/PetCard'
import usePetsContext from '../hooks/usePetsContext'
import { Pagination } from '../components/Pagination/Pagination'
import { Loader } from '@/components/Loader/Loader'
import { AlertModal } from '@/components/AlertMessage/AlertModal'
import { SortPetsHomepageSelect } from '@/components/SortPets/SortPetsHomepage'

const EMPTY_RESULTS_MESSAGE = {
  title: 'Sorry',
  content: 'we culd not find any furry friend matching your search.',
}

export function Home() {
  const { pets, pageData } = usePetsContext()
  const [isLoading, setLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
        <SearchPetForm
          setLoading={setLoading}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
      {isLoading ? (
        <Loader />
      ) : pets.length ? (
        <div className="w-screen h-full px-10 lg:px-28 py-10 bg-white flex flex-col items-center">
          <div className="pb-8 md:py-10 flex flex-col w-full  items-center gap-5">
            <div>
              <h3 className="header-3 lg:text-2xl">
                We found {pageData.count} furry friends!
              </h3>
            </div>
            <div className="flex flex-col items-center gap-5 lg:flex-row w-screen md:w-full px-5 relative">
              <Pagination />
              <div className="w-full md:w-max px-5 md:px-0 lg:absolute left-0 flex items-center gap-3">
                <IconSort title="Sort Pets" />
                <div className="w-max md:w-[20vw] ">
                  <SortPetsHomepageSelect />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-auto gap-y-10 gap-x-6 w-full justify-items-center">
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
