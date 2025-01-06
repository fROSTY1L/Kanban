import styled from "styled-components";

export const DeleteZone = styled.div<{ $isOver: boolean }>`
    width: 48px;
    height: 48px;
    transition: all 0.2s ease;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: -12px;
    margin-top: -12px;
    
    ${({ $isOver }) => $isOver && `
        background: rgba(252, 54, 57, 0.2);
        border-radius: 4px;
        transform: scale(1.1);
    `}
`;

export const Icon = styled.img`
    height: 24px;
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;