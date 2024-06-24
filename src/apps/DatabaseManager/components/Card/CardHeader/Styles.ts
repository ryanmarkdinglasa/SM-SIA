import styled from "styled-components";
import UMdiIcon from '@mdi/react';
import { colors } from 'apps/DatabaseManager/styles';

export const Container = styled.div`

    display: flex;
    align-items: center;
    width: 100%;
    justify-content: center;
    border-bottom: 1px solid ${colors.slateGray}
`;


export const Icon = styled(UMdiIcon)`
  border-radius: 50%;
  color: ${colors.primary};
  margin-right: 5px;
  padding: 4px;
`;

export const CardTitle = styled.h1`
    color: ${colors.primary};
`;