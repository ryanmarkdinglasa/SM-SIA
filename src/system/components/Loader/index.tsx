import {IconProps} from '../../components/Icon';
import {SFC} from '../../types';
import * as S from './Styles';

type LoaderProps = Pick<IconProps, 'size'>;

const Loader: SFC<LoaderProps> = ({className, size}) => {
  return (
    <S.Container className={className}>
      <S.LoadingIcon size={size} totalSize="unset" />
    </S.Container>
  );
};

export default Loader;
