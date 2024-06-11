import styled from "styled-components";
import MdiIcon from '@mdi/react';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
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

export const Left = styled.div`

`;

export const Right = styled.div`

`;
