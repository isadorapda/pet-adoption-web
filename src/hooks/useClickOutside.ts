import { RefObject, useEffect } from 'react'

export default function useOnClickOutside(
  ref: RefObject<Element>,
  onClickOutside: () => void,
) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside()
      }
    }
    window.addEventListener('click', handleClickOutside, true)
    window.addEventListener('keydown', handleClickOutside, true)
    return () => {
      window.removeEventListener('click', handleClickOutside, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClickOutside])
}
