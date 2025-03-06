import { Draggable, DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd";
import { ICard, IList } from "../types/global";
import { useState } from "react";
import { TbEdit } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { updateCard } from "../redux/reducers/boardReducer";
import ManageCardModal from "./modals/ManageCardModal";

interface CardProps {
  list: IList;
  card: ICard;
  index: number;
}
const Card: React.FC<CardProps> = ({ list, card, index }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [showManageCardModal, setShowManageCardModal] = useState<boolean>(false);
  const [cardTitle, setCardTitle] = useState<string>("");
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  const saveCard = () => {
    setIsEditing(false);
    if (!cardTitle) {
      return;
    }
    dispatch(updateCard({ card: { ...card, title: cardTitle }, list }));
  };

  return (
    <>
      <Draggable draggableId={"CARD" + card.id} index={index} key={card.id}>
        {(cardDraggableProvided: DraggableProvided, cardSnapshot: DraggableStateSnapshot) => {
          return isEditing ? (
            <textarea
              className="my-1 text-pretty relative text-sm rounded-lg bg-white shadow-md ring-1 ring-gray-300 text-gray-700 p-2 py-2 cursor-pointer border-2 border-transparent transition duration-100 ease-in-out hover:border-violet-800 hover:border-2 outline-none focus:border-violet-800 focus:border-2"
              defaultValue={card.title}
              value={cardTitle}
              onBlur={() => setIsEditing(false)}
              onKeyDownCapture={(event) => {
                if (event.key === "Enter") {
                  saveCard();
                } else if (event.key === "Escape") {
                  setIsEditing(false);
                }
              }}
              onChange={(e) => setCardTitle(e.target.value)}
              autoFocus={true}
              onFocus={(e) => e.currentTarget.select()}
            ></textarea>
          ) : (
            <div
              className="group my-1 flex justify-between items-start text-pretty relative text-sm rounded-lg bg-white shadow-md ring-1 ring-gray-300 text-gray-700 p-2 py-2 cursor-pointer border-2 border-transparent transition duration-100 ease-in-out hover:border-violet-800 hover:border-2"
              ref={cardDraggableProvided.innerRef}
              {...cardDraggableProvided.draggableProps}
              {...cardDraggableProvided.dragHandleProps}
              onClick={() => setShowManageCardModal(true)}
            >
              {card.title}
              <span
                className="cursor-pointer p-1.5 text-lg -m-2 transition duration-100 ease-in-out hover:text-gray-700 hover:bg-gray-200 rounded-full hidden group-hover:block"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEditing();
                }}
              >
                <TbEdit />
              </span>
            </div>
          );
        }}
      </Draggable>
      <ManageCardModal list={list} card={card} isOpen={showManageCardModal} onClose={() => setShowManageCardModal(false)} />
    </>
  );
};
export default Card;
