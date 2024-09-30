import { baseApi } from "../api/baseApi";
import { User } from "./authSlice";

export interface SignupRequestBody {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: "admin" | "user";
  address: string;
}

export interface CommonResponse {
  success: boolean;
  statusCode: number;
  message: string;
}
interface SignupResponse extends CommonResponse {

  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    address: string;
  };
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

interface LoginResponse extends CommonResponse {
  token: string;
  data: User
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation<SignupResponse, SignupRequestBody>({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequestBody>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSignupMutation, useLoginMutation } = authApi;
