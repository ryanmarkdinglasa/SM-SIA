import {useNetworkDisplayImage, useSocketStatus} from '../../hooks';
import {colors} from '../../styles';
import {SFC, SocketStatus} from '../../types';
import * as S from './Styles';

export interface NetworkLogoProps {
  networkId: string;
}

const NetworkLogo: SFC<NetworkLogoProps> = ({className, networkId}) => {
  const networkDisplayImage = useNetworkDisplayImage(networkId);
  const socketStatus = useSocketStatus(networkId);

  const renderStatus = () => {
    const indicatorColors = {
      [SocketStatus.authenticated]: colors.palette.green['400'],
      [SocketStatus.connected]: colors.palette.yellow['300'],
      [SocketStatus.disconnected]: colors.palette.gray['300'],
      [SocketStatus.error]: colors.palette.red['400'],
    };

    return <S.Status indicatorColor={indicatorColors[socketStatus]} />;
  };

  return (
    <S.Container className={className}>
      <S.Img alt="logo" src={networkDisplayImage} />
      {renderStatus()}
    </S.Container>
  );
};

export default NetworkLogo;
