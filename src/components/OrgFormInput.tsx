import { ErrorMessage } from '@hookform/error-message'
import {
  DetailedHTMLProps,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  forwardRef,
} from 'react'
import { FieldErrors } from 'react-hook-form'

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  errors?: FieldErrors
  label: string
  name: string
  styles?: boolean
}

export const OrgFormInput: ForwardRefRenderFunction<
  HTMLInputElement,
  InputProps
> = ({ errors, label, name, styles, ...rest }, ref) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="header-3">
        {label}
      </label>
      <input
        id={name}
        name={name}
        className={`rounded-md p-2 ${
          styles ? 'border border-gray-400 w-full' : ''
        } `}
        ref={ref}
        {...rest}
      />
      <ErrorMessage
        as="p"
        errors={errors}
        name={name}
        render={(e) => <p>{e.message}</p>}
      />
    </div>
  )
}

export const Input = forwardRef(OrgFormInput)
