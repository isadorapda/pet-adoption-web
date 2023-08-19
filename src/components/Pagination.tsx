import {
  IoMdArrowDropright as IconNext,
  IoMdArrowDropleft as IconPrevious,
} from 'react-icons/io'
import usePetsContext from '../hooks/usePetsContext'
import { Pages } from './Pages'

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => {
      return from + index + 1
    })
    .filter((page) => page > 0)
}

export function Pagination() {
  const { pageData, setPage, totalPages, limit } = usePetsContext()
  const currentPage = pageData.page
  const offset = (currentPage - 1) * limit
  const siblingsCount = 1

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < totalPages
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, totalPages),
        )
      : []

  return (
    <div className="flex flex-col gap-4 md:gap-5 justify-center items-center relative w-full py-10">
      <p className="text-sm">
        {offset} - {offset + limit} of {pageData.count}
      </p>
      <div
        className={
          'flex items-center justify-center  mx-auto gap-3 md:gap-5 lg:gap-10 '
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
        {currentPage > 1 + siblingsCount && (
          <>
            <Pages pageNumber={1} />
            {currentPage > 2 + siblingsCount && <span>...</span>}
          </>
        )}
        {previousPages.length > 0 &&
          previousPages.map((page) => <Pages key={page} pageNumber={page} />)}

        <Pages pageNumber={currentPage} />

        {nextPages.length > 0 &&
          nextPages.map((page) => <Pages key={page} pageNumber={page} />)}

        {currentPage + siblingsCount < totalPages && (
          <>
            {currentPage + 1 + siblingsCount < totalPages && <span>...</span>}
            <Pages pageNumber={totalPages} />
          </>
        )}

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
