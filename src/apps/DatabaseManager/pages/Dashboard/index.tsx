import { SFC } from '../../../../system/types';
import * as S from './Styles';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { baseUrl } from '../../routes';

type User = {
  FullName: string;
  // Add other user properties if needed
};

export const Dashboard: SFC = ({ className }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/user-list`);
        if (response.data && Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
            setUsers([]);
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        setError('Error fetching user list');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <S.Container className={className}>
      <h1>User Lists</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {users.length > 0 ? (
            users.map((user, index) => (
              <li key={index}>{user.FullName}</li>
            ))
          ) : (
            <li>No users available</li>
          )}
        </ul>
      )}
    </S.Container>
  );
};
