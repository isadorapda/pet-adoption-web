import { useEffect, useState } from 'react'
import { UseFormHandleSubmit } from 'react-hook-form'
import { GrClose as IconClose } from 'react-icons/gr'
import { SearchPetFormData } from '../@types/zodTypesSearchPet'
import {
  MayLiveWith,
  //   PetSize,
  PetSize,
  //   getMayLiveWithLabel,
  //   getPetSizeLabel,
} from '../utils/petFilters'
import { SelectBreed } from './SelectBreed'
import { AGE_RANGES } from '../constants/filters'

interface Props {
  setIsMenuOpen: (isOpen: boolean) => void
  setPetSizes: (sizes: Array<string>) => void
  setMayLiveWith: (options: Array<string>) => void
  mayLiveWith: Array<string>
  handleSubmit: UseFormHandleSubmit<SearchPetFormData>
  handleSearchForm: (data: SearchPetFormData) => Promise<void>
  petSizes: Array<string>
  setPetAgeRange: (ageRange: { min: number; max: number }) => void
  breeds: Array<string>
  setBreeds: (breeds: Array<string>) => void
}

export function Filters({
  setIsMenuOpen,
  setPetSizes,
  petSizes,
  handleSearchForm,
  handleSubmit,
  setPetAgeRange,
  setMayLiveWith,
  mayLiveWith,
  breeds,
  setBreeds,
}: Props) {
  const [ageRanges, setAgeRanges] = useState<
    Array<{ min: number; max: number }>
  >([])

  function setPetSizeFilters(value: string) {
    if (petSizes.includes(value)) {
      setPetSizes(petSizes.filter((size) => size !== value))
    } else {
      setPetSizes([...petSizes, value])
    }
  }

  function setAgeRangeFilters(value: { min: number; max: number }) {
    if (ageRanges.includes(value)) {
      setAgeRanges(ageRanges.filter((val) => val !== value))
    } else {
      setAgeRanges([...ageRanges, value])
    }
  }

  function setMayLiveWithFilters(value: string) {
    if (mayLiveWith.includes(value)) {
      setMayLiveWith(mayLiveWith.filter((val) => val !== value))
    } else {
      setMayLiveWith([...mayLiveWith, value])
    }
  }

  useEffect(() => {
    if (ageRanges.length > 1) {
      const range = ageRanges.reduce((curr, acc) => {
        const minValue = Math.min(curr.min, acc.min)
        const maxValue = Math.max(curr.max, acc.max)
        return { min: minValue, max: maxValue }
      })
      setPetAgeRange(range)
    } else {
      setPetAgeRange(ageRanges[0])
    }
  }, [ageRanges, setPetAgeRange])

  return (
    <div className="bg-[rgba(0,_0,_0,_0.3)] fixed z-10 h-full w-screen top-0 left-0">
      <div className="w-screen md:w-2/3 lg:w-1/2 bg-white flex flex-col absolute top-0 right-0 z-50 h-full overflow-auto ">
        <div className="w-full p-8 flex items-center">
          <button onClick={() => setIsMenuOpen(false)}>
            <IconClose />
          </button>
        </div>
        <form
          action=""
          className="flex flex-col gap-10 px-10 lg:px-24 pb-10"
          onSubmit={handleSubmit(handleSearchForm)}
        >
          <div className="flex flex-col ">
            <label htmlFor="pet-size-filter" className="header-3">
              Size
            </label>
            <div id="pet-size-filter" className="grid-filters-search">
              {PetSize.map((option) => {
                return (
                  <button
                    key={option.value}
                    type="button"
                    value={option.value}
                    className={`${
                      petSizes.includes(option.value)
                        ? 'button-filter bg-lighter-red font-semibold'
                        : 'button-filter '
                    } `}
                    onClick={(e) => setPetSizeFilters(e.currentTarget.value)}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="pet-age-filter" className="header-3">
              Age
            </label>
            <div id="pet-age-filter" className="grid-filters-search">
              {AGE_RANGES.map((ageRange) => (
                <button
                  key={ageRange.label}
                  type="button"
                  onClick={() => setAgeRangeFilters(ageRange.values)}
                  className={`${
                    ageRanges.includes(ageRange.values)
                      ? 'button-filter bg-lighter-red font-semibold'
                      : 'button-filter'
                  }`}
                >
                  {ageRange.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col ">
            <label className="header-3">Breed</label>
            <SelectBreed setBreeds={setBreeds} breeds={breeds} />
          </div>
          <div className="flex flex-col ">
            <label htmlFor="live-with-filter" className="header-3">
              May live with
            </label>
            <div id="live-with-filter" className="grid-filters-search">
              {MayLiveWith.map((option) => {
                return (
                  <button
                    key={option.value}
                    value={option.value}
                    type="button"
                    onClick={(e) =>
                      setMayLiveWithFilters(e.currentTarget.value)
                    }
                    className={`${
                      mayLiveWith.includes(option.value)
                        ? 'button-filter bg-lighter-red font-semibold'
                        : 'button-filter'
                    }  `}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>
          <button type="submit" className="button-primary">
            Show pets
          </button>
        </form>
      </div>
    </div>
  )
}
