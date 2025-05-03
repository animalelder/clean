import { ExampleServerComponent } from "@/components/auth/example-rsc";
import type { NextPage } from "next";

const Page: NextPage = () => {
  return (
    <div className="flex justify-center items-center bg-background w-screen h-screen">
      <h1 className="font-bold text-2xl">Server Component Example</h1>
      <ExampleServerComponent />
    </div>
  );
};

export default Page;
