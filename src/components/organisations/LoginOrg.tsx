import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '../../lib/axios'
import usePetsContext from '../../hooks/usePetsContext'
import { useNavigate } from 'react-router-dom'

const authOrgBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

type AuthOrgData = z.infer<typeof authOrgBodySchema>

export function LoginOrganisation() {
  const { handleSubmit, register } = useForm<AuthOrgData>()
  const { setOrgToken, organisations } = usePetsContext()
  const navigate = useNavigate()
  async function handleAuthOrg(data: AuthOrgData) {
    const resp = await api.post('/sessions', {
      email: data.email,
      password: data.password,
    })
    setOrgToken(resp.data.token)
    console.log('', organisations)
    if (resp.data) {
      // const org = organisations.find((o) => o.email === data.email)
      // if (!org) {
      //   return null
      // }
      navigate(`/profile`)
    }
    console.log('token', resp.data.token)
  }

  return (
    <div className=" bg-light-bg rounded-lg p-10 h-max w-[70%] mx-auto">
      <h1 className="text-2xl font-bold mb-6">Log in as an organisation</h1>
      <form
        action=""
        onSubmit={handleSubmit(handleAuthOrg)}
        className="flex flex-col gap-5"
      >
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
        <button
          type="submit"
          className="bg-yellow rounded-xl w-full px-4 py-3 mx-auto mt-3 shadow-buttonsShadow"
        >
          Log in
        </button>
      </form>
    </div>
  )
}
