import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import usePetsContext from '@/hooks/usePetsContext'
import { PetCard } from '../components/pets/PetCard'
import { RegisterPet } from '../components/pets/RegisterPet'
import { Organisation, Pet } from '@/@types/models'

interface AdoptionPets {
  toDonate: Array<Pet>
  donated: Array<Pet>
}
interface Response {
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
  }, [orgToken, pets])

  async function tagPetAsAdopted(petId: string) {
    try {
      const adoptionResponse: { data: Pet } = await api.patch(
        `/me/pets/${petId}`,
      )

      setIsAdopted({
        donated: [...isAdopted.donated, adoptionResponse.data],
        toDonate: [...isAdopted.toDonate],
      })
    } catch (error) {}
  }

  if (!currentOrganisation) {
    return null
  }
  // TODO: Re-render page on setIsAdopted

  const donationPets =
    (showPets === 'to-donate' ? isAdopted.toDonate : isAdopted.donated) || []

  return (
    <div className="h-full w-screen mt-20">
      <div className="flex flex-col justify-center p-10 lg:p-16">
        <div className="relative flex flex-col gap-7 lg:flex-row">
          <h1 className="text-3xl lg:text-5xl font-bold">
            {currentOrganisation?.name}
          </h1>
          <button
            className="button-primary lg:absolute lg:right-0 w-full lg:w-[15vw]"
            onClick={() => setIsSideMenuOpen(true)}
          >
            Register a new pet!
          </button>
        </div>

        <div>
          <div className="flex items-center  gap-10 pt-10 lg:pt-20 pb-10">
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
          <div className="flex flex-col items-center lg:grid lg:grid-cols-auto gap-9 w-full">
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
            ></div>
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
