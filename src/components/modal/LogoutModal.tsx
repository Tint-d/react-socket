import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import MyButton from "../custom/buttons/MyButton";
import { useNavigate } from "react-router-dom";

const LogoutModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    if (onClose) onClose();
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className=" bg-gray-900 border-none">
          <DialogHeader>
            <DialogTitle className="text-center text-gray-200 tracking-wide">
              Session Expired"
            </DialogTitle>

            <DialogDescription className=" text-center">
              Your session has expired. Please log in again.
            </DialogDescription>
          </DialogHeader>
          <div className=" flex justify-center items-center mt-5 gap-5">
            <MyButton onClick={handleLogout}>Login</MyButton>
            <DialogClose asChild>
              <MyButton
                type="button"
                className=" bg-transparent border border-red-800 text-red-500 hover:bg-red-800 hover:text-white hover:border-red-800"
              >
                Cancel
              </MyButton>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LogoutModal;
