import React, { useEffect, createContext, useReducer } from "react";
import { fillTileBag } from "../helpers";
import reducer from "../reducers";
import Tray from "../components/Tray";
// import Head from "next/head";
// import Image from "next/image";
import styles from "../styles/Home.module.css";

export const MainContext = createContext();

const INITIAL_STATE = {
  current_player_index: 0,
  players: [],
  board: [],
  bag: fillTileBag(),
};

export default function Home() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className={styles.container}>
      <MainContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <div className={styles.main}>
          <h1>RUMMIKUB!</h1>
          <button
            onClick={() => dispatch({ type: "ADD_PLAYER" })}
            disabled={state.players.length >= 4}
          >
            add player
          </button>
          <button
            onClick={() =>
              dispatch({
                type: "DRAW_TILE",
                payload: state.players[state.current_player_index - 1],
              })
            }
            disabled={state.bag.length === 0}
          >
            draw
          </button>
          {state.players.length && <Tray />}
        </div>
      </MainContext.Provider>
    </div>
  );
}
