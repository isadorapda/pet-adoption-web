import { useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import usePetsContext from '../../hooks/usePetsContext'
import { Organisation } from '../../@types/models'
import { PetCard } from '../pets/PetCard'
import { RegisterPet } from '../pets/RegisterPet'

export function OrganisationProfile() {
  const { orgToken } = usePetsContext()
  const [currentOrg, setCurrentOrg] = useState<Organisation>()

  useEffect(() => {
    async function fetchProfile() {
      try {
        const req = await api.get('/me', {
          headers: { Authorization: `Bearer ${orgToken}` },
        })
        setCurrentOrg(req.data.user)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProfile()
  }, [orgToken])

  if (!currentOrg) {
    return null
  }
  return (
    <div className="h-full w-screen mt-40">
      <div className="flex flex-col p-16">
        <div>
          <h1 className="text-5xl font-bold">{currentOrg?.name}</h1>
        </div>
        <div className="grid grid-cols-[70%,30%] w-full">
          <div>
            <h2>Your pets for donation</h2>
            <div className="grid grid-cols-auto gap-8 w-full">
              {currentOrg.pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
            </div>
          </div>
          <div className="">
            <RegisterPet orgId={currentOrg.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
