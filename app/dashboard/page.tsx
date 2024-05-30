
import { Navbar } from "@/components/navbar"
import { Metadata } from "next"

export const metadata:Metadata = {
  title: 'Dashboard',
  description: 'Manage yours products'
}

const Dashboard = () => {
  return (
    <div>
        <Navbar/>    
    </div>
  )
}

export default Dashboard