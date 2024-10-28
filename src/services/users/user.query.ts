import authApi from "@/api/authApi";
import { User, UserResponse, UserResponseById } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

const fetchUser = async (): Promise<UserResponse> => {
  const response = await authApi.get(`/user`);
  return response.data;
};

export const searchUsers = async (query: string): Promise<User[]> => {
  const response = await authApi.get(`/user/search?query=${query}`);
  return response.data.users;
};

const fetchUserById = async (userId: string): Promise<UserResponseById> => {
  const response = await authApi.get(`/user/detail/${userId}`);
  return response.data.user;
};

export const useGetUserQuery = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => fetchUser(),
  });
};

export const useSearchUsers = (search: string) => {
  return useQuery({
    queryKey: ["search-users", search],
    queryFn: () => searchUsers(search),
    enabled: !!search,
  });
};

export const useGetUserByIdQuery = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserById(userId),
    enabled: !!userId,
  });
};
