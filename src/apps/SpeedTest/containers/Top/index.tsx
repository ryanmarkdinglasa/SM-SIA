import {SFC} from 'system/types';
import { useToggle } from 'system/hooks';
import { mdiPencil } from '@mdi/js';
import { TopCard, getActiveAccountNumber, AccountModal} from '../..'
import * as S from './Styles';
import { SpaceItems, AccountIdentification } from '../../components';
import { useSelector } from 'react-redux';

export const Top: SFC = ({className}) => {
    const [accountModalIsOpen, toggleAccountModal] = useToggle(false);
    const activeAccountNumber = useSelector(getActiveAccountNumber);

    const renderAccountContent = () => {
        if (!activeAccountNumber) return <S.Button onClick={toggleAccountModal}> Select Account </S.Button>;
        return renderActiveAccount();
    };

    const renderActiveAccount = () => {
        return (
            <SpaceItems leftContent={<AccountIdentification accountNumber={activeAccountNumber!}/>} rightContent={<S.Icon path={mdiPencil} size={28}/>}/>
        )
    };

    const renderAccountModal = () => {
        if (!accountModalIsOpen) return null;
        return <AccountModal close={toggleAccountModal}/>
    }

    return (
        <>
            <S.Container className={className}>
                <TopCard heading='Account'>
                    { renderAccountContent() }
                </TopCard>
                <TopCard heading='Network'>
                    { renderAccountContent() }
                </TopCard>
            </S.Container>
            { renderAccountModal() }
        </>
    );
}