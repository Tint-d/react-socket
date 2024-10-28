import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MyButton from "../custom/buttons/MyButton";
import { DialogClose } from "@radix-ui/react-dialog";

interface DeleteModalProps {
  isShow: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deleteMutation: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isShow,
  onClose,
  onConfirm,
  deleteMutation,
}) => {
  return (
    <Dialog open={isShow} onOpenChange={onClose}>
      <DialogContent className=" bg-gray-900 border-none">
        <DialogHeader>
          <DialogTitle className=" text-center text-gray-200 tracking-wide">
            Are you sure to Delete?
          </DialogTitle>
        </DialogHeader>
        <div className=" flex justify-center items-center mt-5 gap-5">
          <MyButton
            isLoading={deleteMutation}
            className=" bg-red-500 border-none"
            onClick={onConfirm}
          >
            Delete
          </MyButton>
          <DialogClose asChild>
            <MyButton
              type="button"
              className=" bg-transparent border border-purple-800 text-purple-500 hover:bg-purple-800 hover:text-white hover:border-purple-800"
            >
              Cancel
            </MyButton>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
