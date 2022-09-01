import { useReducer, useContext, createContext } from "react";
import reducer from "../reducers";
import { fillTileBag } from "../helpers";

const GameStateContext = createContext();
const GameDispatchContext = createContext();

const INITIAL_STATE = {
  current_player_index: 0,
  players: [],
  board: [],
  bag: fillTileBag(),
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <GameDispatchContext.Provider value={dispatch}>
      <GameStateContext.Provider value={state}>
        {children}
      </GameStateContext.Provider>
    </GameDispatchContext.Provider>
  );
};

export const useGameState = () => useContext(GameStateContext);
export const useDispatchGame = () => useContext(GameDispatchContext);
