import { SFC } from '../../../../system/types';
import * as S from './Styles';
import axios from 'axios';

import { baseUrl } from '../../routes';

export const Dashboard: SFC = ({ className }) => {

  const handleConfig = async () => {
    try {
      const response = await axios.get(`${baseUrl}/connection/config`, {
        withCredentials: true
      });
      if (response.data) {
        console.log(response.data.config.value);
        console.log('Database Connected');
      } else {
        console.error('Database Not Connected');
      }
    } catch (error) {
      console.error('Error checking database connection:', error);
    }
  };

  return (
    <S.Container className={className}>
    <div>
      <button onClick={handleConfig}> set config </button>
    </div>
    </S.Container>
  );
};
