import { GrClose as IconClose } from 'react-icons/gr'

interface ModalProps {
  setIsModalOpen: (open: boolean) => void
  message: { title: string; content: string }
}

export function AlertModal({ setIsModalOpen, message }: ModalProps) {
  return (
    <div
      className="w-screen h-full p-10 fixed top-0 left-0 bg-[rgba(0,_0,_0,_0.5)] flex flex-col items-center justify-center"
      onClick={() => setIsModalOpen(false)}
    >
      <div className="rounded-lg bg-white p-12 flex flex-col gap-3 items-center justify-center shadow-card relative">
        <IconClose
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        />
        <p className="font-bold text-lg">{message.title}</p>
        <p className="first-letter:uppercase text-center">{message.content}</p>
      </div>
    </div>
  )
}
