import {
  TBooking,
  useGetAllBookingsQuery,
} from "@/redux/Features/booking/bookingApi";

import BookingsListCard from "./BookingsListCard";

const AllBookings = () => {
  const { data: bookings } = useGetAllBookingsQuery("");
  return <BookingsListCard bookings={bookings?.data as TBooking[]} />;
};

export default AllBookings;
