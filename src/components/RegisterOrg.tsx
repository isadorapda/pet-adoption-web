import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { api } from '../lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertModal } from './AlertModal'
import {
  RegisterOrgData,
  registerOrgBodySchema,
} from '../@types/zodTypesRegisterOrganisation'
import { NavigateBack } from './NavigateBack'
import { Input } from './OrgFormInput'

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
          <Input
            label="Organisation Name"
            type="text"
            placeholder="e.g. Rehoming"
            errors={errors}
            {...register('name')}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. rehoming@email.com"
            errors={errors}
            {...register('email')}
          />
          <Input
            label="Post Code"
            type="text"
            placeholder="e.g. AB12 3CD"
            errors={errors}
            {...register('postcode')}
          />
          <Input
            label="City"
            type="text"
            placeholder="e.g. London"
            errors={errors}
            {...register('city')}
          />
          <Input
            label="Address Line"
            type="text"
            placeholder="e.g. 123 Road"
            errors={errors}
            {...register('address')}
          />
          <Input
            label="WhatsApp number"
            type="text"
            placeholder="e.g. 447301234567"
            errors={errors}
            {...register('mobile')}
          />
          <Input
            label="Password"
            type="password"
            errors={errors}
            {...register('password.password')}
          />
          <Input
            label="Confirm Password"
            type="password"
            errors={errors}
            {...register('password.confirm')}
          />
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
