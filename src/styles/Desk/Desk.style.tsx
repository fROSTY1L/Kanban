import styled from "styled-components";

export const Wrap = styled.div`
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(4, 430px);
    gap: 40px;
    box-sizing: initial;
    align-items: flex-start;

    @media (max-width: 768px) {
        overflow-x: auto; 
        justify-content: start;
        padding: 0 20px;
        margin: 0;  
    }

    @media (min-width: 1920px) {
        margin: 0 100px; // Добавляем отступы по бокам
    }
`;
