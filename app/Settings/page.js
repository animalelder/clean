"use client";

import { useState } from "react";
import Link from "next/link";

export default function Settings() {
  const [firstTabActive, setFirstTabActive] = useState(true);

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center justify-start gap-3">
        <h1 className="text-center text-4xl font-semibold">Account Settings</h1>
        <div className="grid size-20 items-center justify-center rounded-full bg-rose-600">
          <span className="text-4xl font-extrabold tracking-wider text-white">
            AD
          </span>
        </div>
        <Link
          href="/settings/account/avatar"
          className="font-semibold tracking-tight text-primary-red hover:scale-95"
        >
          Upload Picture
        </Link>
        <div className="flex min-h-[200px] w-full max-w-screen-lg flex-col items-center">
          <div className="items-stetch my-2 inline-flex min-h-max flex-row justify-between gap-x-3 overflow-y-hidden rounded-3xl bg-gray-bg p-0.5 text-center">
            <button
              onClick={() => setFirstTabActive(true)}
              className={`h-full w-full text-nowrap rounded-3xl px-2 py-2 text-xs font-light hover:bg-almost-black hover:font-medium hover:text-white active:bg-almost-black active:font-medium active:text-white ${firstTabActive ? "bg-almost-black font-medium text-white" : ""}`}
            >
              Personal Information
            </button>
            <button
              onClick={() => setFirstTabActive(false)}
              className={`h-full w-full text-nowrap rounded-3xl px-2 py-2 text-xs font-light hover:bg-almost-black hover:font-medium hover:text-white active:bg-almost-black active:font-medium active:text-white ${firstTabActive ? "" : "bg-almost-black font-medium text-white"}`}
            >
              Address
            </button>
          </div>
          <form className="text-md my-3 grid h-min w-full flex-auto grid-cols-1 content-baseline items-center gap-y-2 font-normal md:grid-cols-2">
            {!!firstTabActive && (
              <>
                <label
                  htmlFor="first-name"
                  className="block px-8"
                >
                  <input
                    type="text"
                    name="first-name"
                    className="mt-1 w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="First Name"
                  />
                </label>
                <label
                  htmlFor="last-name"
                  className="block px-8"
                >
                  <input
                    type="text"
                    name="last-name"
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="Last Name"
                  />
                </label>
                <label
                  htmlFor="birthdate"
                  className="block px-8"
                >
                  <input
                    type="date"
                    name="birthdate"
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="12-25-1979"
                  />
                </label>
                <label
                  htmlFor="marital-status"
                  className="block px-8"
                >
                  <input
                    type="text"
                    name="marital-status"
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="Marital Status"
                  />
                </label>
                <label
                  htmlFor="children-count"
                  className="block px-8"
                >
                  <input
                    type="number"
                    name="children-count"
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="Number of Children"
                  />
                </label>
                <label
                  htmlFor="church-affiliation"
                  className="block px-8"
                >
                  <input
                    type="text"
                    name="church-affiliation"
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="Church Affiliation"
                  />
                </label>
              </>
            )}
            {/* Second Tab */}
            {!firstTabActive && (
              <>
                <label
                  htmlFor="email"
                  className="block px-8"
                >
                  <input
                    type="email"
                    name="email"
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="Email"
                  />
                </label>
                <label
                  htmlFor="telephone"
                  className="block px-8"
                >
                  <input
                    type="text"
                    name="telephone"
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="Phone Number"
                  />
                </label>
                <label
                  htmlFor="address"
                  className="block px-8"
                >
                  <input
                    type="text"
                    name="address"
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="Street Address"
                  />
                </label>
                <label
                  htmlFor="city"
                  className="block px-8"
                >
                  <input
                    type="text"
                    name="city"
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="City"
                  />
                </label>
                <label
                  htmlFor="state"
                  className="block px-8"
                >
                  <input
                    type="text"
                    name="state"
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="State"
                  />
                </label>
                <label
                  htmlFor="zipcode"
                  className="block px-8"
                >
                  <input
                    type="text"
                    name="zipcode"
                    className="mt-1 block w-full rounded-2xl border-transparent bg-formfield focus:border-white focus:bg-teal-50 focus:ring-0"
                    placeholder="Zip Code"
                  />
                </label>
              </>
            )}
          </form>
          <div className="items-stetch my-2 inline-flex min-h-max w-full flex-row gap-x-3 rounded-3xl px-8 max-sm:order-2 max-sm:flex-col max-sm:gap-1.5">
            <button className="peer-hover:saturate[0.1] peer w-full rounded-2xl border-2 border-primary-red py-2 text-primary-red transition-all hover:scale-[.98] hover:bg-primary-red hover:text-white">
              Cancel
            </button>
            <button className="peer w-full rounded-2xl bg-primary-red py-2 text-white transition-all hover:scale-[.98] hover:border-2 hover:border-primary-red hover:bg-white hover:text-primary-red peer-hover:saturate-[0.1]">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
