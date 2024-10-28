import IconDeleteRed from "@/components/icons/IconDeleteRed";
import IconDetail from "@/components/icons/IconDetail";
import IconEdit from "@/components/icons/IconEdit";
import { FC, useState } from "react";

interface ActionModalProps {
  product: any;
  EditModal: any;
  DeleteModal?: any;
  DetailModal: any;
  title?: string;
  isDelete?: boolean;
}

const Actions: FC<ActionModalProps> = ({
  product,
  EditModal,
  DeleteModal,
  DetailModal,
  title,
  isDelete = true,
}) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);

  return (
    <div className="flex gap-2 items-center">
      <IconEdit
        className="cursor-pointer"
        onClick={() => setEditModalOpen(true)}
      />
      {isDelete && (
        <IconDeleteRed
          className="cursor-pointer"
          onClick={() => setDeleteModalOpen(true)}
        />
      )}
      <IconDetail
        className="cursor-pointer"
        onClick={() => setDetailModalOpen(true)}
      />

      {/* Render the passed Edit Modal */}
      {isEditModalOpen && (
        <EditModal
          product={product}
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      )}

      {/* Render the passed Delete Modal */}
      {isDeleteModalOpen && (
        <DeleteModal
          title={title}
          product={product}
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}

      {/* Render the passed Detail Modal */}
      {isDetailModalOpen && (
        <DetailModal
          product={product}
          isOpen={isDetailModalOpen}
          onClose={() => setDetailModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Actions;
