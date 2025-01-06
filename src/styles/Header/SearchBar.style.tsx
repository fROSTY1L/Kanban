import styled, { css } from "styled-components";

const Wrap = styled.div<{ isFocused: boolean }>`
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 40px;
    width: 430px;
    border: 1px solid transparent; 
    box-sizing: border-box;

    ${({ isFocused }) =>
    isFocused &&
    css`
        outline: 4px solid rgba(1, 132, 207, 0.5); 
    `}
`;

const SecondWrap = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    border: 1px solid #ffffff4d; 
    position: absolute; 
    top: 0; 
    left: 0; 
    border-radius: 20px;
    gap: 10px;
    box-sizing: border-box; 

    &:hover {
        border: 1px solid #0184cf;
    }
`;

const Icon = styled.img`
  height: 24px;
  width: 24px;
  padding-left: 18px;
`;

const Input = styled.input`
  border: none;
  outline: none; 
  background: none; 
  padding: 0; 
  margin: 0;
  color: white;
  font-size: 14px;
`;

export { Wrap, SecondWrap, Input, Icon };
