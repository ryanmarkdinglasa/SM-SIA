import Avatar from 'apps/Chat/components/Avatar';
import Button, {ButtonColor} from 'apps/Chat/components/Button';
import {OnlineStatus, SFC} from 'system/types';
import * as S from './Styles';

interface AddContactModalProps {
  close(): void;
}

const AddContactModal: SFC<AddContactModalProps> = ({className, close}) => {
  const renderAccountCard = () => {
    return (
      <S.AccountCard>
        <Avatar displayImage="https://avatars.githubusercontent.com/u/8547538?v=4" onlineStatus={OnlineStatus.online} />
        <S.AccountCardText>
          <S.DisplayName>Bob</S.DisplayName>
          <S.AccountNumber>979338...3fe1c0</S.AccountNumber>
        </S.AccountCardText>
        <Button color={ButtonColor.success} onClick={close} text="Add" />
      </S.AccountCard>
    );
  };

  const renderAccountCards = () => {
    return (
      <S.AccountCardContainer>
        {renderAccountCard()}
        {renderAccountCard()}
        {renderAccountCard()}
        {renderAccountCard()}
        {renderAccountCard()}
        {renderAccountCard()}
        {renderAccountCard()}
        {renderAccountCard()}
      </S.AccountCardContainer>
    );
  };

  return (
    <S.Modal className={className} close={close} header="New Chat">
      {renderAccountCards()}
    </S.Modal>
  );
};

export default AddContactModal;