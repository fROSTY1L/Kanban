import styled from "styled-components";

const Wrap = styled.div`
    background: rgba(0, 0, 0, 0.7);
    padding: 32px 18px;
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`

const Main = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-height: 100px;
`

const Title = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 24px;
    font-weight: 700;
`

const Icon = styled.img`
    height: 24px;
`

export { Wrap, Header, Main, Title, Icon }