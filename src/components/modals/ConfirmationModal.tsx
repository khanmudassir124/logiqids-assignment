import { useEffect, useRef } from "react";
import Dialog from "../Dialog";

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}
const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel,
  isOpen = false,
  title = "Confirm Action",
  message = "Are you sure?",
  confirmText = "Yes",
  cancelText = "No",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openDialog = () => dialogRef?.current?.showModal();
  const closeDialog = () => dialogRef?.current?.close();

  const handleConfirmClick = () => {
    onConfirm();
    closeDialog();
  };
  const handleCancelClick = () => {
    onCancel();
    closeDialog();
  };
  useEffect(() => {
    if (isOpen) {
      openDialog();
    } else {
      closeDialog();
    }
  }, [isOpen]);
  return (
    <Dialog
      ref={dialogRef}
      onClose={handleCancelClick}
      title={title}
      onKeyDown={(e) => {
        console.log(e.key);
        if (e.key === "Escape") {
          handleCancelClick();
        } else if (e.key === "Enter") {
          handleConfirmClick();
        }
      }}
    >
      <>
        <p className="text-gray-600 ">{message}</p>
        <div className="w-full flex justify-end items-center gap-2 mt-5">
          <button
            className=" justify-center min-w-20 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleCancelClick}
          >
            {cancelText}
          </button>
          <button
            className="justify-center min-w-20 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleConfirmClick}
          >
            {confirmText}
          </button>
        </div>
      </>
    </Dialog>
  );
};

export default ConfirmationModal;
