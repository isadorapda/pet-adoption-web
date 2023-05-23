import { useEffect, useState } from 'react'
import { api } from '../../lib/axios'
import { useParams } from 'react-router-dom'
import { Pet } from '../../@types/models'

export function PetDetails() {
  const [pet, setPet] = useState<Pet>()
  const params = useParams()
  useEffect(() => {
    async function fetchPet() {
      try {
        const req = await api.get(`/pets/${params}/details`)
        setPet(req.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPet()
  }, [params])

  return (
    <div>
      <div>
        <h1>{pet?.name}</h1>
      </div>
    </div>
  )
}
