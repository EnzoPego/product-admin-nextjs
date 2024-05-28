"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { sendResetEmail } from "@/lib/firebase";
import { useRouter } from "next/navigation";



const RecoverPassword = () => {

  const [ isLoading, setisLoading ] = useState<boolean>(false)
  const router = useRouter()


  const formSchema = z.object({
    email: z
      .string()
      .email("Email format is not valid. Example: user@mail.com")
      .min(1, {
        message: "this field is required",
      }),

  });


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ""
    },
  });


  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  
  
  // { Sign in }
  const onSubmit = async (user: z.infer<typeof formSchema>) => {
    //console.log(user);

    setisLoading(true)

    try {

      await sendResetEmail(user.email)
      toast.success('Email send successfully')
      router.push('/')
      


    } catch (error:any) {
      toast.error(error.message, {duration: 2000})      

    }
    finally{
      setisLoading(false)
    }
  };


  return (
    <div className="md:border border-solid border-gray-300 rounded-xl max-w-md mx-auto p-10">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Recover Password</h1>
        <p className="text-sm text-muted-foreground">
          We will send your an email so you can recover your password
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          {/* Email */}
          <div className="mb-3">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              id="email"
              placeholder="name@example.com"
              type="email"
              autoComplete="email"
            />
            <p className="form-error">{errors.email?.message}</p>
          </div>


          {/* Submit */}
          <Button
           type="submit" disabled={isLoading}>
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
            )}
            Recover 
          </Button>

        </div>
      </form>

      {/* Sign In */}
      <p className="text-center text-sm text-muted-foreground mt-3">
        <Link
          href="/"
          className="underline  underline-offset-4 hover:text-primary"
        >
          {"<- Go Back"}
        </Link>
      </p>
    </div>
  );
};

export default RecoverPassword;
