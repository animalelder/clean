import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Step7ProgramExpectations() {
  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">
        Program Expectations and Needs
      </h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="expectationsSummary">
            Please give a brief explanation of what expectations or needs you
            might want to address through CLEAN (i.e. what you sort of
            breakthroughs are you hoping for, what sort of guidance could be
            helpful)?
          </Label>
          <Textarea
            id="expectationsSummary"
            {...register("expectationsSummary", { required: false })}
            className="min-h-32"
          />
        </div>
        <div>
          <Label htmlFor="needsSummary">
            Please give a brief explanation of what level of scholarship need
            you have, and any additional or relevant information about your
            situation?
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
}
