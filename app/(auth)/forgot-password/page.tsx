
import Logo from "@/components/logo"
import { Metadata } from "next"
import RecoverPassword from "./components/recover-password"

export const metadata:Metadata = {
  title: 'Recover Password',
  description: 'We will send you an email so you can recover your passord'
}



const ForgotPassword = () => {
  return (
    
    <div className="pt-10 lg:p-8 flex items-center md:h-[70vh]:">
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sa:w-[450px]">

      <RecoverPassword />

    </div>

  </div>
  )
}

export default ForgotPassword