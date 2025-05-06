"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* 
  This is a version of the registration page that tracks state and "submits" the form data to the console. It also has a tabbed interface for personal information and address information. 
  The form data is stored in the formData state object and every form field is updated with one dynamic handleChange function. formData holds the initial state of the form fields.

  The onSubmit function logs the form data to the console and alerts the user with the same data.

  Until we confirm the shape of our data and their types, the form fields are very generic.

  The form fields are conditionally rendered based on the firstTabActive state variable. The first tab fields are rendered when firstTabActive is true and the second tab fields are rendered when firstTabActive is false.

 */

export default function Profile() {
  const [firstTabActive, setFirstTabActive] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthdate: "",
    maritalStatus: "",
    childrenCount: "",
    churchAffiliation: "",
    email: "",
    telephone: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });

  // Every field uses this function to update the form data.
  const handleChange = (e) => {
    const { name, value } = e.target;
    // The name and value of the targeted field is deconstructed from the event object.
    // We plug in the previous state of the form data, then overwrite only the targeted field and value.

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(`Submitted: ${JSON.stringify(formData)}`);
    alert(`Submitted: ${JSON.stringify(formData)}`);
  };

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

        <h1 className="text-center text-4xl font-semibold md:mb-6">
          Create Your Profile
        </h1>

        {/* Tab Selector */}
        <div className="my-mx-52 md: my items-stetch mx-10 inline-flex min-h-max flex-row justify-between gap-x-3 rounded-3xl bg-gray-bg text-center md:overflow-y-hidden">
          <button
            onClick={() => setFirstTabActive(true)}
            className={`h-full w-full text-nowrap rounded-3xl py-2 pe-2 ps-4 text-base font-light hover:bg-almost-black hover:font-medium hover:text-white active:bg-almost-black active:font-medium active:text-white ${
              firstTabActive ? "bg-almost-black font-medium text-white" : ""
            }`}
          >
            Personal Information
          </button>
          <button
            onClick={() => setFirstTabActive(false)}
            className={`h-full w-full text-nowrap rounded-3xl py-2 pe-4 ps-3 text-base font-light hover:bg-almost-black hover:font-medium hover:text-white active:bg-almost-black active:font-medium active:text-white ${
              firstTabActive ? "" : "bg-almost-black font-medium text-white"
            }`}
          >
            Address
          </button>
        </div>

        {/* Form */}
        <form className="h-full w-full flex-auto space-y-4 px-4 pt-4">
          {firstTabActive ? (
            <>
              <label
                htmlFor="firstName"
                className="mx-8 block"
              >
                <input
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={formData.firstName}
                  className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                  placeholder="First Name"
                />
              </label>
              <label
                htmlFor="lastName"
                className="mx-8 block"
              >
                <input
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  value={formData.lastName}
                  className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                  placeholder="Last Name"
                />
              </label>
              <label
                htmlFor="birthdate"
                className="mx-8 block"
              >
                <input
                  type="date"
                  name="birthdate"
                  onChange={handleChange}
                  value={formData.birthdate}
                  className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                  placeholder="Birthdate"
                />
              </label>
              <label
                htmlFor="maritalStatus"
                className="mx-8 block"
              >
                <input
                  type="text"
                  name="maritalStatus"
                  onChange={handleChange}
                  value={formData.maritalStatus}
                  className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                  placeholder="Marital Status"
                />
              </label>
              <div className="block px-8">
                <button
                  onClick={() => setFirstTabActive(false)}
                  className="relative my-6 flow-root w-full place-self-center rounded-2xl bg-primary-red py-2 hover:bg-primary-red/90"
                >
                  <span className="text-center text-lg font-medium tracking-wider text-white">
                    NEXT
                  </span>
                </button>
              </div>
            </>
          ) : (
            <>
              <label
                htmlFor="email"
                className="mx-8 block"
              >
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                  className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                  placeholder="Email"
                />
              </label>
              <label
                htmlFor="telephone"
                className="mx-8 block"
              >
                <input
                  type="tel"
                  name="telephone"
                  onChange={handleChange}
                  value={formData.telephone}
                  className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                  placeholder="Phone Number"
                />
              </label>
              <label
                htmlFor="address"
                className="mx-8 block"
              >
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  value={formData.address}
                  className="mt-1 block w-full rounded-xl border-transparent bg-blue-50/75 focus:border-white focus:bg-blue-50/50 focus:shadow-md focus:ring-0"
                  placeholder="Address"
                />
              </label>
              <div className="block px-8">
                <button
                  type="submit"
                  onClick={onSubmit}
                  className="relative my-6 flow-root w-full place-self-center rounded-2xl bg-primary-red py-2 hover:bg-primary-red/90"
                >
                  <span className="text-center text-lg font-medium tracking-wider text-white">
                    Create Profile and Move to Payment
                  </span>
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
