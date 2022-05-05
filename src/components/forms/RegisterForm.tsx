import React from 'react'
import { useFormik } from 'formik'
import { register } from '../../services/authService';
import * as Yup from 'yup';
import { AxiosResponse } from 'axios';

// Importaciones de componentes de materia UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Definicion de componente
export const RegisterForm = () => {

    let tema = createTheme()
    // Campos que se pasan a formik
    const credencialesIniciales = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        age: 18
    }

    // definir esquema de validacion con yup
    const registerSchema = Yup.object().shape({
        name: Yup.string().required('El campo nombre es obligatorio'),
        email: Yup.string().email('Email invalido').required('Campo email es obligatorio'),
        password: Yup.string().required('El campo contraseña es obligatorio').min(8, 'La longitud minima es de 8 caracteres'),
        // Cuando campo password se completa
        confirm: Yup.string().when("password", {
            is: (value: string) => (value && value.length > 0 ? true : false), // Su valor debe existir y su logintud mayor que cero
            then: Yup.string().oneOf( // Especificamos que debe ser un valor que coincida (OneOf) con la referencia
                [Yup.ref("password")], 'Contraseñas  deben coincidir'
            )
        })
            .required('Debes confirmar tu contraseña'),
        age: Yup.number()
            .min(10, 'Debe ser mayor que 10 años')
            .required('Edad es requerida para el registro')

    })

    const formik = useFormik({
        initialValues: credencialesIniciales,
        // Validaciones de formulario
        validationSchema: registerSchema,
        onSubmit: (values) => {
            console.log(values)
            register(values.email, values.password, values.name, values.age)
                .then((response: AxiosResponse) => {

                    if (response.status === 200) {
                        console.log('Usuario registrado correctamente')
                        console.log(response.data);
                        alert('Usuario registrado correctamente');
                    } else {
                        throw new Error('Error en registro de usuario')
                    }

                }).catch((error) => {
                    console.log(`Error de registro:  ${error}`)
                })


        }
    });


    return (
        <>

            {/* Encapsulacion de Formik (Wrapper)*/}

            <ThemeProvider theme={tema}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" sx={{ mb: 5 }}>
                            Registro de usuario
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"
                              
                                        fullWidth
                                        id="firstName"
                                        label="Nombre completo"
                                        autoFocus
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        error={formik.touched.name && Boolean(formik.errors.name)}
                                        helperText={formik.touched.name && formik.errors.name}
                                    />
                                </Grid>


                                <Grid item xs={12}>
                                    <TextField
                                     
                                        fullWidth
                                        id="email"
                                        label="Correo Electronico"
                                        name="email"
                                        autoComplete="example@example.com"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                      
                                        fullWidth
                                        name="password"
                                        label="Escriba su contraseña"
                                        type="password"
                                        id="password"
                                        autoComplete="Confirme contraseña"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                      
                                        fullWidth
                                        name="confirm"
                                        label="Confirmar Contraseña"
                                        type="password"
                                        id="confirm"
                                        value={formik.values.confirm}
                                        onChange={formik.handleChange}
                                        error={formik.touched.confirm && Boolean(formik.errors.confirm)}
                                        helperText={formik.touched.confirm && formik.errors.confirm}

                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                      
                                        fullWidth
                                        name="age"
                                        label="Ingrese su edad"
                                        type="number"
                                        id="age"
                                        value={formik.values.age}
                                        onChange={formik.handleChange}
                                        error={formik.touched.age && Boolean(formik.errors.age)}
                                        helperText={formik.touched.age && formik.errors.age}
                                    
                                    />
                                </Grid>
                                   <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Registrarme
                            </Button>
                            </Grid>
                         
                        
                        </form>



                    </Box>

                </Container>
            </ThemeProvider >
        </>
    )
}