import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export default function ScholarshipApplicationForm({
  register,
  watch,
  setValue,
  errors,
}) {
  // Watch values for conditional rendering
  const submissionTypeReason = watch("submissionTypeReason") || "text";
  const submissionTypeGains = watch("submissionTypeGains") || "text";

  // Handle challenges selection
  const handleChallengeChange = (challenge, checked) => {
    // Get current challenges array from form state
    const currentChallenges = watch("challenges") || [];

    // Update the form value (adding or removing the challenge)
    if (checked) {
      setValue("challenges", [...currentChallenges, challenge]);
    } else {
      setValue(
        "challenges",
        currentChallenges.filter((c) => c !== challenge),
      );

      // Clear other specification if "other" is unchecked
      if (challenge === "other") {
        setValue("otherChallenge", "");
      }
    }
  };

  // Helper to check if a challenge is selected
  const isChallengeSelected = (challenge) => {
    const challenges = watch("challenges") || [];
    return challenges.includes(challenge);
  };

  // Handle support areas selection
  const handleSupportAreaChange = (area, checked) => {
    // Get current support areas array from form state
    const currentAreas = watch("supportAreas") || [];

    // Update the form value (adding or removing the area)
    if (checked) {
      setValue("supportAreas", [...currentAreas, area]);
    } else {
      setValue(
        "supportAreas",
        currentAreas.filter((a) => a !== area),
      );

      // Clear other specification if "other" is unchecked
      if (area === "other") {
        setValue("otherSupportArea", "");
      }
    }
  };

  // Helper to check if a support area is selected
  const isSupportAreaSelected = (area) => {
    const areas = watch("supportAreas") || [];
    return areas.includes(area);
  };

  // Handle submission type change for scholarship reason
  const handleSubmissionTypeReasonChange = (type) => {
    setValue("submissionTypeReason", type);

    // Clear the other field when switching types
    if (type === "text") {
      setValue("scholarshipReasonVideo", "");
    } else {
      setValue("scholarshipReason", "");
    }
  };

  // Handle submission type change for program gains
  const handleSubmissionTypeGainsChange = (type) => {
    setValue("submissionTypeGains", type);

    // Clear the other field when switching types
    if (type === "text") {
      setValue("programGainsVideo", "");
    } else {
      setValue("programGains", "");
    }
  };

  // Calculate remaining words for textarea fields
  const getWordCount = (text) => {
    if (!text) return 0;
    return text.trim().split(/\s+/).length;
  };

  const getRemainingWords = (text, limit) => {
    const wordCount = getWordCount(text);
    return limit - wordCount;
  };

  // Word limits
  const MIN_WORDS = 200;
  const MAX_WORDS = 300;

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">CLEAN Scholarship Application</h2>

      <div className="space-y-8">
        {/* Why are you applying */}
        <div className="space-y-4">
          <Label className="text-lg font-medium">
            Why are you applying for the CLEAN scholarship?
          </Label>
          <p className="text-sm text-gray-500">
            Please provide a brief explanation (200–300 words) or upload a 1–2
            minute video.
          </p>

          {/* Toggle between text and video */}
          <div className="mb-2 flex space-x-4">
            <div className="flex items-center">
              <RadioGroup
                defaultValue="text"
                value={submissionTypeReason}
                onValueChange={handleSubmissionTypeReasonChange}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="text"
                    id="reasonText"
                  />
                  <Label htmlFor="reasonText">Text Response</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="video"
                    id="reasonVideo"
                  />
                  <Label htmlFor="reasonVideo">Video Upload</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Text response */}
          {submissionTypeReason === "text" && (
            <div className="space-y-1">
              <Textarea
                id="scholarshipReason"
                {...register("scholarshipReason", {
                  required: submissionTypeReason === "text",
                  validate: {
                    minWords: (text) =>
                      !text ||
                      getWordCount(text) >= MIN_WORDS ||
                      `Please write at least ${MIN_WORDS} words`,
                    maxWords: (text) =>
                      !text ||
                      getWordCount(text) <= MAX_WORDS ||
                      `Please write no more than ${MAX_WORDS} words`,
                  },
                })}
                className="min-h-40"
                placeholder="Please explain why you are applying for the CLEAN scholarship..."
              />
              <div className="flex justify-between text-sm">
                <span
                  className={`${
                    getRemainingWords(watch("scholarshipReason"), MAX_WORDS) < 0
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {getWordCount(watch("scholarshipReason"))} / {MAX_WORDS} words
                </span>
                <span className="text-gray-500">
                  {getRemainingWords(watch("scholarshipReason"), MIN_WORDS) > 0
                    ? `${getRemainingWords(watch("scholarshipReason"), MIN_WORDS)} more words needed`
                    : "Minimum word count reached"}
                </span>
              </div>
              {errors.scholarshipReason && (
                <span className="text-sm text-red-500">
                  {errors.scholarshipReason.message ||
                    "Please explain why you are applying"}
                </span>
              )}
            </div>
          )}

          {/* Video upload */}
          {submissionTypeReason === "video" && (
            <div className="space-y-2">
              <div className="flex w-full items-center justify-center">
                <label
                  htmlFor="scholarshipReasonVideo"
                  className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      MP4, MOV, or WebM (MAX. 2 minutes)
                    </p>
                  </div>
                  <Input
                    id="scholarshipReasonVideo"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    {...register("scholarshipReasonVideo", {
                      required: submissionTypeReason === "video",
                    })}
                  />
                </label>
              </div>
              {watch("scholarshipReasonVideo") &&
                watch("scholarshipReasonVideo")[0] && (
                  <p className="text-sm text-green-500">
                    File selected: {watch("scholarshipReasonVideo")[0]?.name}
                  </p>
                )}
              {errors.scholarshipReasonVideo && (
                <span className="text-sm text-red-500">
                  Please upload your video response
                </span>
              )}
            </div>
          )}
        </div>

        {/* Current challenges */}
        <div className="space-y-4">
          <Label className="text-lg font-medium">
            What challenges are you currently facing in your life?
          </Label>
          <p className="mb-2 text-sm text-gray-500">Select all that apply:</p>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              {
                id: "sexual-integrity",
                label: "Struggles with sexual integrity",
              },
              { id: "relationship", label: "Relationship issues" },
              { id: "parenting", label: "Parenting challenges" },
              { id: "spiritual", label: "Spiritual growth" },
              { id: "other", label: "Other" },
            ].map((challenge) => (
              <Card
                key={challenge.id}
                className="border p-3"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`challenge-${challenge.id}`}
                    checked={isChallengeSelected(challenge.id)}
                    onChange={(e) =>
                      handleChallengeChange(challenge.id, e.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label
                    htmlFor={`challenge-${challenge.id}`}
                    className="pt-0.5 leading-none"
                  >
                    {challenge.label}
                  </Label>
                </div>
              </Card>
            ))}
          </div>

          {errors.challenges && (
            <span className="text-sm text-red-500">
              Please select at least one challenge
            </span>
          )}

          {/* Other challenge specification */}
          {isChallengeSelected("other") && (
            <div className="mt-2">
              <Label htmlFor="otherChallenge">
                Please specify other challenges:
              </Label>
              <Input
                id="otherChallenge"
                {...register("otherChallenge", {
                  required: isChallengeSelected("other"),
                })}
              />
              {errors.otherChallenge && (
                <span className="text-sm text-red-500">
                  Please specify your other challenges
                </span>
              )}
            </div>
          )}
        </div>

        {/* What do you hope to gain */}
        <div className="space-y-4">
          <Label className="text-lg font-medium">
            What do you hope to gain from participating in the CLEAN program?
          </Label>
          <p className="text-sm text-gray-500">
            Please provide a brief explanation (200–300 words) or upload a 1–2
            minute video.
          </p>

          {/* Toggle between text and video */}
          <div className="mb-2 flex space-x-4">
            <div className="flex items-center">
              <RadioGroup
                defaultValue="text"
                value={submissionTypeGains}
                onValueChange={handleSubmissionTypeGainsChange}
                className="flex space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="text"
                    id="gainsText"
                  />
                  <Label htmlFor="gainsText">Text Response</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="video"
                    id="gainsVideo"
                  />
                  <Label htmlFor="gainsVideo">Video Upload</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Text response */}
          {submissionTypeGains === "text" && (
            <div className="space-y-1">
              <Textarea
                id="programGains"
                {...register("programGains", {
                  required: submissionTypeGains === "text",
                  validate: {
                    minWords: (text) =>
                      !text ||
                      getWordCount(text) >= MIN_WORDS ||
                      `Please write at least ${MIN_WORDS} words`,
                    maxWords: (text) =>
                      !text ||
                      getWordCount(text) <= MAX_WORDS ||
                      `Please write no more than ${MAX_WORDS} words`,
                  },
                })}
                className="min-h-40"
                placeholder="Please explain what you hope to gain from the CLEAN program..."
              />
              <div className="flex justify-between text-sm">
                <span
                  className={`${
                    getRemainingWords(watch("programGains"), MAX_WORDS) < 0
                      ? "text-red-500"
                      : "text-gray-500"
                  }`}
                >
                  {getWordCount(watch("programGains"))} / {MAX_WORDS} words
                </span>
                <span className="text-gray-500">
                  {getRemainingWords(watch("programGains"), MIN_WORDS) > 0
                    ? `${getRemainingWords(watch("programGains"), MIN_WORDS)} more words needed`
                    : "Minimum word count reached"}
                </span>
              </div>
              {errors.programGains && (
                <span className="text-sm text-red-500">
                  {errors.programGains.message ||
                    "Please explain what you hope to gain"}
                </span>
              )}
            </div>
          )}

          {/* Video upload */}
          {submissionTypeGains === "video" && (
            <div className="space-y-2">
              <div className="flex w-full items-center justify-center">
                <label
                  htmlFor="programGainsVideo"
                  className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pb-6 pt-5">
                    <svg
                      className="mb-4 h-8 w-8 text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      MP4, MOV, or WebM (MAX. 2 minutes)
                    </p>
                  </div>
                  <Input
                    id="programGainsVideo"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    {...register("programGainsVideo", {
                      required: submissionTypeGains === "video",
                    })}
                  />
                </label>
              </div>
              {watch("programGainsVideo") && watch("programGainsVideo")[0] && (
                <p className="text-sm text-green-500">
                  File selected: {watch("programGainsVideo")[0]?.name}
                </p>
              )}
              {errors.programGainsVideo && (
                <span className="text-sm text-red-500">
                  Please upload your video response
                </span>
              )}
            </div>
          )}
        </div>

        {/* Areas for additional support */}
        <div className="space-y-4">
          <Label className="text-lg font-medium">
            Are there any specific areas where you would like additional support
            or resources?
          </Label>
          <p className="mb-2 text-sm text-gray-500">Select all that apply:</p>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {[
              { id: "accountability", label: "Accountability" },
              { id: "mentorship", label: "Mentorship" },
              { id: "parenting-advice", label: "Parenting advice" },
              { id: "career-guidance", label: "Career guidance" },
              { id: "other", label: "Other" },
            ].map((area) => (
              <Card
                key={area.id}
                className="border p-3"
              >
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`support-${area.id}`}
                    checked={isSupportAreaSelected(area.id)}
                    onChange={(e) =>
                      handleSupportAreaChange(area.id, e.target.checked)
                    }
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label
                    htmlFor={`support-${area.id}`}
                    className="pt-0.5 leading-none"
                  >
                    {area.label}
                  </Label>
                </div>
              </Card>
            ))}
          </div>

          {errors.supportAreas && (
            <span className="text-sm text-red-500">
              Please select at least one area
            </span>
          )}

          {/* Other support area specification */}
          {isSupportAreaSelected("other") && (
            <div className="mt-2">
              <Label htmlFor="otherSupportArea">
                Please specify other support areas:
              </Label>
              <Input
                id="otherSupportArea"
                {...register("otherSupportArea", {
                  required: isSupportAreaSelected("other"),
                })}
              />
              {errors.otherSupportArea && (
                <span className="text-sm text-red-500">
                  Please specify your other support areas
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
