import {
  useGetChannelDetailQuery,
  useGetChannelQuery,
} from "@/services/channel/channel.query";
import { twMerge } from "tailwind-merge";
import profile from "@/assets/pro.webp";
import { ImSpinner2 } from "react-icons/im";
import { useState } from "react";

const ChannelMember = ({
  selectedChannelId,
}: {
  selectedChannelId: string;
}) => {
  const { data: members, isLoading } =
    useGetChannelDetailQuery(selectedChannelId);
  const [page] = useState(1);
  const limit = 10;

  const { data: channels } = useGetChannelQuery(page, limit);

  const filteredChannels = channels?.channels?.map((channel) => ({
    ...channel,
    invitedUsers: channel.invitedUsers.filter(
      (user) => user.status === "pending"
    ),
  }));

  console.log("filteredChannels =>", filteredChannels);

  return (
    <div>
      <section className="flex gap-6">
        <div
          className={` min-h-screen bg-[#3D3D3D80] duration-300 text-gray-100 px-4`}
        >
          <div className="mt-4 flex flex-col gap-2 relative">
            <p className=" tracking-wide text-sm ">Members</p>
            {isLoading ? (
              <ImSpinner2
                size={20}
                className={twMerge("animate-spin fill-white stroke-white ")}
              />
            ) : (
              members?.channels?.members.map((member, i) => (
                <div
                  key={member.userId}
                  className={twMerge(
                    "group flex items-center text-sm  gap-3.5 font-medium p-2 rounded-md"
                  )}
                >
                  <div className="icon duration-300 ease "></div>
                  <div className=" flex items-center gap-3 ">
                    <img
                      className=" w-8 h-8 rounded-full object-cover"
                      loading="lazy"
                      src={profile}
                      alt="profile"
                    />

                    <h2
                      style={{
                        transitionDelay: `${i + 3}00ms`,
                      }}
                      className={twMerge(
                        `whitespace-pre  duration-300  select-none capitalize `
                      )}
                    >
                      {member?.username}
                    </h2>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="mt-4 flex flex-col gap-2 relative">
            <p className=" tracking-wide text-sm ">Invited user</p>
            {isLoading ? (
              <ImSpinner2
                size={20}
                className={twMerge("animate-spin fill-white stroke-white ")}
              />
            ) : (
              filteredChannels?.map((channel, i) => (
                <div
                  key={channel._id}
                  className={twMerge(
                    "group flex flex-col items-center text-sm  gap-3.5 font-medium p-2 rounded-md"
                  )}
                >
                  {channel.invitedUsers.map((user) => (
                    <div key={user._id}>
                      <div className="icon duration-300 ease "></div>
                      <div className=" flex items-center gap-3 ">
                        <img
                          className=" w-8 h-8 rounded-full object-cover"
                          loading="lazy"
                          src={profile}
                          alt="profile"
                        />

                        <h2
                          style={{
                            transitionDelay: `${i + 3}00ms`,
                          }}
                          className={twMerge(
                            `whitespace-pre  duration-300  select-none capitalize `
                          )}
                        >
                          {user?.username}
                        </h2>
                      </div>
                    </div>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChannelMember;
