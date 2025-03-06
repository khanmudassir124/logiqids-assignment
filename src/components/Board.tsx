import List from "./List";
import { DragDropContext, DropResult, Droppable, DroppableProvided } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import useBoard from "../redux/hooks/useBoard";
import { updateBoard } from "../redux/reducers/boardReducer";
import { AddList } from "./AddCard";
import { IList } from "../types/global";

interface BoardProps {}
const Board: React.FC<BoardProps> = ({}) => {
  const dispatch = useDispatch();
  const lists = useBoard();

  const onDragEnd = (dropResult: DropResult) => {
    if (!dropResult.destination) {
      return;
    }
    const { destination, source, type, draggableId } = dropResult;
    if (type === "COLUMN") {
      // SORTING LISTS START
      const newLists = [...lists];
      newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, lists[source.index]);
      dispatch(updateBoard(newLists));
      // SORTING LISTS END
    } else if (type === "ROW") {
      // SORTING CARDS START
      const sourceListId = Number(source.droppableId);
      const destinationListId = Number(destination.droppableId);
      const newLists: IList[] = JSON.parse(JSON.stringify(lists));
      const sourceListIndex = newLists.findIndex((list) => list.id === sourceListId);
      const destinationListIndex = newLists.findIndex((list) => list.id === destinationListId);
      if (sourceListIndex !== -1 && destinationListIndex !== -1) {
        const draggedCard = newLists[sourceListIndex].cards[source.index];
        newLists[sourceListIndex].cards.splice(source.index, 1);
        newLists[destinationListIndex].cards.splice(destination.index, 0, draggedCard);
        dispatch(updateBoard(newLists));
      }
      // SORTING CARDS END
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex-1 flex items-start justify-start p-4 overflow-x-auto overflow-y-auto">
        <Droppable droppableId="Board" type="COLUMN" direction="horizontal" ignoreContainerClipping={true} isCombineEnabled={true}>
          {(listDroppableProvided: DroppableProvided) => (
            <div ref={listDroppableProvided.innerRef} {...listDroppableProvided.droppableProps}>
              <div className="w-full flex">
                {lists.map((list, index) => (
                  <List key={list.id} list={list} index={index} />
                ))}
                {listDroppableProvided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
        <AddList />
      </div>
    </DragDropContext>
  );
};
export default Board;
