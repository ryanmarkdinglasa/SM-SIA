import styled from 'styled-components';

import UMainArea from '../../containers/Layout/MainArea';
import {constants} from '../../styles';

export const Container = styled.div`
  display: grid;
  grid-template-rows: auto ${constants.toolbarHeight};
  height: 100vh;
  overflow: hidden;
`;

export const MainArea = styled(UMainArea)`
  display: flex;
  grid-row: 1 / span 1;
  > div {
    bottom: 0;
    left: 0;
    position: fixed;
    right: 0;
    top: 2rem;
  }
`;