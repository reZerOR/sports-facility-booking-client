import { useForm, SubmitHandler, FieldError } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useCreateFacilityMutation } from "@/redux/Features/facility/facilityApi";
import { toast } from "sonner";
interface FacilityFormInputs {
  name: string;
  description: string;
  pricePerHour: number;
  location: string;
  image: string;
}

const AddFacility = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FacilityFormInputs>();

  const [createFacility] = useCreateFacilityMutation();
  const onSubmit: SubmitHandler<FacilityFormInputs> = async (data) => {
    // console.log(data);
    try {
      const result = await createFacility(data).unwrap();
      if (result.success) {
        toast.success("Facility created successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", { description: "try again later" });
    }
    // handleAddSubmit logic here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-orange-500 hover:bg-orange-600 text-white">
          <Plus className="mr-2 h-4 w-4" /> Add Facility
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add New Facility</DialogTitle>
          <DialogDescription>
            Enter the details of the new facility here. Click save when you're
            done.
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
    </Dialog>
  );
};

export default AddFacility;
