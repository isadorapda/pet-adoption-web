import {
  IoMdArrowDropright as IconNext,
  IoMdArrowDropleft as IconPrevious,
} from 'react-icons/io'
import { Limit } from '../context/petsContext'
import Select from 'react-select'
import usePetsContext from '../hooks/usePetsContext'
import { customStyles, Option } from '../styles/selectStyles'

export function Pagination() {
  const { pageData, setPage, totalPages, setInternalLimit } = usePetsContext()

  const getPagesToDisplay = (): Array<number> => {
    const pageNumbers: Array<number> = []

    let start = pageData.page - 2
    let end = pageData.page + 2

    if (start < 1) {
      start = 1
      end = 5
    }

    if (end > totalPages) {
      end = totalPages
      start = totalPages - 4
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers.filter((page) => page > 0)
  }

  const optionsSelect: Array<Option> = Object.values(Limit)
    .filter((value) => typeof value === 'number' || value === 'All')
    .map((limitValue) => {
      return {
        label: `${limitValue}`,
        value: `${limitValue}`,
      }
    })

  return (
    <div className="flex gap-1 md:gap-5 justify-center items-center relative w-full">
      <div className=" md:pt-5 lg:pt-0 md:absolute md:right-3 lg:right-10 flex md:flex-col lg:flex-row items-center gap-1 lg:gap-3 w-1/2 md:w-max">
        <h3 className="text-sm lg:text-[1vw]">Pets per page:</h3>
        <Select
          defaultValue={optionsSelect[0]}
          isSearchable={false}
          styles={customStyles}
          options={optionsSelect}
          isMulti={false}
          onChange={(selected) => {
            if (selected && selected.value === Limit.ALL) {
              setInternalLimit(Limit.ALL)
              return
            }
            setInternalLimit(Number(selected?.value) as Limit)
          }}
        />
      </div>

      <div
        className={
          'flex items-center justify-center w-1/2 mx-auto gap-3 md:gap-5 lg:gap-10 '
        }
      >
        <button
          disabled={pageData.page === 1}
          title="Previous Page"
          onClick={() => setPage(pageData.page - 1)}
          className={`${pageData.page === 1 ? 'invisible' : 'visible'}`}
        >
          <IconPrevious size="20px" />
        </button>

        {getPagesToDisplay().map((pg) => (
          <button
            key={`pagination-page-${pg}`}
            onClick={() => setPage(pg)}
            className={`${
              pg === pageData.page
                ? 'bg-yellow shadow-buttonsShadow rounded-full '
                : ''
            }flex items-center justify-center w-7 h-7 `}
          >
            {pg}
          </button>
        ))}

        <button
          disabled={pageData.page === totalPages}
          title="Next Page"
          onClick={() => setPage(pageData.page + 1)}
          className={`${
            pageData.page === totalPages ? 'invisible' : 'visible'
          }`}
        >
          <IconNext size="20px" />
        </button>
      </div>
    </div>
  )
}
