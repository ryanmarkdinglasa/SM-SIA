import {SFC, ToastType, AppDispatch} from 'system/types';
import * as S from './Styles';
import { useMemo } from 'react';
import {useDispatch, useSelector,} from 'react-redux';
import {Form, Formik} from 'formik';
import {displayToast} from 'system/utils/toast';
import { setActiveDatabaseConfig } from 'apps/DatabaseManager/store/manager';
import { Config } from 'apps/DatabaseManager/types/config';
import yup from 'system/utils/yup';
import { Input } from '../../FormElements/Input';
import { ButtonType, ButtonColor } from '../../Button/types';
import { useIsConnected } from 'apps/DatabaseManager/hooks';
import { getActiveDatabaseConfig } from 'apps/DatabaseManager/selectors';
export const CardBody: SFC = ({className}:any) => {
    const dispatch = useDispatch<AppDispatch>();
    
    const initialValues = {
        server: '',
        name: '',
        user: '',
        password: '',
        port: 0,
      };
    
    type FormValues = typeof initialValues;
    //const activeConfig = useSelector(getActiveDatabaseConfig);
    
    const handleSubmit = (values: FormValues) => {
        const config: Config = {
            server: values.server,
            name: values.name,
            user: values.user,
            password: values.password,
            port: values.port
        };
        
        dispatch(setActiveDatabaseConfig(config));
        if (isConnected) displayToast('Database Connected!', ToastType.success);
        else displayToast('Database Connection Error!', ToastType.error);
      };
      const isConnected = useIsConnected();
    const validationSchema = useMemo(() => {
        return yup.object().shape({
            server: yup.string().required(),
            name: yup.string().required(),
            user: yup.string().required(),
            password: yup.string().required(),
            port: yup.number().integer().required(),
        });
    }, []);

    return (
        <>
            <S.Container className={className}>
                <Formik initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validateOnMount={false}
                        validationSchema={validationSchema}
                    >
                    {({dirty, errors, isSubmitting, touched, isValid}) => (
                        <Form>
                            <Input errors={errors} label="Server" name="server" touched={touched} />
                            <Input errors={errors} label="Name" name="name" touched={touched} />
                            <Input errors={errors} label="User" name="user" touched={touched} />
                            <Input errors={errors} label="Password" name="password" touched={touched} />
                            <Input errors={errors} label="Port" name="port" touched={touched} />
                            <S.Button
                            dirty={dirty}
                            disabled={isSubmitting}
                            isSubmitting={isSubmitting}
                            isValid={isValid}
                            text="Submit"
                            color={ButtonColor.blue}
                            type={ButtonType.submit}
                            />
                        </Form>
                        )}
                </Formik>
            </S.Container>
        </>
    );
}