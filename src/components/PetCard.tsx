import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import {
  MdFemale as IconFemale,
  MdMale as IconMale,
  MdOutlineCake as IconAge,
} from 'react-icons/md'
import { TbDog as IconDog, TbCat as IconCat } from 'react-icons/tb'
import { TfiRulerAlt as IconSize } from 'react-icons/tfi'

import { Pet } from '../@types/models'
import DogExample from '../assets/Dog.png'

interface Props {
  pet: Pet
  isOrg?: boolean
  orgId?: string
  tagPetAsAdopted?: (id: string) => Promise<void>
}

export function PetCard({ pet, isOrg, orgId, tagPetAsAdopted }: Props) {
  const navigate = useNavigate()

  return (
    <div className="h-[280px] md:h-[300px] bg-light-bg rounded-xl pt-1 px-1 max-w-[300px] shadow-card flex flex-col gap-2 relative pb-10">
      <div className="absolute top-2 left-2 rounded-full flex items-center justify-center bg-yellow h-6 w-6">
        {pet.sex === 'FEMALE' ? <IconFemale /> : <IconMale />}{' '}
      </div>
      <img
        src={DogExample}
        alt=""
        onClick={() =>
          isOrg
            ? navigate(`/organisation/${orgId}/pet-details/${pet.id}`)
            : navigate(`/pet-details/${pet.id}`)
        }
        className="cursor-pointer"
      />
      <div className="flex mx-auto items-center gap-2 text-dark-blue text-lg text-center">
        <h1 className="font-bold ">{pet.name}</h1>
        {pet.pet_type === 'CAT' ? <IconCat /> : <IconDog />}
      </div>
      <div className="flex flex-col gap-3 items-center">
        <p className="text-dark-blue capitalize">
          {pet.breed?.replace('_', ' ')}
        </p>
        <div className="flex items-center gap-3">
          <p className="pet-card-infos">
            <IconAge /> {pet.age} year
            {pet.age !== null && pet.age > 1 ? 's' : ''}
          </p>
          <span className="h-5 w-[1.5px] bg-dark-blue" />
          <p className="pet-card-infos">
            <IconSize /> {pet.size}
          </p>
        </div>
      </div>
      {isOrg && tagPetAsAdopted ? (
        <button
          onClick={() => tagPetAsAdopted(pet.id)}
          className="pet-card-button"
        >
          {pet.adopted_at
            ? `Adopted at ${dayjs(pet.adopted_at).format('DD/MM/YY')}`
            : 'Mark as adopted'}
        </button>
      ) : (
        <button
          onClick={() => navigate(`/pet-details/${pet.id}`)}
          className="pet-card-button"
        >
          <span className="border-b border-dark-blue">Details</span>
        </button>
      )}
    </div>
  )
}
