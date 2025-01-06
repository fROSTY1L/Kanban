import styled from "styled-components";

const Wrap = styled.div`
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.08);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    cursor: pointer;
    z-index: 3;
`

const Icon = styled.img`
    height: 24px;
`

const ButtonsContainer = styled.div`
    display: flex;
    gap: 8px;
`

export { Wrap, Icon, ButtonsContainer } 