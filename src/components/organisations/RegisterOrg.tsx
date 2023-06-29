import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useState } from 'react'
import { AlertModal } from '../AlertMessage/AlertModal'
import { RegisterOrgData, registerOrgBodySchema } from './zodTypes'

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
        password: data.password,
        address: data.address,
        city: data.city,
        postcode: data.postcode,
        mobile: data.mobile,
      })
      setIsModalOpen(true)
      reset()
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

  return (
    <div className=" bg-light-bg rounded-lg p-10 md:w-[90%]">
      <h1 className="text-xl md:text-2xl font-bold mb-6">
        Register your organisation
      </h1>

      <form
        action=""
        onSubmit={handleSubmit(handleRegisterOrg)}
        className="gap-5 flex flex-col"
      >
        <div className="flex flex-col ">
          <label htmlFor="" className="header-3">
            Organisation Name <span className="text-main-red">*</span>
          </label>
          <input
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
          <label htmlFor="" className="header-3">
            Email Address <span className="text-main-red">*</span>
          </label>
          <input
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
          <label htmlFor="" className="header-3">
            Post Code <span className="text-main-red">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. AB12 3CD"
            className="rounded-md p-2"
            {...register('postcode')}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="" className="header-3">
            City <span className="text-main-red">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. London"
            className="rounded-md p-2"
            {...register('city')}
          />
          <p>{errors.city?.message}</p>
        </div>
        <div className="flex flex-col ">
          <label htmlFor="" className="header-3">
            Address Line
          </label>
          <input
            type="text"
            placeholder="e.g. 123 Road"
            className="rounded-md p-2"
            {...register('address')}
          />
        </div>
        <div className="flex flex-col ">
          <label htmlFor="" className="header-3">
            WhatsApp number <span className="text-main-red">*</span>
          </label>
          <input
            type="tel"
            placeholder="e.g. 447301234567"
            className="rounded-md p-2"
            {...register('mobile')}
          />
          <p>{errors.mobile?.message}</p>
        </div>
        <div className="flex flex-col ">
          <label htmlFor="" className="header-3">
            Password <span className="text-main-red">*</span>
          </label>
          <input
            type="password"
            className="rounded-md p-2"
            {...register('password')}
          />
          <p>{errors.password?.message}</p>
        </div>
        <div>
          <label htmlFor="" className="header-3">
            Confirm Password
          </label>
          <input type="password" />
        </div>
        <h4>
          <span className="text-main-red">*</span> Required
        </h4>
        <button type="submit" className="button-primary">
          Sing in
        </button>
      </form>
      {isModalOpen && (
        <AlertModal setIsModalOpen={setIsModalOpen} message={SUCCESS_MESSAGE} />
      )}
    </div>
  )
}
