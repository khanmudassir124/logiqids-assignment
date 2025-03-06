import { useSelector } from "react-redux";
import { RootState } from "../store";

const useBoard = () => {
  const currentState = useSelector((state: RootState) => state?.board);
  return currentState.data;
};

export default useBoard;
