import React from 'react';
import { useFormik } from 'formik'
import { crearKata } from '../../services/katasService';
import * as Yup from 'yup';
import { AxiosResponse } from 'axios';
import { useSessionStorage } from '../hooks/useSessionStorage';

// Importaciones de componentes de materia UI
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Kata } from '../../config/types/Kata.types';
import { TipTapEditor } from '../editor/TipTapEditor'
import { useNavigate } from 'react-router-dom';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TextareaAutosize } from '@mui/base';
// Menu 
import { ContenidoDashboard } from '../dashboard/Dashboard';

export const CrearKataForm = () => {
    let navigate = useNavigate();
    let userId = useSessionStorage('id');
    let loggedIn = useSessionStorage('JWToken');
    let tema = createTheme()
    // Campos que se pasan a formik
    const credencialesIniciales = {
        name: '',
        descripcion: '',
        level: 'Basic',
        solucion: '',

    }

    // definir esquema de validacion con yup
    const kataSchema = Yup.object().shape({
        name: Yup.string().required('El campo nombre del kata es obligatorio'),
        descripcion: Yup.string().required('Debe proporcionar una descripcion'),
        level: Yup.string().required('Debe proporcionar un nivel '),
        solucion: Yup.string().required('Debe proporcionar una solucion')

    })

    const formik = useFormik({
        initialValues: credencialesIniciales,
        // Validaciones de formulario
        validationSchema: kataSchema,
        onSubmit: (values) => {

            let kata = {
                name: values.name,
                Description: values.descripcion,
                Level: values.level,
                User: userId,
                participants: [],
                solution: values.solucion
            }

            crearKata(loggedIn, kata).then((res) => {
                if (res.status === 201) {
                    alert('Kata creado correctamente');
                    navigate('/katas')
                }
            }).catch(error => {
                throw new Error(`Error al crear kata: ${error}`)
            })



        }
    })

    return (
        <>

            {/* Encapsulacion de Formik (Wrapper)*/}

            <ThemeProvider theme={tema}>
                <ContenidoDashboard />
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
                            Creacion de nuevo kata
                        </Typography>
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} >
                                    <TextField
                                        autoComplete="given-name"
                                        name="name"

                                        fullWidth
                                        id="name"
                                        label="Nombre del Kata"
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
                                        id="descripcion"
                                        label="Descripcion del kata"
                                        name="descripcion"
                                        autoComplete="example@example.com"
                                        value={formik.values.descripcion}
                                        onChange={formik.handleChange}
                                        error={formik.touched.descripcion && Boolean(formik.errors.descripcion)}
                                        helperText={formik.touched.descripcion && formik.errors.descripcion}
                                    />
                                </Grid>

                            </Grid>
                            <Grid item xs={12}>

                                <Select
                                    fullWidth
                                    id="level"
                                    label="Nivel del kata"
                                    name="level"
                                    value={formik.values.level}
                                    onChange={formik.handleChange}
                                    error={formik.touched.level && Boolean(formik.errors.level)}

                                    style={{ marginTop: '10px', marginBottom: '10px' }}>

                                    <MenuItem value="Basic">Basico
                                    </MenuItem>
                                    <MenuItem value="Medium">Intermedio
                                    </MenuItem>
                                    <MenuItem value="Hight">Alto
                                    </MenuItem>

                                </Select>
                            </Grid>


                            <Grid item xs={12}>

                                <TextareaAutosize
                                    maxRows={100}
                                    aria-label="maximum height"

                                    defaultValue="."
                                    style={{ width: 200 }}
                                    name="solucion"

                                    value={formik.values.solucion}
                                    onChange={formik.handleChange}
                                />
                            </Grid>




                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Crear Kata
                            </Button>



                        </form>



                    </Box>

                </Container>
            </ThemeProvider >
        </>

    )
}

