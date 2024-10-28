import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MyButton from "../custom/buttons/MyButton";
import useMember from "../message/hooks/useMember";
import MyInput from "../custom/inputs/MyInput";
import { ImSpinner2 } from "react-icons/im";
import { twMerge } from "tailwind-merge";
import { Form } from "../ui/form";
import MyFormItem from "../custom/inputs/MyFormItem";
import { Checkbox } from "../ui/checkbox";

interface DeleteModalProps {
  isShow: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

const AdddMemberModal: React.FC<DeleteModalProps> = ({ isShow, onClose }) => {
  const {
    handleInviteClick,
    handleCheckboxChange,
    handleChange,
    users,
    isLoading,
    isInviting,
    form,
    query,
  } = useMember(onClose);

  return (
    <Dialog open={isShow} onOpenChange={onClose}>
      <DialogContent className=" bg-gray-900 border-none min-h-80">
        <DialogHeader>
          <DialogTitle className="">
            <h3 className="text-gray-100  text-lg font-semibold tracking-wide">
              Add member
            </h3>
          </DialogTitle>

          <MyInput
            value={query}
            onChange={handleChange}
            placeholder="Search user name..."
            inputClassName="bg-transparent rounded mt-5 text-gray-200"
          />
        </DialogHeader>
        <div>
          {isLoading ? (
            <ImSpinner2
              size={20}
              className={twMerge("animate-spin fill-white stroke-white ")}
            />
          ) : (
            users?.map((user) => (
              <Form {...form} key={user._id}>
                <form
                  onSubmit={handleInviteClick}
                  className="flex  w-full  items-center gap-2 justify-start"
                >
                  <div className="w-4">
                    <MyFormItem name="userId" form={form}>
                      {(field) => (
                        <Checkbox
                          id={`name_${user._id}`}
                          className="w-4 h-4 p-0"
                          checked={field.value === user._id}
                          onCheckedChange={() => handleCheckboxChange(user._id)}
                        />
                      )}
                    </MyFormItem>
                  </div>
                  <p className=" text-gray-200 mb-3 cursor-pointer">
                    <label
                      htmlFor={`name_${user._id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {user.username}
                    </label>
                  </p>
                </form>
              </Form>
            ))
          )}
        </div>
        <div className=" flex justify-end items-end mt-5 gap-5">
          <MyButton
            isLoading={isInviting}
            onClick={handleInviteClick}
            type="button"
            className=" bg-transparent border border-purple-800 text-purple-500 hover:bg-purple-800 hover:text-white hover:border-purple-800"
          >
            Invite
          </MyButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdddMemberModal;
