import Link from "next/link";
import { CyclingLink } from "@/components/common/CyclingLink";

export default function Hero() {
  const calendarUrls = ["https://calendar.app.google/mhsKtSg2NA3Bj8qC7"];
  return (
    <div
      className="relative mt-20 min-h-[600px] bg-cover bg-center"
      style={{
        backgroundImage: `url(/jesus_hero.svg)`,
      }}
    >
      <div className="absolute inset-0" />
      <div className="relative top-4 mx-auto max-w-7xl px-4 py-20 max-md:flex max-md:items-center max-md:justify-center">
        <div className="max-w-xl space-y-8 rounded-md bg-white/95 p-8 shadow-2xl backdrop-blur-sm">
          <div className="space-y-4">
            <h1 className="mb-4 text-3xl font-bold text-primaryred-700">
              Welcome to CLEAN — Here&apos;s What to Do Next
            </h1>
            <p className="mb-6 text-lg text-gray-700">
              You&apos;ve taken the first step. Now, let&apos;s get you started.
            </p>
          </div>

          <h2 className="mb-2 text-xl font-semibold text-primaryred-600">
            What Is CLEAN?
          </h2>
          <p className="mb-6 text-gray-600">
            CLEAN exists to help men find freedom, purpose, and brotherhood. We
            believe that every man has the potential to live a life of integrity
            and impact, but too often, struggles with sexual sin and lack of
            purpose hold men back from becoming who God created them to be.
          </p>
          <p className="mb-6 text-gray-600">CLEAN is here to change that.</p>

          {/* TODO: re-do step 1 as a link to fill out scholarship information / user profile in future */}
          {/* <h2 className="mb-2 text-xl font-semibold text-primaryred-600">
            Step 1: Sign Up
          </h2>
          <p className="mb-4 text-gray-600">
            Fill out a quick form so we can get to know you.
          </p>
          <Link
            href="/LogIn"
            target="_blank"
            className="block w-full py-2 mb-6 text-center text-white transition duration-300 rounded-md bg-primaryred-700 hover:bg-primaryred-800"
          >
            Complete Your Signup
          </Link> */}

          <h2 className="mb-2 text-xl font-semibold text-primaryred-600">
            Schedule Your 30-Minute Kickoff Call
          </h2>
          <p className="mb-4 text-gray-600">
            After signing up, pick a convenient time to connect with a CLEAN
            leader. This is your opportunity to ask questions and get started
            strong.
          </p>
          <CyclingLink
            urls={calendarUrls}
            className="mb-6 block w-full rounded-md bg-primaryred-700 py-2 text-center text-white transition duration-300 hover:bg-primaryred-800"
          >
            Schedule My Call
          </CyclingLink>

          <h2 className="mb-2 text-xl font-semibold text-primaryred-600">
            Decide If You&apos;re Ready
          </h2>
          <p className="mb-6 text-gray-600">
            Following your call, you&apos;ll receive the next steps to begin
            your CLEAN journey. No pressure—just a clear path forward if you
            choose to continue.
          </p>

          <h2 className="mb-2 text-xl font-semibold text-primaryred-600">
            Learn More
          </h2>

          <p className="mb-6 text-gray-600">
            For more information about the CLEAN program,{" "}
            <Link
              href={"/"}
              className="text-primary-red hover:underline"
            >
              visit our main website.
            </Link>
          </p>

          <p className="mb-4 text-lg font-semibold text-primaryred-700">
            Take these steps today — <span className="italic">real</span> change
            starts now.
          </p>
        </div>
      </div>
    </div>
  );
}
