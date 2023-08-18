import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { api } from '../lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorMessage } from '@hookform/error-message'
import { AlertModal } from './AlertModal'
import {
  RegisterOrgData,
  registerOrgBodySchema,
} from '../@types/zodTypesRegisterOrganisation'
import { NavigateBack } from './NavigateBack'

const SUCCESS_MESSAGE = {
  title: 'Success!',
  content: `Organisation has been registered. Please, login into your account to start advertising your pets for adoption.`,
}

export function RegisterOrganisation() {
  const {
    handleSubmit,
    register,
    reset,
    setError,
    formState: { errors },
  } = useForm<RegisterOrgData>({ resolver: zodResolver(registerOrgBodySchema) })
  const [isModalOpen, setIsModalOpen] = useState(false)

  async function handleRegisterOrg(data: RegisterOrgData) {
    try {
      await api.post('/organisations', {
        name: data.name,
        email: data.email,
        password: data.password.password,
        address: data.address,
        city: data.city,
        postcode: data.postcode,
        mobile: data.mobile,
      })
      setIsModalOpen(true)
      reset()
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error)) {
        setError(
          'email',
          { type: 'focus', message: 'Email already registered' },
          { shouldFocus: true },
        )
      }
    }
  }

  return (
    <div className="sign-in-container">
      <div className="sign-in-wrapper">
        <NavigateBack path="login" />

        <h1 className="text-xl md:text-2xl font-bold mb-6">
          Register your organisation
        </h1>

        <form
          action=""
          onSubmit={handleSubmit(handleRegisterOrg)}
          className="gap-5 flex flex-col"
        >
          <div className="flex flex-col ">
            <label htmlFor="org-name" className="header-3">
              Organisation Name <span className="text-main-red">*</span>
            </label>
            <input
              id="org-name"
              className="rounded-md p-2"
              type="text"
              placeholder="e.g. Rehoming"
              {...register('name')}
            />
            <ErrorMessage
              as="p"
              errors={errors}
              name="name"
              render={(e) => <p>{e.message}</p>}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="email-address" className="header-3">
              Email Address <span className="text-main-red">*</span>
            </label>
            <input
              id="email-address"
              type="mail"
              placeholder="e.g. rehoming@email.com"
              className="rounded-md p-2"
              {...register('email')}
            />
            <ErrorMessage
              as="p"
              errors={errors}
              name="email"
              render={(e) => <p>{e.message}</p>}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="postcode" className="header-3">
              Post Code <span className="text-main-red">*</span>
            </label>
            <input
              id="postcode"
              type="text"
              placeholder="e.g. AB12 3CD"
              className="rounded-md p-2"
              {...register('postcode')}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="city" className="header-3">
              City <span className="text-main-red">*</span>
            </label>
            <input
              id="city"
              type="text"
              placeholder="e.g. London"
              className="rounded-md p-2"
              {...register('city')}
            />
            <p>{errors.city?.message}</p>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="address" className="header-3">
              Address Line
            </label>
            <input
              id="address"
              type="text"
              placeholder="e.g. 123 Road"
              className="rounded-md p-2"
              {...register('address')}
            />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="whats-app-number" className="header-3">
              WhatsApp number <span className="text-main-red">*</span>
            </label>
            <input
              id="whats-app-number"
              type="tel"
              placeholder="e.g. 447301234567"
              className="rounded-md p-2"
              {...register('mobile')}
            />
            <p>{errors.mobile?.message}</p>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="password" className="header-3">
              Password <span className="text-main-red">*</span>
            </label>
            <input
              id="password"
              type="password"
              className="rounded-md p-2"
              {...register('password.password')}
            />
            <p>{errors.password?.password?.message}</p>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="password-confirmation" className="header-3">
              Confirm Password <span className="text-main-red">*</span>
            </label>
            <input
              id="password-confirmation"
              type="password"
              className="rounded-md p-2"
              {...register('password.confirm')}
            />
            <p>{errors.password?.confirm?.message}</p>
          </div>
          <h4>
            <span className="text-main-red">*</span> Required
          </h4>
          <button type="submit" className="button-primary">
            Sing in
          </button>
        </form>
        {isModalOpen && (
          <AlertModal
            showButton={true}
            setIsModalOpen={setIsModalOpen}
            message={SUCCESS_MESSAGE}
          />
        )}
      </div>
    </div>
  )
}
