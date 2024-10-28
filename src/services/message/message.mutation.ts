import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import authApi from "@/api/authApi";
import {
  MessageDeletePayload,
  MessageDeleteResponse,
  MessageErrorResponse,
} from "@/types/message";

export const useMessageDeleteMutation = (id: string) => {
  return useMutation<
    MessageDeleteResponse,
    AxiosError<MessageErrorResponse>,
    MessageDeletePayload
  >({
    mutationFn: async () => {
      return await authApi
        .delete(`/messages/delete/${id}`)
        .then((res) => res.data);
    },
  });
};
