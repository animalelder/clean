"use client";

import SocialButton from "@/components/auth/social-button";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { toast } from "sonner";
import { z } from "zod";

export default function LogIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onResponse: () => {
            setLoading(false);
          },
          onRequest: () => {
            setError(null);
            setLoading(true);
          },
          onSuccess: () => {
            toast.success("Logged in successfully");
            router.replace("/payment");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );
    } catch (error) {
      setError(error);
      alert(error + "error");
    }
  };

  return (
    <div className="inset-auto flex md:flex-row flex-col w-screen min-w-[400px] min-h-screen">
      <div className="top-2 left-2 z-20 before:static fixed bg-white/80 max-md:shadow-md py-1 rounded-md"></div>
      <div className="-z-50 sm:self-stretch md:order-2 bg-jesus-hero bg-white md:bg-clip-border md:bg-origin-border bg-cover md:bg-cover bg-no-repeat bg-center max-md:bg-top md:bg-top-4 max-md:w-full md:w-3/4 max-md:h-fit min-h-72 aspect-[773/499] md:overflow-x-clip max-xs:scale-x-125"></div>
      <div className="z-10 flex flex-col max-md:justify-between md:justify-between md:items-center gap-1 md:gap-3 md:pt-7 w-full md:w-1/2 md:h-full">
        <Image
          className="block z-10 mx-auto -mt-16 md:mt-16"
          src="/logo.png"
          alt="Logo"
          width={120}
          height={120}
        />
        {/* The LOGO has a negative top margin "-mt-16" to pull it halfway up over the image on small screens. */}
        <h1 className="md:mb-6 font-semibold text-4xl text-center">
          Welcome Back!
        </h1>

        <SocialButton
          provider="google"
          icon={<FaGoogle className="hover:fill-white" />}
          label="Sign in with Google"
          callbackURL="/payment"
        ></SocialButton>
        <div className="flex items-center gap-x-5 md:my-2 px-52 w-full">
          <hr className="flex-auto border-1 border-gray-300 w-2/6" />
          <p className="text-black text-base">or</p>
          <hr className="flex-auto border-1 border-gray-300 w-2/6" />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex-auto space-y-4 lg:px-8 w-full h-full"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      disabled={loading}
                      className="block bg-blue-50/75 focus:bg-blue-50/50 focus:shadow-md mt-1 focus:border-white border-transparent rounded-xl focus:ring-0 w-full"
                      placeholder="your.email@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={loading}
                      className="block bg-blue-50/75 focus:bg-blue-50/50 focus:shadow-md mt-1 focus:border-white border-transparent rounded-xl focus:ring-0 w-full"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="block px-8">
              <Button
                type="submit"
                disabled={loading}
                className="flow-root relative place-self-center bg-primary-red hover:bg-primary-red/90 my-6 py-2 rounded-2xl w-full"
              >
                <span className="font-medium text-white text-lg text-center tracking-wider">
                  LOGIN
                </span>
              </Button>
            </div>
            <div className="inline-flex justify-center items-center gap-2 -mt-8 w-full font-light text-xs text-center">
              {!!error && <p className="text-red-500">{error}</p>}
              <span className="gap-2 tracking-tight">Not registered yet?</span>
              <Link
                href="/SignUp"
                className="text-primary-red tracking-tighter"
              >
                Create an Account
              </Link>
            </div>
            <div className="inline-flex justify-center items-center gap-2 -mt-8 w-full font-light text-xs text-center">
              <span>
                <Link
                  href="/" //TODO: need to add a reset password page
                  className="text-primary-red tracking-tighter"
                >
                  Forgot Password?
                </Link>
              </span>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
