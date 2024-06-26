import styled from 'styled-components';

import {constants} from '../../styles';

export const Container = styled.div`
  align-items: center;
  display: flex;
  height: ${constants.toolbarHeight};
  justify-content: center;
  position: relative;
  width: ${constants.toolbarHeight};

  &:hover {
    background: rgba(0, 0, 0, 0.04);
    cursor: pointer;
  }

  img {
    height: 30px;
    width: auto;

    &:active {
      height: 29px;
    }
  }
`;
