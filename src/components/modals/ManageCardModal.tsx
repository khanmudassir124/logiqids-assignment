import { useEffect, useRef, useState } from "react";
import Dialog from "../Dialog";
import { ICard, IList } from "../../types/global";
import { IoMdClose } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa6";
import { HiBars3BottomLeft } from "react-icons/hi2";
import { CiCalendarDate } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { deleteCard, updateCard } from "../../redux/reducers/boardReducer";
import ConfirmationModal from "./ConfirmationModal";

interface ManageCardModalProps {
  list: IList;
  card: ICard;
  isOpen: boolean;
  onClose: () => void;
}
const ManageCardModal: React.FC<ManageCardModalProps> = ({ list, card, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<string>(card?.dueDate || "");
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      openDialog();
    } else {
      closeDialog();
    }
  }, [isOpen]);

  const openDialog = () => dialogRef?.current?.showModal();
  const closeDialog = () => {
    dialogRef?.current?.close();
    onClose();
  };

  const handleCancelClick = () => {
    closeDialog();
  };

  const handleDateClick = () => {
    if (dateRef.current) {
      dateRef.current.showPicker();
    }
  };

  const formatDate = (date: string) => {
    if (!date) return date;
    const newDate = new Date(date);
    return newDate.toLocaleString("en-GB", {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newCard = Object.fromEntries(formData.entries());
    console.log(newCard);
    dispatch(updateCard({ card: { id: card.id, ...newCard }, list }));
    closeDialog();
    event.currentTarget.reset();
  };

  const onDeleteCard = () => {
    dispatch(deleteCard({ card, list }));
    setShowDeleteConfirmationModal(false);
  };

  const formattedDate = formatDate(date);

  return (
    <Dialog ref={dialogRef} onClose={handleCancelClick}>
      <button
        onClick={onClose}
        type="button"
        className="absolute p-2 rounded-full text-gray-600 transition duration-100 ease-in-out hover:bg-black/10 outline-none right-1.5 top-1.5"
      >
        <IoMdClose size={24} />
      </button>
      <form onSubmit={handleFormSubmit} className="flex flex-col justify-start items-start w-full gap-4">
        <div className="flex justify-start items-start w-full gap-1">
          <span className="text-gray-500 py-2.5">
            <FaRegCircle size={18} />
          </span>
          <div className="flex-1 flex flex-col justify-between items-start pe-14 gap-1">
            <textarea
              className="w-full text-xl h-auto rounded-sm font-semibold leading-5 text-ellipsis text-gray-700 p-2 py-1 m-1 outline-none resize-none bg-transparent focus:outline-violet-800 focus:outline-2 focus:bg-white"
              defaultValue={card.title}
              name="title"
              rows={1}
              autoFocus={false}
            ></textarea>
            <p className="text-xs text-gray-500 ms-3  ">
              in list <span className="bg-gray-200 text-gray-600 font-semibold uppercase px-1 rounded-sm py-0.5 text-[11px]">{list.title}</span>
            </p>
          </div>
        </div>
        <div className="flex justify-start items-start w-full gap-2.5">
          <span className="text-gray-800 py-1.5">
            <CiCalendarDate size={24} />
          </span>
          <div className="flex-1 flex flex-col justify-between items-start gap-2.5">
            <label className="w-full text-base h-auto rounded-sm font-semibold leading-5 text-gray-700 py-1 outline-none resize-none bg-transparent">
              Due Date
            </label>
            <span
              onClick={handleDateClick}
              className="text-sm h-auto rounded-sm text-ellipsis text-gray-700 p-2 outline-none placeholder-gray-700  bg-gray-200 hover:bg-gray-300 active:bg-white focus:outline-violet-800 focus:outline-2 focus:bg-white "
            >
              {formattedDate || "Select Due Date"}
            </span>
            <input
              className="invisible h-0"
              ref={dateRef}
              name="dueDate"
              id="dueDate"
              type="datetime-local"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
              autoFocus={false}
            />
          </div>
        </div>
        <div className="flex justify-start items-start w-full gap-2.5">
          <span className="text-gray-800 py-1.5">
            <HiBars3BottomLeft size={24} />
          </span>
          <div className="flex-1 flex flex-col justify-between items-start gap-2.5">
            <label
              htmlFor="description"
              className="w-full text-base h-auto rounded-sm font-semibold leading-5 text-gray-700 py-1 outline-none resize-none bg-transparent"
            >
              Description
            </label>
            <textarea
              className="w-full text-sm h-auto rounded-sm text-ellipsis text-gray-700 p-2 outline-none placeholder-gray-700  bg-gray-200 hover:bg-gray-300 active:bg-white focus:outline-violet-800 focus:outline-2 focus:bg-white "
              defaultValue={card.description}
              name="description"
              id="description"
              rows={5}
              autoFocus={false}
              placeholder="Add a more detailed description..."
            ></textarea>
          </div>
        </div>

        <div className="w-full flex justify-between items-center">
          <button
            type="button"
            className=" justify-center min-w-20 px-4 py-2 text-sm font-medium text-red-700  rounded-md hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            onClick={() => setShowDeleteConfirmationModal(true)}
          >
            {"Delete"}
          </button>
          <div className=" flex justify-end items-center gap-2 ">
            <button
              type="button"
              className=" justify-center min-w-20 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleCancelClick}
            >
              {"Close"}
            </button>
            <button
              type="submit"
              className="justify-center min-w-20 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {"Save"}
            </button>
          </div>
        </div>
      </form>
      <ConfirmationModal
        title="Delete Card"
        message={`Are you sure you want to delete card ${card.title}?`}
        confirmText="Yes"
        cancelText="No"
        isOpen={showDeleteConfirmationModal}
        onConfirm={onDeleteCard}
        onCancel={() => setShowDeleteConfirmationModal(false)}
      />
    </Dialog>
  );
};

export default ManageCardModal;
