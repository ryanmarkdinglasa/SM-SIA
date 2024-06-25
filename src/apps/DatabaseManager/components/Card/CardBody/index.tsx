import { SFC, ToastType, AppDispatch } from 'system/types';
import * as S from './Styles';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { displayToast } from 'system/utils/toast';
import { setActiveDatabaseConfig } from 'apps/DatabaseManager/store/manager';
import { Config } from 'apps/DatabaseManager/types/config';
import * as yup from 'yup';  // corrected import
import { Input } from '../../FormElements/Input';
import { ButtonType, ButtonColor } from '../../Button/types';
import axios from 'axios';
import { baseUrl } from '../../../routes';

export const CardBody: SFC = ({ className }) => { 
    const dispatch = useDispatch<AppDispatch>();

    const initialValues: Config = {
        server: '',
        name: '',
        user: '',
        password: '',
        port: 0,
    };

    type FormValues = typeof initialValues;

    const handleSubmit = async (values: FormValues) => { // make the function async
        const config: Config = {
            server: values.server,
            name: values.name,
            user: values.user,
            password: values.password,
            port: values.port
        };

        try {
            const response = await axios.post(`${baseUrl}/connection/check`, config, {
                withCredentials: true,
            });

            if (response.data.isConnected) {
                dispatch(setActiveDatabaseConfig(config));
                displayToast('Database Connected!', ToastType.success);
            } else {
                displayToast('Database Connection Error!', ToastType.error);
            }
        } catch (error) {
            dispatch(setActiveDatabaseConfig(null));
            displayToast('Database Connection Error!', ToastType.error);
        }
    };

    const validationSchema = useMemo(() => {
        return yup.object().shape({
            server: yup.string().required('Server is required'),
            name: yup.string().required('Name is required'),
            user: yup.string().required('User is required'),
            password: yup.string().required('Password is required'),
            port: yup.number().integer().required('Port is required').notOneOf([0], 'Port cannot be 0'),
        });
    }, []);

    return (
        <S.Container className={className}>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnMount={false}
                validationSchema={validationSchema}
            >
                {({ dirty, errors, isSubmitting, touched, isValid }) => (
                    <Form>
                        <Input errors={errors} type="text" label="Server" name="server" touched={touched} />
                        <Input errors={errors} type="text" label="Name" name="name" touched={touched} />
                        <Input errors={errors} type="text" label="User" name="user" touched={touched} />
                        <Input errors={errors} type="password" label="Password" name="password" touched={touched} />
                        <Input errors={errors} type="number" label="Port" name="port" touched={touched} />
                        <S.Button
                            className={"width:100% !important;"}
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
    );
};
