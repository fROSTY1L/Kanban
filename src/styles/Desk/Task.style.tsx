import styled from "styled-components";

const Wrap = styled.div`
    display: flex;
    flex-direction: column;
    background: rgba(255, 255, 255, 0.1);
    padding: 16px;
    border-radius: 4px;
    gap: 8px;
    cursor: grab;
    
    &:active {
        cursor: grabbing;
    }
`

const Row = styled.div`
    display: flex;
    gap: 16px;
    font-size: 14px;
    font-weight: 400;
    
`

const Title = styled.div`
    color: rgba(255, 255, 255, 0.6)
`

const Value = styled.div`
    word-wrap: break-word;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    word-break: break-all;
    flex: 1;
    min-width: 0;
`

const ButtonRow = styled.div`
    display: flex;
    justify-content: end;
    position: relative;
    z-index: 2;
    pointer-events: none;
    
    & > * {
        pointer-events: auto;
    }
`

const TextArea = styled.textarea`
    width: 100%;
    min-height: 60px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid transparent;
    border-radius: 4px;
    color: white;
    padding: 8px;
    resize: vertical;
    font-family: inherit;
    font-size: inherit;
    outline: none;

    &:hover {
        border-color: rgba(1, 132, 207, 1);
    }

    &:focus {
        border-color: rgba(1, 132, 207, 1);
    }
`

const Input = styled.input`
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid transparent;
    border-radius: 4px;
    color: white;
    padding: 4px 8px;
    font-family: inherit;
    font-size: inherit;
    outline: none;

    &:hover {
        border-color: rgba(1, 132, 207, 1);
    }

    &:focus {
        border-color: rgba(1, 132, 207, 1);
    }
`

export { Wrap, Row, Title, Value, ButtonRow, TextArea, Input }
