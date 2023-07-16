import { PetType, PetGender, PetSize, MayLiveWith } from '../utils/petFilters'
import { z } from 'zod'

export const registerPet = z.object({
  name: z
    .string({
      required_error: 'Please, inform name.',
    })
    .min(2, {
      message: 'Please, inform name.',
    }),
  description: z.string().max(1000).optional(),
  pet_type: z.object({
    value: z.string(),
    label: z.string(),
  }),
  sex: z.object({ value: z.string(), label: z.string() }),
  age: z.coerce.number().gt(0, {
    message: 'Please, informe age.',
  }),
  size: z.object({ value: z.string(), label: z.string() }),
  breed: z.string().optional(),
  may_live_with: z.object({
    value: z.string(),
    label: z.string(),
  }),
  ideal_home: z.string().max(500).optional(),
  pet_photos: z.instanceof(FileList).optional(),
})

export type RegisterPetFormData = z.infer<typeof registerPet>
export type UpdatePetFormData = Partial<RegisterPetFormData>
