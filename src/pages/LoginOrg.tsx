import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { IoIosAlert as IconError } from 'react-icons/io'
import { z } from 'zod'
import axios from 'axios'
import { api } from '../lib/axios'
import usePetsContext from '../hooks/usePetsContext'

const authOrgBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type AuthOrgData = z.infer<typeof authOrgBodySchema>

export function LoginOrganisation() {
  const { handleSubmit, register } = useForm<AuthOrgData>()
  const { setOrgToken } = usePetsContext()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  async function handleAuthOrg(data: AuthOrgData) {
    if (!data.email || !data.password) {
      setError('Email and password are required')
      return
    }
    try {
      const resp = await api.post('/sessions', {
        email: data.email,
        password: data.password,
      })
      setOrgToken(resp.data.token)
      if (resp.data) {
        navigate(`/profile`)
      }
    } catch (error) {
      console.error(error)
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message)
      }
    }
  }

  return (
    <div className="sign-in-container min-h-screen">
      <div className=" sign-in-wrapper">
        <h1 className="text-xl md:text-2xl font-bold mb-6">
          Login as an organisation
        </h1>
        <form
          action=""
          onSubmit={handleSubmit(handleAuthOrg)}
          className="flex flex-col "
        >
          <div className="flex flex-col gap-5 pb-5">
            <div className="flex flex-col">
              <label htmlFor="" className="header-3">
                Email Address <span className="text-main-red">*</span>
              </label>
              <input
                type="mail"
                placeholder="e.g. rehoming@email.com"
                className="rounded-md p-2 "
                {...register('email')}
              />
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
            </div>
          </div>

          <button type="submit" className="button-primary">
            Log in
          </button>
          <div
            className={`${
              error ? 'visible' : 'invisible'
            } mt-4 flex items-center font-bold gap-2 h-max text-sm`}
          >
            <IconError className="fill-main-red" /> {error}
          </div>
        </form>

        <div>
          <button
            type="button"
            onClick={() => navigate('/register')}
            className=" text-sm"
          >
            Not registered yet?{' '}
            <span className="border-b border-black">Create an account</span>
          </button>
        </div>
      </div>
    </div>
  )
}
