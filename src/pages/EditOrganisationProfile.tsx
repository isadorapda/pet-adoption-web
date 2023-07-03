import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { useNavigate } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { api } from '../lib/axios'
import { AlertMessage } from '../@types/models'
import { AlertModal } from '../components/AlertMessage/AlertModal'
import {
  EditOrgData,
  registerOrgBodySchema,
} from '../components/Organisations/zodTypes'
import usePetsContext from '../hooks/usePetsContext'
import { NavigateBack } from '../components/NavigateBack'

const SUCCESS_MESSAGE: AlertMessage = {
  title: '',
  content: '',
}

const partialRegisterOrg = registerOrgBodySchema.partial()

export function EditOrganisationProfile() {
  const { currentOrganisation, orgToken } = usePetsContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const navigate = useNavigate()
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
      if (axios.isAxiosError(error)) {
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
    } catch (error) {}
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
            <button type="button" className="text-sm md:text-base">
              Password
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(true)
                setIsDelete(true)
              }}
              className="text-sm md:text-base"
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
          <div className="flex flex-col ">
            <label htmlFor="" className="header-3">
              Organisation Name
            </label>
            <input
              className="rounded-md p-2 border border-gray-400"
              type="text"
              defaultValue={currentOrganisation.name}
              {...register('name')}
            />
            <ErrorMessage
              as="p"
              errors={errors}
              name="name"
              render={(e) => <p>{e.message}</p>}
            />
          </div>
          <div className="flex flex-col md:flex-row justify-between w-full gap-6 md:gap-5">
            <div className="flex flex-col w-full">
              <label htmlFor="" className="header-3">
                Email Address
              </label>
              <input
                type="mail"
                defaultValue={currentOrganisation.email}
                className="rounded-md p-2 border border-gray-400"
                {...register('email')}
              />
              <ErrorMessage
                as="p"
                errors={errors}
                name="email"
                render={(e) => <p>{e.message}</p>}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="" className="header-3 ">
                WhatsApp number
              </label>
              <input
                type="tel"
                defaultValue={currentOrganisation.mobile}
                className="rounded-md p-2 border border-gray-400"
                {...register('mobile')}
              />
              <ErrorMessage
                as="p"
                errors={errors}
                name="mobile"
                render={(e) => <p>{e.message}</p>}
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-between w-full gap-6 md:gap-5">
            <div className="flex flex-col w-full">
              <label htmlFor="" className="header-3">
                Post Code
              </label>
              <input
                type="text"
                defaultValue={currentOrganisation.postcode}
                className="rounded-md p-2 border border-gray-400"
                {...register('postcode')}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="" className="header-3">
                City
              </label>
              <input
                type="text"
                defaultValue={currentOrganisation.city}
                className="rounded-md p-2 border border-gray-400"
                {...register('city')}
              />
              <ErrorMessage
                as="p"
                errors={errors}
                name="city"
                render={(e) => <p>{e.message}</p>}
              />
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="" className="header-3">
                Address Line
              </label>
              <input
                type="text"
                defaultValue={currentOrganisation.address}
                className="rounded-md p-2 border border-gray-400"
                {...register('address')}
              />
            </div>
          </div>

          {/* <div className="flex flex-col ">
            <label htmlFor="" className="header-3">
              Password
            </label>
            <input
              type="password"
              className="rounded-md p-2 border border-gray-400"
              {...register('password')}
            />
            <p>{errors.password?.message}</p>
          </div>
          <div>
            <label htmlFor="" className="header-3">
              Confirm Password
            </label>
            <input type="password" />
          </div> */}

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
