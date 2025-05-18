"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { toast } from "sonner";

import { signIn } from "@/lib/auth-client";

import type { ErrorContext } from "better-auth/react";
import { Button } from "../ui/button";

interface SocialButtonProps {
  provider: "google";
  icon: React.ReactNode;
  label: string;
  callbackURL?: string;
}

const SocialButton: React.FC<SocialButtonProps> = ({
  provider = "google",
  icon,
  label,
  callbackURL = "/payment",
}) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleSignIn = async () => {
    try {
      await signIn.social(
        { provider, callbackURL },
        {
          onResponse: () => setLoading(false),
          onRequest: () => {
            toast.info("Authenticating...");
            setLoading(true);
          },
          onSuccess: () => {
            toast.success("You are logged in successfully");
            router.push(callbackURL);
          },
          onError: (ctx: ErrorContext) => {
            toast.error(ctx.error.message);
            throw new Error(ctx.error.message);
          },
        },
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.name + ": " + error.message);
        console.error(error.stack);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={handleSignIn}
        aria-disabled={loading}
        className="flex justify-center justify-self-center items-center gap-7 columns-1 shadow-md mx-auto my-4 py-2 rounded-2xl outline outline-1 outline-primary-red w-3/4 max-w-[200px] text-primary-red hover:text-white disabled:animate-caret-blink"
      >
        {icon}
        {label}
      </Button>
    </>
  );
};

export default SocialButton;
