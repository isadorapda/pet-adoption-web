import { useForm } from 'react-hook-form'
import { api } from '../../lib/axios'
import { z } from 'zod'
import usePetsContext from '../../hooks/usePetsContext'

const registerOrgBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  address: z.string(),
  city: z.string(),
  postcode: z.string(),
  mobile: z.string().min(9),
})

type RegisterOrgData = z.infer<typeof registerOrgBodySchema>

export function RegisterOrganisation() {
  const { handleSubmit, register } = useForm<RegisterOrgData>()
  const { setOrganisations } = usePetsContext()

  async function handleRegisterOrg(data: RegisterOrgData) {
    const resp = await api.post('/organisations', {
      name: data.name,
      email: data.email,
      password: data.password,
      address: data.address,
      city: data.city,
      postcode: data.postcode,
      mobile: data.mobile,
    })
    setOrganisations(resp.data)
    console.log(resp.data)
  }
  return (
    <div className=" bg-light-bg rounded-lg p-10 w-[90%]">
      <h1 className="text-2xl font-bold mb-6">Register your organisation</h1>

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
            Mobile <span className="text-main-red">*</span>
          </label>
          <input
            type="tel"
            placeholder="e.g. 07301234567"
            className="rounded-md p-2"
            {...register('mobile')}
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
        {/* <div>
            <label htmlFor="" className="header-3">Confirm Password</label>
            <input type="password" />
          </div> */}
        <h4>
          <span className="text-main-red">*</span> Required
        </h4>
        <button type="submit" className="button-primary">
          Sing in
        </button>
      </form>
    </div>
  )
}
