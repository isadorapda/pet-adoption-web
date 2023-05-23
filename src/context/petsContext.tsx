import { ReactNode, createContext, useState } from 'react'
import { Organisation, Pet } from '../@types/models'

interface ContextProps {
  children: ReactNode
}

interface PetsDataContext {
  pets: Pet[]
  setPets: (pets: Pet[]) => void
  organisations: Organisation[]
  setOrganisations: (organisation: Organisation[]) => void
  setOrgToken: (token: string) => void
  orgToken: string
}

export const PetsContext = createContext<PetsDataContext>({} as PetsDataContext)

export function PetsContextProvider({ children }: ContextProps) {
  const [pets, setPets] = useState<Pet[]>([])
  const [organisations, setOrganisations] = useState<Organisation[]>([])
  const [orgToken, setOrgToken] = useState('')

  return (
    <PetsContext.Provider
      value={{
        pets,
        setPets,
        orgToken,
        setOrgToken,
        organisations,
        setOrganisations,
      }}
    >
      {children}
    </PetsContext.Provider>
  )
}
