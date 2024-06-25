import { SFC} from 'system/types';
import * as S from './Styles';
import { Form, Formik } from 'formik';
import { Button, ButtonColor, ButtonType, Input } from 'apps/DatabaseManager/components';
import { useMemo } from 'react';
import yup from 'system/utils/yup';

export const Login: SFC = ({className}) => {

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