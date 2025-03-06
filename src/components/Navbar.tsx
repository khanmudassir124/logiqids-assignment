import { FaTrello } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { resetBoard } from "../redux/reducers/boardReducer";
import ConfirmationModal from "./modals/ConfirmationModal";
import { useState } from "react";
interface NavbarProps {}
const Navbar: React.FC<NavbarProps> = ({}) => {
  const dispatch = useDispatch();
  const [showResetConfirmationModal, setShowResetConfirmationModal] = useState<boolean>(false);

  const handleResetBoard = () => {
    dispatch(resetBoard());
  };
  return (
    <nav className="shadow-md p-4 py-2 flex justify-between items-center bg-gradient-to-r from-indigo-700 to-purple-700">
      <div className="flex gap-2 items-center">
        <FaTrello size={18} color="white" />
        <span className="text-xl font-bold  text-white">Trello</span>
      </div>
      <button
        onClick={() => setShowResetConfirmationModal(true)}
        className="flex gap-1 items-center rounded-lg transition duration-100 ease-in-out bg-[#fff5] hover:bg-[#fff3] p-1.5 px-2.5"
      >
        <GrPowerReset size={14} color="white" />
        <span className="text-sm font-medium text-white">Reset</span>
      </button>
      <ConfirmationModal
        title="Reset Board"
        message="Are you sure you want to reset the entire board?"
        confirmText="Reset"
        cancelText="Close"
        isOpen={showResetConfirmationModal}
        onConfirm={handleResetBoard}
        onCancel={() => setShowResetConfirmationModal(false)}
      />
    </nav>
  );
};
export default Navbar;
