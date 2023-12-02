import React from "react";
import styled from "styled-components";

const MenuImage = ({ ele, height, width }) => {
  return (
    <ImageBox height={height} width={width}>
      <img
        src={ele.menuItemImageUrl || "/no-image.png"}
        alt={ele.menuItemName}
      />
    </ImageBox>
  );
};

export default MenuImage;

const ImageBox = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;
