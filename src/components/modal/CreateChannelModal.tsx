import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MyButton from "../custom/buttons/MyButton";
import { Form } from "../ui/form";
import MyFormItem from "../custom/inputs/MyFormItem";
import MyInput from "../custom/inputs/MyInput";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "../ui/checkbox";
import { useChannelCreateMutation } from "@/services/channel/channel.mutation";

interface CreateChannelModalProps {
  isShow: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().min(3, { message: "Name must have at least 3 characters" }),
  isPrivate: z.boolean().default(true).optional(),
});

const CreateChannelModal: React.FC<CreateChannelModalProps> = ({
  isShow,
  onClose,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      isPrivate: true,
    },
  });

  const createChannelMutation = useChannelCreateMutation();

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await createChannelMutation.mutateAsync({
      name: data.name,
      isPrivate: data.isPrivate as boolean,
    });
    onClose(); // Close the modal after successful creation
  };

  return (
    <Dialog open={isShow} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 border-none">
        <DialogHeader>
          <DialogTitle className="text-gray-200 tracking-wide">
            Create Channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <MyFormItem name="name" form={form}>
              {(field) => (
                <MyInput
                  inputClassName="rounded mt-5 text-white"
                  placeholder="name..."
                  {...field}
                  className="w-4 h-4 p-0"
                />
              )}
            </MyFormItem>
            <div className="flex max-w-20 gap-2 mt-5">
              <MyFormItem name="isPrivate" form={form}>
                {(field) => (
                  <Checkbox
                    id="private"
                    className="w-4 h-4 p-0"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              </MyFormItem>
              <label htmlFor="private" className="text-gray-200">
                isPrivate
              </label>
            </div>
            <div className="flex justify-end items-center mt-5 gap-5">
              <MyButton
                isLoading={createChannelMutation.isPending} // Show loading state
                className="bg-transparent border border-purple-800 text-purple-500 hover:bg-purple-800 hover:text-white hover:border-purple-800"
                type="submit" // Set the type to submit
              >
                Create
              </MyButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelModal;
