import { AppDispatch, SFC } from '../../../../system/types';
import * as S from './Styles';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { baseUrl } from '../../routes';
import { ButtonType, ButtonColor } from '../Button/types';
import { mdiContentCopy, mdiClipboardCheckMultipleOutline } from '@mdi/js';
import { setActiveKey } from '../../store/manager';

export const Key: SFC = ({ className }) => {
    const [key, setKey] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        const fetchKey = async () => {
            try {
                const response = await axios.get(`${baseUrl}/license/key`, {
                    withCredentials: true,
                });
                if (response.data) {
                    setKey(response.data.key);
                    dispatch(setActiveKey(response.data.key));
                };
            } catch (error) {
                setKey('');
            }
        };
        fetchKey();
    }, []);

    const [copyStatus, setCopyStatus] = useState('Copy')
    const copyToClipboard = () => {
        navigator.clipboard.writeText(key)
            .then(() => {
                setCopyStatus('Copied');
                setTimeout(() => setCopyStatus('Copy'), 4000);
            })
            .catch(error => console.error('Error copying to clipboard:', error));
    };
    return (
        <S.Container className={className}>
            <S.ButtonCon>
                <S.Label>Key</S.Label>
                <S.Button
                    onClick={copyToClipboard}
                    iconLeft={copyStatus === 'Copy' ? mdiContentCopy : mdiClipboardCheckMultipleOutline}
                    color={ButtonColor.blue}
                    type={ButtonType.button} 
                    text={copyStatus}
                    />
            </S.ButtonCon>
            <S.Input type="text" value={key} readOnly />
        </S.Container>
    );
};
