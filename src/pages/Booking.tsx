/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { format } from "date-fns";
import {
  ArrowRight,
  BookmarkMinus,
  Calendar as CalendarIcon,
  Info,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppSelector } from "@/redux/hooks";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { CommonResponse } from "@/redux/Features/auth/authApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookingRequest,
  useCreateBookingMutation,
} from "@/redux/Features/booking/bookingApi";
import { useCurrentUser } from "@/redux/Features/auth/authSlice";

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface CheckAvailabilityResponse extends CommonResponse {
  data: TimeSlot[];
}

export default function FacilityBookingPage() {
  const [date, setDate] = useState<Date>();
  const [showCheckButton, setShowCheckButton] = useState(true);
  const [showAvailability, setShowAvailability] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const { bookings } = useAppSelector((state) => state.booking);
  const [createBooking] = useCreateBookingMutation();
  const user = useAppSelector(useCurrentUser)
  console.log(availableTimeSlots);
  

  const handleCheckAvailability = async () => {
    if (date) {
      const formattedDate = new Date(date).toLocaleDateString("en-CA");
      try {
        const response = await fetch(
          `https://sports-facility-server-v2.vercel.app/api/check-availability?facilityId=${bookings?._id}&date=${formattedDate}`
        );
        const data: CheckAvailabilityResponse = await response.json();
        if (data.success) {
          setAvailableTimeSlots(data.data);
          setShowAvailability(true);
          setSelectedTimeSlot(null);
          setShowCheckButton(false);
        } else {
          setAvailableTimeSlots([]);
          toast.error(data.message);
        }
      } catch (error) {
        setAvailableTimeSlots([]);
        toast.error("Something went wrong");
        console.log(error);
      }
    }
  };

  // console.log(availableTimeSlots);
  const handleTimeSlotChange = (timeSlot: string) => {
    // console.log(timeSlot);
    setSelectedTimeSlot(timeSlot);
  };

  const handlePayNow = async () => {
    if (!selectedTimeSlot || !user) {
      toast.error(user ? "Please select a time slot" : "Pls login to book a facility!");
      return;
    }
    const requestBody: BookingRequest = {
      facility: bookings?._id as string,
      date: date?.toLocaleDateString("en-CA") as string,
      startTime: selectedTimeSlot?.split(" to ")[0] as string,
      endTime: selectedTimeSlot?.split(" to ")[1] as string,
    };
    try {
      const response = await createBooking(requestBody).unwrap();
      if (response.success) {
        window.location.href = response.data.payment_url;
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error);
      if ((error as any).status === 401) {
        toast.error(
          user
            ? "Only user can book a facility!"
            : "Pls login to book a facility!"
        );
      } else if ((error as any).status === 400) {
        toast.error((error as any).data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  if (!bookings) {
    return (
      <div className="w-full mx-auto h-[calc(100vh-73px)] flex flex-col gap-2 justify-center items-center">
        <BookmarkMinus size={66} className="text-red-500" />
        <p className="text-4xl font-bold text-primary1">No bookings found</p>
        <Link to="/facility">
          <Button className="flex items-center gap-1">
            Explore Facilities <ArrowRight size={16} />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 min-h-screen my-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-orange-800">
              {bookings?.name}
            </CardTitle>
            <CardDescription className="flex items-center gap-1">
              <MapPin size={16} />
              {bookings?.location}
            </CardDescription>
            <p className="text-lg font-semibold text-orange-600 mb-2">
              ${bookings?.pricePerHour} per hour
            </p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:items-center md:flex-row gap-2">
              <div className="relative h-64 mb-6">
                <img
                  src={bookings?.image}
                  alt={bookings?.name}
                  className="rounded-md object-cover h-full w-full"
                />
              </div>
              <div className="md:mx-auto">
                <div className="flex flex-col  gap-4 mb-6">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full sm:w-[280px] justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                          setDate(date);
                          setShowAvailability(false);
                          setSelectedTimeSlot(null);
                          setShowCheckButton(true);
                          setAvailableTimeSlots([]);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {showCheckButton && (
                    <Button onClick={handleCheckAvailability}>
                      Check Availability
                    </Button>
                  )}
                  {showAvailability && (
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-orange-700">
                        Available Time Slots
                      </h3>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {availableTimeSlots.length == 0 ? (
                          <p className="text-lg text-orange-600 flex items-center gap-2">
                            <Info size={18} />
                            No time slots available for the selected date.
                          </p>
                        ) : (
                          <Select
                            onValueChange={(value) =>
                              handleTimeSlotChange(value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a time slot" />
                            </SelectTrigger>
                            <SelectContent>
                              {availableTimeSlots.map((slot) => (
                                <SelectItem
                                  key={slot.startTime}
                                  value={`${slot.startTime} to ${slot.endTime}`}
                                >
                                  {slot.startTime} to {slot.endTime}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>

                      <Button
                        onClick={handlePayNow}
                        disabled={!selectedTimeSlot}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                      >
                        Pay Now
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
