"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { signIn } from "@/lib/firebase";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";



const SignInForm = () => {

  const [ isLoading, setisLoading ] = useState<boolean>(false)


  const formSchema = z.object({
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

      let res = await signIn(user);
      //console.log(res);

    } catch (error:any) {
      toast.error(error.message, {duration: 2000})      

    }
    finally{
      setisLoading(false)
    }
  };


  return (
    <>
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Sign In</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email and password to sign in
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

          <Link
            href="/forgot-password"
            className="underline text-muted-foreground underline-offset-4 hover:text-primary mb-6 text-sm text-end"
          >
            Forgot Password?
          </Link>

          {/* Submit */}
          <Button type="submit" disabled={isLoading}>
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin"/>
            )}
            Sign In
          </Button>

        </div>
      </form>

      {/* Sign In */}
      <p className="text-center text-sm text-muted-foreground">
        You don't have a account?{" "}
        <Link
          href="/sign-up"
          className="underline  underline-offset-4 hover:text-primary"
        >
          Sing Up
        </Link>
      </p>
    </>
  );
};

export default SignInForm;
