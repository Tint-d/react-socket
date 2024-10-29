import profile from "@/assets/pro.webp";
import { useGetNotificationsQuery } from "@/services/channel/channel.query";
import { useGetUserByIdQuery } from "@/services/users/user.query";
import { getDecodedToken } from "@/util/tokenDecode";
import { useState } from "react";
import { AiFillBell } from "react-icons/ai";
import { twMerge } from "tailwind-merge";
import { HiDotsHorizontal } from "react-icons/hi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useChannelAcceptMutation } from "@/services/channel/channel.mutation";

export interface Notification {
  channelId: string;
  createdAt: string;
  isRead: boolean;
  message: string;
  userId: {
    _id: string;
    username: string;
  };
  __v: number;
  _id: string;
}

const Navbar = () => {
  const token = getDecodedToken();
  const userId = token?.id as string;
  const { data: user } = useGetUserByIdQuery(userId);
  const { data: notifications } = useGetNotificationsQuery();
  const acceptMutation = useChannelAcceptMutation();
  const [openNoti, setOpenNoti] = useState(false);

  const unreadNotificationsCount =
    notifications?.filter((noti: Notification) => !noti.isRead).length || 0;

  const handleAcceptInvite = (id: string) => {
    acceptMutation.mutate({ channelId: id });
  };
  return (
    <div className="flex sticky justify-end w-full h-12 items-center pl-5">
      <div className="flex items-center gap-2">
        <p className="capitalize text-gray-200">{user?.username}</p>
        <img
          loading="lazy"
          src={profile}
          alt="profile"
          className="w-8 h-8 mr-3 rounded-full object-cover"
        />
        <div className="relative">
          <div className="text-gray-200 relative mr-5">
            <p className="absolute -top-2 -right-2 bg-purple-800 text-white flex justify-center items-center rounded-full w-5 h-5">
              {unreadNotificationsCount > 0 ? unreadNotificationsCount : 0}
            </p>
            <AiFillBell
              onClick={() => setOpenNoti(!openNoti)}
              className="text-2xl z-50 cursor-pointer"
            />
          </div>
          {notifications?.length > 0 && openNoti && (
            <div className="transition-all duration-300 max-h-60 overflow-y-auto w-[30rem] pl-2  absolute top-full mt-1  right-0">
              {notifications?.map((noti: Notification) => (
                <div key={noti._id}>
                  <p
                    className={twMerge(
                      " text-sm tracking-wide rounded-md flex justify-between items-center px-2",
                      noti.isRead === true
                        ? "bg-white text-purple-500 pl-2 py-1.5"
                        : "bg-slate-500 text-white pl-2 py-1.5"
                    )}
                  >
                    <span>
                      {noti.message} from
                      <small className=" ml-2 text-sm">
                        {noti.userId.username}
                      </small>
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className=" bg-transparent border-none">
                          <HiDotsHorizontal className=" cursor-pointer " />
                        </TooltipTrigger>
                        {noti.isRead === true ? (
                          ""
                        ) : (
                          <TooltipContent>
                            <p
                              onClick={() => handleAcceptInvite(noti.channelId)}
                              className=" cursor-pointer"
                            >
                              Accept Invite
                            </p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
