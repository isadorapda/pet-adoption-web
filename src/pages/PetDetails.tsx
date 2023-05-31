import { useEffect, useState } from 'react'
import { api } from '@/lib/axios'
import { useParams } from 'react-router-dom'
import { MdWhatsapp as IconWhatsApp } from 'react-icons/md'
import { GrLocation as IconLocation } from 'react-icons/gr'
import { Organisation, Pet } from '@/@types/models'
import usePetsContext from '@/hooks/usePetsContext'
import {
  WHATSAPP_BASE_URL,
  getPreFilledMessage,
} from '@/constants/contactWhatsApp'

interface PetResponse {
  pet: Pet
}
interface OrgResponse {
  organisation: Organisation
}
interface Response<T> {
  data: T
}

export function PetDetails() {
  const { pets } = usePetsContext()
  const [pet, setPet] = useState<Pet>()
  const [org, setOrg] = useState<Organisation>()
  const params = useParams()

  useEffect(() => {
    function fetchPet(): Promise<Response<PetResponse>> {
      return api.get(`/pets/${params.petId}/details`)
    }
    function fecthOrg(): Promise<Response<OrgResponse>> {
      const orgId = pets.find((pet) => pet.id === `${params.petId}`)

      return api.get(`/organisations/${orgId?.organisation_id}`)
    }
    Promise.all([fetchPet(), fecthOrg()]).then(async ([petRes, orgRes]) => {
      setPet(petRes.data.pet)
      setOrg(orgRes.data.organisation)
    })
  }, [])

  if (!pet) {
    return null
  }
  if (!org) {
    return null
  }

  return (
    <div className="h-full w-screen flex flex-col">
      <section className="h-screen bg-yellow w-full">
        <div className="">{}</div>
      </section>
      <section className="min-h-screen bg-light-bg w-full px-28 py-14">
        <div className="flex flex-col gap-5">
          <h1 className="text-5xl font-bold capitalize">{pet.name}</h1>
          <div className="flex gap-3 items-center">
            <IconLocation />
            <h4> {org.city}</h4>
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
          <div className="rounded-lg bg-white p-6 flex flex-col shadow-card h-max gap-6">
            <h1 className="font-bold ">
              Could you be {pet.name} perfect match?
            </h1>
            <p>
              {pet.name} is registered at {org.name}
            </p>
            <button className="button-primary bg-green">
              <a
                href={`${WHATSAPP_BASE_URL}${org.mobile}${getPreFilledMessage(
                  pet.name,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-5"
              >
                <IconWhatsApp /> Enquire about {pet.name}
              </a>
            </button>
          </div>
        </div>
        <div>
          <h2>About {pet.name}</h2>
          <p>{pet.description}</p>
        </div>
      </section>
    </div>
  )
}
