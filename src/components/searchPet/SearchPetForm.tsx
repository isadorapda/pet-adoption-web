import { useForm, Controller } from 'react-hook-form'
import Select from 'react-select'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { api } from '../../lib/axios'
import { Filters } from './Filters'
import usePetsContext from '../../hooks/usePetsContext'
import { useState } from 'react'
import {
  PetGender,
  PetType,
  getPetGenderLabel,
  getPetTypeLabel,
} from '../../utils/petFilters'

const searchPetSchema = z.object({
  location: z.string().min(3, { message: 'Please, inform a city.' }),
  pet_type: z
    .object({ value: z.nativeEnum(PetType).optional(), label: z.string() })
    .optional(),
  sex: z
    .object({ value: z.nativeEnum(PetGender).optional(), label: z.string() })
    .nullable()
    .optional(),
  age: z.array(z.string()).optional(),
  size: z
    .union([
      z.array(z.enum(['TINY', 'SMALL', 'MEDIUM', 'LARGE', 'GIANT'])),
      z.enum(['TINY', 'SMALL', 'MEDIUM', 'LARGE', 'GIANT']),
    ])
    .optional(),
  breed: z.string().nullable().optional(),
  may_live_with: z.array(z.string()).optional(),
})

export type SearchPetFormData = z.infer<typeof searchPetSchema>

export function SearchPetForm() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<SearchPetFormData>({ resolver: zodResolver(searchPetSchema) })
  const { pets, setPets } = usePetsContext()
  const [isLoading, setLoading] = useState(false)
  const [petSizes, setPetSizes] = useState<Array<string>>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  async function handleSearchPet(data: SearchPetFormData) {
    setLoading(true)
    try {
      const response = await api.get('/pets/search', {
        params: {
          location: data.location,
          pet_type: data.pet_type?.value,
          sex: data.sex?.value,
          size: petSizes,
        },
        paramsSerializer: {
          indexes: null,
        },
      })
      setPets(response.data.pets)
    } catch (error) {
      console.error('error', error)
    }
    setLoading(false)
    setIsMenuOpen(false)
  }
  console.log('DATA', pets)
  return (
    <div className="flex flex-col bg-light-bg rounded-md p-6 lg:w-[25vw] mx-auto h-max">
      <h3 className="text-black text-xl font-bold pb-5">Find a Pet</h3>
      <form
        action=""
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleSearchPet)}
      >
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
        {errors.location?.message}
        <div className="flex gap-2 w-full justify-center">
          <div className="flex flex-col gap-3">
            <label className="header-3">Pet</label>
            <Controller
              name="pet_type"
              control={control}
              render={({ field }) => (
                <Select
                  isClearable
                  isMulti={false}
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

          <div className="flex flex-col gap-3">
            <label className="header-3">Gender</label>
            <Controller
              name="sex"
              control={control}
              render={({ field }) => (
                <Select
                  isClearable
                  isMulti={false}
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
        />
      )}
    </div>
  )
}
