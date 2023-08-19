import Select from 'react-select'

import usePetsContext from '../hooks/usePetsContext'
import { sortPetsOptions } from '../constants/optionsSelect'

export function SelectSortPets() {
  const { setSortPets } = usePetsContext()

  return (
    <Select
      options={sortPetsOptions}
      placeholder="Sort pets by..."
      styles={{
        control: (baseStyles) => ({
          ...baseStyles,
          borderRadius: '6px',
          fontSize: '1rem',
          padding: '0 2px',
          width: '100%',
        }),
        menu: (baseStyles) => ({
          ...baseStyles,

          width: 'max-content',
        }),
        menuList: (baseStyles) => ({
          ...baseStyles,
          borderRadius: '2px',
          width: 'max-content',
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
          width: 'max-content',
        }),
      }}
      onChange={(selected) =>
        selected &&
        setSortPets({ field: selected?.field, order: selected.order })
      }
    />
  )
}
