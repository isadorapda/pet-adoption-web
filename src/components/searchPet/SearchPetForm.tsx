import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '@/lib/axios'
import { Filters } from './Filters'
import usePetsContext from '@/hooks/usePetsContext'
import { useEffect, useState } from 'react'
import {
  MayLiveWith,
  PetGender,
  PetSize,
  PetType,
  getPetGenderLabel,
  getPetTypeLabel,
} from '@/utils/petFilters'
import { customStyles } from '@/styles/selectStyles'
import { Response } from '@/context/petsContext'

interface Props {
  setLoading: (value: boolean) => void
  setIsModalOpen: (value: boolean) => void
}

const searchPetSchema = z.object({
  location: z.string().min(3, { message: 'Please, inform a city.' }),
  pet_type: z
    .object({ value: z.nativeEnum(PetType).optional(), label: z.string() })
    .optional(),
  sex: z
    .object({ value: z.nativeEnum(PetGender).optional(), label: z.string() })
    .optional(),
  age_min: z.coerce.number().optional(),
  age_max: z.coerce.number().optional(),
  size: z.array(z.nativeEnum(PetSize)).optional(),
  breed: z.array(z.string()).optional(),
  may_live_with: z
    .union([z.array(z.nativeEnum(MayLiveWith)), z.nativeEnum(MayLiveWith)])
    .optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(20),
})

export type SearchPetFormData = z.infer<typeof searchPetSchema>

export function SearchPetForm({ setLoading, setIsModalOpen }: Props) {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<SearchPetFormData>({ resolver: zodResolver(searchPetSchema) })
  const { setPets, limit, setPageData, page } = usePetsContext()
  const [petSizes, setPetSizes] = useState<Array<string>>([])
  const [petAgeRange, setPetAgeRange] = useState<{ min: number; max: number }>()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [data, setData] = useState<SearchPetFormData>()

  useEffect(() => {
    if (data) {
      handleSearchPet(data)
    }
  }, [page, limit])

  async function handleSearchPet(data: SearchPetFormData) {
    setData(data)
    console.log('data', data)
    try {
      const response: Response = await api.get('/pets/search', {
        params: {
          location: data.location,
          pet_type: data.pet_type?.value,
          sex: data.sex?.value,
          size: petSizes,
          age_min: petAgeRange?.min,
          age_max: petAgeRange?.max,
          page,
          limit,
        },

        paramsSerializer: {
          indexes: null,
        },
      })
      setLoading(true)
      console.log('res', response.data)
      setPets(response.data.pets)
      setPageData(response.data)
      if (response.data.pets.length === 0) {
        setIsModalOpen(true)
      }
    } catch (error) {
      console.error('error', error)
    }
    setLoading(false)
    setIsMenuOpen(false)
  }

  return (
    <div className="flex flex-col bg-light-bg rounded-md p-6 lg:w-[25vw] mx-auto h-max">
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
                  isClearable
                  isMulti={false}
                  styles={customStyles}
                  {...field}
                  options={Object.keys(PetType).map((enumKey) => {
                    const parsedEnumKey = enumKey as PetType
                    return {
                      label: getPetTypeLabel(parsedEnumKey),
                      value: parsedEnumKey,
                    }
                  })}
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
                  isClearable
                  isMulti={false}
                  styles={customStyles}
                  {...field}
                  options={Object.keys(PetGender).map((enumKey) => {
                    const parsedEnumKey = enumKey as PetGender
                    return {
                      label: getPetGenderLabel(parsedEnumKey),
                      value: parsedEnumKey,
                    }
                  })}
                />
              )}
            />
          </div>
        </div>
        <button type="submit" className="button-primary">
          Show pets
        </button>
        <button type="button" onClick={() => setIsMenuOpen(true)} className="">
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
        />
      )}
    </div>
  )
}
