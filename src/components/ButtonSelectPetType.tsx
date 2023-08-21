import { OptionsWithIcon } from '../constants/petFilters'

interface ButtonPetTypeProps {
  filterPetType: string | undefined
  setFilterPetType: (option: string | undefined) => void
  petType: OptionsWithIcon
}

export function ButtonSelectPetType({
  filterPetType,
  setFilterPetType,
  petType,
}: ButtonPetTypeProps) {
  return (
    <button
      aria-label={`${
        filterPetType !== petType.value
          ? `Click to show only ${petType.label}`
          : `Click to unselect show only ${petType.label} option`
      }`}
      type="button"
      title={`Show all ${petType.label}s`}
      onClick={() =>
        setFilterPetType(
          filterPetType !== petType.value ? petType.value : undefined,
        )
      }
    >
      <petType.icon
        aria-hidden="true"
        className={`${
          filterPetType === petType.value ? 'stroke-main-red ' : ''
        }`}
      />
    </button>
  )
}
