
import { getFromLocalStrorage } from "@/actions/get-from-localstorage";
import { setInLocalStrorage } from "@/actions/set-in-localstorage";
import { User } from "@/interfaces/user.inteface";
import { auth, getDocument } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export const useUser = () => {
  const [user, setUser] = useState<User | undefined | DocumentData>(undefined);

  const pathName = usePathname()
  const router = useRouter()

  const protectedRoutes = [ '/dashboard' ]
  const isInProtectedRoute = protectedRoutes.includes(pathName)

  const getUserFormDB = async (uid: string) => {
    const path = `users/${uid}`;

    try {
      let res = await getDocument(path);
      setUser(res);

      setInLocalStrorage("user", res);
    } catch (error) {

    }
  };

  useEffect(() => {
    return onAuthStateChanged(auth, async (authUser) => {
      // Exist auth user
      if (authUser) {
        const userInLocal = getFromLocalStrorage("user");

        if (userInLocal) {
          setUser(userInLocal);
        } else {
          getUserFormDB(authUser.uid);
        }

        //Dosen't exist auth user
      } else {

        if (isInProtectedRoute)router.push('/')

      }
    });
  }, [])
  
  return user
  
};
