import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { addCard, addList } from "../redux/reducers/boardReducer";
import { IList } from "../types/global";
interface AddListProps {}

export const AddList: React.FC<AddListProps> = ({}) => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState<Boolean>(false);
  const [title, setTitle] = useState<string>("");
  const onAddListClick = () => {
    if (!title) {
      return;
    }
    dispatch(addList({ title }));
    setIsClicked(false);
    setTitle("");
  };

  return isClicked ? (
    <div
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsClicked(false);
        }
      }}
      tabIndex={-1}
      className="bg-[#f1f2f4] min-w-[272px] h-fit mx-1 p-3 rounded-xl"
    >
      <div className="mb-3">
        <input
          type="text"
          autoFocus
          placeholder="Enter list name..."
          className="w-full pl-2 text-sm py-1 rounded-sm focus:outline-violet-800 focus:outline-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          // onBlur={(e) => {
          //   console.log(e.relatedTarget);
          //   if (!e.relatedTarget || !e.relatedTarget.closest("button")) {
          //     setIsClicked(false);
          //   }
          // }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onAddListClick();
            } else if (e.key === "Escape") {
              setIsClicked(false);
            }
          }}
        />
      </div>
      <div className="flex justify-start items-center gap-1">
        <button
          onClick={onAddListClick}
          className="text-sm text-white font-medium transition duration-100 ease-in-out bg-[#0c66e4] hover:bg-[#0055cc] rounded-sm py-1.5 px-3"
        >
          Add list
        </button>
        <button onClick={() => setIsClicked(false)} className="p-1.5 rounded-sm transition duration-100 ease-in-out hover:bg-black/10">
          <IoMdClose size={20} />
        </button>
      </div>
    </div>
  ) : (
    <button
      onClick={() => {
        setIsClicked(true);
      }}
      className="flex gap-2 mx-1 justify-start min-w-[272px] p-3 rounded-xl text-white text-sm font-medium items-center cursor-pointer border-none shadow-none transition-colors duration-75 ease-in-out bg-[#ffffff3d] hover:bg-[#ffffff29]"
    >
      <IoMdAdd color="white" />
      Add another list
    </button>
  );
};

interface AddCardProps {
  list: IList;
}

export const AddCard: React.FC<AddCardProps> = ({ list }) => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState<Boolean>(false);
  const [title, setTitle] = useState<string>("");
  const onAddCardClick = () => {
    if (!title) {
      return;
    }
    dispatch(addCard({ list, cardTitle: title }));
    setIsClicked(false);
    setTitle("");
  };

  return isClicked ? (
    <div
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setIsClicked(false);
        }
      }}
      tabIndex={-1}
    >
      <textarea
        rows={2}
        autoFocus
        placeholder="Enter a title or paste a link..."
        className="my-1 w-full text-pretty relative text-sm rounded-lg bg-white shadow-md ring-1 ring-gray-300 text-gray-700 p-2 py-2 cursor-pointer border-2 border-transparent transition duration-100 ease-in-out hover:border-violet-800 hover:border-2 outline-none focus:border-violet-800 focus:border-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onAddCardClick();
          } else if (e.key === "Escape") {
            setIsClicked(false);
          }
        }}
      />
      <div className="flex justify-start items-center gap-1">
        <button
          onClick={onAddCardClick}
          className="text-sm text-white font-medium transition duration-100 ease-in-out bg-[#0c66e4] hover:bg-[#0055cc] rounded-sm py-1.5 px-3"
        >
          Add card
        </button>
        <button onClick={() => setIsClicked(false)} className="p-1.5 rounded-sm transition duration-100 ease-in-out hover:bg-black/10">
          <IoMdClose size={20} />
        </button>
      </div>
    </div>
  ) : (
    <button
      onClick={() => {
        setIsClicked(true);
      }}
      className="flex gap-2 mt-1 justify-start w-full p-2 py-1.5 rounded-lg text-gray-500 hover:text-gray-700 text-sm font-medium items-center cursor-pointer border-none shadow-none transition-colors duration-75 ease-in-out bg-transparent hover:bg-[#091e4224]"
    >
      <IoMdAdd size={18} />
      Add card
    </button>
  );
};
