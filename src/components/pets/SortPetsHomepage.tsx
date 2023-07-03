import Select from 'react-select'
import { options } from '../../constants/optionsSelect'
import usePetsContext from '../../hooks/usePetsContext'

export function SortPetsHomepageSelect() {
  const { setSortPets } = usePetsContext()
  return (
    <Select
      options={options}
      placeholder="Sort pets by..."
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          borderRadius: '6px',
          fontSize: '1rem',
          padding: '2px',
          width: '100%',
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          borderRadius: '2px',
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          background: state.isFocused
            ? '#e6e7e99c'
            : state.isSelected
            ? 'rgba(246, 128, 132, 0.2)'
            : 'white',
          color: 'black',
          borderRadius: '2px',
          width: '100%',
        }),
      }}
      onChange={(selected) =>
        selected &&
        setSortPets({ field: selected?.field, order: selected.order })
      }
    />
  )
}
