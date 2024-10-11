import { baseApi } from "../api/baseApi";
import { CommonResponse } from "../auth/authApi";
interface TimeSlot {
  startTime: string;
  endTime: string;
}
interface CheckAvailabilityResponse extends CommonResponse {
  timeSlots: TimeSlot[];
}
interface CheckAvailabilityParams {
  facilityId: string;
  date: string;
}

const checkAvailable = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkAvailable: builder.query<
      CheckAvailabilityResponse,
      CheckAvailabilityParams
    >({
      query: ({ facilityId, date }) => {
        return {
          url: `/check-availability`,
          method: "GET",
          params: { date, facilityId },
        };
      },
    }),
  }),
});

export const { useCheckAvailableQuery } = checkAvailable;
