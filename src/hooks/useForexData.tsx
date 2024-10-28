import socket from "@/api/socket";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type ForexData = {
  pair: string;
  price: number;
};

type SendMessageData = {
  channelId: string;
  message: string;
  sender: string;
};

export const useForexData = (channelId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.connect();
    socket.emit("joinChannel", channelId);

    socket.on("forexUpdate", (data: ForexData) => {
      queryClient.setQueryData(["forexData", channelId], data);
    });

    return () => {
      socket.emit("leaveChannel", channelId);
      socket.disconnect();
    };
  }, [channelId, queryClient]);

  // Mutation function with types
  const sendMessage = async (data: SendMessageData): Promise<void> => {
    return new Promise<void>((resolve) => {
      socket.emit("sendMessage", data, () => {
        resolve();
      });
    });
  };

  // Wrap sendMessage in an options object with mutationFn
  const mutation = useMutation<void, Error, SendMessageData>({
    mutationFn: sendMessage,
  });

  return {
    data: queryClient.getQueryData<ForexData>(["forexData", channelId]),
    sendMessage: mutation.mutate,
  };
};
