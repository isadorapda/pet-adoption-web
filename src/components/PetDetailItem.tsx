import { ReactNode } from 'react'

interface DatailProps {
  title: string
  info: string | null | number
  children?: ReactNode
}

export function PetDetailItem({ title, info, children }: DatailProps) {
  return (
    <section className="pet-detail-box">
      <h3 className="header-3">{title}</h3>
      {children || <p className="pet-detail-text">{info}</p>}
    </section>
  )
}
