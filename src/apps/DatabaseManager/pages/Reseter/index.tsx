import { AppDispatch, SFC, ToastType } from '../../../../system/types';
import * as S from './Styles';
import axios from 'axios';
import { setActiveDatabaseConfig, setActiveLicense, setActiveUser } from '../../store/manager';
import { baseUrl } from '../../routes';
import { useDispatch } from 'react-redux';
import { displayToast } from '../../../../system/utils/toast';

export const Reseter: SFC = ({ className }) => {
    const dispatch = useDispatch<AppDispatch>()
  const handleStorage = async () => {
    try {
      const response = await axios.get(`${baseUrl}/clear-storage`, {
        withCredentials: true
      });
      if (response.data) {
        displayToast(response.data.message, ToastType.success);
      } else {
        displayToast('Storage Not Cleared', ToastType.success);
      }
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };

  const handleConnection = async () => {
    try {
        dispatch(setActiveDatabaseConfig(null));
        displayToast('Connection Reseted', ToastType.success);
    } catch (error) {
        displayToast('Error Reseting Connection', ToastType.error);
    }
  };

  const handleLicense = async () => {
    try {
        dispatch(setActiveLicense(null));
        dispatch(setActiveUser(null));
        displayToast('License Reseted', ToastType.success);
    } catch (error) {
        displayToast('Error Reseting License', ToastType.error);
    }
  };

  return (
    <S.Container className={className}>
    <div>
      <button onClick={handleStorage}> Reset Storage</button>
      <button onClick={handleConnection}> Reset Connection</button>
      <button onClick={handleLicense}> Reset License</button>
    </div>
    </S.Container>
  );
};
