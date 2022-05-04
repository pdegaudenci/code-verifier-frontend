import React from 'react'
import { useFormik, Formik, Form, Field, ErrorMessage, FormikValues } from 'formik'
import { login } from '../../services/authService';
import * as Yup from 'yup';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom'

// Importaciones de material -ui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// definir esquema de validacion con yup
const loginSchema = Yup.object({
    // Objeto que contiene formulario --> email: objeto de tipo string que cumple formato email y es obligatorio
    email: Yup.string().email('Email invalido').required('Campo email es obligatorio'),
    password: Yup.string().required('El campo contraseña es obligatorio')
})

// Definicion de componente
export const LoginForm = () => {
    // Campos que se pasan a formik

    const credencialesIniciales = {
        email: '',
        password: ''
    }
    let navigate = useNavigate();

    // Control de formulario a traves de formik --> Validaciones , y accion a ejecutar con evento onSubmit al presionar boton
    const formik = useFormik({
        initialValues: credencialesIniciales,
        // Validaciones de formulario
        validationSchema: loginSchema,
        onSubmit: (values: FormikValues) => {
            /* Verificacion inicial en frontend los datos capturados
            await new Promise((r) => setTimeout(r, 1000))
            alert(JSON.stringify(values, null, 2));
            console.table(values)
            */
            login(values.email, values.password).then(async (response: AxiosResponse) => {

                if (response.status === 200) {
                    if (response.data.token) {
                        /**
                         *  alert(JSON.stringify(response.data, null, 2));
                        console.table(response.data)
                         */
                        // PErsistir o guardar token en navegador del cliente
                        await sessionStorage.setItem('JWToken', response.data.token);
                        await sessionStorage.setItem('id', response.data.id)
                        navigate('/')


                    }
                    else {
                        alert('Error generando login')
                        throw new Error('Error generando token de login')
                    }

                }
                else {
                    alert('Credenciales incorrectas')
                    throw new Error('Credenciales incorrectas')
                }

            }).catch((error) => {
                alert('Credenciales incorrectas')
                console.log(`Error de login:  ${error}`)
            })


        },
    });


    const tema = createTheme();

    return (
        <>
            <ThemeProvider theme={tema}>

                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />

                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>

                            <form onSubmit={formik.handleSubmit}>
                                {/**Campo de email */}
                                <TextField
                                    fullWidth
                                    id="email"
                                    name="email"
                                    label="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                {/**Campo de contraseña */}
                                <TextField
                                    fullWidth
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    sx={{ my: 3 }}

                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                <Button color="primary" variant="contained" fullWidth type="submit">
                                    Ingresar
                                </Button>
                            </form>
                        </Box>

                    </Grid>
                </Grid>



            </ThemeProvider>

        </>
    )
}