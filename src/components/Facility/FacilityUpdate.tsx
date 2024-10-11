import { FieldError, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  TFacility,
  useUpdateFacilityMutation,
} from "@/redux/Features/facility/facilityApi";
import { toast } from "sonner";
interface FacilityFormInputs {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  image: string;
}

const FacilityUpdate = ({
  _id,
  name,
  image,
  pricePerHour,
  description,
  location,
}: TFacility) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FacilityFormInputs>();
  const [updateFacility] = useUpdateFacilityMutation();
  const onSubmit = async (data: FacilityFormInputs) => {
    try {
      const res = await updateFacility({ id: _id, facility: data }).unwrap();
      if (res.success) {
        toast.success("Facility updated successfully");
      } else {
        toast.warning(`${res.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong", { description: "try again later" });
    }
  };
  return (
    <DialogContent className="sm:max-w-[425px] rounded-2xl">
      <DialogHeader>
        <DialogTitle>Update This Facility</DialogTitle>
        <DialogDescription>
          Change fields that you want to change. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue={name}
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters long",
                },
              })}
              className="col-span-3"
            />
            {errors.name && (
              <span className="text-red-500 col-span-4">
                {(errors.name as FieldError).message}
              </span>
            )}
          </div>
          <div className="">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              defaultValue={description}
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 5,
                  message: "Description must be at least 5 characters long",
                },
              })}
              className="col-span-3"
            />
            {errors.description && (
              <span className="text-red-500 col-span-4">
                {(errors.description as FieldError).message}
              </span>
            )}
          </div>
          <div className="">
            <Label htmlFor="price" className="text-right">
              Price/Hour
            </Label>
            <Input
              id="price"
              type="number"
              defaultValue={pricePerHour}
              {...register("pricePerHour", {
                required: "Price per hour is required",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Price per hour must be at least 1",
                },
              })}
              className="col-span-3"
            />
            {errors.pricePerHour && (
              <span className="text-red-500 col-span-4">
                {(errors.pricePerHour as FieldError).message}
              </span>
            )}
          </div>
          <div className="">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input
              id="location"
              defaultValue={location}
              {...register("location", {
                required: "Location is required",
                minLength: {
                  value: 5,
                  message: "Location must be at least 5 characters long",
                },
              })}
              className="col-span-3"
            />
            {errors.location && (
              <span className="text-red-500 col-span-4">
                {(errors.location as FieldError).message}
              </span>
            )}
          </div>
          <div className="">
            <Label htmlFor="image" className="text-right">
              Image URL
            </Label>
            <Input
              id="image"
              defaultValue={image}
              {...register("image", {
                required: "Image URL is required",
                pattern: {
                  value:
                    /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp|svg|tiff|ico))$/i,
                  message: "Invalid image URL",
                },
              })}
              className="col-span-3"
            />
            {errors.image && (
              <span className="text-red-500 col-span-4">
                {(errors.image as FieldError).message}
              </span>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};

export default FacilityUpdate;
