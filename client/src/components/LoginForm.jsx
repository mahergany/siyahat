import { useState } from 'react';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setLogin } from "../state";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useMediaQuery } from '@material-ui/core';
import '../pages/LoginPage.css';

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
});

const initialValuesLogin = {
    email: "",
    password: "",
};

function LoginForm() {
    const [error, setError] = useState(null); 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    
    const login = async (values, onSubmitProps) => {
        try {
            const loggedInResponse = await fetch(
                "http://localhost:3001/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                }
            );

            if (!loggedInResponse.ok) {
                throw new Error("Login failed. Please check your credentials.");
            }

            const loggedIn = await loggedInResponse.json();
            
            onSubmitProps.resetForm();
            
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token,
                })
            );
            navigate("/community");
        } catch (error) {
            console.error("Login error:", error.message);

            setError(error.message);
        }
    };

    const handleFormSubmit = async (values, onSubmitProps) => {
        await login(values, onSubmitProps);
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValuesLogin}
            validationSchema={loginSchema}
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
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        height="90vh"
                        backgroundColor="transparent"
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
                                sx={{ gridColumn: "span 4", width: '400px', pt: '0.5rem' }}
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
                                sx={{ gridColumn: "span 4", width: '400px', pt: '0.5rem' }}
                            />
                        </Box>

                        {error && (
                            <Box mt="0.5rem">
                                <Typography variant="body2" color="error">
                                    {error}
                                </Typography>
                            </Box>
                        )}

                        <Box mt="1.5rem">
                            <Button
                                fullWidth
                                type="submit"
                                sx={{
                                    m: "1rem 0",
                                    p: "1rem",
                                    width: "200px",
                                    backgroundColor: "#8A1F5A",
                                    color: "#FFFFFF",
                                    borderRadius: "0.5rem",
                                    "&:hover": {
                                        backgroundColor: "#9e2c6b",
                                    },
                                }}
                            >
                                LOGIN
                            </Button>
                        </Box>

                        <Box mt="0.5rem">
                            <Link to="/register" style={{ color: "#8A1F5A" }}>
                                Don't have an account?
                            </Link>
                        </Box>
                    </Box>
                </form>
            )}
        </Formik>
    );
}

export default LoginForm;
