import authApi from "@/api/authApi";
import { useQuery } from "@tanstack/react-query";
// http://localhost:3000/api/v1/channels/671d36cbfe94bbe5806ddd77/messages

const fetchMessages = async (channelId: string) => {
  const response = await authApi.get(`/channels/${channelId}/messages`);
  return response.data;
};

export const useMessages = (channelId: string) => {
  return useQuery({
    queryKey: ["messages", channelId],
    queryFn: () => fetchMessages(channelId),
  });
};
