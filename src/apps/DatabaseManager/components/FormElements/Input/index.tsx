import {SFC} from 'system/types';
import * as S from './Styles';

export interface InputProps {
  errors: {[field: string]: string};
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  touched: {[field: string]: boolean};
}

export const Input: SFC<InputProps> = ({className, type, errors, label, name, placeholder = '', touched}) => {
  return (
    <>
      <S.Label>{label}</S.Label>
      <S.Field $error={errors[name] && touched[name]} className={className} name={name} placeholder={placeholder} type={type}/>
      <S.SecondaryContainer>
        {errors[name] && touched[name] ? <S.ErrorMessage>{errors[name]}</S.ErrorMessage> : null}
      </S.SecondaryContainer>
    </>
  );
};