import { v4 as uuidv4 } from "uuid";
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const blackColor = "#000000";
const blueColor = "#2448FF";
const redColor = "#FF4D4D";
const yellowColor = "#c0cf00";
const colors = [blackColor, blueColor, redColor, yellowColor];

// !! shuffles an passed in array so the values are randomly ordered !! //
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// !! generate the full set of tiles !! //
export const fillTileBag = () => {
  const COLORS = [...colors];
  let tileBag = [],
    finalBag;

  COLORS.forEach((color) => {
    for (let i = 0; i < 2; i++) {
      values.forEach((val) => {
        tileBag.push({
          id: uuidv4(),
          color: color,
          value: val,
        });
      });
    }
  });
  finalBag = [...tileBag];
  finalBag.push(
    {
      id: uuidv4(),
      color: blackColor,
      value: "J",
    },
    {
      id: uuidv4(),
      color: redColor,
      value: "J",
    }
  );
  shuffle(finalBag);
  // console.log(finalBag);

  return finalBag;
};

// !! draw 14 tiles when player is created !! //
const initialDraw = (state) => {
  let playerTiles = [];
  const { bag } = state;
  for (let i = 0; i < 14; i++) {
    playerTiles.push(bag[i]);
  }
  return playerTiles;
};

// !! add a new player !! //
let playerId = 0;
export const addPlayer = (state) => {
  const { players, bag } = state;

  let newPlayersArray = [
    ...players,
    {
      id: ++playerId,
      name: "",
      tiles: initialDraw(state),
    },
  ];

  return {
    ...state,
    current_player_index: state.current_player_index + 1,
    players: newPlayersArray,
    bag: bag.slice(14, bag.length),
  };
};

const updatePlayers = (state, action) => {
  let currentPlayer = action.payload;
  console.log("FROM HELPERS: ", currentPlayer);

  let playerTiles = currentPlayer.tiles;
  let newPlayerTiles = [...playerTiles, state.bag.shift()];
  currentPlayer.tiles = newPlayerTiles;
  return [...state.players];
};

// !! draw a single tile !! //
export const draw = (state, action) => {
  let newBag = state.bag.slice(1, state.bag.length);
  return {
    ...state,
    players: updatePlayers(state, action),
    bag: newBag,
  };
};
