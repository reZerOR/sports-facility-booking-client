import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { useCurrentUser } from "@/redux/Features/auth/authSlice";
import { addBooking } from "@/redux/Features/booking/bookingSlice";
import {
  TFacility,
  useGetFacilityByIdQuery,
} from "@/redux/Features/facility/facilityApi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { BookmarkCheck, Loader2, MapPin, Timer } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector(useCurrentUser);
  const { data: facility, isLoading } = useGetFacilityByIdQuery(id!);
  const dispatch = useAppDispatch();
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex justify-center items-center h-screen">
          <Loader2 size={48} className="animate-spin text-primary1" />
        </div>
      </div>
    );
  }

  const { name, pricePerHour, description, location, image } =
    facility?.data as TFacility;
  const handleStoreBooking = () => {
    if (user) {
      dispatch(addBooking(facility?.data as TFacility));
      navigate("/booking");
    } else {
      toast.warning("Please login to book a facility");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
      <Heading text="Facility Details" />
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="relative aspect-square w-full">
          <img
            src={image}
            alt={name}
            className="rounded-lg w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center space-y-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{name}</h1>
            <Badge variant="secondary" className="text-primary1">
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-primary1" />
                {location}
              </div>
            </Badge>
          </div>
          <p className="text-gray-600 text-sm">{description}</p>
          <div className="flex flex-row items-center gap-2">
            <Timer size={24} className="text-primary1" />
            <span className="text-2xl font-bold">
              ${pricePerHour.toFixed(2)}
            </span>
          </div>
          <Button
            onClick={handleStoreBooking}
            size="lg"
            className="w-full md:w-auto flex items-center gap-2"
          >
            <BookmarkCheck />
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
}
