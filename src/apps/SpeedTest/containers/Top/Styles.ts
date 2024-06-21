import MdiIcon from "@mdi/react";
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

export const Icon = styled(MdiIcon)`
    border-radius: 50%;
    color: #74788d;
    padding: 4px;
    margin-left: 10px;
    transition: all 0.5s;
    &:hover{
        background:#31394e;
        color: #556ee5;
        cursor:pointer;
    }
`;
