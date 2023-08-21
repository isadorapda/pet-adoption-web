import { FormEvent, useReducer, useState } from 'react'
import { api } from '../lib/axios'
import usePetsContext from '../hooks/usePetsContext'

// import axios from 'axios'
// import { AddPhotosForm } from './AddPhotosForm'
import { assertNever } from '../utils/assertNever'
import {
  MayLiveWith,
  PetGender,
  PetSize,
  PetType,
} from '../constants/petFilters'

interface FormProps {
  orgId: string
  setIsModalOpen: (open: boolean) => void
}

export interface AddPetData {
  name: string
  age: string
  gender: string
  type: string
  size: string
  mayLive: string
  description: string
  breed: string
  ideal_home: string
  pet_photos: Array<File>
  errors: {
    name: string
    age: string
    gender: string
    type: string
    size: string
    mayLive: string
    description: string
    breed: string
    ideal_home: string
    pet_photos: string
  }
}
type Action = {
  type: 'updateField'
  field: keyof AddPetData
  value: string | string[]
  error: string
}

const petDataInitialValue: AddPetData = {
  name: '',
  age: '',
  gender: '',
  type: '',
  size: '',
  mayLive: '',
  description: '',
  breed: '',
  ideal_home: '',
  pet_photos: [],
  errors: {
    name: 'Please, inform name.',
    age: 'Please, inform age.',
    gender: 'Select gender',
    type: 'Select pet type',
    size: 'Select pet size',
    mayLive: 'Select an option',
    breed: '',
    ideal_home: '',
    description: '',
    pet_photos: '',
  },
}

function reducer(data: AddPetData, action: Action): AddPetData {
  switch (action.type) {
    case 'updateField':
      return {
        ...data,
        [action.field]: action.value,
        errors: {
          ...data.errors,
          [action.error]: action.error,
        },
      }
    default:
      return assertNever(action.type)
  }
}

