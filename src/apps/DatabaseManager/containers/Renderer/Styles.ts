import styled from 'styled-components';

import {colors} from '../../styles';

export const Container = styled.div`
  background: #fff;
  color: ${colors.fonts.default};
  display: flex;
  align-items:center;
  justify-content: center;
  width:100vw;
  height:100vh;
`;

export const MainContent = styled.div`
  flex: auto;
  overflow: auto;
`;
