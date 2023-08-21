import { z } from 'zod'

export const searchPetSchema = z.object({
  location: z.string().min(3, { message: 'Please, inform a city.' }),
  pet_type: z
    .object({ value: z.string().optional(), label: z.string() })
    .optional(),
  sex: z.object({ value: z.string().optional(), label: z.string() }).optional(),
  age_min: z.coerce.number().optional(),
  age_max: z.coerce.number().optional(),
  size: z.array(z.string()).optional(),
  breed: z.array(z.string()).optional(),
  may_live_with: z.union([z.array(z.string()), z.string()]).optional(),
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(20),
  field: z.string().default('created_at'),
  order: z.union([z.literal('asc'), z.literal('desc')]).default('desc'),
  petType: z.enum(['DOG', 'CAT']).optional(),
})

export type SearchPetFormData = z.infer<typeof searchPetSchema>
