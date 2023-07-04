import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Select from 'react-select'
import { api } from '../lib/axios'
import usePetsContext from '../hooks/usePetsContext'
import {
  PetGender,
  PetType,
  getPetGenderLabel,
  getPetTypeLabel,
} from '../utils/petFilters'
import { customStyles } from '../styles/selectStyles'
import { Response } from '../context/petsContext'
import { SearchPetFormData, searchPetSchema } from '../@types/zodTypesSearchPet'
import { Filters } from './Filters'

interface Props {
  setLoading: (value: boolean) => void
  setIsModalOpen: (value: boolean) => void
}

const petTypeOptions = () => {
  return Object.keys(PetType).map((enumKey) => {
    const parsedEnumKey = enumKey as PetType
    return {
      label: getPetTypeLabel(parsedEnumKey),
      value: parsedEnumKey,
    }
  })
}

const petGenderOptions = () => {
  return Object.keys(PetGender).map((enumKey) => {
    const parsedEnumKey = enumKey as PetGender
    return {
      label: getPetGenderLabel(parsedEnumKey),
      value: parsedEnumKey,
    }
  })
}

export function SearchPetForm({ setLoading, setIsModalOpen }: Props) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<SearchPetFormData>({ resolver: zodResolver(searchPetSchema) })
  const { setPets, limit, setPageData, page, sortPets } = usePetsContext()
  const [petSizes, setPetSizes] = useState<Array<string>>([])
  const [mayLiveWith, setMayLiveWith] = useState<Array<string>>([])
  const [petAgeRange, setPetAgeRange] = useState<{ min: number; max: number }>()
  const [breeds, setBreeds] = useState<Array<string>>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [data, setData] = useState<SearchPetFormData>()

  useEffect(() => {
    if (data) {
      handleSearchPet(data)
    }
  }, [page, limit, sortPets])

  async function handleSearchPet(data: SearchPetFormData) {
    setData(data)
    try {
      const response: Response = await api.get('/pets/search', {
        params: {
          location: data.location,
          pet_type: data.pet_type?.value,
          sex: data.sex?.value,
          size: petSizes,
          age_min: petAgeRange?.min,
          age_max: petAgeRange?.max,
          may_live_with: mayLiveWith,
          breed: breeds,
          page,
          limit,
          field: sortPets?.field,
          order: sortPets?.order,
        },

        paramsSerializer: {
          indexes: null,
        },
      })
      setLoading(true)
      setPets(response.data.pets)
      setPageData(response.data)
      if (!response.data.pets.length) {
        setIsModalOpen(true)
      }
    } catch (error) {
      console.error('error', error)
    }
    setLoading(false)
    setIsMenuOpen(false)
  }

  return (
    <div className="flex flex-col bg-light-bg rounded-md px-6 py-10 w-full lg:w-[30vw]  mx-auto h-max">
      <h3 className="text-black text-xl font-bold pb-5">Find a Pet</h3>
      <form
        action=""
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleSearchPet)}
      >
        <div className="flex flex-col w-full">
          <label htmlFor="city" className="header-3">
            City <span className="text-main-red">*</span>
          </label>
          <input
            id="city"
            type="text"
            placeholder="e.g. London"
            className="rounded-lg p-3"
            {...register('location')}
          />
        </div>
        {errors.location?.message}
        <div className="flex gap-5 w-full">
          <div className="flex flex-col w-1/2">
            <label className="header-3">Pet</label>
            <Controller
              name="pet_type"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable
                  isMulti={false}
                  styles={customStyles}
                  options={petTypeOptions()}
                />
              )}
            />
          </div>

          <div className="flex flex-col w-1/2">
            <label className="header-3">Gender</label>
            <Controller
              name="sex"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable
                  isMulti={false}
                  styles={customStyles}
                  options={petGenderOptions()}
                />
              )}
            />
          </div>
        </div>
        <button type="submit" className="button-primary">
          Show pets
        </button>
        <button type="button" onClick={() => setIsMenuOpen(true)}>
          View more filters
        </button>
      </form>
      {isMenuOpen && (
        <Filters
          handleSubmit={handleSubmit}
          handleSearchForm={handleSearchPet}
          setIsMenuOpen={setIsMenuOpen}
          petSizes={petSizes}
          setPetSizes={setPetSizes}
          setPetAgeRange={setPetAgeRange}
          setMayLiveWith={setMayLiveWith}
          mayLiveWith={mayLiveWith}
          breeds={breeds}
          setBreeds={setBreeds}
        />
      )}
    </div>
  )
}
