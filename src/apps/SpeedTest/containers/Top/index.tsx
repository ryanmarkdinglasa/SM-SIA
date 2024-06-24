import {SFC} from 'system/types';
import { useToggle } from 'system/hooks';
import { TopCard, getActiveAccountNumber, getActiveNetworkId, AccountModal, EditButton} from '../..'
import * as S from './Styles';
import { SpaceItems } from '../../components';
import { useSelector } from 'react-redux';
import { NetworkModal } from 'apps/SpeedTest/modals/NetworkModal';

export const Top: SFC = ({className}) => {
    const [accountModalIsOpen, toggleAccountModal] = useToggle(false);
    const [networkModalIsOpen, toggleNetworkModal] = useToggle(false);
    const activeAccountNumber = useSelector(getActiveAccountNumber);
    const activeNetworkId = useSelector(getActiveNetworkId);
  
    const renderAccountContent = () => {
      if (!activeAccountNumber) return <S.Button onClick={toggleAccountModal}>Select Account</S.Button>;
      return renderActiveAccount();
    };
  
    const renderAccountModal = () => {
      if (!accountModalIsOpen) return null;
      return <AccountModal close={toggleAccountModal} />;
    };
  
    const renderActiveAccount = () => {
      return (
        <SpaceItems
          leftContent={<S.AccountIdentification accountNumber={activeAccountNumber!} />}
          rightContent={<EditButton onClick={toggleAccountModal} />}
        />
      );
    };
  
    const renderActiveNetwork = () => {
      return (
        <SpaceItems
          leftContent={<S.NetworkIdentification networkId={activeNetworkId!} />}
          rightContent={<EditButton onClick={toggleNetworkModal} />}
        />
      );
    };
  
    const renderNetworkContent = () => {
      if (!activeNetworkId) return <S.Button onClick={toggleNetworkModal}>Select Network</S.Button>;
      return renderActiveNetwork();
    };
  
    const renderNetworkModal = () => {
      if (!networkModalIsOpen) return null;
      return <NetworkModal close={toggleNetworkModal} />;
    };
  
    return (
      <>
        <S.Container className={className}>
          <TopCard heading="Account">{renderAccountContent()}</TopCard>
          <TopCard heading="Network">{renderNetworkContent()}</TopCard>
        </S.Container>
        {renderAccountModal()}
        {renderNetworkModal()}
      </>
    );
  };