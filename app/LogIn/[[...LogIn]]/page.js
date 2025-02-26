"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";

export default function Page() {
  return (
    <div className="inset-auto flex min-h-screen w-screen min-w-[400px] flex-col md:flex-row">
      <div className="fixed left-2 top-2 z-20 rounded-md bg-white/80 py-1 before:static max-md:shadow-md"></div>
      <div className="-z-50 aspect-[773/499] min-h-72 bg-white bg-jesus-hero bg-cover bg-center bg-no-repeat max-md:h-fit max-md:w-full max-md:bg-top max-xs:scale-x-125 sm:self-stretch md:order-2 md:w-3/4 md:overflow-x-clip md:bg-cover md:bg-clip-border md:bg-top-4 md:bg-origin-border"></div>
      <SignIn.Root>
        <div className="z-10 flex w-full flex-col gap-1 max-md:justify-between md:h-full md:w-1/2 md:items-center md:justify-between md:gap-3 md:pt-7">
          <Clerk.Loading>
            {(isGlobalLoading) => (
              <>
                <Image
                  className="z-10 mx-auto -mt-16 block md:mt-16"
                  src="/logo.png"
                  alt="Logo"
                  width={120}
                  height={120}
                />
                {/* The LOGO has a negative top margin "-mt-16" to pull it halfway up over the image on small screens. */}
                <SignIn.Step name="start">
                  <h1 className="text-center text-4xl font-semibold md:mb-6">
                    Welcome Back!
                  </h1>
                  <Clerk.Connection
                    name="google"
                    asChild
                  >
                    <Button
                      variant="outline"
                      className="mx-auto my-4 flex w-full columns-1 items-center justify-center gap-7 justify-self-center rounded-2xl py-2 shadow-md outline outline-1 outline-primary-red"
                      disabled={isGlobalLoading}
                    >
                      <Image
                        className="overflow-x-clip object-cover contain-layout"
                        alt="Google Logo"
                        src="/googlelogo.png"
                        width={20}
                        height={20}
                      />
                      <div className="text-lg font-semibold text-primary-red">
                        Login with Google
                      </div>
                    </Button>
                  </Clerk.Connection>

                  <Clerk.GlobalError className="block text-sm text-red-400" />
                  <Clerk.Field name="identifier">
                    <Clerk.Label>Email</Clerk.Label>
                    <Clerk.Input className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0" />
                    <Clerk.FieldError className="mt-2 block text-xs text-red-600" />
                  </Clerk.Field>
                  <SignIn.Action
                    submit
                    className="relative my-6 flow-root w-full place-self-center rounded-2xl bg-primary-red py-2 hover:bg-primary-red/90"
                  >
                    Sign In
                  </SignIn.Action>
                  <p className="text-center text-sm text-zinc-500">
                    No account?{" "}
                    <Clerk.Link
                      navigate="sign-up"
                      className="font-medium text-zinc-950 decoration-zinc-950/20 underline-offset-4 outline-none hover:text-zinc-700 hover:underline focus-visible:underline"
                    >
                      Create an account
                    </Clerk.Link>
                  </p>
                </SignIn.Step>
                <SignIn.Step name="verifications">
                  <header className="text-center">
                    <h1 className="mt-4 text-xl font-medium tracking-tight text-neutral-950">
                      Verify email code
                    </h1>
                  </header>
                  <Clerk.GlobalError className="block text-sm text-red-600" />
                  <SignIn.Strategy name="email_code">
                    <Card className="w-full sm:w-96">
                      <CardHeader>
                        <CardTitle>Check your email</CardTitle>
                        <CardDescription>
                          Enter the verification code sent to your email
                        </CardDescription>
                        <p className="text-sm text-muted-foreground">
                          Welcome back <SignIn.SafeIdentifier />
                        </p>
                      </CardHeader>
                      <CardContent className="grid gap-y-4">
                        <Clerk.Field name="code">
                          <Clerk.Label className="sr-only">
                            Email verification code
                          </Clerk.Label>
                          <div className="grid items-center justify-center gap-y-2">
                            <div className="flex justify-center text-center">
                              <Clerk.Input
                                type="otp"
                                autoSubmit
                                className="flex justify-center has-[:disabled]:opacity-50"
                                render={({ value, status }) => {
                                  return (
                                    <div
                                      data-status={status}
                                      className="relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=cursor]:ring-1 data-[status=selected]:ring-1 data-[status=cursor]:ring-ring data-[status=selected]:ring-ring"
                                    >
                                      {value}
                                    </div>
                                  );
                                }}
                              />
                            </div>
                            <Clerk.FieldError className="block text-center text-sm text-destructive" />
                            <SignIn.Action
                              asChild
                              resend
                              className="text-muted-foreground"
                              fallback={({ resendableAfter }) => (
                                <Button
                                  variant="link"
                                  size="sm"
                                  disabled
                                >
                                  Didn&apos;t receive a code? Resend (
                                  <span className="tabular-nums">
                                    {resendableAfter}
                                  </span>
                                  )
                                </Button>
                              )}
                            >
                              <Button
                                variant="link"
                                size="sm"
                              >
                                Didn&apos;t receive a code? Resend
                              </Button>
                            </SignIn.Action>
                          </div>
                        </Clerk.Field>
                      </CardContent>
                      <CardFooter>
                        <div className="grid w-full gap-y-4">
                          <SignIn.Action
                            submit
                            asChild
                          >
                            <Button
                              className="relative my-6 flow-root w-full place-self-center rounded-2xl bg-primary-red py-2 hover:bg-primary-red/90"
                              disabled={isGlobalLoading}
                            >
                              <Clerk.Loading>
                                {(isLoading) => {
                                  return isLoading ? (
                                    <Icons.spinner className="size-4 animate-spin" />
                                  ) : (
                                    "Continue"
                                  );
                                }}
                              </Clerk.Loading>
                            </Button>
                          </SignIn.Action>
                        </div>
                      </CardFooter>
                    </Card>
                  </SignIn.Strategy>
                </SignIn.Step>
              </>
            )}
          </Clerk.Loading>
        </div>
      </SignIn.Root>
    </div>
  );
}
