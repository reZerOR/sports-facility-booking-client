import { baseApi } from "../api/baseApi";
import { CommonResponse } from "../auth/authApi";
export interface FacilityRequestBody {
  name: string;
  image: string;
  pricePerHour: number;
  description: string;
  location: string;
}

export interface TFacility extends FacilityRequestBody {
  _id: string;
  isDeleted: boolean;
}


interface GetFacilitiesResponse extends CommonResponse {
  data: TFacility[];
}

interface GetFacilityByIdResponse extends CommonResponse {
  data: TFacility;
}

interface CreateFacilityResponse extends CommonResponse {
  data: TFacility;
}

interface UpdateFacilityResponse extends CommonResponse {
  data: TFacility;
}

interface DeleteFacilityResponse extends CommonResponse {
  data: TFacility;
}

const facilityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFacilities: build.query<GetFacilitiesResponse, void>({
      query: () => ({
        url: "/facility",
        method: "GET",
        // mode: "no-cors",
      }),
      providesTags: ["Facility"],
    }),
    getFacilityById: build.query<GetFacilityByIdResponse, string>({
      query: (id) => ({
        url: `/facility/${id}`,
        method: "GET",
        // mode: "no-cors",
      }),
    }),
    createFacility: build.mutation<CreateFacilityResponse, FacilityRequestBody>({
      query: (facility) => ({
        url: "/facility",
        method: "POST",
        body: facility,
      }),
      invalidatesTags: ["Facility"],
    }),
    updateFacility: build.mutation<UpdateFacilityResponse, { id: string; facility: FacilityRequestBody }>({
      query: ({ id, facility }) => ({
        url: `/facility/${id}`,
        method: "PUT",
        body: facility,
      }),
      invalidatesTags: ["Facility"],
    }),
    deleteFacility: build.mutation<DeleteFacilityResponse, string>({
      query: (id) => ({
        url: `/facility/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Facility"],
    }),
  }),
});

export const { useGetFacilitiesQuery, useGetFacilityByIdQuery, useCreateFacilityMutation, useUpdateFacilityMutation, useDeleteFacilityMutation } = facilityApi;
