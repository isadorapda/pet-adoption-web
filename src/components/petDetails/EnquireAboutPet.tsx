import { Organisation, Pet } from '@/@types/models'
import { MdWhatsapp as IconWhatsApp } from 'react-icons/md'

import {
  WHATSAPP_BASE_URL,
  getPreFilledMessage,
} from '@/constants/contactWhatsApp'

interface Props {
  pet: Pet
  org: Organisation
}

export function EnquireAboutPet({ pet, org }: Props) {
  return (
    <div className="rounded-lg bg-white p-6 flex flex-col shadow-card h-max gap-6">
      <h1 className="font-bold ">
        Could you be {pet.name}&apos;s perfect match?
      </h1>
      <p>
        {pet.name} is registered at {org.name}
      </p>
      <button className="button-primary bg-green transition-all duration-200 hover:brightness-90">
        <a
          href={`${WHATSAPP_BASE_URL}${org.mobile}${getPreFilledMessage(
            pet.name,
          )}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 lg:gap-5 text-sm lg:text-base"
        >
          <IconWhatsApp /> Enquire about {pet.name}
        </a>
      </button>
    </div>
  )
}
