import { GrClose as IconClose } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'

interface ModalProps {
  setIsModalOpen: (open: boolean) => void
  message: { title: string; content: string }
  isDelete?: boolean
  handleDelete?: () => void
  showButton?: boolean
}

export function AlertModal({
  setIsModalOpen,
  message,
  isDelete,
  handleDelete,
  showButton = false,
}: ModalProps) {
  const navigate = useNavigate()
  return (
    <div className="w-screen h-full p-10 fixed top-0 left-0 bg-[rgba(0,_0,_0,_0.5)] flex flex-col items-center justify-center">
      {isDelete ? (
        <div className="rounded-lg bg-white p-10 flex flex-col gap-8 items-center justify-center shadow-card relative">
          <p className="font-bold text-lg">Are you sure you want to delete?</p>
          <div className="flex items-center gap-10">
            <button
              onClick={() => setIsModalOpen(false)}
              className="rounded-lg px-5 py-2 bg-light-gray shadow-buttonsShadow"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="rounded-lg px-5 py-2 text-white bg-main-red shadow-buttonsShadow"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-white p-5 md:p-12 flex flex-col gap-3 items-center justify-center shadow-card relative">
          <IconClose
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
          <p className="font-bold text-lg">{message.title}</p>
          <p className="first-letter:uppercase text-center">
            {message.content}
          </p>
          {showButton && (
            <button
              onClick={() => navigate('/login')}
              className="rounded-lg px-5 py-2 text-white bg-yellow shadow-buttonsShadow"
            >
              Go to log in
            </button>
          )}
        </div>
      )}
    </div>
  )
}
