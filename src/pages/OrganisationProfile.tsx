import { useEffect, useState } from 'react'
import { BiSortAlt2 as IconSort } from 'react-icons/bi'
import { TbDog as IconDog, TbCat as IconCat } from 'react-icons/tb'
import { api } from '@/lib/axios'
import usePetsContext from '@/hooks/usePetsContext'
import { PetCard } from '../components/Pets/PetCard'
import { RegisterPet } from '../components/Pets/RegisterPet'
import { Organisation, Pet } from '@/@types/models'
import { SortPetsSelect } from '@/components/SortPets/SortPetsOrgProfile'
import { PetType } from '@/utils/petFilters'
import { NoPetsRegistered } from '@/components/Organisations/NoPetsRegistered'

export interface AdoptionPets {
  toDonate: Array<Pet>
  donated: Array<Pet>
}

export interface Response {
  data: { user: Organisation }
}

export function OrganisationProfile() {
  const { orgToken, currentOrganisation, setCurrentOrganisation, pets } =
    usePetsContext()
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [isAdopted, setIsAdopted] = useState<AdoptionPets>({
    donated: [],
    toDonate: [],
  })
  const [showPets, setShowPets] = useState<'donated' | 'to-donate'>('to-donate')
  const [filterPetType, setFilterPetType] = useState<PetType | undefined>(
    undefined,
  )
  const [data, setData] = useState<{ data: Pet }>()

  useEffect(() => {
    async function fetchProfile() {
      try {
        const req: Response = await api.get('/me', {
          headers: { Authorization: `Bearer ${orgToken}` },
        })
        setCurrentOrganisation(req.data.user)
        setIsAdopted({
          donated: req.data.user.pets.filter((pet) => pet.adopted_at),
          toDonate: req.data.user.pets.filter((pet) => !pet.adopted_at),
        })
      } catch (error) {
        console.log(error)
      }
    }

    fetchProfile()
  }, [orgToken, pets, data])

  async function tagPetAsAdopted(petId: string) {
    try {
      const adoptionResponse: { data: Pet } = await api.patch(
        `/me/pets/${petId}`,
      )
      setData(adoptionResponse)
      setIsAdopted({
        donated: [...isAdopted.donated, adoptionResponse.data],
        toDonate: [...isAdopted.toDonate],
      })
    } catch (error) {}
  }

  if (!currentOrganisation) {
    return null
  }

  const donationPets =
    (showPets === 'to-donate' ? isAdopted.toDonate : isAdopted.donated) || []

  return (
    <div className="h-full w-screen mt-20">
      <div className="flex flex-col justify-center p-10 lg:p-16">
        <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:mb-6">
          <h1 className="text-3xl lg:text-5xl font-bold">
            {currentOrganisation?.name}
          </h1>
          <button
            className="button-primary md:absolute md:right-0 w-full md:w-max lg:w-[15vw]"
            onClick={() => setIsSideMenuOpen(true)}
          >
            Register a new pet!
          </button>
        </div>

        <div>
          <div className="flex flex-col md:flex-row items-center gap-10 pt-10 lg:pt-20 pb-10 relative">
            <div className="flex items-center gap-5">
              <button
                className={`${
                  showPets === 'to-donate' ? 'text-main-red' : ''
                } cursor-pointer transition-colors duration-200`}
                onClick={() => setShowPets('to-donate')}
              >
                Your pets for donation
              </button>
              <span className="bg-black h-6 w-[2px]" />
              <button
                className={`${
                  showPets === 'donated' ? 'text-main-red' : ''
                } cursor-pointer transition-colors duration-200`}
                onClick={() => setShowPets('donated')}
              >
                Your adopted pets
              </button>
            </div>
            <div className="w-full md:w-max md:absolute right-0 flex items-center gap-3">
              <IconSort title="Sort Pets" />
              <div className="w-full md:w-max lg:w-[20vw] ">
                <SortPetsSelect
                  filterPetType={filterPetType}
                  orgId={currentOrganisation.id}
                  setIsAdopted={setIsAdopted}
                />
              </div>
              <div>
                <IconCat
                  title="Show all cats"
                  className={`cursor-pointer ${
                    filterPetType === PetType.CAT ? 'stroke-main-red ' : ''
                  }`}
                  onClick={() =>
                    setFilterPetType(
                      filterPetType !== PetType.CAT ? PetType.CAT : undefined,
                    )
                  }
                />
                <IconDog
                  title="Show all dogs"
                  className={`cursor-pointer ${
                    filterPetType === PetType.DOG ? 'stroke-main-red' : ''
                  }`}
                  onClick={() =>
                    setFilterPetType(
                      filterPetType !== PetType.DOG ? PetType.DOG : undefined,
                    )
                  }
                />
              </div>
            </div>
          </div>
          {!isAdopted.toDonate.length && showPets === 'to-donate' && (
            <NoPetsRegistered message="You have no pets for donation" />
          )}
          {!isAdopted.donated.length && showPets === 'donated' && (
            <NoPetsRegistered message="You have no adopted pets" />
          )}

          <div className="flex flex-col items-center md:grid md:grid-cols-auto gap-9 w-full">
            {donationPets.map((pet) => (
              <PetCard
                key={pet.id}
                pet={pet}
                isOrg={true}
                tagPetAsAdopted={tagPetAsAdopted}
                orgId={currentOrganisation.id}
              />
            ))}
          </div>
        </div>

        {isSideMenuOpen && (
          <>
            <div
              className="fixed top-0 left-0 bg-opaque-white w-screen h-full"
              onClick={() => setIsSideMenuOpen(false)}
            />
            <RegisterPet
              orgId={currentOrganisation.id}
              setIsSideMenuOpen={setIsSideMenuOpen}
            />
          </>
        )}
      </div>
    </div>
  )
}
