import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Step6BackgroundInterests() {
  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">Background and Interests</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="backgroundSummary">
            Please give a brief explanation of your background, why CLEAN
            interests you, and what interests you have in the program? Also,
            please include any information you could share about the need for a
            scholarship to this program?
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
            Please give a brief explanation of interests, any hobbies, and if
            there is anything you feel called to do or become involved in?
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
}
