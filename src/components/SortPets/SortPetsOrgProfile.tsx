import { useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { AdoptionPets, Response } from '../../pages/OrganisationProfile'
import Select from 'react-select'
import { options } from './optionsSelect'
import { PetType } from '../../utils/petFilters'
import { SortPets } from '../../@types/models'

interface SortPetsProps {
  orgId: string
  setIsAdopted: (values: AdoptionPets) => void
  filterPetType: PetType | undefined
}

export function SortPetsSelect({
  orgId,
  setIsAdopted,
  filterPetType,
}: SortPetsProps) {
  const [sortPets, setSortPets] = useState<SortPets>()

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
    <Select
      options={options}
      placeholder="Sort pets by..."
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          borderRadius: '6px',
          fontSize: '1rem',
          padding: '2px',
          width: '100%',
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          borderRadius: '2px',
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          background: state.isFocused
            ? '#e6e7e99c'
            : state.isSelected
            ? 'rgba(246, 128, 132, 0.2)'
            : 'white',
          color: 'black',
          borderRadius: '2px',
          width: '100%',
        }),
      }}
      onChange={(selected) =>
        selected &&
        setSortPets({ field: selected?.field, order: selected.order })
      }
    />
  )
}
