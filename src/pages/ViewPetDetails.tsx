import { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { useParams } from 'react-router-dom'
import { Organisation, Pet } from '../@types/models'
import usePetsContext from '../hooks/usePetsContext'
import { EnquireAboutPet } from '../components/EnquireAboutPet'
import { NavigateBack } from '../components/NavigateBack'
import { PetDetailItem } from '../components/PetDetailItem'
import { PetDetailHeader } from '../components/PetDetailHeader'
// import { ImagesGrid } from '../components/ImagesGrid'

export interface Images {
  src: string
  alt: string
  id: number
}
// export const FAKE_IMGS: Images[] = [
//   {
//     src: 'https://www.purina.co.uk/sites/default/files/styles/square_medium_440x440/public/2022-09/greyhound.jpg?h=9eb9f9c5&itok=HoROIGVL',
//     alt: '',
//     id: 1,
//   },
//   {
//     src: 'https://www.dailypaws.com/thmb/iPOBcecRdlZL7erNKcZhyvFv7Vc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/greyhound-brindle-standing-tongue-out-218859123-2000-221746c653e94cb198b973c2f8c2514f.jpg',
//     alt: '',
//     id: 2,
//   },
//   {
//     src: 'https://us.123rf.com/450wm/deviddo/deviddo1907/deviddo190700738/127496357-the-dog-breed-greyhound-resting-on-asphalt-path.jpg?ver=6',
//     alt: '',
//     id: 3,
//   },
// ]
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
      const parsedBreed = petRes.data.pet.breed?.replaceAll('_', ' ')
      setPet({ ...petRes.data.pet, breed: parsedBreed || '' })
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
      <div className="section-wrapper min-h-screen bg-yellow w-full">
        {/* <ImagesGrid images={FAKE_IMGS} /> */}
      </div>
      <div className="min-h-screen bg-light-bg w-full px-5 md:px-10 lg:px-28 py-14">
        <PetDetailHeader pet={pet} location={org.city} />
        <div className="flex flex-col md:grid md:grid-cols-[2fr,1fr] gap-10 lg:gap-20 py-9 md:py-16">
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-8">
            <PetDetailItem title="Gender" info={pet.sex} />
            <PetDetailItem title="Age" info={pet.age} />
            <PetDetailItem title="Size" info={pet.size} />
            <PetDetailItem title="Breed" info={pet.breed} />
            <PetDetailItem title="May live with" info={pet.may_live_with} />
            <PetDetailItem title="ideal home" info={pet.ideal_home} />
            <section className="col-span-full">
              <h2 className="header-3">About {pet.name}</h2>
              <p>{pet.description}</p>
            </section>
          </div>
          <EnquireAboutPet pet={pet} org={org} />
        </div>
      </div>
    </div>
  )
}
