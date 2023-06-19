import { BsArrowLeftShort as IconBack } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

interface Props {
  path: string
}

export function NavigateBack({ path }: Props) {
  const navigate = useNavigate()

  function handleGoBack() {
    navigate(-1)
  }
  return (
    <button
      type="button"
      onClick={handleGoBack}
      className="absolute left-10 top-20 flex items-center gap-2 text-sm"
    >
      <IconBack />
      Go back to {path}
    </button>
  )
}
