import { addPlayer, draw } from "../helpers";
import { ADD_PLAYER, REMOVE_PLAYER, DRAW_TILE } from "../actions/actionTypes";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_PLAYER:
      return addPlayer(state);
    case DRAW_TILE:
      return draw(state, action);
    default:
      return state;
  }
};

export default reducer;
