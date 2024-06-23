import styled from 'styled-components';
import UMdiIcon from '@mdi/react';

import {colors} from '../../styles';

export const Container = styled.div``;

export const Icon = styled(UMdiIcon)`
  border-radius: 50%;
  color: ${colors.slateGray};
  margin-right: -4px;
  padding: 4px;
  border: 1px solid red;
`;