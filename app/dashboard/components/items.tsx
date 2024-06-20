'use client'

import { CreateUpdateItem } from './create-update-item.form';
import { getCollection } from '../../../lib/firebase';
import { useUser } from "@/hooks/use-user";
import { useEffect, useState } from "react";
import { TableView } from "./table-view";
import { Product } from "@/interfaces/product.interface";
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import { orderBy } from 'firebase/firestore';


const Items = () => {

  const user = useUser()
  const [items, setItems] = useState<Product[]>([])

  const getItems = async () => {

    const path = `users/${user?.uid}/products`
    const query = [
      orderBy('createdAt','desc')
    ]

    try {
      const res = await getCollection(path,query) as Product[]
      console.log(res)

      setItems(res)
    } catch (error) {

    }
  };

  useEffect(()=>{
    if(user){
      getItems()
    }

  },[user])

  return (
    <>
      <div className="flex justify-between items-center m-4 mb-8">
        <h1 className="text-2xl ml-1">My Products</h1>
        <CreateUpdateItem getItems={getItems}>
        <Button className="px-6">
          Create
          <CirclePlus className="ml-2 w-[20px] " />
        </Button>
        </CreateUpdateItem>
      </div>

      <TableView items={items} getItems={getItems} />

    </>
  );
};

export default Items
