import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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

const ChurchInvolvementSection = ({ register, watch, setValue, errors }) => {
  // Watch relevant fields for conditional rendering
  const churchAttendance = watch("churchAttendance");
  const tithing = watch("tithing");
  const volunteerInvolvement = watch("volunteerInvolvement");

  // Create state to track checkbox selections for volunteer activities
  const [volunteerActivities, setVolunteerActivities] = useState({
    worship: false,
    children: false,
    outreach: false,
    smallGroup: false,
    other: false,
  });

  // Handle church attendance change
  const handleChurchAttendanceChange = (value) => {
    setValue("churchAttendance", value);
  };

  // Handle tithing change
  const handleTithingChange = (value) => {
    setValue("tithing", value);
  };

  // Handle volunteer involvement change
  const handleVolunteerInvolvementChange = (value) => {
    setValue("volunteerInvolvement", value);

    // Clear volunteer activities if not involved
    if (value === "no-not-involved" || value === "no-interested") {
      setValue("volunteerActivitiesWorship", false);
      setValue("volunteerActivitiesChildren", false);
      setValue("volunteerActivitiesOutreach", false);
      setValue("volunteerActivitiesSmallGroup", false);
      setValue("volunteerActivitiesOther", false);
      setValue("otherVolunteerActivity", "");

      // Update local state too
      setVolunteerActivities({
        worship: false,
        children: false,
        outreach: false,
        smallGroup: false,
        other: false,
      });
    }
  };

  // Handle volunteer activity checkbox change
  const handleVolunteerActivityChange = (activity, checked) => {
    // Update the state
    setVolunteerActivities((prev) => ({
      ...prev,
      [activity]: checked,
    }));

    // Update the form value
    setValue(
      `volunteerActivities${activity.charAt(0).toUpperCase() + activity.slice(1)}`,
      checked,
    );

    // Clear "other" specification if unchecked
    if (activity === "other" && !checked) {
      setValue("otherVolunteerActivity", "");
    }
  };

  // Helper function to determine if volunteer activities section should be shown
  const shouldShowVolunteerActivities = () => {
    return (
      volunteerInvolvement === "yes-regularly" ||
      volunteerInvolvement === "yes-occasionally"
    );
  };

  return (
    <>
      <h2 className="mb-4 text-2xl font-bold">Church Involvement</h2>

      <div className="space-y-6">
        {/* Church attendance frequency */}
        <div className="space-y-2">
          <Label>How often do you attend church services?</Label>
          <Select
            value={churchAttendance}
            onValueChange={handleChurchAttendanceChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="2-3-times-month">
                2–3 times per month
              </SelectItem>
              <SelectItem value="once-month">Once a month</SelectItem>
              <SelectItem value="rarely">Rarely</SelectItem>
              <SelectItem value="never">Never</SelectItem>
            </SelectContent>
          </Select>
          {errors.churchAttendance && (
            <span className="text-sm text-red-500">
              Please select an option
            </span>
          )}
        </div>

        {/* Tithing */}
        <div className="space-y-2">
          <Label>Do you tithe (give 10% of your income) to your church?</Label>
          <RadioGroup
            defaultValue=""
            value={tithing}
            onValueChange={handleTithingChange}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="yes-regularly"
                id="titheRegularly"
              />
              <Label htmlFor="titheRegularly">Yes, regularly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="yes-occasionally"
                id="titheOccasionally"
              />
              <Label htmlFor="titheOccasionally">Yes, occasionally</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="no-other-amounts"
                id="titheOtherAmounts"
              />
              <Label htmlFor="titheOtherAmounts">
                No, but I give other amounts
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="no-do-not-tithe"
                id="doNotTithe"
              />
              <Label htmlFor="doNotTithe">No, I do not tithe</Label>
            </div>
          </RadioGroup>
          {errors.tithing && (
            <span className="text-sm text-red-500">
              Please select an option
            </span>
          )}
        </div>

        {/* Volunteer involvement */}
        <div className="space-y-2">
          <Label>
            Are you involved in volunteer activities at your church?
          </Label>
          <RadioGroup
            defaultValue=""
            value={volunteerInvolvement}
            onValueChange={handleVolunteerInvolvementChange}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="yes-regularly"
                id="volunteerRegularly"
              />
              <Label htmlFor="volunteerRegularly">Yes, regularly</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="yes-occasionally"
                id="volunteerOccasionally"
              />
              <Label htmlFor="volunteerOccasionally">Yes, occasionally</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="no-interested"
                id="notVolunteerButInterested"
              />
              <Label htmlFor="notVolunteerButInterested">
                No, but I&apos;m interested
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="no-not-involved"
                id="notVolunteer"
              />
              <Label htmlFor="notVolunteer">No, I am not involved</Label>
            </div>
          </RadioGroup>
          {errors.volunteerInvolvement && (
            <span className="text-sm text-red-500">
              Please select an option
            </span>
          )}
        </div>

        {/* Volunteer activities - only shown if user volunteers */}
        {shouldShowVolunteerActivities() && (
          <Card className="mt-2">
            <CardContent className="pt-4">
              <div className="space-y-4">
                <Label className="mb-2 block font-medium">
                  What types of activities are you involved in?
                </Label>

                <div className="space-y-3">
                  {/* Worship team */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="volunteerActivitiesWorship"
                      checked={volunteerActivities.worship}
                      onCheckedChange={(checked) =>
                        handleVolunteerActivityChange("worship", checked)
                      }
                    />
                    <Label
                      htmlFor="volunteerActivitiesWorship"
                      className="pt-0.5 leading-none"
                    >
                      Worship team
                    </Label>
                  </div>

                  {/* Children's ministry */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="volunteerActivitiesChildren"
                      checked={volunteerActivities.children}
                      onCheckedChange={(checked) =>
                        handleVolunteerActivityChange("children", checked)
                      }
                    />
                    <Label
                      htmlFor="volunteerActivitiesChildren"
                      className="pt-0.5 leading-none"
                    >
                      Children&apos;s ministry
                    </Label>
                  </div>

                  {/* Outreach/community service */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="volunteerActivitiesOutreach"
                      checked={volunteerActivities.outreach}
                      onCheckedChange={(checked) =>
                        handleVolunteerActivityChange("outreach", checked)
                      }
                    />
                    <Label
                      htmlFor="volunteerActivitiesOutreach"
                      className="pt-0.5 leading-none"
                    >
                      Outreach/community service
                    </Label>
                  </div>

                  {/* Small group leadership */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="volunteerActivitiesSmallGroup"
                      checked={volunteerActivities.smallGroup}
                      onCheckedChange={(checked) =>
                        handleVolunteerActivityChange("smallGroup", checked)
                      }
                    />
                    <Label
                      htmlFor="volunteerActivitiesSmallGroup"
                      className="pt-0.5 leading-none"
                    >
                      Small group leadership
                    </Label>
                  </div>

                  {/* Other */}
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="volunteerActivitiesOther"
                      checked={volunteerActivities.other}
                      onCheckedChange={(checked) =>
                        handleVolunteerActivityChange("other", checked)
                      }
                    />
                    <Label
                      htmlFor="volunteerActivitiesOther"
                      className="pt-0.5 leading-none"
                    >
                      Other
                    </Label>
                  </div>

                  {/* Other specification */}
                  {volunteerActivities.other && (
                    <div className="ml-6 mt-2">
                      <Label htmlFor="otherVolunteerActivity">
                        Please specify:
                      </Label>
                      <Input
                        id="otherVolunteerActivity"
                        {...register("otherVolunteerActivity", {
                          required: volunteerActivities.other,
                        })}
                      />
                      {errors.otherVolunteerActivity && (
                        <span className="text-sm text-red-500">
                          Please specify your volunteer activity
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {errors.volunteerActivities && (
                  <span className="mt-1 block text-sm text-red-500">
                    Please select at least one activity
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </>
  );
};

export default ChurchInvolvementSection;
