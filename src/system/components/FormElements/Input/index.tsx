import {SFC} from '../../../types';
import * as S from './Styles';

export interface InputProps {
  errors: {[field: string]: string};
  label: string;
  name: string;
  touched: {[field: string]: boolean};
  type?: 'text' | 'number';
}

const Input: SFC<InputProps> = ({className, errors, label, name, touched, type = 'text'}) => {
  return (
    <>
      <S.Label>{label}</S.Label>
      <S.Field $error={errors[name] && touched[name]} className={className} name={name} type={type} />
      <S.SecondaryContainer>
        {errors[name] && touched[name] ? <S.ErrorMessage>{errors[name]}</S.ErrorMessage> : null}
      </S.SecondaryContainer>
    </>
  );
};

export default Input;
