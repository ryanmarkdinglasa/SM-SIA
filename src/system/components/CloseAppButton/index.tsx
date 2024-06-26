import { mdiClose } from "@mdi/js";
import * as S from './Styles';

export const CloseAppButton = () => {
    const handleCloseClick = () => {
        alert('are you sure you want to quit?');
        window.electron.ipc.send('close-app');
    };
  
    return (
      <>
        <S.Button onClick={handleCloseClick}> 
            <S.Icon path={mdiClose} size="18px" /> 
        </S.Button>
      </>
    );
  };