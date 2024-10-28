import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import {
  SignInErrorResponse,
  SignInPayload,
  SignInResponse,
  SignUpErrorResponse,
  SignUpPayload,
} from "@/types/auth";
import authApi from "@/api/authApi";

export const useLoginMutation = () => {
  return useMutation<
    SignInResponse,
    AxiosError<SignInErrorResponse>,
    SignInPayload
  >({
    mutationFn: async (data) => {
      return await authApi.post(`/auth/login`, data).then((res) => res.data);
    },
  });
};

export const useRegisterMutation = () => {
  return useMutation<any, AxiosError<SignUpErrorResponse>, SignUpPayload>({
    mutationFn: async (data) => {
      return await authApi.post(`/auth/register`, data).then((res) => res.data);
    },
  });
};
