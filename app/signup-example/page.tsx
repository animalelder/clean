import SignUp from "@/components/auth/sign-up";
import type { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-background">
      <SignUp />
    </div>
  );
};

export default Page;
