import React, { useContext } from 'react';
import styled from 'styled-components';

import { MainContext } from '../pages';
import Tile from './Tile';

const PlayerTray = styled.ol`
  width: 90%;
  height: fit-content;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

const Tray = () => {
  const { state } = useContext(MainContext);

  return (
    <PlayerTray>
      {
        state?.players[(state.current_player_index - 1)]?.tiles?.map(tile => {
          return (
            <Tile key={tile.id} tile={tile} />
          );
        })
      }
    </PlayerTray>
  );
};

export default Tray;