import {ReactNode} from 'react';

import {SFC} from '../../types';
import * as S from './Styles';

export interface AppHeaderProps {
  children: ReactNode;
}

const AppHeader: SFC<AppHeaderProps> = ({children, className}) => {
  return <S.Container className={className}>{children}</S.Container>;
};

export default AppHeader;
