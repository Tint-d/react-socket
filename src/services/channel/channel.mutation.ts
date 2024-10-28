import { useMutation, useQueryClient } from "@tanstack/react-query";
import authApi from "@/api/authApi";
import { AxiosError } from "axios";
import { toast } from "sonner";

export const useChannelInviteMutation = () => {
  return useMutation<any, AxiosError<any>, any>({
    mutationFn: async ({
      channelId,
      userId,
    }: {
      channelId: string;
      userId: string;
    }) => {
      return await authApi
        .post(`/channels/invite-channel`, { channelId, userId })
        .then((res) => res.data);
    },
  });
};

export const useChannelAcceptMutation = () => {
  return useMutation<any, AxiosError<any>, { channelId: string }>({
    mutationFn: async ({ channelId }) => {
      return await authApi
        .post(`/channels/accept-channel`, { channelId })
        .then((res) => res.data);
    },
    onSuccess: () => {
      toast.success("Invitation accepted successfully");
    },
    onError: (error) => {
      toast.error("Invitaion accept fail");
      console.error("Error accepting invitation:", error.message);
    },
  });
};

export const useChannelDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError<any>, string>({
    mutationFn: async (channelId: string) => {
      return await authApi
        .delete(`/channels/delete/${channelId}`)
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channels"] });
      toast.error("Invitation acceptance failed");
    },
    onError: (error) => {
      toast.error("Error deleting channel");
      console.error("Error deleting channel:", error.message);
    },
  });
};

export const useChannelCreateMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    any,
    AxiosError<any>,
    { name: string; isPrivate: boolean }
  >({
    mutationFn: async ({ name, isPrivate }) => {
      return await authApi
        .post(`/channels/create`, { name, isPrivate })
        .then((res) => res.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["channels"] });
      toast.success("Channel created successfully!");
    },
    onError: (error) => {
      toast.error("Error creating channel");
      console.error("Error creating channel:", error.message);
    },
  });
};
