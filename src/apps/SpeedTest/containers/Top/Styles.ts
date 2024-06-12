import styled from "styled-components";

export const Button = styled.div`
    background: transparent;
    border: 1px solid #74788d;
    border-radius: 4px;
    color: #c3cbe4;
    padding: 8px 12px;
    transition: all 0.15s;
    width: 100%;
    display: flex;
    justify-content: center;
    &:hover {
        background: rgba(166, 176, 287, 0.2);
        color: #FFF;
        cursor: pointer;
    }
`;

export const Container = styled.div`
    display: flex;
    gap: 20px;
    justify-content: center;
    width: 100%;
`;