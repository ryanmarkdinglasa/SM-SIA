import { SFC, ToastType, AppDispatch } from 'system/types';
import * as S from './Styles';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Formik } from 'formik';
import { displayToast } from 'system/utils/toast';
import { setActiveLicense, setActivePage } from 'apps/DatabaseManager/store/manager';
import * as yup from 'yup';  // corrected import
import { Input } from '../../FormElements/Input';
import { ButtonType, ButtonColor } from '../../Button/types';
import axios from 'axios';
import { baseUrl } from '../../../routes';
import { Key } from '../..';
import { Page } from 'apps/DatabaseManager/types';

export const LicenseCardBody: SFC = ({ className }) => { 
    const dispatch = useDispatch<AppDispatch>();

    const initialValues = {
        license: '',
    };

    type FormValues = typeof initialValues;
    
    const handleSubmit = async (values: FormValues) => { // make the function async
        const data = {
            license: values.license,
        };

        try {
            const response = await axios.post(`${baseUrl}/license/validate`, data, {
                withCredentials: true,
            });
            
            if (response.data.isLicense) {
                dispatch(setActivePage(Page.dashboard));
                dispatch(setActiveLicense(data.license));
                displayToast(response.data.message, ToastType.success);
            } else {
                displayToast(response.data.message, ToastType.error);
            }
        } catch (error) {
            dispatch(setActiveLicense(null));
            displayToast('License Error!', ToastType.error);
        }
    };

    const validationSchema = useMemo(() => {
        return yup.object().shape({
            license: yup.string().required('Server is required'),
        });
    }, []);

    return (
        <S.Container className={className}>
            <Key />
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnMount={false}
                validationSchema={validationSchema}
            >
                {({ dirty, errors, isSubmitting, touched, isValid }) => (
                    <Form>
                        <Input errors={errors} type="text" label="License" name="license" touched={touched} />
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
    );
};
