"use client";

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
  provider,
  icon,
  label,
  callbackURL = "/Foundation/678d712c13f2973ca07079bf",
}) => {
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
            setLoading(true);
          },
          onSuccess: () => {
            setSuccess("You are logged in successfully");
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
        className="mx-auto my-4 flex w-3/4 max-w-[200px] columns-1 items-center justify-center gap-7 justify-self-center rounded-2xl py-2 text-primary-red shadow-md outline outline-1 outline-primary-red hover:text-white"
      >
        {icon}
        {label}
      </Button>
    </>
  );
};

export default SocialButton;
