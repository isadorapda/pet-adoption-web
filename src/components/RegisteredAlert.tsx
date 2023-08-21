import { useRef } from 'react'
import { GrClose as IconClose } from 'react-icons/gr'
import useOnClickOutside from '../hooks/useClickOutside'

interface ModalProps {
  setIsModalOpen: (open: boolean) => void
  message: { title: string; content: string }
  setIsSideMenuOpen?: (open: boolean) => void
}

export function RegisteredAlertModal({
  setIsModalOpen,
  message,
  setIsSideMenuOpen,
}: ModalProps) {
  const messageBoxRef = useRef<HTMLDivElement | null>(null)
  useOnClickOutside(messageBoxRef, () => setIsModalOpen(false))

  return (
    <div aria-modal="true" className="modal-opaque-background">
      <section ref={messageBoxRef} className="modal-alert-container">
        <button
          type="button"
          title="Close menu"
          className="absolute top-4 right-4"
          onClick={() => {
            setIsModalOpen(false)
            if (setIsSideMenuOpen) {
              setIsSideMenuOpen(false)
            }
          }}
        >
          <IconClose aria-label="Close menu" />
        </button>
        <h4 className="modal-header">{message.title}</h4>
        <p className="first-letter:uppercase text-center">{message.content}</p>
      </section>
    </div>
  )
}
