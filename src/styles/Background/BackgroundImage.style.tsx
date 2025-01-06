import styled from "styled-components";

export const BackgroundContainer = styled.div<{ src: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh; 
  overflow: hidden; 
  z-index: -1; 
  background-image: url(${(props) => props.src}); 
  background-size: cover; 
  background-position: center; 
`;