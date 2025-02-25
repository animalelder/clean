import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import other UI components as needed

const Step3FamilyStatus = ({ register }) => {
  // Step-specific state and logic here

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
};

export default Step3FamilyStatus;
