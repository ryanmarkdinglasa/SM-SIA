import {SFC} from 'system/types';
import * as S from './Styles';
import { ReactNode } from 'react'
import { createPortal } from 'react-dom';
import { mdiClose } from '@mdi/js';

export interface ModalProps {
    header: string;
    children: ReactNode;
    close(): void;
};

export const Modal: SFC<ModalProps> = ({children, className, close, header}) => {
  
    return createPortal(
        <>
            <S.Overlay onClick={close} />
            <S.Modal className={className}>
                <S.Header> 
                    <span> { header } </span> 
                    <S.Icon icon={mdiClose} onClick={close} size={16} unfocusable />
                </S.Header>
                <S.Content>
                    { children }
                </S.Content>
            </S.Modal>
        </>,
        document.getElementById('modal-root')!,

    );
}