import { useState } from 'react'
import Select from 'react-select'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GrClose as IconClose } from 'react-icons/gr'
import {
  MayLiveWith,
  PetGender,
  PetSize,
  PetType,
  getMayLiveWithLabel,
  getPetGenderLabel,
  getPetSizeLabel,
  getPetTypeLabel,
} from '../utils/petFilters'
import { api } from '../lib/axios'
import usePetsContext from '../hooks/usePetsContext'
import { customStyles } from '../styles/selectStyles'
import { RegisterPetFormData, registerPet } from '../@types/zodTypesRegisterPet'
import { RegisteredAlertModal } from './RegisteredAlert'

interface Props {
  orgId: string
  setIsSideMenuOpen: (value: boolean) => void
}

const SUCCESS_MESAGE = {
  title: 'Success!',
  content: 'Your pet has been registered.',
}

export function RegisterPet({ orgId, setIsSideMenuOpen }: Props) {
  const { orgToken, setPets, pets } = usePetsContext()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<RegisterPetFormData>({
    resolver: zodResolver(registerPet),
  })

  async function handleRegisterPet(data: RegisterPetFormData) {
    console.log('DATA', data)
    try {
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
        },
      )
      setPets([...pets, resp.data.pet])
      reset()
      setIsModalOpen(true)
      console.log('PET', data.pet_type)
    } catch (error) {}
  }

  return (
    <div className="bg-main-red px-12 py-16 lg:p-20 h-screen w-screen md:w-2/3 lg:w-[40vw] absolute overflow-auto right-0 top-0 shadow-card animate-fadeInRight">
      <button
        className="absolute cursor-pointer left-6 lg:left-10 top-6 lg:top-10"
        onClick={() => setIsSideMenuOpen(false)}
      >
        <IconClose />
      </button>
      <h1 className="text-xl lg:text-2xl font-bold mb-6">Register a new pet</h1>

      <form
        action=""
        className="flex flex-col gap-5"
        onSubmit={handleSubmit(handleRegisterPet)}
      >
        <div className="flex flex-col">
          <label htmlFor="" className="header-3">
            Pet Name <span className="text-white">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Bob"
            className="rounded-md p-2"
            {...register('name')}
          />
          <p>{errors.name?.message}</p>
        </div>
        <div className="flex gap-5 w-full">
          <div className="flex flex-col w-1/2">
            <label className="header-3">
              Pet Type <span className="text-white">*</span>
            </label>

            <Controller
              name="pet_type"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  isClearable
                  isMulti={false}
                  styles={customStyles}
                  //   {...field}
                  options={Object.keys(PetType).map((enumKey) => {
                    const parsedEnumKey = enumKey as PetType
                    return {
                      label: getPetTypeLabel(parsedEnumKey),
                      value: parsedEnumKey,
                    }
                  })}
                  //   value={}
                  onChange={(val) => onChange(val?.value)}
                />
              )}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="header-3">
              Gender <span className="text-white">*</span>
            </label>
            <Controller
              name="sex"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  isClearable
                  isMulti={false}
                  styles={customStyles}
                  //   {...field}
                  options={Object.keys(PetGender).map((enumKey) => {
                    const parsedEnumKey = enumKey as PetGender
                    return {
                      label: getPetGenderLabel(parsedEnumKey),
                      value: parsedEnumKey,
                    }
                  })}
                  onChange={(val) => onChange(val?.value)}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="header-3">
            Breed
          </label>
          <input
            type="text"
            placeholder="e.g. Husky"
            className="rounded-md p-2"
            {...register('breed')}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="header-3">
            Description
          </label>
          <textarea
            maxLength={1000}
            className="rounded-md p-2 whitespace-pre-wrap "
            {...register('description')}
          />
        </div>
        <div className="flex gap-5 w-full">
          <div className="flex flex-col w-1/2">
            <label htmlFor="" className="header-3">
              Age in years <span className="text-white">*</span>
            </label>
            <input
              type="number"
              placeholder="e.g. 0.7"
              className="rounded-md p-2"
              {...register('age')}
            />
            <p>{errors.age?.message}</p>
          </div>
          <div className="flex flex-col w-1/2">
            <label htmlFor="" className="header-3">
              Size <span className="text-white">*</span>
            </label>
            <Controller
              name="size"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  //   {...field}
                  isClearable
                  isMulti={false}
                  styles={customStyles}
                  options={Object.keys(PetSize).map((enumKey) => {
                    const parsedEnumKey = enumKey as PetSize
                    return {
                      label: getPetSizeLabel(parsedEnumKey),
                      value: parsedEnumKey,
                    }
                  })}
                  onChange={(val) => onChange(val?.value)}
                />
              )}
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="header-3">
            May Live With <span className="text-white">*</span>
          </label>
          <Controller
            name="may_live_with"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                // {...field}
                isClearable
                isMulti={false}
                styles={customStyles}
                options={Object.keys(MayLiveWith).map((enumKey) => {
                  const parsedEnumKey = enumKey as MayLiveWith
                  return {
                    label: getMayLiveWithLabel(parsedEnumKey),
                    value: parsedEnumKey,
                  }
                })}
                onChange={(val) => onChange(val?.value)}
              />
            )}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="header-3">
            Ideal Home
          </label>
          <textarea
            className="rounded-md p-2 whitespace-pre-wrap"
            maxLength={500}
            placeholder="Ample outside space, garden..."
            {...register('ideal_home')}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="" className="header-3">
            Photo
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            {...register('pet_photos')}
          />
        </div>
        <button type="submit" className="button-primary">
          Register
        </button>
      </form>
      {isModalOpen && (
        <RegisteredAlertModal
          setIsSideMenuOpen={setIsSideMenuOpen}
          setIsModalOpen={setIsModalOpen}
          message={SUCCESS_MESAGE}
        />
      )}
    </div>
  )
}
