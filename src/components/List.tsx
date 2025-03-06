import { Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { IList } from "../types/global";
import Card from "./Card";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";
import ConfirmationModal from "./modals/ConfirmationModal";
import { useDispatch } from "react-redux";
import { deleteList, updateList } from "../redux/reducers/boardReducer";
import { AddCard } from "./AddCard";
interface ListProps {
  list: IList;
  index: number;
}
const List: React.FC<ListProps> = ({ list, index }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState<Boolean>(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const saveList = () => {
    setIsEditing(false);
    if (!title) {
      return;
    }
    dispatch(updateList({ list, title }));
  };

  const onDeleteList = () => {
    dispatch(deleteList(list));
    setShowDeleteConfirmationModal(false);
  };
  return (
    <>
      <Draggable draggableId={`${list.id}`} index={index} key={list.id}>
        {(listDraggableProvided: DraggableProvided) => {
          return (
            <div
              className="flex relative box-border mx-1.5 flex-none flex-col self-start justify-between w-[272px] max-h-full pb-2 rounded-xl p-2 bg-[#f1f2f4] shadow-[0px_1px_1px_rgba(9,30,66,0.25),0px_0px_1px_rgba(9,30,66,0.31)] text-[#44546f] align-top whitespace-normal scroll-m-2"
              ref={listDraggableProvided.innerRef}
              {...listDraggableProvided.dragHandleProps}
              {...listDraggableProvided.draggableProps}
            >
              <div className="flex justify-between items-center">
                {isEditing ? (
                  <textarea
                    className="flex-1 resize-y text-sm h-auto font-semibold leading-5 text-ellipsis text-gray-700 p-2 py-1 m-1 my-1 pe-0 outline-none focus:outline-violet-800 focus:outline-2"
                    defaultValue={list.title}
                    value={title}
                    onBlur={saveList}
                    onKeyDownCapture={(event) => {
                      if (event.key === "Enter") {
                        saveList();
                      } else if (event.key === "Escape") {
                        setIsEditing(false);
                      }
                    }}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus={true}
                    onFocus={(e) => e.currentTarget.select()}
                  ></textarea>
                ) : (
                  <h1
                    className="flex-1 text-sm font-semibold leading-5 text-ellipsis text-gray-700 p-2 py-1 pe-0 m-1 my-1 "
                    onClick={() => {
                      setIsEditing(true);
                    }}
                  >
                    {list.title}
                  </h1>
                )}
                <span
                  className="cursor-pointer p-2 transition duration-100 ease-in-out text-gray-700 hover:text-red-500 hover:bg-red-100 rounded-lg"
                  onClick={() => setShowDeleteConfirmationModal(true)}
                >
                  <MdDeleteOutline className="size-4" />
                </span>
              </div>
              <Droppable droppableId={`${list.id}`} type="ROW" direction="vertical" ignoreContainerClipping={true} isCombineEnabled={true}>
                {(cardDroppableProvided: DroppableProvided) => (
                  <div className="flex flex-col" ref={cardDroppableProvided.innerRef} {...cardDroppableProvided.droppableProps}>
                    {list.cards.map((card, innerIndex: number) => (
                      <Card card={card} list={list} index={innerIndex} key={card.id} />
                    ))}
                    {cardDroppableProvided.placeholder}
                    <AddCard list={list} />
                  </div>
                )}
              </Droppable>
            </div>
          );
        }}
      </Draggable>
      <ConfirmationModal
        title="Delete List"
        message={`Are you sure you want to delete the list "${list.title}"?`}
        onConfirm={onDeleteList}
        isOpen={showDeleteConfirmationModal}
        onCancel={() => setShowDeleteConfirmationModal(false)}
      />
    </>
  );
};
export default List;
