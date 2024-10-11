import { Clock, Edit, MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { Link, useLocation } from "react-router-dom";
import { TFacility } from "@/redux/Features/facility/facilityApi";
import { useState } from "react";

export default function FacilityCard({
  _id,
  name,
  image,
  pricePerHour,
  description,
  location,
}: TFacility) {
  const [open, setOpen] = useState(false);
  const pathLoacation = useLocation();
  const isAdminFacilityRoute = pathLoacation.pathname.startsWith(
    "/dashboard/facilities"
    );

  
  
  const updateDialogue = () => {
    setOpen(true);
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
            <Button onClick={updateDialogue} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button className="w-full bg-red-500 hover:bg-red-600 text-white">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
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
