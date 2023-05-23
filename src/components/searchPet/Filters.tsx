import { UseFormHandleSubmit } from 'react-hook-form'
import { GrClose as IconClose } from 'react-icons/gr'
import { SearchPetFormData } from './SearchPetForm'

interface Props {
  setIsMenuOpen: (isOpen: boolean) => void
  setPetSizes: (sizes: string[]) => void
  handleSubmit: UseFormHandleSubmit<SearchPetFormData>
  handleSearchForm: (data: SearchPetFormData) => Promise<void>
  petSizes: Array<string>
}

export function Filters({
  setIsMenuOpen,
  setPetSizes,
  petSizes,
  handleSearchForm,
  handleSubmit,
}: Props) {
  function setPetSizeFilters(value: string) {
    if (petSizes.includes(value)) {
      setPetSizes(petSizes.filter((size) => size !== value))
    } else {
      setPetSizes([...petSizes, value])
    }
  }
  console.log('size', petSizes)

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
              <button className="button-filter ">Under 6 months</button>
              <button className="button-filter ">6 - 12 months</button>
              <button className="button-filter ">1 - 2 years</button>
              <button className="button-filter ">2 - 5 years</button>
              <button className="button-filter ">5 - 7 years</button>
              <button className="button-filter ">8+ years</button>
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
