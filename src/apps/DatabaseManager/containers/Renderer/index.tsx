import {ReactNode} from 'react';
import {useSelector} from 'react-redux';


import {getActivePage} from '../../selectors/state';
import { Page } from '../../types';
import {SFC} from 'system/types';
import * as S from './Styles';
import { DBConfigContent, LicenseContent, Dashboard } from '../../pages';

type PageDict = {
  [key in Page]: ReactNode;
};

export const Renderer: SFC = ({className}) => {
  const activePage = useSelector(getActivePage);

  const renderActivePage = () => {
    const pages: PageDict = {
      [Page.databaseConfig]: <DBConfigContent />,
      [Page.license]: <LicenseContent />,
      [Page.dashboard]: <Dashboard />,
    };

    return pages[activePage];
  };

  return (
    <S.Container className={className}>
      <S.MainContent>{renderActivePage()}</S.MainContent>
    </S.Container>
  );
};

