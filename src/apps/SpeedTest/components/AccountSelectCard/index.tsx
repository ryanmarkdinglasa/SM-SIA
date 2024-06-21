import {AppDispatch, SFC} from 'system/types';
import { SelectCard, getActiveAccountNumber, AccountIdentification } from '../..';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveAccountNumber } from 'apps/SpeedTest/store/manager';
import { useState } from 'react';

export interface AccountSelectCardProps{
    accountNumber: string;
};

export const AccountSelectCard: SFC<AccountSelectCardProps> = ({accountNumber, className}) => {
    const activeAccountNumber = useSelector(getActiveAccountNumber);
    const dispatch = useDispatch<AppDispatch>();
    const [select, setSelect] = useState(false);
    const handleClick = () => {
        const payload = accountNumber === activeAccountNumber ? null : accountNumber;
        dispatch(setActiveAccountNumber(payload));  
        if (payload) setSelect(true);
    }
    

    return (
        <>
            <SelectCard  className={ className } isSelected={ select } onClick={ handleClick }>
                <AccountIdentification  accountNumber={accountNumber} />
            </SelectCard>
        </>
    );
}