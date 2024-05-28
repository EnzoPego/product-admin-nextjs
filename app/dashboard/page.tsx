'use client'

import { Button } from '@/components/ui/button';
import { signOutAcount } from '@/lib/firebase';


const Dashboard = () => {
  return (
    <div>
        <Button
        onClick={signOutAcount}>
            Sign Out
        </Button>
    </div>
  )
}

export default Dashboard