import Logo from "../../assets/SPK_White 1.png";
import "./sidebar.css";
import { twMerge } from "tailwind-merge";
import React from "react";
import { IoIosLogOut } from "react-icons/io";
import MyButton from "../custom/buttons/MyButton";
import { ImSpinner2 } from "react-icons/im";
import MyInput from "../custom/inputs/MyInput";
import { MdDelete } from "react-icons/md";
import DeleteModal from "../modal/DeleteModal";
import { CiCirclePlus } from "react-icons/ci";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import CreateChannelModal from "../modal/CreateChannelModal";
import useSidebar from "./hooks/useSidebar";

interface SidebarProps {
  selectedChannelId: string;
  handleClickchannel: (channelId: string) => void;
}
const Sidebar: React.FC<SidebarProps> = ({
  handleClickchannel,
  selectedChannelId,
}) => {
  const {
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
  } = useSidebar();

  return (
    <section className="flex gap-6">
      <div
        className={`min-h-screen h-full flex flex-col bg-[#3D3D3D80] duration-300 text-gray-100 px-4`}
      >
        <div className="py-3 flex justify-between items-center">
          <img
            src={Logo}
            className={twMerge("p-3  duration-300")}
            loading="lazy"
            alt="Logo"
            width={"160px"}
            height={"20px"}
          />
        </div>
        <MyInput
          onChange={(e) => setSearch(e.target.value)}
          isSearchIcon
          placeholder="Search channel..."
          inputClassName={"text-white rounded bg-transparent pl-8"}
          className=" text-white rounded-none bg-transparent w-32"
        />
        <div className="mt-4 flex flex-col gap-2 relative">
          {isPaginatedLoading || isSearchLoading ? (
            <ImSpinner2
              size={20}
              className={twMerge("animate-spin fill-white stroke-white ")}
            />
          ) : (
            displayedChannels?.map((channel: any) => (
              <div
                key={channel._id}
                className={twMerge(
                  "group hover:bg-[#53535380] hover:text-gray-400 flex items-center text-sm  gap-3.5 font-medium p-2",
                  selectedChannelId === channel._id
                    ? "bg-[#53535380] text-gray-400"
                    : "text-purple-500"
                )}
              >
                <div className=" flex justify-between items-center w-full">
                  <h2
                    onClick={() => handleClickchannel(channel._id)}
                    className={twMerge(
                      `whitespace-pre  duration-300  select-none capitalize cursor-pointer `
                    )}
                  >
                    #{channel?.name}
                  </h2>
                  <MdDelete
                    onClick={() => setOpenDeleteModal(true)}
                    className=" text-lg cursor-pointer text-red-500 hidden group-hover:block"
                  />
                  {openDeleteModal && (
                    <DeleteModal
                      deleteMutation={deleteChannelMutation.isPending}
                      onConfirm={() => handleDeleteChannel(channel.id)}
                      isShow={openDeleteModal}
                      onClose={() => setOpenDeleteModal(false)}
                    />
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        <div className="mt-auto  mb-5 flex  items-center ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className=" bg-transparent border-none">
                <CiCirclePlus className=" text-2xl" />
              </TooltipTrigger>

              <TooltipContent>
                <p
                  onClick={() => setCreateModal(true)}
                  className=" text-sm cursor-pointer"
                >
                  Create channel
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {createModal && (
            <CreateChannelModal
              isShow={createModal}
              onClose={() => setCreateModal(false)}
            />
          )}
          <MyButton onClick={handleLogout} className="  rounded-none w-full">
            <IoIosLogOut className=" text-xl " />
            Logout
          </MyButton>
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
