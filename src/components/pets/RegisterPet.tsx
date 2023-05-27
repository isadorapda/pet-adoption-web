import Select from 'react-select'
import { api } from '../../lib/axios'
import { useForm, Controller } from 'react-hook-form'
import { z } from 'zod'
import {
  MayLiveWith,
  PetGender,
  PetSize,
  PetType,
  getMayLiveWithLabel,
  getPetGenderLabel,
  getPetSizeLabel,
  getPetTypeLabel,
} from '../../utils/petFilters'
import { zodResolver } from '@hookform/resolvers/zod'
import usePetsContext from '../../hooks/usePetsContext'

interface Props {
  orgId: string
}

const registerPet = z.object({
  name: z.string(),
  description: z.string().optional(),
  pet_type: z.object({
    value: z.nativeEnum(PetType),
    label: z.string(),
  }),
  sex: z
    .object({ value: z.nativeEnum(PetGender), label: z.string()}),
  age: z.coerce.number(),
  size: z
    .object({ value: z.nativeEnum(PetSize), label: z.string()}),
  breed: z.string().optional(),
  may_live_with:z.object({value:z.nativeEnum(MayLiveWith),label: z.string()}) ,
  ideal_home: z.string().optional(),
  pet_photos: z.instanceof(FileList).optional(),
})
export type RegisterPetFormData = z.infer<typeof registerPet>

export function RegisterPet({ orgId }: Props) {
  const { orgToken, setPets, pets } = usePetsContext()

  const { handleSubmit, register, control } = useForm<RegisterPetFormData>({
    resolver: zodResolver(registerPet),
  })
  async function handleRegisterPet(data: RegisterPetFormData) {
    const resp = await api.post(
      `/organisations/${orgId}/pets`,
      {
        name: data.name,
        pet_type: data.pet_type.value,
        age: data.age,
        sex: data.sex.value,
        size: data.size.value,
        description: data.description,
        breed: data.breed,
        may_live_with: data.may_live_with.value,
        ideal_home: data.ideal_home,
      },
      {
        headers: {
          Authorization: `Bearer ${orgToken}`,
        },
      }
    )
    setPets([...pets, resp.data.pet])
  }

  return (
    <div className=" bg-light-bg rounded-lg p-10 h-max">
      <h1 className="text-2xl font-bold mb-6">Register a new pet</h1>

      <form
        action=""
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleRegisterPet)}
      >
        <div className="flex flex-col">
          <label htmlFor="" className="header-3">
            Pet Name <span className="text-main-red">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Bob"
            className="rounded-md p-2"
            {...register('name')}
          />
        </div>
        <div>
          <label className="header-3">
            Pet Type <span className="text-main-red">*</span>
          </label>

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

        <div className="flex flex-col">
          <label htmlFor="" className="header-3">
            Description
          </label>
          <input
            type="text"
            className="rounded-md p-2"
            {...register('description')}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="header-3">
            Age in years
          </label>
          <input
            type="number"
            step="0.01"
            placeholder="e.g. 0.7"
            className="rounded-md p-2"
            {...register('age')}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="header-3">
            Size
          </label>
          <Controller
            name="size"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isClearable
                isMulti={false}
                options={Object.keys(PetSize).map((enumKey) => {
                  const parsedEnumKey = enumKey as PetSize
                  return {
                    label: getPetSizeLabel(parsedEnumKey),
                    value: parsedEnumKey,
                  }
                })}
              />
            )}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="header-3">
            May Live With
          </label>
          <Controller
            name="may_live_with"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                isClearable
                isMulti={false}
                options={Object.keys(MayLiveWith).map((enumKey) => {
                  const parsedEnumKey = enumKey as MayLiveWith
                  return {
                    label: getMayLiveWithLabel(parsedEnumKey),
                    value: parsedEnumKey,
                  }
                })}
              />
            )}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="header-3">
            Photo
          </label>
          <input type="file" accept='image/*' multiple {...register('pet_photos')}/>
        </div>
        <button type="submit" className="button-primary">
          Register
        </button>
      </form>
    </div>
  )
}
