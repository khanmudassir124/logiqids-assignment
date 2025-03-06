import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { DefaultListData } from "../../data/DefaultListData";
import { ICard, IList } from "../../types/global";

const getInitialData = (): IList[] => {
  const storedData = localStorage.getItem("logiqidsBoardData");
  if (storedData) {
    try {
      return JSON.parse(storedData) as IList[];
    } catch (error) {
      console.error("Error parsing localStorage data:", error);
      return DefaultListData;
    }
  }
  return DefaultListData;
};

const generateId = () => {
  return Math.floor(Math.random() * 10000);
};

const saveToLocalStorage = (list: IList[]) => {
  localStorage.setItem("logiqidsBoardData", JSON.stringify(list));
};

const INITIAL_STATE = {
  data: getInitialData(),
};

const boardSlice = createSlice({
  name: "board",
  initialState: INITIAL_STATE,
  reducers: {
    updateBoard: (state, action: PayloadAction<IList[]>) => {
      state.data = action?.payload;
      saveToLocalStorage(action.payload);
    },
    resetBoard: (state) => {
      state.data = DefaultListData;
      localStorage.setItem("logiqidsBoardData", JSON.stringify(DefaultListData));
    },
    addList: (state, action: PayloadAction<{ title: string }>) => {
      const newList: IList = {
        id: generateId(),
        title: action.payload.title,
        cards: [],
      };
      state.data.push(newList);
      saveToLocalStorage(state.data);
    },
    deleteList: (state, action: PayloadAction<IList>) => {
      state.data = state.data.filter((list) => list.id !== action.payload.id);
      saveToLocalStorage(state.data);
    },
    updateList: (state, action: PayloadAction<{ list: IList; title: string }>) => {
      const updatedList = state.data.find((list) => list.id === action.payload.list.id);
      if (updatedList) {
        updatedList.title = action.payload.title;
        saveToLocalStorage(state.data);
      }
    },
    addCard: (state, action: PayloadAction<{ list: IList; cardTitle: string }>) => {
      const updatedList = state.data.find((list) => list.id === action.payload.list.id);
      if (updatedList) {
        updatedList.cards.push({
          id: generateId(),
          title: action.payload.cardTitle,
          description: "",
          dueDate: "",
        });
        saveToLocalStorage(state.data);
      }
    },
    updateCard: (state, action: PayloadAction<{ card: Partial<ICard>; list: IList }>) => {
      const updatedList = state.data.find((list) => list.id === action.payload.list.id);
      if (updatedList) {
        const updatedCard = updatedList.cards.find((card) => card.id === action.payload.card.id);
        if (updatedCard) {
          Object.assign(updatedCard, action.payload.card);
          saveToLocalStorage(state.data);
        }
      }
    },
    deleteCard: (state, action: PayloadAction<{ card: ICard; list: IList }>) => {
      const updatedList = state.data.find((list) => list.id === action.payload.list.id);
      if (updatedList) {
        updatedList.cards = updatedList.cards.filter((card) => card.id !== action.payload.card.id);
        saveToLocalStorage(state.data);
      }
    },
  },
});

export const { updateBoard, resetBoard, addList, deleteList, updateList, addCard, updateCard, deleteCard } = boardSlice.actions;
export default boardSlice.reducer;
