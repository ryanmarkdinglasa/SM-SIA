import styled from 'styled-components';
import { colors } from '../../styles';
import {Button as UButton} from '../../';

export const Container = styled.div`
    align-items:left;
    display:flex;
    justify-content:start;
    hieght:60px;
    flex-direction: column; 
`;

export const ButtonCon = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    
`;

export const Input = styled.input`
    width: 100%;
    heigth:55px;
    background: rgba(180, 180, 190);
    border-radius: 6px;
    color: ${colors.primary}
    outline: none;
    border:none;
    padding:10px 10px;
    margin-bottom: 20px;
    &:focus{
        outline:none;
    }
`;

export const Label = styled.div`
  color: ${colors.primary};
  font-size: 12px;
  font-weight: 700;
`;

export const Button = styled(UButton)`
  width: 90px;
  heigth: 30px !important;
  align-items:center;
  display: flex;
  justify-content: center;
  text-align:center;
  color: ${colors.primary}
  transition: all 0.3s;
  background: none !important;
  &:hover &:active &:focus{
    background: ${colors.pink}
  }
`;