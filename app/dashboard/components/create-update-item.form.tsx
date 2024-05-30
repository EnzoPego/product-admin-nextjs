'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CirclePlus } from "lucide-react"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addDocument, uploadBase64 } from "@/lib/firebase";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { User } from "@/interfaces/user.inteface";
import { ItemImage } from "@/interfaces/item-image.interface"
import DragAndDropImage from "@/components/drag-and-drop-image"
import { useUser } from "@/hooks/use-user"
import { Product } from "@/interfaces/product.interface"


export function CreateUpdateItem() {

    const user = useUser()
    const [ isLoading, setisLoading ] = useState<boolean>(false)
    const [open, setOpen] = useState<boolean>(false)


    const formSchema = z.object({
  
      image: z.object({
        path: z.string(),
        url: z.string()
      }),
      name: z.string().min(3, {
        message: "This field must contain at least 3 characters",
      }),
      price: z.coerce.number().gte(0,'The minimun value must be 0'),  
      soldUnits: z.coerce.number().gte(0,'The minimun value must be 0')  
      
    });
  
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        image: {} as ItemImage,
        name: '',
        price: undefined,
        soldUnits: undefined
      },
    });
  
  
    const { register, handleSubmit, formState,setValue } = form;
    const { errors } = formState;


    //   Updates the image value
    const handleImage = ( url:string ) =>{
        let path = `${user?.uid}/${Date.now()}`
        setValue('image',{url,path})        
    }


    // { Create or update item }
    const onSubmit = async (item: z.infer<typeof formSchema>) => {
     // console.log(item);
     createItem(item)
    };
  
  
    //{ Create item }
     const createItem = async(item: Product)=> {
      
       const path = `users/${user?.uid}/products`
       setisLoading(true)
      
       try {

        // Update image and get url
        const base64 = item.image.url
        const imagePath = item.image.path
        const imageUrl = await uploadBase64(imagePath,base64)

        item.image.url = imageUrl

       
        await addDocument(path,item)
        toast.success('Item created successfully')

        setOpen(false)
        form.reset()
        
       } catch (error:any) {
         toast.error(error.message, {duration: 2000})      
       }
       finally{
         setisLoading(false)
       }
  
    }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogTrigger asChild>
        <Button className="px-6">
          Create
          <CirclePlus className="ml-2 w-[20px] " />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>
            Manage your product whit the following information
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-2">

            {/* Image */}
            <div className="mb-3">
              <Label htmlFor="image">Image</Label>
              <DragAndDropImage handleImage={handleImage}/>
            </div>

            {/* Name */}
            <div className="mb-3">
              <Label htmlFor="name">Name</Label>
              <Input
                {...register("name")}
                id="name"
                placeholder="Product name"
                type="text"
                autoComplete="name"
              />
              <p className="form-error">{errors.name?.message}</p>
            </div>

            {/* Price */}
            <div className="mb-3">
              <Label htmlFor="price">Price</Label>
              <Input
                {...register("price")}
                id="price"
                placeholder="0.00"
                type="number"
                step='0.01'
                />
              <p className="form-error">{errors.price?.message}</p>
            </div>

            {/* Sold Units */}
            <div className="mb-3">
              <Label htmlFor="soldUnits">Sold Units</Label>
              <Input
                {...register("soldUnits")}
                id="soldUnits"
                placeholder="0"
                type="number"
                step='1'
              />
              <p className="form-error">{errors.soldUnits?.message}</p>
            </div>

            {/* Submit */}

            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading && (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
