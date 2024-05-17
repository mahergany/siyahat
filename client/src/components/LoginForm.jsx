import {useState} from 'react';
import {Formik} from "formik";
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import { setLogin } from "../state";
import Dropzone from 'react-dropzone';
import { useMediaQuery } from '@material-ui/core';
import {
    Box,
    Button,
    TextField,
    Typography,
    useTheme,
  } from "@mui/material";
import '../pages/LoginPage.css';
import { Link } from 'react-router-dom';

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

    const login = async (values, onSubmitProps) => {
        // try{
        const loggedInResponse = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values),
            }
        );
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        if(loggedIn){
            dispatch(
                setLogin({
                    user:loggedIn.user,
                    token:loggedIn.token,
                })
            );
            navigate("/community");
        }
    }

    const handleFormSubmit = async(values, onSubmitProps) => {
        await login(values,onSubmitProps);
    };

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
                <form className="loginForm" onSubmit={handleSubmit}>
                    {/* <h5 className="log-in-header">Log In</h5> */}
                    {/* <h5>Log In</h5> */}
                    <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    height="90vh"
                    backgroundColor= "transparent"
                    >
                        <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    
                    }}
                    >
                        <TextField
                        label="Email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email}
                        name="email"
                        error={Boolean(touched.email) && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{ gridColumn: "span 4" }}
                        />
                        <TextField
                        label="Password"
                        type="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.password}
                        name="password"
                        error={Boolean(touched.password) && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                        sx={{ gridColumn: "span 4" }}
                        />
                    </Box>

                    <Box>
                        <Button
                        fullWidth
                        type="submit"
                        sx={{
                            m: "1rem 0",
                            p: "1rem",
                            width: "200px",
                            backgroundColor: "#8A1F5A", // Desired background color
                            color: "#FFFFFF",
                            borderRadius: "0.5rem",
                            "&:hover": {
                                backgroundColor: "#9e2c6b", // Desired background color on hover
                            },
                        }}
                        >
                        LOGIN
                        </Button>
                    </Box>
                     
                <Link to="/register" sx={{ marginTop: "0.2rem" }}>Don't have an account?</Link>
                </Box>

                </form>
            )}
        </Formik>
    )
}

export default LoginForm;