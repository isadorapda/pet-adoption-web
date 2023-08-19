import { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { AdoptionPets, Response } from '../pages/OrganisationProfile'
import { BiSortAlt2 as IconSort } from 'react-icons/bi'
import { useWindowWidth } from '../hooks/useWindowWidth'
import { SortPetsModal } from './SortPetsModal'
import usePetsContext from '../hooks/usePetsContext'
import { SelectSortPets } from './SelectSortPets'

interface SortPetsProps {
  orgId: string
  setIsAdopted: (values: AdoptionPets) => void
  filterPetType: string | undefined
}

export function SortPetsSelect({
  orgId,
  setIsAdopted,
  filterPetType,
}: SortPetsProps) {
  const { sortPets } = usePetsContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const width = useWindowWidth()
  const isMobile = width < 768

  useEffect(() => {
    async function getSortedPets() {
      try {
        const resp: Response = await api.get(`/organisations/pets/${orgId}`, {
          params: {
            field: sortPets?.field,
            order: sortPets?.order,
            petType: filterPetType || null,
          },
        })
        setIsAdopted({
          donated: resp.data.user.pets.filter((pet) => pet.adopted_at),
          toDonate: resp.data.user.pets.filter((pet) => !pet.adopted_at),
        })
      } catch {}
    }
    getSortedPets()
  }, [sortPets, filterPetType])

  return (
    <>
      {isMobile ? (
        <>
          <button
            onClick={() => setIsModalOpen(true)}
            className="gap-1 button-secondary mt-0 w-1/2 "
          >
            <IconSort /> Sort
          </button>
          {isModalOpen && <SortPetsModal setIsModalOpen={setIsModalOpen} />}
        </>
      ) : (
        <SelectSortPets />
      )}
    </>
  )
}
