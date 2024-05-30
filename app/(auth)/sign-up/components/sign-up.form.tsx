"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUser, setDocument, updateUser } from "@/lib/firebase";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";
import { User } from "@/interfaces/user.inteface";



const SignUpForm = () => {

  const [ isLoading, setisLoading ] = useState<boolean>(false)


  const formSchema = z.object({

    uid: z.string(),
    name: z.string().min(3, {
      message: "This field must contain at least 3 characters",
    }),

    email: z
      .string()
      .email("Email format is not valid. Example: user@mail.com")
      .min(1, {
        message: "this field is required",
      }),
    password: z.string().min(6, {
      message: "The password must contain at less 6 characters",
    }),
  });


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      uid: '',
      name: '',
      email: "",
      password: "",
    },
  });


  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  
  
  // { Sign in }
  const onSubmit = async (user: z.infer<typeof formSchema>) => {
    //console.log(user);

    setisLoading(true)
    
    try {
      let res = await createUser(user);
      await updateUser({displayName:user.name})
      //console.log(res);

      user.uid = res.user.uid
      await createUserInDB(user as User)
      
    } catch (error:any) {
      toast.error(error.message, {duration: 2000})      
      
    }
    finally{
      setisLoading(false)
    }
  };


  //{ Create user in Firevbase Database }
  const createUserInDB = async(user: User)=> {
    
    const path = `users/${user.uid}`
    setisLoading(true)
    
    try {
      delete user.password
      await setDocument(path,user)
      toast(`You're welcome, ${user.name}`, {icon:'👋'})

    } catch (error:any) {
      toast.error(error.message, {duration: 2000})      
    }
    finally{
      setisLoading(false)
    }

  }
  
  
  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Create Account</h1>
        <p className="text-sm text-muted-foreground">
          Enter the following information to create your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">

            {/* Name */}
            <div className="mb-3">
            <Label htmlFor="name">Name</Label>
            <Input
              {...register("name")}
              id="name"
              placeholder="Jhon Doe"
              type="text"
              autoComplete="name"
            />
            <p className="form-error">{errors.name?.message}</p>
          </div>

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

          {/* Password */}
          <div className="mb-3">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password")}
              id="password"
              placeholder="******"
              type="password"
            />
            <p className="form-error">{errors.password?.message}</p>
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
            )}
            Create 
          </Button>

        </div>
      </form>

      {/* Sign In */}
      <p className="text-center text-sm text-muted-foreground">
        Do you alredy have a account?{" "}
        <Link
          href="/"
          className="underline  underline-offset-4 hover:text-primary"
        >
          Sing In
        </Link>
      </p>
    </>
  );
};

export default SignUpForm;
