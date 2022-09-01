import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import styles from "../styles/Home.module.css";
import Tray from "../components/Tray";
import { useGameState, useDispatchGame } from "../components/Game";

let socket;

export default function Home() {
  const state = useGameState();
  const dispatch = useDispatchGame();
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log(state);
  }, [state]);

  // !! SOCKET.IO !! //
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("Socket connected");
    });

    socket.on("update-input", (msg) => {
      setInput(msg);
    });
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    socket.emit("input-change", e.target.value);
  };
  // !! SOCKET.IO !! //

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.header}>
          <h1>RUMMIKUB!</h1>
        </div>
        {/* <React.StrictMode>
            <input
              placeholder='type something'
              value={input}
              onChange={onChangeHandler}
            />
          </React.StrictMode> */}
        <button>Start Game</button>
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
    </div>
  );
}
