import Paw from '../assets/paw.webp'

interface Props {
  message: string
}

export function NoPetsRegistered({ message }: Props) {
  return (
    <div className="mt-10 md:mt-0 md:absolute left-1/2 md:-translate-x-1/2 md:top-1/2 md:translate-y-1/2 bg-main-red rounded-lg px-10 py-5 shadow-lg">
      <div className="flex flex-col items-center">
        <img src={Paw} alt="" className="w-[5vw]" />
        <h2>{message}</h2>
      </div>
    </div>
  )
}
