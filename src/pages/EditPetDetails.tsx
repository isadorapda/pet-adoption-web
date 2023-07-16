import { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import Select from 'react-select'
import { MdOutlineModeEdit as IconEdit } from 'react-icons/md'
import { AiFillDelete as IconDelete } from 'react-icons/ai'
import { GrLocation as IconLocation } from 'react-icons/gr'
import { AlertMessage, Organisation, Pet } from '../@types/models'
import usePetsContext from '../hooks/usePetsContext'
import { customStyles } from '../styles/selectStyles'
import {
  MayLiveWith,
  PetGender,
  //   PetSize,
  PetSize,
  //   getPetGenderLabel,
  //   getPetSizeLabel,
} from '../utils/petFilters'
import { registerPet, UpdatePetFormData } from '../@types/zodTypesRegisterPet'
import { AlertModal } from '../components/AlertModal'
import { NavigateBack } from '../components/NavigateBack'
import dayjs from 'dayjs'

interface PetResponse {
  pet: Pet
}
interface OrgResponse {
  organisation: Organisation
}
interface Response<T> {
  data: T
}
const SUCCESS_MESAGE: AlertMessage = {
  title: '',
  content: '',
}
const partialRegisterPet = registerPet.partial()

export function EditPetDetails() {
  const { pets, orgToken } = usePetsContext()
  const [pet, setPet] = useState<Pet>()
  const [org, setOrg] = useState<Organisation>()
  const [edit, setEdit] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const navigate = useNavigate()
  const params = useParams()
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<UpdatePetFormData>({
    resolver: zodResolver(partialRegisterPet),
  })

  useEffect(() => {
    function fetchPet(): Promise<Response<PetResponse>> {
      return api.get(`/pets/${params.petId}/details`)
    }
    function fecthOrg(): Promise<Response<OrgResponse>> {
      const findPet = pets.find((pet) => pet.id === `${params.petId}`)

      const orgId = params.orgId || findPet?.organisation_id

      return api.get(`/organisation/${orgId}`)
    }
    Promise.all([fetchPet(), fecthOrg()]).then(async ([petRes, orgRes]) => {
      setPet(petRes.data.pet)
      setOrg(orgRes.data.organisation)
    })
  }, [params.orgId, params.petId, pets])

  async function handleEditPet(data: UpdatePetFormData) {
    console.log('DATA', data)
    setIsDelete(false)
    try {
      const resp = await api.patch<any>(
        `/me/pets/${params.petId}/edit`,
        {
          ...data,
          pet_type: data.pet_type?.value,
          sex: data.sex?.value,
          size: data.size?.value,
          may_live_with: data.may_live_with?.value,
        },
        {
          headers: {
            Authorization: `Bearer ${orgToken}`,
          },
        },
      )
      SUCCESS_MESAGE.title = 'Success!'
      SUCCESS_MESAGE.content = 'Your changes were saved.'
      setIsModalOpen(true)
      setPet(resp.data.pet)
      console.log('PET', resp.data.pet)
    } catch (error) {
    } finally {
      setEdit(false)
    }
  }

  async function handleDelete() {
    try {
      if (pet) {
        await api.delete(`me/pets/${pet.id}/delete`, {
          headers: {
            Authorization: `Bearer ${orgToken}`,
          },
        })
      }
      SUCCESS_MESAGE.title = 'Deleted!'
      SUCCESS_MESAGE.content = 'Your pet has been deleted.'
      setIsDelete(false)
      setIsModalOpen(true)
    } catch (error) {}
  }

  if (!pet) {
    return null
  }
  if (!org) {
    return null
  }

  return (
    <div className="h-full w-screen flex flex-col">
      <NavigateBack path={'profile'} />
      <section className="h-screen bg-yellow w-full">
        <div className="">{}</div>
      </section>
      <section className="min-h-screen bg-light-bg w-full px-10 lg:px-28 py-14 relative">
        <div className="absolute right-10 md:right-36 top-14 flex items-center gap-3">
          <button
            type="button"
            title="Edit Pet"
            onClick={() => setEdit(true)}
            className={`${edit ? 'hidden' : ''}   button-primary w-max`}
          >
            <IconEdit />
          </button>
          <button
            type="button"
            title="Remove Pet"
            className={`${
              edit ? 'hidden' : ''
            } button-primary bg-main-red w-max`}
            onClick={() => {
              setIsDelete(true)
              setIsModalOpen(true)
            }}
          >
            <IconDelete />
          </button>
        </div>

        <form
          action=""
          onSubmit={handleSubmit(handleEditPet)}
          className="w-full "
        >
          <div className=" flex gap-5 absolute bottom-10 right-1/2 translate-x-1/2 md:right-28 md:translate-x-0 md:top-14">
            <button
              type="submit"
              className={`${edit ? '' : 'hidden'}  button-primary w-max h-max`}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEdit(false)}
              className={`${
                edit ? '' : 'hidden'
              } button-primary bg-main-red w-max h-max text-white`}
            >
              Cancel
            </button>
          </div>

          <div>
            <div className="flex flex-col gap-5">
              {edit ? (
                <>
                  <input
                    type="text"
                    className="bg-transparent border border-b-[1px] border-b-black w-1/2 p-2 first-letter:capitalize"
                    defaultValue={pet.name}
                    {...register('name')}
                  />
                  <ErrorMessage
                    as="p"
                    errors={errors}
                    name="name"
                    render={(e) => <p>{e.message}</p>}
                  />
                </>
              ) : (
                <h1 className="text-5xl font-bold capitalize">{pet.name}</h1>
              )}
              <div className="flex gap-3 items-center">
                <IconLocation />
                <h4>{org.city}</h4>
              </div>
              <div>
                <h4>
                  Registered on: {dayjs(pet.created_at).format('DD/MM/YY')}
                </h4>
              </div>
            </div>
            <div className="flex flex-col lg:grid lg:grid-cols-[2fr,1fr] gap-8 lg:gap-20 py-16">
              <div className="flex flex-col md:grid md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-3 p-5 bg-lighter-red rounded-lg ">
                  <h3 className="capitalize header-3">Gender</h3>
                  {edit ? (
                    <Controller
                      name="sex"
                      control={control}
                      render={({ field }) => (
                        <Select
                          isClearable
                          isMulti={false}
                          styles={customStyles}
                          {...field}
                          options={PetGender}
                        />
                      )}
                    />
                  ) : (
                    <p className="lowercase first-letter:uppercase">
                      {pet.sex}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3 p-5 bg-lighter-red rounded-lg ">
                  <h3 className="capitalize header-3 ">Age</h3>

                  {edit ? (
                    <>
                      <input
                        type="number"
                        placeholder="e.g. 0.7"
                        className="bg-transparent border border-b-[1px] border-b-black p-2"
                        defaultValue={pet.age ?? ''}
                        {...register('age')}
                      />
                      <ErrorMessage
                        as="p"
                        errors={errors}
                        name="age"
                        render={(e) => <p>{e.message}</p>}
                      />
                    </>
                  ) : (
                    <p>{pet.age}</p>
                  )}
                </div>
                <div className="flex flex-col gap-3 p-5 bg-lighter-red rounded-lg ">
                  <h3 className="capitalize header-3 ">Size</h3>
                  {edit ? (
                    <Controller
                      name="size"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isClearable
                          isMulti={false}
                          styles={customStyles}
                          options={PetSize}
                        />
                      )}
                    />
                  ) : (
                    <p className="lowercase first-letter:uppercase">
                      {pet.size}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3 p-5 bg-lighter-red rounded-lg ">
                  <h3 className="capitalize header-3">Breed</h3>
                  {edit ? (
                    <input
                      type="text"
                      defaultValue={pet.breed ?? ''}
                      className="bg-transparent border border-b-[1px] border-b-black p-2"
                      {...register('breed')}
                    />
                  ) : (
                    <p>{pet.breed}</p>
                  )}
                </div>
                <div className="flex flex-col gap-3 p-5 bg-lighter-red rounded-lg ">
                  <h3 className="capitalize header-3 ">May live with</h3>
                  {edit ? (
                    <Controller
                      name="may_live_with"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isClearable
                          isMulti={false}
                          styles={customStyles}
                          options={MayLiveWith}
                        />
                      )}
                    />
                  ) : (
                    <p className="lowercase first-letter:uppercase">
                      {pet.may_live_with}
                    </p>
                  )}
                </div>
                <div className="flex flex-col gap-3 p-5 bg-lighter-red rounded-lg ">
                  <h3 className="capitalize header-3">ideal home</h3>
                  {edit ? (
                    <textarea
                      className="bg-transparent border border-b-[1px] border-b-black whitespace-pre-wrap p-2"
                      maxLength={500}
                      placeholder="Ample outside space, garden..."
                      defaultValue={pet.ideal_home ?? ''}
                      {...register('ideal_home')}
                    />
                  ) : (
                    <p>{pet.ideal_home}</p>
                  )}
                </div>
              </div>
              <div>
                <h2 className="capitalize header-3">About {pet.name}</h2>
                {edit ? (
                  <textarea
                    maxLength={1000}
                    className="rounded-lg p-2 whitespace-pre-wrap w-full h-1/2"
                    defaultValue={pet.description ?? ''}
                  />
                ) : (
                  <p>{pet.description}</p>
                )}
              </div>
            </div>
          </div>
        </form>
      </section>
      {isModalOpen && (
        <AlertModal
          setIsModalOpen={setIsModalOpen}
          message={SUCCESS_MESAGE}
          handleDelete={handleDelete}
          isDelete={isDelete}
        />
      )}
    </div>
  )
}
