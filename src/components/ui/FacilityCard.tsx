import { Clock, Edit, MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link, useLocation } from "react-router-dom";
import {
  TFacility,
  useDeleteFacilityMutation,
} from "@/redux/Features/facility/facilityApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";
import { toast } from "sonner";
import { Dialog, DialogTrigger } from "./dialog";
import FacilityUpdate from "../Facility/FacilityUpdate";
const DeleteConfirmation = ({
  handleDelete,
  id,
}: {
  handleDelete: (arg0: string) => void;
  id: string;
}) => (
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the facility
        and remove its data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction
        onClick={() => handleDelete(id)}
        className="bg-red-500 hover:bg-red-600"
      >
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
);

export default function FacilityCard({
  _id,
  name,
  image,
  pricePerHour,
  description,
  location,
  isDeleted
}: TFacility) {

  const facility = {
    image,
    pricePerHour,
    description,
    location,
    _id,
    name,
    isDeleted
  };
  const pathLoacation = useLocation();
  const isAdminFacilityRoute = pathLoacation.pathname.startsWith(
    "/dashboard/facilities"
  );
  const [deleteFacility] = useDeleteFacilityMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteFacility(id).unwrap();
      if (res.success) {
        toast.success("facility deleted successfully");
      } else {
        toast.warning(`${res.message}`);
      }
    } catch (error) {
      console.error(error);
      toast.warning("Something went wrong please try again");
    }
  };
  return (
    <div className="bg-primary1/10 overflow-hidden h-full rounded-xl flex flex-col justify-between">
      <div>
        <div className="relative h-48 w-full">
          <img
            src={image}
            alt={name}
            className="transition-transform w-full h-full duration-300 object-cover hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-orange-800">{name}</h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-orange-600 mb-2">
            <Clock className="w-4 h-4 mr-1" />
            <span className="font-bold">${pricePerHour.toFixed(2)}</span>
            <span className="text-sm text-gray-600 ml-1">per hour</span>
          </div>
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
        </div>
      </div>
      <div className="p-4">
        {isAdminFacilityRoute ? (
          <div className="flex flex-row gap-2">
            <Dialog>
              <DialogTrigger className="w-full">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              </DialogTrigger>
              <FacilityUpdate {...facility}/>
            </Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <DeleteConfirmation handleDelete={handleDelete} id={_id} />
            </AlertDialog>
          </div>
        ) : (
          <Link to={`/facility/${_id}`}>
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              View Details
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
