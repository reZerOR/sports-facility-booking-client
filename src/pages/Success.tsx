import { Check, Calendar, Clock, MapPin, User, CreditCard } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TBooking,
  useGetBookingQuery,
} from "@/redux/Features/booking/bookingApi";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
export default function Success() {
  const [searchParams] = useSearchParams();
  const [booking, setBooking] = useState<TBooking | null>(null);
  const id = searchParams.get("id");
  const { data, isLoading } = useGetBookingQuery(id as string);
  useEffect(() => {
    if (data) {
      setBooking(data.data);
    }
  }, [data]);
  useEffect(() => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  }, []);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="bg-orange-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="border-green-500 border-2">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-green-700">
              Booking Confirmed!
            </CardTitle>
            <CardDescription className="text-lg">
              Your facility has been successfully booked.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-orange-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-orange-800 mb-4">
                Booking Summary
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-orange-600 mr-2" />
                  <span className="font-medium">{booking?.facility.name}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-orange-600 mr-2" />
                  <span>
                    {new Date(booking?.date as string).toLocaleDateString(
                      "en-US",
                      {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-orange-600 mr-2" />
                  <span>
                    {booking?.startTime} - {booking?.endTime}
                  </span>
                </div>
                <div className="flex items-center">
                  <User className="w-5 h-5 text-orange-600 mr-2" />
                  <span>Booking ID: {booking?._id}</span>
                </div>
                <div className="flex items-center">
                  <CreditCard className="w-5 h-5 text-orange-600 mr-2" />
                  <span className="font-semibold">
                    Total Paid: ${booking?.payableAmount}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            <Link to={"/dashboard/bookings"}>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                View My Bookings
              </Button>
            </Link>
            <Link to={'/'}>
              <Button
                variant="outline"
                className="border-orange-500 text-orange-500 hover:bg-orange-100"
              >
                Back to Home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
