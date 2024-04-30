import {useState} from 'react';
import {Formik} from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { setLogin } from "../state";
import Dropzone from 'react-dropzone';
import { useMediaQuery } from '@material-ui/core';

//data validation
const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
})

const initialValuesLogin = {
    email: "",
    password: "",
}

function LoginForm(){
    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isRegister = pageType === "login";
    const isLogin = pageType === "register";

    const handleFormSubmit = async(values, onSubmit) => {};

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesLogin}
            validationSchema = {loginSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            }) => (
                <form onSubmit={handleSubmit}>
                    <div className={'form ' + isNonMobile ? 'nonmobile' : 'mobile'}>

                    </div>
                </form>
            )}
        </Formik>
    )
}

export default LoginForm;