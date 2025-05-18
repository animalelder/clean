"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SignUp from "@/components/auth/sign-up";
import { authClient, signIn } from "@/lib/auth-client";

export default function SignIn() {
  const router = useRouter();
  const CALLBACK_URL = "/profile";

  useEffect(() => {
    authClient.oneTap({
      fetchOptions: {
        onError: ({ error }) => {
          toast.error(error.message || "An error occurred");
        },
        onSuccess: () => {
          toast.success("Successfully signed in");
          router.push(CALLBACK_URL);
        },
      },
    });
    // Some Notes on useEffect and the Dependency Array:
    //
    // ESLint think the router goes in the dependency array, but it is not
    // necessary because the effect is not dependent on the state of the router.
    // Weirdly, ESLint doesn't want toast to be added to the dependency array.
    //
    // If router is a dependency, it creates a weird non-fatal dev error
    // that does not seem to happen when the dependency array is empty.
    // The error is related to FedCM, which is the new API for federated login
    // used in OneTap. I have not tested the page on a browser with Intelligent
    // Tracking Prevention (ITP) enabled, but the Sign In With Google button
    // is there as a fallback. The UX is nicer with OneTap.
    //
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="inset-auto flex min-h-screen w-screen min-w-[400px] flex-col md:flex-row">
      <div className="fixed left-2 top-2 z-20 rounded-md bg-white/80 py-1 before:static max-md:shadow-md" />

      {/* Image Container - Matched to reference styling */}
      <div className="-z-50 aspect-[773/499] min-h-72 bg-white bg-jesus-hero bg-cover bg-center bg-no-repeat max-md:h-fit max-md:w-full max-md:bg-top max-xs:scale-x-125 sm:self-stretch md:order-2 md:w-3/4 md:overflow-x-clip md:bg-cover md:bg-clip-border md:bg-top-4 md:bg-origin-border" />

      {/* Form Container - Updated to match reference */}
      <div className="z-10 flex w-full flex-col gap-1 max-md:justify-between md:h-full md:w-1/2 md:items-center md:justify-between md:gap-3 md:pt-7">
        <Image
          className="z-10 mx-auto -mt-16 block md:mt-16"
          src="/logo.png"
          alt="Logo"
          width={120}
          height={120}
        />

        <h1 className="text-center text-4xl font-semibold md:mb-6">Sign Up</h1>

        {/* Google Sign Up Button */}
        <button
          className="mx-auto my-4 flex w-5/6 columns-1 items-center justify-center gap-7 justify-self-center rounded-2xl py-2 shadow-md outline outline-1 outline-primary-red"
          onClick={async () => {
            await signIn.social(
              {
                provider: "google",
                callbackURL: CALLBACK_URL,
              },
              {
                onRequest: (ctx) => {
                  console.dir(ctx);
                  setLoading(true);
                },
                onResponse: (ctx) => {
                  console.dir(ctx);
                  setLoading(false);
                },
              },
            );
          }}
        >
          <Image
            className="overflow-x-clip object-cover contain-layout"
            src="/googlelogo.png"
            width={20}
            height={20}
            alt="Google Logo"
          />
          <div className="text-lg font-semibold text-primary-red">
            Sign Up with Google
          </div>
        </button>

        {/* Divider */}
        <div className="flex w-full items-center gap-x-5 px-52 md:my-2">
          <hr className="border-1 w-2/6 flex-auto border-gray-300" />
          <p className="text-base text-black">or</p>
          <hr className="border-1 w-2/6 flex-auto border-gray-300" />
        </div>

        {/* Form */}
        <SignUp />

        {/* Login Link */}
        <div className="mb-5 inline-flex w-full items-center justify-center gap-2 text-center text-xs font-light">
          <span className="gap-2 tracking-tight">Already have an account?</span>
          <Link
            href="/Login"
            className="tracking-tighter text-primary-red"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
