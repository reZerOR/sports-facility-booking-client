import BookingsListCard from './BookingsListCard'
import { TBooking, useGetBookingsByUserQuery } from '@/redux/Features/booking/bookingApi'
const MyBookings = () => {
    const {data: bookings} = useGetBookingsByUserQuery("")
  return (
    
    <BookingsListCard bookings={bookings?.data as TBooking[]} />
  )
}

export default MyBookings