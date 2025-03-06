export interface IList {
  id: number;
  title: string;
  cards: ICard[];
}

export interface ICard {
  id: number;
  title: string;
  description: string;
  dueDate: string;
}

type AppReducerAction =
  | { type: "ADD_LIST"; payload: { title: string } }
  | { type: "DELETE_LIST"; payload: { id: Id } }
  | { type: "UPDATE_LIST"; payload: { id: Id; title: string } }
  | { type: "ADD_CARD"; payload: { cardTitle: string; listId: Id } }
  | { type: "UPDATE_CARD"; payload: { card: Partial<ICard>; listId: Id } }
  | { type: "DELETE_CARD"; payload: { cardId: Id; listId: Id } }
  | { type: "REORDER_CARDS"; payload: { cards: ICard[]; listId: Id } }
  | { type: "REORDER_LISTS"; payload: { newList: IList[] } }
  | { type: "RESET_ALL" };

interface IAppContext {
  lists: IList[];
  reducer: React.Dispatch<AppReducerAction>;
}
