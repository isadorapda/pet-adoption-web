import { ReactNode, createContext, useState } from 'react'
import { Organisation, Pet, SortPets } from '../@types/models'

interface ContextProps {
  children: ReactNode
}

export enum Limit {
  TEN = 10,
  TWENTY = 20,
  FIFTY = 50,
  HUNDRED = 100,
  ALL = 'All',
}

export interface Page {
  count: number
  page: number
  pets: Pet[]
}
export interface Response {
  data: Page
}
interface PetsDataContext {
  pets: Pet[]
  setPets: (pets: Pet[]) => void
  sortPets: SortPets | undefined
  setSortPets: (obg: SortPets) => void
  currentOrganisation: Organisation
  setCurrentOrganisation: (organisation: Organisation) => void
  setOrgToken: (token: string) => void
  orgToken: string
  pageData: Page
  setPageData: (page: Page) => void
  totalPages: number
  page: number
  setPage: (page: number) => void
  setInternalLimit: (limit: Limit) => void
  internalLimit: Limit
  limit: number
}

export const PetsContext = createContext<PetsDataContext>({} as PetsDataContext)

function getLimit(internalLimit: Limit, count: number): number {
  if (internalLimit === Limit.ALL) {
    return count
  }
  return internalLimit
}

export function PetsContextProvider({ children }: ContextProps) {
  const [pets, setPets] = useState<Pet[]>([])
  const [sortPets, setSortPets] = useState<SortPets>()

  const [currentOrganisation, setCurrentOrganisation] = useState<Organisation>({
    city: '',
    email: '',
    id: '',
    mobile: '',
    name: '',
    pets: [],
    postcode: '',
  })
  const [orgToken, setOrgToken] = useState<string>('')
  const [pageData, setPageData] = useState<Page>({
    count: 0,
    page: 1,
    pets: [],
  })
  const [page, setPage] = useState<number>(1)
  const [internalLimit, setInternalLimit] = useState<Limit>(Limit.TEN)

  const limit = getLimit(internalLimit, pageData.count)

  const totalPages =
    internalLimit === Limit.ALL ? 1 : Math.ceil(pageData.count / limit)

  return (
    <PetsContext.Provider
      value={{
        pets,
        setPets,
        sortPets,
        setSortPets,
        orgToken,
        setOrgToken,
        currentOrganisation,
        setCurrentOrganisation,
        setInternalLimit,
        internalLimit,
        pageData,
        totalPages,
        limit,
        setPageData,
        page,
        setPage,
      }}
    >
      {children}
    </PetsContext.Provider>
  )
}