export function RegisterPetForm({ orgId, setIsModalOpen }: FormProps) {
  const { orgToken, setPets, pets } = usePetsContext()
  const [state, dispatch] = useReducer(reducer, petDataInitialValue)
  const [showError, setShowError] = useState(false)
  //   const [uploadedImages, setUploadedImages] = useState<Array<string>>([])

  const handleFormData = (
    field: keyof AddPetData,
    value: string | string[],
    error: string,
  ) => {
    dispatch({
      type: 'updateField',
      field,
      value,
      error,
    })
  }
  async function handleRegisterPet(e: FormEvent) {
    e.preventDefault()
    if (
      !state.name ||
      !state.size ||
      !state.age ||
      !state.gender ||
      !state.type ||
      !state.mayLive
    ) {
      setShowError(true)
      return
    }
    try {
      //   const imageData = new FormData()
      //   state.pet_photos?.forEach((photo) => {
      //     imageData.append('image', photo)
      //   })

      //   const uploadResponse = await axios.post(
      //     'https://api.imgbb.com/1/upload',
      //     {
      //       key: '',
      //       image: imageData,
      //       headers: { 'content-type': 'multipart/form-data' },
      //     },
      //   )

      //   const imageUrl = uploadResponse.data.image.url

      const resp = await api.post(
        `/organisations/${orgId}/pets`,
        {
          name: state.name,
          pet_type: state.type,
          age: Number(state.age),
          sex: state.gender,
          size: state.size,
          description: state.description,
          breed: state.breed,
          may_live_with: state.mayLive,
          ideal_home: state.ideal_home,
          //   pet_photos: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${orgToken}`,
          },
        },
      )
      setPets([...pets, resp.data.pet])
      setIsModalOpen(true)
    } catch (error) {
      console.error('Error', error)
    }
  }
  return (
    <form
      action=""
      className="flex flex-col gap-5"
      onSubmit={handleRegisterPet}
    >
      <div className="flex flex-col">
        <label htmlFor="" className="header-3">
          Pet Name <span className="text-white">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Bob"
          className={`rounded-md p-2 ${
            showError && !state.name ? 'border-2 border-red-800' : ''
          }`}
          onChange={(e) =>
            handleFormData('name', e.target.value, state.errors.name)
          }
        />
        {showError && !state.name && (
          <p className="error-message">{state.errors.name}</p>
        )}
      </div>
      <div className="flex flex-col md:flex-row gap-5 w-full">
        <div className="flex flex-col md:w-1/2">
          <label className="header-3">
            Pet Type <span className="text-white">*</span>
          </label>
          <div className="flex items-center gap-2">
            {PetType.map((pet) => (
              <button
                key={pet.value}
                type="button"
                className={`icons-button ${
                  state.type === pet.value ? 'bg-yellow' : ''
                } `}
                value={pet.value}
                onClick={(e) =>
                  handleFormData(
                    'type',
                    e.currentTarget.value,
                    state.errors.type,
                  )
                }
              >
                <pet.icon /> {pet.label}
              </button>
            ))}
          </div>
          {showError && !state.type && (
            <p className="error-message">{state.errors.type}</p>
          )}
        </div>
        <div className="flex flex-col md:w-1/2">
          <label className="header-3">
            Gender <span className="text-white">*</span>
          </label>
          <div className="flex items-center gap-2">
            {PetGender.map((gender) => (
              <button
                key={gender.value}
                value={gender.value}
                type="button"
                className={`icons-button ${
                  state.gender === gender.value ? 'bg-yellow' : ''
                } `}
                onClick={(e) =>
                  handleFormData(
                    'gender',
                    e.currentTarget.value,
                    state.errors.gender,
                  )
                }
              >
                <gender.icon /> {gender.label}
              </button>
            ))}
          </div>
          {showError && !state.gender && (
            <p className="error-message">{state.errors.gender}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="pet-breed" className="header-3">
          Breed
        </label>
        <input
          id="pet-breed"
          type="text"
          placeholder="e.g. Husky"
          className="rounded-md p-2"
          onChange={(e) =>
            handleFormData('breed', e.target.value, state.errors.breed)
          }
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="pet-description" className="header-3">
          Description
        </label>
        <textarea
          id="pet-description"
          maxLength={1000}
          className="rounded-md p-2 whitespace-pre-wrap "
          onChange={(e) =>
            handleFormData(
              'description',
              e.target.value,
              state.errors.description,
            )
          }
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="pet-age" className="header-3">
          Age in years <span className="text-white">*</span>
        </label>
        <input
          id="pet-age"
          placeholder="e.g. 0.7"
          className={`rounded-md p-2 ${
            showError && !state.age ? 'border-2 border-red-800' : ''
          }`}
          onChange={(e) =>
            handleFormData('age', e.target.value, state.errors.age)
          }
        />
        {showError && !state.age && (
          <p className="error-message">{state.errors.age}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="et-size-filter" className="header-3">
          Size <span className="text-white">*</span>
        </label>
        <div id="pet-size-filter" className="grid grid-cols-3 md:flex gap-2">
          {PetSize.map((option) => {
            return (
              <button
                key={option.value}
                type="button"
                value={option.value}
                className={`button-filter w-full py-1 px-2 ${
                  state.size === option.value ? ' bg-yellow' : ' bg-white'
                } `}
                onClick={(e) =>
                  handleFormData(
                    'size',
                    e.currentTarget.value,
                    state.errors.size,
                  )
                }
              >
                {option.label}
              </button>
            )
          })}
        </div>
        {showError && !state.size && (
          <p className="error-message">{state.errors.size}</p>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="live-with-filter" className="header-3">
          May Live With <span className="text-white">*</span>
        </label>
        <div id="live-with-filter" className="grid grid-cols-3 md:flex gap-2">
          {MayLiveWith.map((option) => {
            return (
              <button
                key={option.value}
                value={option.value}
                type="button"
                onClick={(e) =>
                  handleFormData(
                    'mayLive',
                    e.currentTarget.value,
                    state.errors.mayLive,
                  )
                }
                className={`button-filter w-full py-1 px-2  ${
                  state.mayLive === option.value ? ' bg-yellow' : ' bg-white'
                }  `}
              >
                {option.label}
              </button>
            )
          })}
        </div>
        {showError && !state.mayLive && (
          <p className="error-message">{state.errors.mayLive}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label htmlFor="ideal-home" className="header-3">
          Ideal Home
        </label>
        <textarea
          id="ideal-home"
          className="rounded-md p-2 whitespace-pre-wrap"
          maxLength={500}
          placeholder="Ample outside space, garden..."
          onChange={(e) =>
            handleFormData(
              'ideal_home',
              e.target.value,
              state.errors.ideal_home,
            )
          }
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="" className="header-3">
          Photo
        </label>
        {/* <AddPhotosForm state={state} handleFormData={handleFormData} /> */}
      </div>
      <button type="submit" className="button-primary">
        Register
      </button>
    </form>
  )
}
