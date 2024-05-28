
import { getFromLocalStrorage } from "@/actions/get-from-localstorage";
import { setInLocalStrorage } from "@/actions/set-in-localstorage";
import { User } from "@/interfaces/user.inteface";
import { auth, getDocument } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";



export const useUser = () => {
  const [user, setUser] = useState<User | undefined | DocumentData>(undefined);

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

      }
    });
  }, [])
  
  return user
  
};
