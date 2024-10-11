import { useAppSelector } from "@/redux/hooks";
import { useCurrentUser } from "@/redux/Features/auth/authSlice";
import MyBookings from "@/components/Bookings/MyBookings";
import AllBookings from "@/components/Bookings/AllBookings";

export default function Bookings() {
  const user = useAppSelector(useCurrentUser);
  const isAdmin = user?.role === "admin";

  return <div>{isAdmin ? <AllBookings /> : <MyBookings />}</div>;
}
