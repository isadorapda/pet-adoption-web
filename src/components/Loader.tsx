import Logo from '../assets/paw.webp'

export function Loader() {
  return (
    <div className="w-screen h-screen absolute top-0 left-0 flex flex-col justify-center items-center bg-[rgba(255,_255,_255,_0.7)] z-50">
      <div className="h-[20vh] animate-bounce flex flex-col justify-center items-center">
        <img src={Logo} alt="" className=" w-[10vw]" />
      </div>
    </div>
  )
}
