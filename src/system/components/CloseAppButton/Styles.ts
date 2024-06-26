import styled from 'styled-components';
import UMdiIcon from '@mdi/react';

export const Icon = styled(UMdiIcon)`
    color: gray;
    margin-right: 3px;
    transition: color 0.1s;
`;

export const Button = styled.button`
    z-index: 1000;
    width: 40px;
    height: 32px;
    background: transparent;
    border: none;
    transition: all 0.1s;
    outline:none;
    &:hover {
        background: #E81123 !important;
    }
    &:hover ${Icon} {
        color: #FFF;
    }
`;


