import { MdOutlineModeEdit as IconEdit } from 'react-icons/md'
import { AiFillDelete as IconDelete } from 'react-icons/ai'

interface ButtonProps {
  edit: boolean
  setEdit: (edit: boolean) => void
  setIsDelete: (value: boolean) => void
  setIsModalOpen: (open: boolean) => void
}

export function EditPetButtonsContainer({
  edit,
  setEdit,
  setIsDelete,
  setIsModalOpen,
}: ButtonProps) {
  return (
    <>
      <div className="absolute right-10 top-10 md:top-14 flex items-center gap-3">
        <button
          type="button"
          title="Edit Pet"
          onClick={() => setEdit(true)}
          className={`${edit ? 'hidden' : ''} button-secondary`}
        >
          <IconEdit />
        </button>
        <button
          type="button"
          title="Remove Pet"
          className={`${
            edit ? 'hidden' : ''
          } button-secondary bg-main-red text-white`}
          onClick={() => {
            setIsDelete(true)
            setIsModalOpen(true)
          }}
        >
          <IconDelete />
        </button>
      </div>
      <div className="flex gap-2 max-[600px]:w-full max-[600px]:px-10 md:gap-5 absolute bottom-10 right-1/2 translate-x-1/2 md:right-10 md:translate-x-0 md:top-14">
        <button
          type="submit"
          className={`${edit ? '' : 'hidden'} button-secondary`}
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setEdit(false)}
          className={`${
            edit ? '' : 'hidden'
          } button-secondary bg-main-red text-white`}
        >
          Cancel
        </button>
      </div>
    </>
  )
}
