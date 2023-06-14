import { z } from 'zod'

export const registerOrgBodySchema = z.object({
  name: z.string({
    required_error: "Please, inform your organisation's name.",
  }),
  email: z.string().email({
    message: 'Email is required.',
  }),
  password: z
    .string({
      required_error: 'Password is required.',
    })
    .min(6, {
      message: 'Your password should contain at least 6 characters.',
    })
    .max(12, {
      message: 'Your password should contain between 6 - 12 characters',
    }),
  address: z.string(),
  city: z.string({
    required_error: 'Please, inform city.',
  }),
  postcode: z.string(),
  mobile: z
    .string()
    .min(9)
    .trim()
    .regex(/^[1-9]\d*$/g, {
      message:
        'Right format: 447123456789. Wrong formats: +44 7123456789 or 07123456789',
    }),
})

export type RegisterOrgData = z.infer<typeof registerOrgBodySchema>
export type EditOrgData = Partial<RegisterOrgData>
