export enum PetType {
  CAT = 'CAT',
  DOG = 'DOG',
}
export enum PetGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export enum PetSize {
  TINY = 'TINY',
  SMALL = 'SMALL',
  MEDIUM = 'MEDIUM',
  LARGE = 'LARGE',
  GIANT = 'GIANT',
}

export const getPetTypeLabel = (petType: PetType) => {
  switch (petType) {
    case PetType.CAT:
      return 'Cat'
    case PetType.DOG:
      return 'Dog'
  }
}
export const getPetGenderLabel = (petGender: PetGender) => {
  switch (petGender) {
    case PetGender.FEMALE:
      return 'Female'
    case PetGender.MALE:
      return 'Male'
  }
}
export const getPetSizeLabel = (petSize: PetSize) => {
  switch (petSize) {
    case PetSize.TINY:
      return 'Tiny'
    case PetSize.SMALL:
      return 'Small'
    case PetSize.MEDIUM:
      return 'Medium'
    case PetSize.LARGE:
      return 'Large'
    case PetSize.GIANT:
      return 'Giant'
  }
}
