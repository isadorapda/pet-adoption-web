import { UseFormHandleSubmit } from 'react-hook-form'
import { GrClose as IconClose } from 'react-icons/gr'
import { SearchPetFormData } from './SearchPetForm'
import { AGE_RANGES } from '@/constants/filters'
import { useEffect, useState } from 'react'

interface Props {
  setIsMenuOpen: (isOpen: boolean) => void
  setPetSizes: (sizes: string[]) => void
  handleSubmit: UseFormHandleSubmit<SearchPetFormData>
  handleSearchForm: (data: SearchPetFormData) => Promise<void>
  petSizes: Array<string>
  setPetAgeRange: (ageRange: { min: number; max: number }) => void
}

export function Filters({
  setIsMenuOpen,
  setPetSizes,
  petSizes,
  handleSearchForm,
  handleSubmit,
  setPetAgeRange,
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
      <div className="w-1/2 bg-white flex flex-col  absolute top-0 right-0 z-50 h-screen">
        <div className="w-full p-8 flex items-center">
          <button onClick={() => setIsMenuOpen(false)}>
            <IconClose />
          </button>
        </div>
        <form
          action=""
          className="flex flex-col gap-10 px-24"
          onSubmit={handleSubmit(handleSearchForm)}
        >
          <div className="flex flex-col ">
            <label htmlFor="" className="header-3">
              Size
            </label>
            <div className="grid grid-cols-3 grid-flow-row gap-3">
              <button
                type="button"
                value="TINY"
                className="button-filter "
                onClick={(e) => setPetSizeFilters(e.currentTarget.value)}
              >
                Tiny
              </button>
              <button
                type="button"
                value="SMALL"
                className="button-filter "
                onClick={(e) => setPetSizeFilters(e.currentTarget.value)}
              >
                Small
              </button>
              <button
                type="button"
                value="MEDIUM"
                className="button-filter "
                onClick={(e) => setPetSizeFilters(e.currentTarget.value)}
              >
                Medium
              </button>
              <button
                type="button"
                value="LARGE"
                className="button-filter "
                onClick={(e) => setPetSizeFilters(e.currentTarget.value)}
              >
                Large
              </button>
              <button
                type="button"
                value="GIANT"
                className="button-filter "
                onClick={(e) => setPetSizeFilters(e.currentTarget.value)}
              >
                Giant
              </button>
            </div>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="" className="header-3">
              Age
            </label>
            <div className="grid grid-cols-3 grid-flow-row gap-3">
              {AGE_RANGES.map((ageRange) => (
                <button
                  key={ageRange.label}
                  type="button"
                  onClick={() => setAgeRangeFilters(ageRange.values)}
                  className="button-filter"
                >
                  {ageRange.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="" className="header-3">
              May live with
            </label>
            <div className="grid grid-cols-3 grid-flow-row gap-3">
              <button className="button-filter ">Cats</button>
              <button className="button-filter ">Dogs</button>
              <button className="button-filter ">Children</button>
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
