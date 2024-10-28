import { useSearchUsers } from "@/services/users/user.query";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChannelInviteMutation } from "@/services/channel/channel.mutation";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const FormSchema = z.object({
  userId: z.string().optional(),
});

const useMember = (onClose: () => void) => {
  const [query, setQuery] = useState("");
  const [searchParams] = useSearchParams();

  const channelId = searchParams.get("channelId") as string;
  const { data: users, isLoading } = useSearchUsers(query);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userId: "",
    },
  });

  const { mutate: inviteUser, isPending: isInviting } =
    useChannelInviteMutation();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleCheckboxChange = (userId: string) => {
    const currentUserId = form.getValues("userId") as string;
    form.setValue("userId", currentUserId === userId ? undefined : userId);
  };

  const handleInviteClick = () => {
    const userId = form.getValues("userId");

    if (userId) {
      inviteUser(
        { channelId, userId },
        {
          onSuccess: () => {
            if (!isInviting) {
              onClose();
              toast.success("Invited Successfully");
            }
          },
          onError: (error) => {
            toast.error(error.response?.data.message || "Something Wrong");
            console.error(error);
          },
        }
      );
    }
  };
  return {
    handleInviteClick,
    handleCheckboxChange,
    handleChange,
    users,
    isLoading,
    isInviting,
    form,
    query,
  };
};

export default useMember;
