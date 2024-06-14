

import { formatPrice } from "@/actions/format-price"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Product } from "@/interfaces/product.interface"
import { SquarePen, Trash2 } from "lucide-react"
import Image from "next/image"
import { CreateUpdateItem } from './create-update-item.form';
  
  
  export function TableView({items,getItems}:{items:Product[],getItems: () => Promise<void>}) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Sold Units</TableHead>
            <TableHead>Profit</TableHead>
            <TableHead className="text-center w-[250px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Image
                width={1000}
                height={1000}
                src={item.image.url}
                alt={item.name}
                className="object-cover w-16 h-16"
                />
              </TableCell>
              <TableCell className="font-semibold w-[350px]">{item.name}</TableCell>
              <TableCell>{formatPrice(item.price)}</TableCell>
              <TableCell>{item.soldUnits}</TableCell>
              <TableCell>{formatPrice(item.soldUnits * item.price)}</TableCell>
              <TableCell className="text-center">

                <CreateUpdateItem itemToUpdate={item} getItems={getItems}>
                  <Button>
                    <SquarePen/> 
                  </Button>
                </CreateUpdateItem>

                <Button className="md:ml-2" variant={"destructive"}> 
                   <Trash2/> 
                </Button>
                
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  