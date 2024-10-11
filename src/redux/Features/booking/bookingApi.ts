import { baseApi } from "../api/baseApi";
import { CommonResponse } from "../auth/authApi";
import { User } from "../auth/authSlice";
import { TFacility } from "../facility/facilityApi";
export interface BookingRequest {
  facility: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface TBooking {
  _id: string;
  facility: TFacility;
  date: string;
  startTime: string;
  endTime: string;
  user: string | User;
  payableAmount: number;
  isBooked: string;
}
interface TPaymentResponse {
  result: boolean;
  payment_url: string;
}

interface BookingResponse extends CommonResponse {
  data: TPaymentResponse;
}
interface GetBookingResponse extends CommonResponse {
  data: TBooking;
}
interface GetBookingsByUserResponse extends CommonResponse {
  data: TBooking[];
}

const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBooking: build.mutation<BookingResponse, BookingRequest>({
      query: (booking) => {
        // const callbackUrl = `${window.location.origin}`;
        return {
          url: `/bookings`,
          method: "POST",
          body: booking,
        };
      },
    }),
    getBooking: build.query<GetBookingResponse, string>({
      query: (id) => `/bookings/${id}`,
    }),
    getBookingsByUser: build.query<GetBookingsByUserResponse, string>({
      query: () => `/bookings/user`,
      providesTags: ["userBooking"],
    }),
    cancelBooking: build.mutation<GetBookingResponse, string>({
      query: (id) => ({
        url: `/bookings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["userBooking", "adminBooking"],
    }),
    getAllBookings: build.query<GetBookingsByUserResponse, string>({
      query: () => `/bookings`,
      providesTags: ["adminBooking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetBookingQuery,
  useGetBookingsByUserQuery,
  useCancelBookingMutation,
  useGetAllBookingsQuery,
} = bookingApi;
