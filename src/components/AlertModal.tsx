import { useRef } from 'react'
import { GrClose as IconClose } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import useOnClickOutside from '../hooks/useClickOutside'

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
  const messageBoxRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(messageBoxRef, () => setIsModalOpen(false))
  const navigate = useNavigate()
  return (
    <div aria-modal="true" className="modal-opaque-background">
      {isDelete ? (
        <section ref={messageBoxRef} className="modal-alert-container">
          <h4 className="modal-header">Are you sure you want to delete?</h4>
          <div className="flex items-center gap-4 w-full">
            <button
              type="button"
              title="Cancel"
              onClick={() => setIsModalOpen(false)}
              className="button-secondary bg-light-gray"
            >
              Cancel
            </button>
            <button
              type="button"
              title="Delete"
              onClick={handleDelete}
              className="button-secondary text-white bg-main-red"
            >
              Delete
            </button>
          </div>
        </section>
      ) : (
        <section ref={messageBoxRef} className="modal-alert-container">
          <IconClose
            aria-label="Close menu"
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          />
          <h4 className="modal-header">{message.title}</h4>
          <p className="first-letter:uppercase text-center">
            {message.content}
          </p>
          {showButton && (
            <button
              type="button"
              title="Go to login page"
              onClick={() => navigate('/login')}
              className="button-secondary"
            >
              Go to log in
            </button>
          )}
        </section>
      )}
    </div>
  )
}
