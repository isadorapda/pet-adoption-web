import { GrLocation as IconLocation } from 'react-icons/gr'
import { TbDog as IconDog, TbCat as IconCat } from 'react-icons/tb'
import { Pet } from '../@types/models'

interface HeaderProps {
  pet: Pet
  location: string
}

export function PetDetailHeader({ pet, location }: HeaderProps) {
  return (
    <header className="flex flex-col gap-5">
      <h1 className="header-name">{pet.name}</h1>
      <div className="flex gap-5 items-center">
        <section
          aria-label="Location where this pet is registered"
          className="flex gap-3 items-center"
        >
          <IconLocation aria-hidden="true" />
          <h4>{location}</h4>
        </section>
        <section aria-label="Pet type" className="flex gap-3 items-center">
          {pet.pet_type === 'CAT' ? (
            <IconCat aria-hidden="true" />
          ) : (
            <IconDog aria-hidden="true" />
          )}
          <h4>{pet.pet_type}</h4>
        </section>
      </div>
    </header>
  )
}
