import authApi from "@/api/authApi";
import ChannelMember from "@/components/channels/ChannelMember";
import LogoutModal from "@/components/modal/LogoutModal";
import Navbar from "@/components/navigations/Navbar";
import Sidebar from "@/components/navigations/Sidebar";
import { useGetChannelQuery } from "@/services/channel/channel.query";
import { ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Layout = ({ children }: { children?: ReactNode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  const [selectedChannelId, setSelectedChannelId] = useState("");
  const page = 1;
  const limit = 10;
  const { data } = useGetChannelQuery(page, limit);

  useEffect(() => {
    const responseInterceptor = authApi.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          setIsSessionExpired(true);
        }
        return Promise.reject(error);
      }
    );

    return () => authApi.interceptors.response.eject(responseInterceptor); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (data && data.channels?.length > 0) {
      const channelIdFromParams = searchParams.get("channelId");
      if (channelIdFromParams) {
        setSelectedChannelId(channelIdFromParams);
      } else {
        setSelectedChannelId(data.channels[0]._id);
        setSearchParams({ channelId: data.channels[0]._id });
      }
    }
  }, [data, selectedChannelId]);

  const handleClickchannel = (id: string) => {
    setSearchParams({ channelId: id });
    setSelectedChannelId(id);
  };

  return (
    <div className="flex h-screen w-full bg-gray-800 dark:bg-blue-1000">
      <Sidebar
        handleClickchannel={handleClickchannel}
        selectedChannelId={selectedChannelId}
      />
      <div className="flex flex-col flex-1 transition-all duration-300 ease-out overflow-hidden">
        <div className="border-b border-[#888888]/50">
          <Navbar />
        </div>
        <div className="pt-2 px-4 overflow-y-auto">{children}</div>
      </div>
      <ChannelMember selectedChannelId={selectedChannelId} />
      <LogoutModal
        isOpen={isSessionExpired}
        onClose={() => setIsSessionExpired(false)}
      />
    </div>
  );
};

export default Layout;
