"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner"; // Import toast if available, or add a simple alert instead
import { Button } from "@/components/ui/button";
import Confirmation from "./FormSteps/Confirmation";
// Import Step Components
import Step1PersonalInfo from "./FormSteps/Step1PersonalInfo";
import Step2Discovery from "./FormSteps/Step2Discovery";
import Step3FamilyStatus from "./FormSteps/Step3FamilyStatus";
import Step4SpiritualJourney from "./FormSteps/Step4SpiritualJourney";
import Step5ChurchEngagement from "./FormSteps/Step5ChurchEngagement";
import Step6BackgroundInterests from "./FormSteps/Step6BackgroundInterests";
import Step7ProgramExpectations from "./FormSteps/Step7ProgramExpectations";
import Step8AdditionalInfo from "./FormSteps/Step8AdditionalInfo";

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
    setValue,
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

  // Render the appropriate form section based on current step
  const renderFormSection = () => {
    // Common props to pass to all step components
    const stepProps = {
      register,
      watch,
      setValue,
      errors,
      formData,
    };

    switch (step) {
      case 0:
        return <Step1PersonalInfo {...stepProps} />;
      case 1:
        return <Step2Discovery {...stepProps} />;
      case 2:
        return <Step3FamilyStatus {...stepProps} />;
      case 3:
        return <Step4SpiritualJourney {...stepProps} />;
      case 4:
        return <Step5ChurchEngagement {...stepProps} />;
      case 5:
        return <Step6BackgroundInterests {...stepProps} />;
      case 6:
        return <Step7ProgramExpectations {...stepProps} />;
      case 7:
        return <Step8AdditionalInfo {...stepProps} />;
      default:
        return <Confirmation email={formData.email} />;
    }
  };

  return (
    <div className="max-w-2xl p-6 mx-auto">
      <div className="mb-8">
        <div className="flex justify-between mb-8">
          {formSections.map((section, index) => (
            <div
              key={index}
              className={`h-4 w-4 rounded-full ${index <= step ? "bg-primary-red" : "bg-gray-300"}`}
            />
          ))}
        </div>
        <div className="text-sm font-medium text-center">
          {step < formSections.length
            ? `Step ${step + 1} of ${formSections.length}`
            : "Application Complete"}
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {renderFormSection()}
        {submissionError && (
          <div className="p-3 mt-4 text-red-800 bg-red-100 rounded">
            <p>{submissionError}</p>
          </div>
        )}
        <div className="flex justify-between mt-8">
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
