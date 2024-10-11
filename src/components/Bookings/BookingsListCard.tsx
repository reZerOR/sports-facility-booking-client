import { format } from "date-fns";
import {
  Eye,
  Trash2,
  MoreVertical,
  Calendar,
  DollarSign,
  Clock,
  MapPin,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  TBooking,
  useCancelBookingMutation,
} from "@/redux/Features/booking/bookingApi";
import { toast } from "sonner";
import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser, User } from "@/redux/Features/auth/authSlice";


const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
  }
};

const BookingsListCard = ({ bookings }: { bookings: TBooking[] }) => {
  const [cancelBooking] = useCancelBookingMutation();
  const user = useAppSelector(useCurrentUser);
  const isAdmin = user?.role === "admin";

  const handleDelete = async (id: string) => {
    // console.log(`Deleting booking with id: ${id}`);
    try {
      const result = await cancelBooking(id).unwrap();
      if (result.success) {
        toast.success("Booking cancelled successfully");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Something went wrong", { description: "try again later" });
    }
  };



  const BookingDropdownMenu = ({ booking }: { booking: TBooking }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        {/* View Details */}
        <Dialog>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-orange-700">
                Booking Details
              </DialogTitle>
              <DialogDescription>
                Details for your booking at {booking.facility.name}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Facility:</span>{" "}
                {booking.facility.name}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Location:</span>{" "}
                {booking.facility.location}
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Date:</span>{" "}
                {format(new Date(booking.date), "MMMM d, yyyy")}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Time:</span> {booking.startTime} -{" "}
                {booking.endTime}
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-orange-500" />
                <span className="font-medium">Price:</span> $
                {booking.payableAmount}
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                    booking.isBooked
                  )}`}
                >
                  {booking.isBooked}
                </span>
              </div>
            </div>
            <DialogClose asChild>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                Close
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
        <DropdownMenuSeparator />
        {/* Cancel Booking */}
        {booking.isBooked !== "canceled" && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                className="text-red-600"
              >
                <Trash2 className="mr-2 h-4 w-4" /> Cancel Booking
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will cancel your booking
                  for {booking.facility.name} on{" "}
                  {format(new Date(booking.date), "MMMM d, yyyy")}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDelete(booking._id)}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen">
      <Card className="bg-white bg-opacity-80 backdrop-blur-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-orange-700 flex items-center">
            <Calendar className="mr-2" />{" "}
            {isAdmin ? "All Bookings" : "My Bookings"}
          </CardTitle>
          <CardDescription>
            {isAdmin
              ? "Here are all bookings"
              : "Manage your bookings and view your booking history."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings?.map((booking) => (
              <Card
                key={booking._id}
                className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between lg:items-center gap-1 flex-col lg:flex-row">
                    <div>
                      <h3 className="text-lg font-semibold text-orange-700">
                        {booking.facility.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {format(new Date(booking.date), "MMMM d, yyyy")} •{" "}
                        {booking.startTime} - {booking.endTime}
                      </p>
                    </div>
                    {isAdmin && <>
                    <div>
                        {(booking.user as User).name}
                    </div>
                    <div>
                        {(booking.user as User).email}
                    </div>
                    <div>
                        ${booking.payableAmount}
                    </div>
                    
                    </>}
                    <div className="flex items-center justify-between space-x-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          booking.isBooked
                        )}`}
                      >
                        {booking.isBooked}
                      </span>
                      {isAdmin || <BookingDropdownMenu booking={booking} />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsListCard;
