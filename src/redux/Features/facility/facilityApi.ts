import { baseApi } from "../api/baseApi";
import { CommonResponse } from "../auth/authApi";
export interface FacilityRequestBody {
  name: string;
  image: string;
  pricePerHour: number;
  description: string;
  location: string;
}

export interface Facility extends FacilityRequestBody {
  _id: string;
  isDeleted: boolean;
}


interface GetFacilitiesResponse extends CommonResponse {
  data: Facility[];
}

interface GetFacilityByIdResponse extends CommonResponse {
  data: Facility;
}

interface CreateFacilityResponse extends CommonResponse {
  data: Facility;
}

interface UpdateFacilityResponse extends CommonResponse {
  data: Facility;
}

interface DeleteFacilityResponse extends CommonResponse {
  data: Facility;
}

const facilityApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getFacilities: build.query<GetFacilitiesResponse, void>({
      query: () => ({
        url: "/facility",
        method: "GET",
      }),
      providesTags: ["Facility"],
    }),
    getFacilityById: build.query<GetFacilityByIdResponse, string>({
      query: (id) => ({
        url: `/facility/${id}`,
        method: "GET",
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
