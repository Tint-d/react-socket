import "./sidebar.css";
import { useState } from "react";
import {
  useGetChannelQuery,
  useSearchChannels,
} from "@/services/channel/channel.query";
import { useDebounce } from "@/hooks/useDebounce";
import { useChannelDeleteMutation } from "@/services/channel/channel.mutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const useSidebar = () => {
  const [page] = useState(1);
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();
  const limit = 10;
  const debouncedSearch = useDebounce(search, 500);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const deleteChannelMutation = useChannelDeleteMutation();
  const { data: channels, isLoading: isPaginatedLoading } = useGetChannelQuery(
    page,
    limit
  );
  const { data: searchResults, isLoading: isSearchLoading } = useSearchChannels(
    debouncedSearch,
    limit,
    page
  );

  const handleDeleteChannel = (channelId: string) => {
    deleteChannelMutation.mutate(channelId, {
      onSuccess: () => {
        toast.success("Channel deleted successfully.");
        queryClient.invalidateQueries({ queryKey: ["channels"] });
      },
      onError: (error) => {
        toast.error("Failed to delete the channel:");
        console.error("Failed to delete the channel:", error.message);
      },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const displayedChannels = debouncedSearch
    ? searchResults?.channels
    : channels?.channels;

  return {
    displayedChannels,
    handleLogout,
    handleDeleteChannel,
    isSearchLoading,
    isPaginatedLoading,
    setOpenDeleteModal,
    openDeleteModal,
    setCreateModal,
    createModal,
    setSearch,
    deleteChannelMutation,
  };
};

export default useSidebar;
