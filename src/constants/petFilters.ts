import { TbDog as IconDog, TbCat as IconCat } from 'react-icons/tb'
import { MdFemale as IconFemale, MdMale as IconMale } from 'react-icons/md'
import { IconType } from 'react-icons'

export interface OptionsWithIcon {
  label: string
  value: string
  icon: IconType
}

export const PetType: OptionsWithIcon[] = [
  {
    label: 'Dog',
    value: 'DOG',
    icon: IconDog,
  },
  {
    label: 'Cat',
    value: 'CAT',
    icon: IconCat,
  },
]

export const PetGender: OptionsWithIcon[] = [
  {
    label: 'Female',
    value: 'FEMALE',
    icon: IconFemale,
  },
  {
    label: 'Male',
    value: 'MALE',
    icon: IconMale,
  },
]

export const PetSize = [
  {
    label: 'Tiny',
    value: 'TINY',
  },
  {
    label: 'Small',
    value: 'SMALL',
  },
  {
    label: 'Medium',
    value: 'MEDIUM',
  },
  {
    label: 'Large',
    value: 'LARGE',
  },
  {
    label: 'Giant',
    value: 'GIANT',
  },
]
export const MayLiveWith = [
  {
    label: 'Cats',
    value: 'CATS',
  },
  {
    label: 'Children',
    value: 'CHILDREN',
  },
  {
    label: 'Dogs',
    value: 'DOGS',
  },
  {
    label: 'Elder',
    value: 'ELDER',
  },
  {
    label: 'Any',
    value: 'ANY',
  },
]
