import styled from "styled-components";
import MdiIcon from '@mdi/react';

export const Container = styled.div`
    margin-top: 12px;
    width: 100%;
    align-items:center;
    display: flex;
    justify-content: center;
    padding: 5px 5px;
    border-radius: 8px;
    background: #2a3042;
`;

export const Icon = styled(MdiIcon)`
    border-radius: 50%;
    color: #34c38f;
`;


export const Text = styled.div`
    color: #c3cbe4;
    font-sizeL 13px;
    margin-left:5px;
`;