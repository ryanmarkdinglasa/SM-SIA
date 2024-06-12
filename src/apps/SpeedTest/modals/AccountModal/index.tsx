import {SFC} from 'system/types';
import * as S from './Styles';
import { AccountSelectCard } from '../../';
import { getAccounts } from 'system/selectors/state';
import orderby from 'lodash/orderBy';
import { useSelector } from 'react-redux';

export interface AccountModalProps {
    close(): void;
};

export const AccountModal: SFC<AccountModalProps> = ({className, close}) => {
    const accounts = useSelector(getAccounts);

    const renderAccountCards = () => {
        const orderedAccounts = orderby(Object.values(accounts), ['displayName']);
        return orderedAccounts.map( ({accountNumber}) => <AccountSelectCard  accountNumber={accountNumber}/>)
    };

    return (
        <>
            <S.Modal className={className} close={close} header='Select Account'>
                { renderAccountCards() }
            </S.Modal>
        </>
    );
};
