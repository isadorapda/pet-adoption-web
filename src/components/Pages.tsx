import usePetsContext from '../hooks/usePetsContext'

interface PagesProps {
  pageNumber: number
}

export function Pages({ pageNumber }: PagesProps) {
  const { pageData, setPage } = usePetsContext()

  return (
    <button
      onClick={() => setPage(pageNumber)}
      className={`${
        pageNumber === pageData.page
          ? 'bg-yellow shadow-buttonsShadow rounded-full '
          : ''
      }flex items-center justify-center w-7 h-7 `}
    >
      {pageNumber}
    </button>
  )
}
