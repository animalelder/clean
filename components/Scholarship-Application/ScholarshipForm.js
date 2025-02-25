"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"; // Import toast if available, or add a simple alert instead
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
  "How Did You Find Us?",
  "Family and Relationship Status",
  "Spiritual Journey and Family Background",
  "Church Engagement",
  "Background and Interests",
  "Program Expectations and Needs",
  "Additional Information",
];

export default function ScholarshipForm() {
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // Collect all form data across steps
  const formData = watch();

  const onSubmit = async (data) => {
    // If not on the last step, just go to the next step
    if (step < formSections.length - 1) {
      setStep(step + 1);
      return;
    }

    // Otherwise, submit the full form data
    try {
      setIsSubmitting(true);
      setSubmissionError(null);

      // Send data to our API endpoint
      const response = await fetch("/api/submit-scholarship", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit application");
      }

      // Show success message and move to confirmation page
      if (toast) {
        toast({
          title: "Success!",
          description: "Your application has been submitted successfully.",
        });
      } else {
        alert("Your application has been submitted successfully!");
      }

      // Move to confirmation step
      setStep(step + 1);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmissionError(error.message);

      if (toast) {
        toast({
          title: "Error",
          description:
            error.message || "Failed to submit application. Please try again.",
          variant: "destructive",
        });
      } else {
        alert(
          "Error: " +
            (error.message ||
              "Failed to submit application. Please try again."),
        );
      }
    } finally {
      setIsSubmitting(false);
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
                  defaultValue={18}
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
                        {...register("gender")}
                      />
                      <Label htmlFor={`gender-${option.toLowerCase()}`}>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label>Ethinicity</Label>
                <RadioGroup defaultValue="African American/Black">
                  {[
                    "African American/Black",
                    "European American",
                    "Hispanic/Latino",
                    "East Asian",
                    "Middle Eastern",
                    "Indigenous American",
                    "Multiracial",
                    "Prefer not to say",
                    "Other",
                  ].map((option) => (
                    <div
                      className="flex items-center space-x-2"
                      key={option}
                    >
                      <RadioGroupItem
                        value={option.toLowerCase()}
                        id={`ethnicity-${option.toLowerCase()}`}
                        {...register("ethnicity")}
                      />
                      <Label htmlFor={`ethnicity-${option.toLowerCase()}`}>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label>Sexual Orientation</Label>
                <RadioGroup defaultValue="heterosexual">
                  {[
                    "heterosexual",
                    "homosexual",
                    "bisexual",
                    "lgbtq+",
                    "prefer not to say",
                    "other",
                  ].map((option) => (
                    <div
                      className="flex items-center space-x-2"
                      key={option}
                    >
                      <RadioGroupItem
                        value={option.toLowerCase()}
                        id={`sexOrientation-${option.toLowerCase()}`}
                        {...register("sexOrientation")}
                      />
                      <Label htmlFor={`sexOrientation-${option.toLowerCase()}`}>
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label>Military Service</Label>
                <RadioGroup defaultValue="No">
                  {["Yes - active duty", "Yes - reservist", "No"].map(
                    (option) => (
                      <div
                        className="flex items-center space-x-2"
                        key={option}
                      >
                        <RadioGroupItem
                          value={option.toLowerCase()}
                          id={`military-${option.toLowerCase()}`}
                          {...register("military")}
                        />
                        <Label htmlFor={`military-${option.toLowerCase()}`}>
                          {option}
                        </Label>
                      </div>
                    ),
                  )}
                </RadioGroup>
              </div>
            </div>
          </>
        );
      case 1:
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold">
              How did you hear about the CLEAN program?
            </h2>
            <div className="space-y-4">
              <Select {...register("discoveryMethod")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select below" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Social Media",
                    "Church",
                    "Friend/Family",
                    "Online Search",
                    "Other",
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
          </>
        );
      case 2:
        return (
          <>
            <h2 className="mb-4 text-2xl font-bold">
              Family and Relationship Status
            </h2>
            <div className="space-y-4">
              <div>
                <Label>What is your current relationship status?</Label>
                <Select {...register("relationshipStatus")}>
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
              <div>
                <Label htmlFor="dateMarried">
                  If married, what date were you married on?
                </Label>
                <Input
                  id="dateMarried"
                  type="date"
                  {...register("dateMarried", { required: true })}
                />
              </div>
              <div>
                <Label htmlFor="numOfMarriages">
                  How many times have you been married?
                </Label>
                <Input
                  id="numOfMarriages"
                  type="number"
                  defaultValue={0}
                  {...register("numOfMarriages", { required: true })}
                />
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
                <Select {...register("spiritualPractice")}>
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
                <Select {...register("churchAttendance")}>
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
                <Textarea
                  id="backgroundSummary"
                  {...register("backgroundSummary", { required: true })}
                  className="min-h-32"
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
                <Textarea
                  id="interestsSummary"
                  {...register("interestsSummary", { required: false })}
                  className="min-h-32"
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
                <Textarea
                  id="expectationsSummary"
                  {...register("expectationsSummary", { required: false })}
                  className="min-h-32"
                />
              </div>
              <div>
                <Label htmlFor="needsSummary">
                  Please give a brief explanation of what level of scholarship
                  need you have, and any additional or relevant information
                  about your situation?
                </Label>
                <Textarea
                  id="needsSummary"
                  {...register("needsSummary", { required: true })}
                  className="min-h-32"
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
                  className="min-h-32"
                />
              </div>
            </div>
          </>
        );
      default:
        return (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-bold">
              Thank you for your application!
            </h2>
            <p className="mb-4">
              We&apos;ve received your scholarship application and will review
              it shortly.
            </p>
            <p className="mb-4">
              A confirmation email has been sent to your email address.
            </p>
          </div>
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
        {submissionError && (
          <div className="mt-4 rounded bg-red-100 p-3 text-red-800">
            <p>{submissionError}</p>
          </div>
        )}
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
            <Button
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "Submitting..."
                : step === formSections.length - 1
                  ? "Submit"
                  : "Next"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
