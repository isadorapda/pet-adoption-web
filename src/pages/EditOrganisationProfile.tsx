import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { api } from '../lib/axios'
import { AlertMessage } from '../@types/models'
import { AlertModal } from '../components/AlertModal'
import {
  EditOrgData,
  registerOrgBodySchema,
} from '../@types/zodTypesRegisterOrganisation'
import usePetsContext from '../hooks/usePetsContext'
import { NavigateBack } from '../components/NavigateBack'
import { Input } from '../components/OrgFormInput'

const SUCCESS_MESSAGE: AlertMessage = {
  title: '',
  content: '',
}

const partialRegisterOrg = registerOrgBodySchema.deepPartial()

export function EditOrganisationProfile() {
  const { currentOrganisation, orgToken } = usePetsContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDelete, setIsDelete] = useState(false)

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors },
  } = useForm<EditOrgData>({ resolver: zodResolver(partialRegisterOrg) })

  async function handleUpdateOrg(data: EditOrgData) {
    setIsDelete(false)
    try {
      await api.patch(`/me/${currentOrganisation.id}/edit`, {
        ...data,
      })
      SUCCESS_MESSAGE.title = 'Success!'
      SUCCESS_MESSAGE.content = `Your changes have been saved.`
      setIsModalOpen(true)
    } catch (error) {
      console.error(error)

      if (
        axios.isAxiosError(error) &&
        error.response?.data.message === 'Email already registered.'
      ) {
        setError(
          'email',
          { type: 'focus', message: 'Email already registered' },
          { shouldFocus: true },
        )
      }
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/me/${currentOrganisation.id}/delete`, {
        headers: {
          Authorization: `Bearer ${orgToken}`,
        },
      })
      SUCCESS_MESSAGE.title = 'Deleted'
      SUCCESS_MESSAGE.content = 'Account Deleted'
      setIsDelete(false)
      setIsModalOpen(true)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full mt-32">
      <NavigateBack path="profile" />
      <div className="w-full flex flex-col md:grid md:grid-cols-[30%,70%] p-6 md:p-10 gap-10 md:gap-3">
        <div className="flex md:flex-col gap-10">
          <div>
            <button type="button" className="text-sm md:text-base">
              General Info
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(true)
                setIsDelete(true)
              }}
              className="text-sm md:text-base text-main-red"
            >
              Delete Account
            </button>
          </div>
        </div>

        <form
          action=""
          onSubmit={handleSubmit(handleUpdateOrg)}
          className="gap-6 md:gap-8 flex flex-col md:pr-10"
        >
          <Input
            label="Organisation Name"
            type="text"
            {...register('name')}
            defaultValue={currentOrganisation.name}
            styles={true}
            errors={errors}
          />

          <div className="input-org-container">
            <Input
              label="Email Address"
              type="email"
              {...register('email')}
              defaultValue={currentOrganisation.email}
              styles={true}
              errors={errors}
            />
            <Input
              label="WhatsApp number"
              type="text"
              {...register('mobile')}
              defaultValue={currentOrganisation.mobile}
              styles={true}
              errors={errors}
            />
          </div>
          <div className="input-org-container md:flex-col lg:flex-row">
            <Input
              label="Post Code"
              type="text"
              {...register('postcode')}
              defaultValue={currentOrganisation.postcode}
              styles={true}
              errors={errors}
            />
            <Input
              label="City"
              type="text"
              {...register('city')}
              defaultValue={currentOrganisation.city}
              styles={true}
              errors={errors}
            />
            <Input
              label="Address Line"
              type="text"
              {...register('address')}
              defaultValue={currentOrganisation.address}
              styles={true}
              errors={errors}
            />
          </div>

          <button type="submit" className="button-primary">
            Save changes
          </button>
        </form>
      </div>
      {isModalOpen && (
        <AlertModal
          setIsModalOpen={setIsModalOpen}
          message={SUCCESS_MESSAGE}
          isDelete={isDelete}
          handleDelete={handleDelete}
        />
      )}
    </div>
  )
}
