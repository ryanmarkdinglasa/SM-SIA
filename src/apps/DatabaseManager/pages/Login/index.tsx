import { AppDispatch, SFC, ToastType} from 'system/types';
import * as S from './Styles';
import { Form, Formik } from 'formik';
import { ButtonColor, ButtonType, Input } from 'apps/DatabaseManager/components';
import { useMemo } from 'react';
import yup from 'system/utils/yup';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { baseUrl } from 'apps/DatabaseManager/routes';
import { displayToast } from 'system/utils/toast';
import { setActiveUser, setActiveToken, setActivePage } from 'apps/DatabaseManager/store/manager';
import { Page } from 'apps/DatabaseManager/types';

export const Login: SFC = ({className}) => {
    const dispatch = useDispatch<AppDispatch>();
    
    const initialValues = {
        UserName: '',
        Password: '',
    };

    type FormValues = typeof initialValues;
    
    const handleSubmit = async (values: FormValues) => { // make the function async
        
        const data = {
            UserName: values.UserName,
            Password: values.Password,
        };

        try {
            const response = await axios.post(`${baseUrl}/auth/login`, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.isLogin) {
                dispatch(setActiveUser(response.data.user));
                dispatch(setActiveToken(response.data.accessToken));
                dispatch(setActivePage(Page.dashboard));
            } else {
                dispatch(setActiveUser(null));
                dispatch(setActiveToken(null));
                displayToast(response.data.message, ToastType.error);
            }
        } catch (error: any) {
            dispatch(setActiveUser(null));
            dispatch(setActiveToken(null));
            if (error.response) {
                // Server responded with a status other than 200 range
                console.error('Error response:', error.response.data);
                console.error('Error status:', error.response.status);
            } else if (error.request) {
                // Request was made but no response was received
                console.error('Error request:', error.request);
            } else {
                // Something else happened in setting up the request
                console.error('Error message:', error.message);
            }
            displayToast('Something went wrong!', ToastType.error);
        }
    }
    const validationSchema = useMemo(() => {
        return yup.object().shape({
            UserName: yup.string().required('Username is required'),
            Password: yup.string().required('Password is required'),
        });
    }, []);
    return (
        <>
            <S.Container className={className}>
                <S.Left>
                    <S.H1>INNO<S.SpanH1>SOFT</S.SpanH1></S.H1>
                    <S.SpanSub>Grow your business with Innosoft</S.SpanSub>
                </S.Left>
                <S.Right>
                    <S.LoginCon>
                        <S.LoginConBody>
                            <Formik
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                                validateOnMount={false}
                                validationSchema={validationSchema}
                            >
                                {({ dirty, errors, isSubmitting, touched, isValid }) => (
                                    <Form>
                                        <Input errors={errors} type="text" label="Username" name="UserName" touched={touched} />
                                        <Input errors={errors} type="password" label="Password" name="Password" touched={touched} />
                                        <S.Button
                                            dirty={dirty}
                                            disabled={isSubmitting}
                                            isSubmitting={isSubmitting}
                                            isValid={isValid}
                                            text="Sign In"
                                            color={ButtonColor.blue}
                                            type={ButtonType.submit}
                                        />
                                    </Form>
                                )}
                            </Formik>
                        </S.LoginConBody>
                        <S.LoginConFooter>
                            <S.Span> 2024 @ Cebu Innosoft Solution Services Inc.</S.Span>
                            <S.Span> Innosoft SIA v1.0</S.Span>
                        </S.LoginConFooter>
                    </S.LoginCon>
                </S.Right>
            </S.Container>
        </>
    );
}