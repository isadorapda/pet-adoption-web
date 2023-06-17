import { StylesConfig } from 'react-select'

export type Option = {
  value?: string
  label?: string
}

export const customStyles: StylesConfig<Option> = {
  menuList: (provided) => ({
    ...provided,
    borderRadius: '2px',
    zIndex: 1000,
    width: '100%',
  }),
  menu: (provided) => ({
    ...provided,
    width: '100%',
  }),

  option: (provided, state) => ({
    ...provided,
    background: state.isFocused
      ? '#d1d5db'
      : state.isSelected
      ? 'rgba(246, 128, 132, 0.2)'
      : 'white',
    color: state.isFocused ? 'white' : '',
    borderRadius: '2px',
    width: '100%',
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#d1d5db',
    padding: '0',
    width: '0.9rem',
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    margin: '7px 4px',
  }),
  singleValue: (provided) => ({
    ...provided,
    paddingRight: '6px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '0',
    width: 'max-content',
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    borderRadius: '6px',
    border: 'none',
    fontSize: '0.8rem',
    padding: '5px',
    width: '100%',
  }),
}
