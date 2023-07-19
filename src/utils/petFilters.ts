// export enum PetType {
//   CAT = 'CAT',
//   DOG = 'DOG',
// }
// export enum PetGender {
//   MALE = 'MALE',
//   FEMALE = 'FEMALE',
// }

// export enum PetSize {
//   TINY = 'TINY',
//   SMALL = 'SMALL',
//   MEDIUM = 'MEDIUM',
//   LARGE = 'LARGE',
//   GIANT = 'GIANT',
// }
// export enum MayLiveWith {
//   CATS = 'CATS',
//   DOGS = 'DOGS',
//   CHILDREN = 'CHILDREN',
//   ELDER = 'ELDER',
//   ANY = 'ANY',
// }

// export const getPetTypeLabel = (petType: PetType) => {
//   switch (petType) {
//     case PetType.CAT:
//       return 'Cat'
//     case PetType.DOG:
//       return 'Dog'
//   }
// }
export const PetType = [
  {
    label: 'Dog',
    value: 'DOG',
  },
  {
    label: 'Cat',
    value: 'CAT',
  },
]

// export const getPetGenderLabel = (petGender: PetGender) => {
//   switch (petGender) {
//     case PetGender.FEMALE:
//       return 'Female'
//     case PetGender.MALE:
//       return 'Male'
//   }
// }
export const PetGender = [
  {
    label: 'Female',
    value: 'FEMALE',
  },
  {
    label: 'Male',
    value: 'MALE',
  },
]
// export const getMayLiveWithLabel = (mayLive: MayLiveWith) => {
//   switch (mayLive) {
//     case MayLiveWith.CATS:
//       return 'Cats'
//     case MayLiveWith.CHILDREN:
//       return 'Children'
//     case MayLiveWith.DOGS:
//       return 'Dogs'
//     case MayLiveWith.ELDER:
//       return 'Elder'
//     case MayLiveWith.ANY:
//       return 'Any'
//   }
// }
// export const getPetSizeLabel = (petSize: PetSize) => {
//   switch (petSize) {
//     case PetSize.TINY:
//       return 'Tiny'
//     case PetSize.SMALL:
//       return 'Small'
//     case PetSize.MEDIUM:
//       return 'Medium'
//     case PetSize.LARGE:
//       return 'Large'
//     case PetSize.GIANT:
//       return 'Giant'
//   }
// }

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
