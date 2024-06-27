import {ReactNode} from 'react';

import {SFC} from '../../types';
import * as S from './Styles';

export interface AppContainerProps {
  children: ReactNode;
}

const AppContainer: SFC<AppContainerProps> = ({children, className}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

export default AppContainer;
