import {AppDispatch, SFC} from 'system/types';
import { SelectCard, getActiveAccountNumber, AccountIdentification } from '../..';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveAccountNumber } from 'apps/SpeedTest/store/manager';

export interface AccountSelectCardProps{
    accountNumber: string;
};

export const AccountSelectCard: SFC<AccountSelectCardProps> = ({accountNumber, className}) => {
    const activeAccountNumber = useSelector(getActiveAccountNumber);
    const dispatch = useDispatch<AppDispatch>();
    const handleClick = () => {
        const payload = accountNumber === activeAccountNumber ? null : accountNumber;
        dispatch(setActiveAccountNumber(payload));  
    
    }
    console.log('AccountNumber: '+ accountNumber);
    console.log('Active AccountNumber: ');
    console.log(activeAccountNumber);


    return (
        <>
            <SelectCard  className={ className } isSelected={ accountNumber === activeAccountNumber } onClick={ handleClick }>
                <AccountIdentification  accountNumber={accountNumber} />
            </SelectCard>
        </>
    );
}