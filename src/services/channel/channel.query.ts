import authApi from "@/api/authApi";
import { ChannelsResponse, MemberResponse } from "@/types/channel";
import { useQuery } from "@tanstack/react-query";

const fetchChannel = async (
  page: number,
  limit: number
): Promise<ChannelsResponse> => {
  const response = await authApi.get(
    `/channels/view?page=${page}&limit=${limit}`
  );
  return response.data;
};

const searchChannels = async (search: string): Promise<ChannelsResponse> => {
  const response = await authApi.get(
    `/channels/view?search=${encodeURIComponent(search)}`
  );
  return response.data;
};
const fetchNotifications = async (): Promise<any> => {
  const response = await authApi.get(`/channels/notifications`);
  return response.data.notifications;
};

const channelDetail = async (id: string): Promise<MemberResponse> => {
  const response = await authApi.get(`/channels/detail/${id}`);
  return response.data;
};

export const useGetChannelQuery = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["channels", page, limit],
    queryFn: () => fetchChannel(page, limit),
  });
};

export const useGetChannelDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ["channels", id],
    queryFn: () => channelDetail(id),
    enabled: !!id,
  });
};

export const useSearchChannels = (
  search: string,
  page: number,
  limit: number
) => {
  return useQuery({
    queryKey: ["search-channels", search, page, limit],
    queryFn: () => searchChannels(search),
    enabled: !!search,
  });
};

export const useGetNotificationsQuery = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: () => fetchNotifications(),
  });
};
