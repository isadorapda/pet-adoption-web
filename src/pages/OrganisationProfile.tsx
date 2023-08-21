import { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import usePetsContext from '../hooks/usePetsContext'
import { PetCard } from '../components/PetCard'
import { RegisterPet } from '../components/RegisterPet'
import { Organisation, Pet } from '../@types/models'
import { SortPetsSelect } from '../components/SortPetsOrgProfile'
import { NoPetsRegistered } from '../components/NoPetsRegistered'
import { PetType } from '../constants/petFilters'
import { ButtonSelectPetType } from '../components/ButtonSelectPetType'

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
  const [filterPetType, setFilterPetType] = useState<string | undefined>(
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
        <section className="relative flex flex-col gap-7 md:flex-row md:items-center md:mb-6">
          <h1 className="header-name">{currentOrganisation?.name}</h1>
          <button
            type="button"
            className="button-primary md:absolute md:right-0 w-full md:w-max"
            onClick={() => setIsSideMenuOpen(true)}
          >
            Register a new pet!
          </button>
        </section>

        <div>
          <div className="flex flex-col md:flex-row md:justify-between items-center gap-10 pt-10 lg:pt-20 pb-10">
            <div className="flex items-center gap-5 text-sm">
              <button
                type="button"
                className={`${
                  showPets === 'to-donate' ? 'text-main-red' : ''
                } transition-colors duration-200`}
                onClick={() => setShowPets('to-donate')}
              >
                Your pets for donation
              </button>
              <span className="bg-black h-6 w-[2px]" />
              <button
                type="button"
                className={`${
                  showPets === 'donated' ? 'text-main-red' : ''
                } transition-colors duration-200`}
                onClick={() => setShowPets('donated')}
              >
                Your adopted pets
              </button>
            </div>
            <div className="w-full md:w-max flex items-center justify-center gap-3">
              <SortPetsSelect
                filterPetType={filterPetType}
                orgId={currentOrganisation.id}
                setIsAdopted={setIsAdopted}
              />
              <div className="flex flex-col gap-1">
                {PetType.map((type) => (
                  <ButtonSelectPetType
                    key={type.label}
                    setFilterPetType={setFilterPetType}
                    filterPetType={filterPetType}
                    petType={type}
                  />
                ))}
              </div>
            </div>
          </div>
          {!isAdopted.toDonate.length && showPets === 'to-donate' && (
            <NoPetsRegistered message="You have no pets for donation" />
          )}
          {!isAdopted.donated.length && showPets === 'donated' && (
            <NoPetsRegistered message="You have no adopted pets" />
          )}

          <div className="grid-pet-cards">
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
          <RegisterPet
            orgId={currentOrganisation.id}
            setIsSideMenuOpen={setIsSideMenuOpen}
          />
        )}
      </div>
    </div>
  )
}
