import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { useParams } from 'react-router-dom'
import { GrLocation as IconLocation } from 'react-icons/gr'
import { TbDog as IconDog, TbCat as IconCat } from 'react-icons/tb'
import { Organisation, Pet } from '@/@types/models'
import usePetsContext from '@/hooks/usePetsContext'
import { EnquireAboutPet } from '@/components/PetDetails/EnquireAboutPet'
import { NavigateBack } from '@/components/NavigateBack'

interface PetResponse {
  pet: Pet
}
interface OrgResponse {
  organisation: Organisation
}
interface Response<T> {
  data: T
}

export function ViewPetDetails() {
  const { pets } = usePetsContext()
  const [pet, setPet] = useState<Pet>()
  const [org, setOrg] = useState<Organisation>()
  const params = useParams()

  useEffect(() => {
    function fetchPet(): Promise<Response<PetResponse>> {
      return api.get(`/pets/${params.petId}/details`)
    }
    function fecthOrg(): Promise<Response<OrgResponse>> {
      const findPet = pets.find((pet) => pet.id === `${params.petId}`)

      return api.get(
        `/organisation/${
          params.orgId ? params.orgId : findPet?.organisation_id
        }`,
      )
    }
    Promise.all([fetchPet(), fecthOrg()]).then(async ([petRes, orgRes]) => {
      setPet(petRes.data.pet)
      setOrg(orgRes.data.organisation)
    })
  }, [params.orgId, params.petId, pets])

  if (!pet) {
    return null
  }
  if (!org) {
    return null
  }

  return (
    <div className="h-full w-screen flex flex-col">
      <NavigateBack path="search" />
      <section className="h-screen bg-yellow w-full">
        <div className="">{}</div>
      </section>
      <section className="min-h-screen bg-light-bg w-full px-28 py-14">
        <div className="flex flex-col gap-5">
          <h1 className="text-5xl font-bold capitalize">{pet.name}</h1>
          <div className="flex gap-5 items-center">
            <div className="flex gap-3 items-center">
              <IconLocation />
              <h4> {org.city}</h4>
            </div>
            <div className="flex gap-3 items-center">
              {pet.pet_type === 'CAT' ? <IconCat /> : <IconDog />}
              <h4>{pet.pet_type}</h4>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[2fr,1fr] gap-20 py-16">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-3 p-5 bg-lighter-red rounded-lg ">
              <h3 className="capitalize header-3">Gender</h3>
              <p className="lowercase first-letter:uppercase">{pet.sex}</p>
            </div>
            <div className="flex flex-col gap-3 p-5 bg-lighter-red rounded-lg ">
              <h3 className="capitalize header-3 ">Age</h3>
              <p>{pet.age}</p>
            </div>
            <div className="flex flex-col gap-3 p-5 bg-lighter-red rounded-lg ">
              <h3 className="capitalize header-3 ">Size</h3>
              <p className="lowercase first-letter:uppercase">{pet.size}</p>
            </div>
            <div className="flex flex-col gap-3 p-5 bg-lighter-red rounded-lg ">
              <h3 className="capitalize header-3 ">Breed</h3>
              <p>{pet.breed}</p>
            </div>
            <div className="flex flex-col gap-3 p-5 bg-lighter-red rounded-lg ">
              <h3 className="capitalize header-3 ">May live with</h3>
              <p className="lowercase first-letter:uppercase">
                {pet.may_live_with}
              </p>
            </div>
            <div className="flex flex-col gap-3 p-5 bg-lighter-red rounded-lg ">
              <h3 className="capitalize header-3 ">ideal home</h3>
              <p>{pet.ideal_home}</p>
            </div>
          </div>
          <EnquireAboutPet pet={pet} org={org} />
        </div>
        <div>
          <h2 className="capitalize header-3 ">About {pet.name}</h2>
          <p>{pet.description}</p>
        </div>
      </section>
    </div>
  )
}
