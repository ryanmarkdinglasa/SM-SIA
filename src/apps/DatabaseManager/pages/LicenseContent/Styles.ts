import styled from 'styled-components';
import { colors} from 'apps/DatabaseManager/styles';

export const Container = styled.div`
    height:400px;
    width:40%;
    background:${colors.white};
    display: flex;
    flex-direction: column;
    align-items:center;
    justify-content:flex-start;
    border-radius:8px;
    box-shadow: 0 4px 12px rgb(0 0 0 / 5%);
    color:#a6b0cf;
    padding: 24px 24px;
`;