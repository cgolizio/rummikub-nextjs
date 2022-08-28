import React from 'react';
import styled from 'styled-components';

const StyledTile = styled.li`
  height: 4rem;
  width: 2.5rem;
  background: #fff2da;
  color: ${props => props.color};
  font-size: 2rem;
  text-align: center;
  list-style-type: none;
  margin: 1rem;
`;

const Tile = ({ tile }) => {
  const { value, color } = tile;
  return (
    <StyledTile color={color}>
      {value}
    </StyledTile>
  );
};

export default Tile;