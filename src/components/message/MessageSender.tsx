import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { FaSmile } from "react-icons/fa";
import useMessageSender, { Message } from "./hooks/useMessageSender";
import profile from "@/assets/pro.webp";
import { format } from "date-fns";
import { LuUsers2 } from "react-icons/lu";
import { HiDotsHorizontal } from "react-icons/hi";
import DeleteModal from "../modal/DeleteModal";
import AdddMemberModal from "../modal/AdddMemberModal";
import MyButton from "../custom/buttons/MyButton";

const MessageSender: React.FC = () => {
  const {
    handleSendMessage,
    handleInputChange,
    onEmojiClick,
    members,
    existMessages,
    showEmojiPicker,
    isLoading,
    newMessage,
    setShowEmojiPicker,
    isShow,
    setIsShow,
    handleDeleteMessage,
    deleteMutation,
  } = useMessageSender();

  const [memberModal, setMemberModal] = useState(false);

  if (isLoading) {
    return <div>Loading messages...</div>;
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-grow h-auto ">
        <div className="flex flex-col justify-end mb-7 ">
          <h2 className="text-gray-100 text-3xl font-bold mb-5 tracking-wide">
            Welcome to #{members?.channels.name}!
          </h2>
          <p className="text-gray-100 tracking-wide text-sm">
            This is the start of #{members?.channels.name} channel
          </p>
          <p
            onClick={() => setMemberModal(true)}
            className="cursor-pointer text-purple-500 flex items-center gap-3 text-sm mt-5"
          >
            <LuUsers2 className=" text-lg" />
            Add members
          </p>
          {memberModal && (
            <AdddMemberModal
              onClose={() => setMemberModal(false)}
              isShow={memberModal}
              onConfirm={() => {}}
            />
          )}
        </div>
        {existMessages.map((msg: Message) => (
          <div
            key={msg.id}
            className="group flex justify-between items-start hover:bg-gray-700 px-2 transition-all duration-150"
          >
            <div className="flex items-center gap-7 mb-4">
              <img
                className="w-10 h-10 rounded-full object-cover"
                loading="lazy"
                src={profile}
                alt="profile"
              />
              <div>
                <div className="flex items-end gap-3">
                  <p className="capitalize text-gray-50">{msg.sender_name}</p>
                  <small className="text-gray-50 font-medium">
                    {format(new Date(msg.timestamp), "dd/MM/yyyy HH:mm")}
                  </small>
                </div>
                <p className="text-gray-400 text-sm mt-2">{msg.message}</p>
              </div>
            </div>

            <div
              onClick={() => setIsShow(true)}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
            >
              <HiDotsHorizontal className="text-white cursor-pointer text-lg" />
            </div>
            {isShow && (
              <DeleteModal
                deleteMutation={deleteMutation.isPending}
                onConfirm={() => handleDeleteMessage(msg.id)}
                isShow={isShow}
                onClose={() => setIsShow(false)}
              />
            )}
          </div>
        ))}
      </div>
      <div>
        <div className="relative flex mt-4 gap-3">
          {showEmojiPicker && (
            <div className="absolute bottom-20 right-0 z-10">
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}

          <div className="flex items-center border rounded  w-full bg-gray-800 mb-5">
            <textarea
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Type your message here"
              className="ml-5 h-5 flex-grow bg-transparent text-white outline-none overflow-hidden resize-none"
            />

            <button
              onClick={(e) => {
                e.preventDefault();
                setShowEmojiPicker((prev) => !prev);
              }}
              className="text-gray-500 ml-2 bg-transparent border-none focus:none"
            >
              <FaSmile className=" text-xl " />
            </button>
          </div>
          <MyButton type="button" className="" onClick={handleSendMessage}>
            send
          </MyButton>
        </div>
      </div>
    </div>
  );
};

export default MessageSender;
