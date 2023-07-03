import {
  MdLogout as IconLogout,
  MdOutlineModeEdit as IconEdit,
} from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import usePetsContext from '../../hooks/usePetsContext'

interface Props {
  setIsMenuOpen: (value: boolean) => void
}

export function MenuProfileOptions({ setIsMenuOpen }: Props) {
  const { currentOrganisation } = usePetsContext()
  const navigate = useNavigate()
  return (
    <div className="flex flex-col py-3 px-5 shadow-card rounded-md gap-2 absolute top-8 right-1 w-max bg-white z-50">
      <div>
        <button
          onClick={() => {
            navigate(`/organisation/${currentOrganisation.id}/edit-profile`)
            setIsMenuOpen(false)
          }}
          className="cursor-pointer flex items-center gap-3"
        >
          <IconEdit /> Edit Profile
        </button>
      </div>
      <div>
        <button
          onClick={() => setIsMenuOpen(false)}
          className="cursor-pointer flex items-center gap-3"
        >
          <IconLogout /> Logout
        </button>
      </div>
    </div>
  )
}
