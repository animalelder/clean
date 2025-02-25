"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const formSections = [
  "Personal Information",
  "Family and Relationship Status",
  "Spiritual Journey and Family Background",
  "Church Engagement",
  "Background and Interests",
  "Program Expectations and Needs",
  "Additional Information",
];

export default function ScholarshipForm() {
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (step < formSections.length - 1) {
      setStep(step + 1);
    } else {
      console.log(data);
      // Here you would typically send the data to your backend
      setStep(step + 1); // Move to confirmation page
    }
  };

  const renderFormSection = () => {
    switch (step) {
      case 0:
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  {...register("fullName", { required: true })}
                />
                {errors.fullName && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  {...register("phone", { required: true })}
                />
                {errors.phone && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div>
                <Label htmlFor="location">City and State of Residence</Label>
                <Input
                  id="location"
                  {...register("location", { required: true })}
                />
                {errors.location && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  {...register("age", { required: true, min: 18 })}
                />
                {errors.age && (
                  <span className="text-red-500">
                    You must be at least 18 years old
                  </span>
                )}
              </div>
              <div>
                <Label>Gender</Label>
                <RadioGroup defaultValue="male">
                  {[
                    "Male",
                    "Female",
                    "Non-Binary",
                    "Prefer not to say",
                    "Other",
                  ].map((option) => (
                    <div
                      className="flex items-center space-x-2"
                      key={option}
                    >
                      <RadioGroupItem
                        value={option.toLowerCase()}
                        id={`gender-${option.toLowerCase()}`}
                      />
                      <Label htmlFor={`gender-${option.toLowerCase()}`}>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold">
              Family and Relationship Status
            </h2>
            <div className="space-y-4">
              <div>
                <Label>What is your current relationship status?</Label>
                <Select onValueChange={(value) => console.log(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Single", "Married", "Divorced", "Widowed", "Other"].map(
                      (option) => (
                        <SelectItem
                          key={option}
                          value={option.toLowerCase()}
                        >
                          {option}
                        </SelectItem>
                      ),
                    )}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );
      case 2:
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold">
              Spiritual Journey and Background
            </h2>
            <div className="space-y-4">
              <div>
                <Label>
                  Do you identify with any particular school of thought as a
                  spritual practice or belief system?
                </Label>
                <Select onValueChange={(value) => console.log(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "Christianity - denominational",
                      "Christianity - non-denominational",
                      "Islam",
                      "Hinduism",
                      "Buddhism",
                      "Atheism",
                      "Agnostic",
                      "Spiritual",
                      "Unaffiliated",
                      "Other",
                      "None",
                    ].map((option) => (
                      <SelectItem
                        key={option}
                        value={option.toLowerCase()}
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        );
      case 3:
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold">Church Engagement</h2>
            <div className="space-y-4">
              <div>
                <Label>
                  Do you attend any particular religious service or church?
                </Label>
                <Select onValueChange={(value) => console.log(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "yes - all the time",
                      "yes - often",
                      "yes - infrequently",
                      "yes - rarely",
                      "online",
                      "not at this time but in the past",
                    ].map((option) => (
                      <SelectItem
                        key={option}
                        value={option.toLowerCase()}
                      >
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="churchOrService">
                  If yes, which religious service or church?
                </Label>
                <Input
                  id="churchOrService"
                  {...register("churchOrService", { required: false })}
                />
              </div>
            </div>
          </>
        );
      case 4:
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold">
              Background and Interests
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="backgroundSummary">
                  Please give a brief explanation of your background, why CLEAN
                  interests you, and what interests you have in the program?
                  Also, please include any information you could share about the
                  need for a scholarship to this program?
                </Label>
                <Input
                  id="backgroundSummary"
                  {...register("backgroundSummary", { required: true })}
                />
                {errors.backgroundSummary && (
                  <span className="text-red-500">
                    You must provide a brief background
                  </span>
                )}
              </div>
              <div>
                <Label htmlFor="interestsSummary">
                  Please give a brief explanation of interests, any hobbies, and
                  if there is anything you feel called to do or become involved
                  in?
                </Label>
                <Input
                  id="interestsSummary"
                  {...register("interestsSummary", { required: false })}
                />
                {errors.interestsSummary && (
                  <span className="text-red-500">
                    You must provide summary of your interests
                  </span>
                )}
              </div>
            </div>
          </>
        );
      case 5:
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold">
              Program Expectations and Needs
            </h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="expectationsSummary">
                  Please give a brief explanation of what expectations or needs
                  you might want to address through CLEAN (i.e. what you sort of
                  breakthroughs are you hoping for, what sort of guidance could
                  be helpful)?
                </Label>
                <Input
                  id="expectationsSummary"
                  {...register("expectationsSummary", { required: false })}
                />
              </div>
              <div>
                <Label htmlFor="needsSummary">
                  Please give a brief explanation of what level of scholarship
                  need you have, and any additional or relevant information
                  about your situation?
                </Label>
                <Input
                  id="needsSummary"
                  {...register("needsSummary", { required: true })}
                />
                {errors.needsSummary && (
                  <span className="text-red-500">
                    You must provide summary of your need for the scholarship
                  </span>
                )}
              </div>
            </div>
          </>
        );
      case 6:
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold">Additional Information</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="additionalInfo">
                  Is there anything else you&apos;d like us to know about you?
                </Label>
                <Textarea
                  id="additionalInfo"
                  {...register("additionalInfo")}
                />
              </div>
            </div>
          </>
        );
      default:
        return (
          <h2 className="mb-4 text-2xl font-bold">
            Thank you for your application!
          </h2>
        );
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <div className="mb-8">
        <div className="mb-8 flex justify-between">
          {formSections.map((section, index) => (
            <div
              key={index}
              className={`h-4 w-4 rounded-full ${index <= step ? "bg-primary-red" : "bg-gray-300"}`}
            />
          ))}
        </div>
        <div className="text-center text-sm font-medium">
          {step < formSections.length
            ? `Step ${step + 1} of ${formSections.length}`
            : "Application Complete"}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderFormSection()}
        <div className="mt-8 flex justify-between">
          {step > 0 && step < formSections.length && (
            <Button
              type="button"
              onClick={() => setStep(step - 1)}
            >
              Previous
            </Button>
          )}
          {step < formSections.length && (
            <Button type="submit">
              {step === formSections.length - 1 ? "Submit" : "Next"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
