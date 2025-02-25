import { Card, CardContent } from "@/components/ui/card";
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

const SpiritualJourneySection = ({ register, watch, setValue, errors }) => {
  // Watch relevant fields for conditional rendering
  const acceptedChrist = watch("acceptedChrist");
  const baptized = watch("baptized");
  const hasChurchHome = watch("hasChurchHome");
  const familyUpbringing = watch("familyUpbringing");
  const faithRole = watch("faithRole");

  // Handle acceptedChrist change
  const handleAcceptedChristChange = (value) => {
    setValue("acceptedChrist", value);

    // Clear date if not accepted Christ
    if (value === "no") {
      setValue("acceptedChristDate", "");
    }
  };

  // Handle baptized change
  const handleBaptizedChange = (value) => {
    setValue("baptized", value);

    // Clear date if not baptized
    if (value === "no") {
      setValue("baptismDate", "");
    }
  };

  // Handle church home change
  const handleChurchHomeChange = (value) => {
    setValue("hasChurchHome", value);

    // Clear church details if no church home
    if (value === "no") {
      setValue("churchName", "");
      setValue("churchLocation", "");
    }
  };

  // Handle family upbringing change
  const handleFamilyUpbringingChange = (value) => {
    setValue("familyUpbringing", value);

    // Clear other specification if not other
    if (value !== "other") {
      setValue("otherFamilyUpbringing", "");
    }
  };

  // Handle faith role change
  const handleFaithRoleChange = (value) => {
    setValue("faithRole", value);

    // Clear other specification if not other
    if (value !== "other") {
      setValue("otherFaithRole", "");
    }
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">
        Spiritual Journey and Family Background
      </h2>

      <div className="space-y-6">
        {/* Have you accepted Christ */}
        <div className="space-y-2">
          <Label>Have you accepted Jesus Christ as your Lord and Savior?</Label>
          <RadioGroup
            defaultValue=""
            value={acceptedChrist}
            onValueChange={handleAcceptedChristChange}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="yes"
                id="acceptedChristYes"
              />
              <Label htmlFor="acceptedChristYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="no"
                id="acceptedChristNo"
              />
              <Label htmlFor="acceptedChristNo">No</Label>
            </div>
          </RadioGroup>
          {errors.acceptedChrist && (
            <span className="text-sm text-red-500">
              Please make a selection
            </span>
          )}
        </div>

        {/* When accepted Christ */}
        {acceptedChrist === "yes" && (
          <div className="space-y-2">
            <Label htmlFor="acceptedChristDate">
              When did you accept Christ? (approximate date)
            </Label>
            <Input
              id="acceptedChristDate"
              type="date"
              {...register("acceptedChristDate", {
                required: acceptedChrist === "yes",
              })}
            />
            {errors.acceptedChristDate && (
              <span className="text-sm text-red-500">
                Please provide an approximate date
              </span>
            )}
          </div>
        )}

        {/* Have you been baptized */}
        <div className="space-y-2">
          <Label>Have you been baptized?</Label>
          <RadioGroup
            defaultValue=""
            value={baptized}
            onValueChange={handleBaptizedChange}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="yes"
                id="baptizedYes"
              />
              <Label htmlFor="baptizedYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="no"
                id="baptizedNo"
              />
              <Label htmlFor="baptizedNo">No</Label>
            </div>
          </RadioGroup>
          {errors.baptized && (
            <span className="text-sm text-red-500">
              Please make a selection
            </span>
          )}
        </div>

        {/* When baptized */}
        {baptized === "yes" && (
          <div className="space-y-2">
            <Label htmlFor="baptismDate">
              When were you baptized? (approximate date)
            </Label>
            <Input
              id="baptismDate"
              type="date"
              {...register("baptismDate", {
                required: baptized === "yes",
              })}
            />
            {errors.baptismDate && (
              <span className="text-sm text-red-500">
                Please provide an approximate date
              </span>
            )}
          </div>
        )}

        {/* Do you have a church home */}
        <div className="space-y-2">
          <Label>Do you have a church home?</Label>
          <RadioGroup
            defaultValue=""
            value={hasChurchHome}
            onValueChange={handleChurchHomeChange}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="yes"
                id="hasChurchHomeYes"
              />
              <Label htmlFor="hasChurchHomeYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="no"
                id="hasChurchHomeNo"
              />
              <Label htmlFor="hasChurchHomeNo">No</Label>
            </div>
          </RadioGroup>
          {errors.hasChurchHome && (
            <span className="text-sm text-red-500">
              Please make a selection
            </span>
          )}
        </div>

        {/* Church details */}
        {hasChurchHome === "yes" && (
          <Card className="mt-2">
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="churchName">Church Name:</Label>
                  <Input
                    id="churchName"
                    {...register("churchName", {
                      required: hasChurchHome === "yes",
                    })}
                  />
                  {errors.churchName && (
                    <span className="text-sm text-red-500">
                      Please provide your church&apos;s name
                    </span>
                  )}
                </div>

                <div>
                  <Label htmlFor="churchLocation">City/State:</Label>
                  <Input
                    id="churchLocation"
                    {...register("churchLocation", {
                      required: hasChurchHome === "yes",
                    })}
                  />
                  {errors.churchLocation && (
                    <span className="text-sm text-red-500">
                      Please provide your church&apos;s location
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Family upbringing */}
        <div className="space-y-2">
          <Label>What was your family upbringing like?</Label>
          <Select
            value={familyUpbringing}
            onValueChange={handleFamilyUpbringingChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="two-parent">Two-parent household</SelectItem>
              <SelectItem value="single-parent">
                Single-parent household
              </SelectItem>
              <SelectItem value="extended-family">
                Raised by extended family (e.g., grandparents, aunts/uncles)
              </SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.familyUpbringing && (
            <span className="text-sm text-red-500">
              Please select an option
            </span>
          )}

          {/* Other family upbringing */}
          {familyUpbringing === "other" && (
            <div className="mt-2">
              <Label htmlFor="otherFamilyUpbringing">Please specify:</Label>
              <Input
                id="otherFamilyUpbringing"
                {...register("otherFamilyUpbringing", {
                  required: familyUpbringing === "other",
                })}
              />
              {errors.otherFamilyUpbringing && (
                <span className="text-sm text-red-500">
                  Please specify your family upbringing
                </span>
              )}
            </div>
          )}
        </div>

        {/* Grew up in church */}
        <div className="space-y-2">
          <Label>Did you grow up in the church?</Label>
          <RadioGroup
            defaultValue=""
            className="flex space-x-4"
            {...register("grewUpInChurch", { required: false })}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="yes"
                id="grewUpInChurchYes"
              />
              <Label htmlFor="grewUpInChurchYes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="no"
                id="grewUpInChurchNo"
              />
              <Label htmlFor="grewUpInChurchNo">No</Label>
            </div>
          </RadioGroup>
          {errors.grewUpInChurch && (
            <span className="text-sm text-red-500">
              Please make a selection
            </span>
          )}
        </div>

        {/* Faith role */}
        <div className="space-y-2">
          <Label>What role does faith currently play in your life?</Label>
          <Select
            value={faithRole}
            onValueChange={handleFaithRoleChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="central">Central to my life</SelectItem>
              <SelectItem value="important">
                Important but not central
              </SelectItem>
              <SelectItem value="exploring">
                I&apos;m exploring faith
              </SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.faithRole && (
            <span className="text-sm text-red-500">
              Please select an option
            </span>
          )}

          {/* Other faith role */}
          {faithRole === "other" && (
            <div className="mt-2">
              <Label htmlFor="otherFaithRole">Please specify:</Label>
              <Textarea
                id="otherFaithRole"
                {...register("otherFaithRole", {
                  required: faithRole === "other",
                })}
                placeholder="Please describe the role of faith in your life..."
              />
              {errors.otherFaithRole && (
                <span className="text-sm text-red-500">
                  Please specify the role of faith in your life
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SpiritualJourneySection;
