"use client";

import { useRouter } from "next/navigation";
import React from "react";

import { toast } from "sonner";

import { useAuthState } from "@/hooks/use-auth-state";
import { signIn } from "@/lib/auth-client";

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
  const { setError, setSuccess, loading, setLoading, resetState } =
    useAuthState();

  const handleSignIn = async () => {
    try {
      await signIn.social(
        { provider, callbackURL },
        {
          onResponse: () => setLoading(false),
          onRequest: () => {
            resetState();
            toast.info("Signing in...");
            setLoading(true);
          },
          onSuccess: () => {
            toast.success("You are logged in successfully");
            router.push(callbackURL);
          },
          onError: (ctx) => {
            setError(ctx.error.message);
            toast.error(ctx.error.message);
          },
        },
      );
    } catch (error) {
      toast.error(error?.message ?? "Something went wrong");
      setError("Something went wrong");
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={handleSignIn}
        disabled={loading}
        className="flex justify-center justify-self-center items-center gap-7 columns-1 shadow-md mx-auto my-4 py-2 rounded-2xl outline outline-1 outline-primary-red w-3/4 max-w-[200px] text-primary-red hover:text-white"
      >
        {icon}
        {label}
      </Button>
    </>
  );
};

export default SocialButton;
