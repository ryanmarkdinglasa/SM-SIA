import {useSelector} from 'react-redux';
import orderBy from 'lodash/orderBy';

import WebSocket from '../../components/WebSocket';
import { DraggableTopBar } from '../../components/DraggableTopBar';
import {useAccountOnlineStatusManager} from '../../hooks';
import {getNetworks} from '../../selectors/state';
import {SFC} from '../../types';
import * as S from './Styles';

const Layout: SFC = ({className}) => {
  const networks = useSelector(getNetworks);
  useAccountOnlineStatusManager();

  const renderWebSockets = () => {
    const orderedNetworks = orderBy(Object.values(networks), ['networkId']);
    return orderedNetworks.map(({networkId, port, protocol}) => (
      <WebSocket key={networkId} networkId={networkId} port={port} protocol={protocol} />
    ));
  };

  return (
    <S.Container className={className}>
      <DraggableTopBar />
      {renderWebSockets()}
      <S.MainArea />
    </S.Container>
  );
};

export default Layout;
