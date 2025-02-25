import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// Step 2: How Did You Find Us?
const Step2Discovery = ({ register, watch, setValue, errors }) => {
  // Watch the discoveryMethod field to conditionally render the textarea
  const discoveryMethod = watch("discoveryMethod");

  // Handle select change
  const handleDiscoveryMethodChange = (value) => {
    setValue("discoveryMethod", value);

    // Clear otherDiscoveryMethod if user switches away from "other"
    if (value !== "other") {
      setValue("otherDiscoveryMethod", "");
    }
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">
        How did you hear about the CLEAN program?
      </h2>
      <div className="space-y-4">
        <Select
          value={discoveryMethod}
          onValueChange={handleDiscoveryMethodChange}
        >
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

        {/* Conditional textarea that appears when "other" is selected */}
        {discoveryMethod === "other" && (
          <div className="mt-4">
            <Label htmlFor="otherDiscoveryMethod">
              Please specify how you heard about us:
            </Label>
            <Textarea
              id="otherDiscoveryMethod"
              {...register("otherDiscoveryMethod", {
                required: discoveryMethod === "other",
              })}
              placeholder="Please tell us how you heard about the CLEAN program..."
            />
            {errors.otherDiscoveryMethod && (
              <span className="text-red-500">
                Please provide this information
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Step2Discovery;
