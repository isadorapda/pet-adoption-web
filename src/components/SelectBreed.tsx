import { useState } from 'react'
import AsyncSelect from 'react-select/async'
import { api } from '../lib/axios'

interface BreedProps {
  breeds: Array<string>
  setBreeds: (breeds: Array<string>) => void
}

interface FetchBreedsResponse {
  data: { breeds: Array<string> }
}

export function SelectBreed({ breeds, setBreeds }: BreedProps) {
  const [breedOptions, setBreedOptions] = useState<
    Array<{ value: string; label: string }>
  >([])

  async function fetchBreeds(inputValue: string) {
    try {
      const breedsResponse: FetchBreedsResponse = await api.get('/pets/breeds')
      const fetchedBreeds = breedsResponse.data.breeds.map((breed) => ({
        label: capitaliseLabel(breed.replace('_', ' ')),
        value: breed.toLowerCase().replace(/\W/g, '_'),
      }))
      setBreedOptions(fetchedBreeds)
      return filterBreeds(inputValue, fetchedBreeds)
    } catch (error) {
      console.error('Error fetching breeds:', error)
      return []
    }
  }
  const capitaliseLabel = (label: string) => {
    const words = label.split(' ')
    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1),
    )
    return capitalizedWords.join(' ')
  }
  const filterBreeds = (
    inputValue: string,
    options: Array<{ value: string; label: string }>,
  ) => {
    const selectedBreeds = options.filter((option) =>
      option.label.toLowerCase().includes(inputValue.toLowerCase()),
    )
    return selectedBreeds
  }

  const handleSelectChange = (selectedOptions: Array<string>) => {
    setBreeds(selectedOptions)
  }

  return (
    <AsyncSelect
      cacheOptions
      loadOptions={fetchBreeds}
      placeholder="Type to search breeds"
      isMulti
      onChange={(selectedOptions) => {
        handleSelectChange(selectedOptions.map((option) => option.value))
      }}
      value={breedOptions.filter((option) => breeds.includes(option.value))}
      defaultOptions
    />
  )
}
