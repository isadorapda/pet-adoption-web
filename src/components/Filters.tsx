import { useEffect, useRef, useState } from 'react'
import { UseFormHandleSubmit } from 'react-hook-form'
import { GrClose as IconClose } from 'react-icons/gr'
import { SearchPetFormData } from '../@types/zodTypesSearchPet'
import { MayLiveWith, PetSize } from '../constants/petFilters'
import { SelectBreed } from './SelectBreed'
import { AGE_RANGES } from '../constants/filters'
import { PetDataForm } from './SearchPetForm'
import useOnClickOutside from '../hooks/useClickOutside'

interface Props {
  setIsMenuOpen: (isOpen: boolean) => void
  handleSubmit: UseFormHandleSubmit<SearchPetFormData>
  handleSearchForm: (data: SearchPetFormData) => Promise<void>
  petData: PetDataForm
  setPetData: (data: PetDataForm) => void
}

export function Filters({
  setIsMenuOpen,
  handleSearchForm,
  handleSubmit,
  petData,
  setPetData,
}: Props) {
  const [ageRanges, setAgeRanges] = useState<
    Array<{ min: number; max: number }>
  >([])
  const formRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(formRef, () => setIsMenuOpen(false))

  function setPetSizeFilters(value: string) {
    if (petData.sizes.includes(value)) {
      setPetData({
        ...petData,
        sizes: petData.sizes.filter((size) => size !== value),
      })
    } else {
      setPetData({ ...petData, sizes: [...petData.sizes, value] })
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
    if (petData.mayLive.includes(value)) {
      setPetData({
        ...petData,
        mayLive: petData.mayLive.filter((val) => val !== value),
      })
    } else {
      setPetData({ ...petData, mayLive: [...petData.mayLive, value] })
    }
  }

  useEffect(() => {
    if (ageRanges.length > 1) {
      const range = ageRanges.reduce((curr, acc) => {
        const minValue = Math.min(curr.min, acc.min)
        const maxValue = Math.max(curr.max, acc.max)
        return { min: minValue, max: maxValue }
      })
      setPetData({ ...petData, ageRange: range })
    } else {
      setPetData({ ...petData, ageRange: ageRanges[0] })
    }
  }, [ageRanges, setAgeRanges])

  return (
    <div className="bg-opaque-black fixed z-10 h-full w-screen top-0 left-0">
      <div ref={formRef} className=" bg-white side-menu-form py-10">
        <div className="w-full mb-4 flex items-start">
          <button onClick={() => setIsMenuOpen(false)}>
            <IconClose />
          </button>
        </div>
        <form
          action=""
          className="flex flex-col gap-5 md:gap-10"
          onSubmit={handleSubmit(handleSearchForm)}
        >
          <div className="flex flex-col">
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
                    className={`button-filter ${
                      petData.sizes.includes(option.value)
                        ? 'bg-lighter-red font-semibold'
                        : ''
                    } `}
                    onClick={(e) => setPetSizeFilters(e.currentTarget.value)}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="pet-age-filter" className="header-3">
              Age
            </label>
            <div id="pet-age-filter" className="grid-filters-search">
              {AGE_RANGES.map((ageRange) => (
                <button
                  key={ageRange.label}
                  type="button"
                  onClick={() => setAgeRangeFilters(ageRange.values)}
                  className={`button-filter ${
                    ageRanges.includes(ageRange.values)
                      ? ' bg-lighter-red font-semibold'
                      : ''
                  }`}
                >
                  {ageRange.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="header-3">Breed</label>
            <SelectBreed setPetData={setPetData} petData={petData} />
          </div>
          <div className="flex flex-col">
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
                    className={`button-filter ${
                      petData.mayLive.includes(option.value)
                        ? ' bg-lighter-red font-semibold'
                        : ''
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
