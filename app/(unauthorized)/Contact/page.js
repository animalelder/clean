"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen pt-16 bg-off-white">
        <main className="container px-4 py-8 mx-auto">
          <div className="max-w-2xl p-8 mx-auto text-center bg-white rounded-lg shadow-md">
            <div className="mb-6">
              <svg
                className="w-16 h-16 mx-auto text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
              >
                <circle
                  className="opacity-25"
                  cx="24"
                  cy="24"
                  r="20"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  d="M14 24l8 8l16-16"
                />
              </svg>
            </div>

            <h2 className="mb-4 text-3xl font-bold text-title-black">
              Thank You for Reaching Out!
            </h2>

            <p className="mb-6 text-lg text-description-gray">
              Your message has been received. We'll get back to you as soon as
              possible.
            </p>

            <Button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-3 text-lg font-bold transition duration-300 rounded-lg bg-primary-red hover:bg-primaryred-800 text-off-white"
            >
              Send Another Message
            </Button>
          </div>

          <div className="mt-12 text-center">
            <h2 className="mb-4 text-2xl font-bold text-title-black">
              Other Ways to Reach Us
            </h2>
            <p className="mb-2 text-description-gray">
              Email: support@30mmm.org
            </p>
            <p className="mb-2 text-description-gray">Phone: +1 646-519-1186</p>
            <p className="text-description-gray">
              Address: PO Box #3, Bivalve, MD 21814
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-off-white">
      <main className="container px-4 py-8 mx-auto">
        <h1 className="mb-8 text-4xl font-bold text-center text-title-black">
          Contact Us
        </h1>

        <div className="max-w-2xl p-8 mx-auto bg-white rounded-lg shadow-md">
          <p className="mb-6 text-center text-description-gray">
            We&apos;d love to hear from you. Please fill out the form below and
            we&apos;ll get back to you as soon as possible.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-title-black"
              >
                Name
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-title-black"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block mb-1 text-sm font-medium text-title-black"
              >
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                required
                className="min-h-[150px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full px-6 py-3 text-lg font-bold transition duration-300 rounded-lg bg-primary-red hover:bg-primaryred-800 text-off-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        <div className="mt-12 text-center">
          <h2 className="mb-4 text-2xl font-bold text-title-black">
            Other Ways to Reach Us
          </h2>
          <p className="mb-2 text-description-gray">Email: support@30mmm.org</p>
          <p className="mb-2 text-description-gray">Phone: +1 646-519-1186</p>
          <p className="text-description-gray">
            Address: PO Box #3, Bivalve, MD 21814
          </p>
        </div>
      </main>
    </div>
  );
}
