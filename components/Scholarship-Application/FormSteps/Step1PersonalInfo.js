import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Step1PersonalInfo = ({ register, errors }) => {
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

        {/* Radio groups section - made responsive with grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Label className="mb-2 block">Gender</Label>
            <RadioGroup defaultValue="male">
              {[
                "Male",
                "Female",
                "Non-Binary",
                "Prefer not to say",
                "Other",
              ].map((option) => (
                <div
                  className="flex items-center space-x-2 py-1"
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
            <Label className="mb-2 block">Ethnicity</Label>
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
                  className="flex items-center space-x-2 py-1"
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
            <Label className="mb-2 block">Military Service</Label>
            <RadioGroup defaultValue="No">
              {["Yes - active duty", "Yes - reserves", "No"].map((option) => (
                <div
                  className="flex items-center space-x-2 py-1"
                  key={option}
                >
                  <RadioGroupItem
                    value={option.toLowerCase()}
                    id={`militaryService-${option.toLowerCase()}`}
                    {...register("militaryService")}
                  />
                  <Label htmlFor={`militaryService-${option.toLowerCase()}`}>
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label className="mb-2 block">Household Income</Label>
            <RadioGroup defaultValue="No">
              {[
                "Less than $30,000",
                "$30,000 - $50,000",
                "$50,000 - $75,000",
                "$75,000 - $100,000",
                "More than $100,000",
              ].map((option) => (
                <div
                  className="flex items-center space-x-2 py-1"
                  key={option}
                >
                  <RadioGroupItem
                    value={option.toLowerCase()}
                    id={`income-${option.toLowerCase()}`}
                    {...register("income")}
                  />
                  <Label htmlFor={`income-${option.toLowerCase()}`}>
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step1PersonalInfo;
