import styled from "styled-components";

export const Container = styled.div`
    aspect-ratio: 1/ 1;
    margin-top: 36px;
    border-radius: 50%;
    border:1px solid #34c38f;
    display:flex;
    align-items: center;
    justify-content: center;
    width: 40%;
    color: #34c38f;
    font-size: 36px;
    font-weight: 300;
    transition: all 0.3s;
    &:hover{
        background: rgba(52, 195, 143, 0.2);
        cursor: pointer;

    }
`;