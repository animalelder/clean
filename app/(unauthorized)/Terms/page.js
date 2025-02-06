import React from "react";
import Head from "next/head";
import Image from "next/image";
import TermsSheet from "@/components/Terms/TermsSheet";

export default function Terms() {
  return (
    <>
      <Head>
        <title>
          Terms of Service for the CLEAN Program&apos;s Learning Management
          System
        </title>
        <meta
          name="description"
          content="Terms of Service for CLEAN LMS provided by Thirty Mighty Men Ministries"
        />
      </Head>
      <div className="container max-w-5xl p-6 mx-auto">
        <Image
          className="z-10 block mx-auto -mt-16 md:mt-16"
          src="/logo.png"
          alt="Logo"
          width={120}
          height={120}
        />
        <div className="flex flex-col items-center justify-between min-h-screen p-24">
          <TermsSheet />
        </div>
      </div>
    </>
  );
}
