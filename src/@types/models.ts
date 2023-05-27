export interface Pet {
  id: string
  name: string
  pet_type: 'DOG' | 'CAT'
  sex: 'MALE' | 'FEMALE' | null
  description: string | null
  breed: string | null
  age: number | null
  size: 'TINY' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'GIANT' | null
  may_live_with: string | null
  ideal_home: string | null
  organisation_id: string
  adopted_at?: Date | null
}

export interface Organisation {
  id: string
  name: string
  email: string
  mobile: string
  postcode: string
  city: string
  address?: string
  pets: Pet[]
}
