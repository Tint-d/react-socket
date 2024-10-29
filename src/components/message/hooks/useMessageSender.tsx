import { useSocket } from "@/context/SocketContext";
import { useMessages } from "@/hooks/useMessages";
import { useGetChannelDetailQuery } from "@/services/channel/channel.query";
import { useMessageDeleteMutation } from "@/services/message/message.mutation";
import { getDecodedToken } from "@/util/tokenDecode";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

export interface Message {
  id: string;
  message: string;
  sender_name: string;
  timestamp: string;
}

const useMessageSender = () => {
  const socket = useSocket();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("channelId") as string;
  const { data: messages, isLoading } = useMessages(channelId);
  const [selectedMessageId, setSelectedMessageId] = useState<string>();
  const deleteMutation = useMessageDeleteMutation(selectedMessageId as string);

  const [newMessage, setNewMessage] = useState<string>("");
  const [isShow, setIsShow] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const decodeToken = getDecodedToken();
  const senderId = decodeToken?.id;

  const existMessages = messages?.message || [];
  const { data: members } = useGetChannelDetailQuery(channelId);

  useEffect(() => {
    socket.emit("joinChannel", channelId);

    const handleNewMessage = (message: Message) => {
      queryClient.setQueryData(["messages", channelId], (oldMessages: any) => {
        if (Array.isArray(oldMessages)) {
          return [...oldMessages, message];
        }
        return [message];
      });
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.emit("leaveChannel", channelId);
    };
  }, [socket, queryClient, channelId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      socket.emit("sendMessage", {
        channelId,
        message: newMessage,
        senderId,
      });
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      setNewMessage("");
    }
  };

  const onEmojiClick = (emojiObject: any) => {
    setNewMessage((prev) => prev + (emojiObject.emoji || ""));
    setShowEmojiPicker(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleDeleteMessage = (id: string) => {
    deleteMutation.mutate(
      { id },
      {
        onSuccess: () => {
          setIsShow(false);
          toast.success("Message deleted successfully");
          queryClient.invalidateQueries({ queryKey: ["messages"] });
        },
        onError: (error) => {
          toast.error(
            error.response?.data.message ||
              "U can't delete other person message"
          );
          console.error("Error deleting message:", error);
        },
      }
    );
    setSelectedMessageId(id);
  };
  return {
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
  };
};

export default useMessageSender;
