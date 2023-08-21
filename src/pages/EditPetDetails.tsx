import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import Select from 'react-select'
import dayjs from 'dayjs'
import { GrLocation as IconLocation } from 'react-icons/gr'
import { api } from '../lib/axios'
import { registerPet, UpdatePetFormData } from '../@types/zodTypesRegisterPet'
import { AlertMessage, Organisation, Pet } from '../@types/models'
import usePetsContext from '../hooks/usePetsContext'
import { editSelectStyles } from '../styles/selectStyles'
import { MayLiveWith, PetGender, PetSize } from '../constants/petFilters'
import { AlertModal } from '../components/AlertModal'
import { NavigateBack } from '../components/NavigateBack'
import { PetDetailItem } from '../components/PetDetailItem'
// import { ImagesGrid } from '../components/ImagesGrid'
// import { FAKE_IMGS } from './ViewPetDetails'
import { EditPetButtonsContainer } from '../components/EditPetButtonsContainer'

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
      const parsedBreed = petRes.data.pet.breed?.replaceAll('_', ' ')
      setPet({ ...petRes.data.pet, breed: parsedBreed || '' })
      setOrg(orgRes.data.organisation)
    })
  }, [params.orgId, params.petId, pets])

  async function handleEditPet(data: UpdatePetFormData) {
    setIsDelete(false)
    try {
      const resp = await api.patch(
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
      SUCCESS_MESAGE.content = 'Your changes have been saved.'
      setIsModalOpen(true)
      //   const createdAt = dayjs(resp.data.pet.created_at).format('DD/MM/YY')
      const parsedBreed = resp.data.pet.breed?.replaceAll('_', ' ')
      setPet({ ...resp.data.pet, breed: parsedBreed || '' })
    } catch (error) {
      console.error(error)
      SUCCESS_MESAGE.title = 'Ooops!'
      SUCCESS_MESAGE.content = 'Something went wrong. Please try again.'
      setIsModalOpen(true)
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
    } catch (error) {
      console.error('', error)
    }
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
      <div className="section-wrapper min-h-screen bg-yellow w-full">
        {/* <ImagesGrid images={FAKE_IMGS} /> */}
      </div>
      <div className="min-h-screen bg-light-bg w-full px-10 lg:px-28 py-14 relative">
        <form
          action=""
          onSubmit={handleSubmit(handleEditPet)}
          className="w-full"
        >
          <EditPetButtonsContainer
            edit={edit}
            setEdit={setEdit}
            setIsDelete={setIsDelete}
            setIsModalOpen={setIsModalOpen}
          />
          <div>
            <div className="flex flex-col gap-5">
              {edit ? (
                <>
                  <input
                    type="text"
                    className="input-edit bg-white/50 md:w-1/2 first-letter:capitalize"
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
                <h1 className="header-name">{pet.name}</h1>
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
                <PetDetailItem title="Gender" info={pet.sex}>
                  {edit && (
                    <Controller
                      name="sex"
                      control={control}
                      render={({ field }) => (
                        <Select
                          defaultValue={PetGender.find(
                            (gender) => gender.value === pet.sex,
                          )}
                          isClearable
                          isMulti={false}
                          styles={editSelectStyles}
                          {...field}
                          options={PetGender}
                        />
                      )}
                    />
                  )}
                </PetDetailItem>

                <PetDetailItem title="Age" info={pet.age}>
                  {edit && (
                    <>
                      <input
                        placeholder="e.g. 0.7"
                        className="input-edit"
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
                  )}
                </PetDetailItem>

                <PetDetailItem title="Size" info={pet.size}>
                  {edit && (
                    <Controller
                      name="size"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isClearable
                          defaultValue={PetSize.find(
                            (size) => size.value === pet.size,
                          )}
                          isMulti={false}
                          styles={editSelectStyles}
                          options={PetSize}
                        />
                      )}
                    />
                  )}
                </PetDetailItem>

                <PetDetailItem title="Breed" info={pet.breed}>
                  {edit && (
                    <input
                      type="text"
                      defaultValue={pet.breed ?? ''}
                      className="input-edit"
                      {...register('breed')}
                    />
                  )}
                </PetDetailItem>

                <PetDetailItem title="May live with" info={pet.may_live_with}>
                  {edit && (
                    <Controller
                      name="may_live_with"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          isClearable
                          defaultValue={MayLiveWith.find(
                            (option) => option.value === pet.may_live_with,
                          )}
                          isMulti={false}
                          styles={editSelectStyles}
                          options={MayLiveWith}
                        />
                      )}
                    />
                  )}
                </PetDetailItem>

                <PetDetailItem title="ideal home" info={pet.ideal_home}>
                  {edit && (
                    <textarea
                      className="input-edit whitespace-pre-wrap"
                      maxLength={150}
                      placeholder="Ample outside space, garden..."
                      defaultValue={pet.ideal_home ?? ''}
                      {...register('ideal_home')}
                    />
                  )}
                </PetDetailItem>
              </div>
              <div>
                <h2 className="capitalize header-3">About {pet.name}</h2>
                {edit ? (
                  <textarea
                    maxLength={1000}
                    placeholder={`${pet.name} enjoys playing with...`}
                    className="input-edit bg-white/50 whitespace-pre-wrap w-full h-1/2"
                    defaultValue={pet.description ?? ''}
                    {...register('description')}
                  />
                ) : (
                  <p>{pet.description}</p>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
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
