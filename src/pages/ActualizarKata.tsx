import React, { useState, useEffect } from 'react'
import { ActualizarKataForm } from '../components/forms/ActualizarKataForm';
import { Kata } from '../config/types/Kata.types'
import { useNavigate, useParams } from 'react-router-dom';
import { useSessionStorage } from '../components/hooks/useSessionStorage';
import { getKataById } from '../services/katasService';
import { AxiosResponse } from 'axios';

// Validaciones con yup y formik
import { useFormik } from 'formik'
import * as Yup from 'yup';

// importaciones de material ui
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
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { TextareaAutosize } from '@mui/base';

// Menu
import { ContenidoDashboard } from '../components/dashboard/Dashboard';

// Servicio para actualizar kata
import { actualizarKata } from '../services/katasService'


//TODO: formulario de actualizacion de kata
export const ActualizarKata = () => {

    let { id } = useParams();
    let navigate = useNavigate();
    // Token obtenido de sesion de navegador
    let loggedIn = useSessionStorage('JWToken');
    //Id del usuario
    let idUser: string = useSessionStorage('id');
    const [kata, setKata] = useState<Kata | undefined>(undefined);

    useEffect(() => {
        //Verificar si esta logueado
        if (!loggedIn) {
            return navigate('/login')
        }
        else {
            if (id) {
                getKataById(loggedIn, id).then((response: AxiosResponse) => {
                    if (response.status === 200 && response.data) {
                        let kataObtenido: Kata = {
                            _id: response.data._id,
                            name: response.data.name,
                            Chances: response.data.Chances,
                            Description: response.data.Description,
                            Level: response.data.Level,
                            Average: response.data.Average,
                            User: response.data.User,
                            participants: response.data.participants,
                            solution: response.data.solution
                        }
                        setKata(kataObtenido);
                    }
                }).catch(error => {
                    console.log(`[ERROR kata by id]:${error}`)
                })
            }
            else {
                return navigate('/katas')
            }
            console.log(kata)
        }

    }, [loggedIn])

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
                User: idUser,
                participants: [],
                solution: values.solucion
            }

            actualizarKata(loggedIn, kata, idUser).then((res) => {
                if (res.status === 201) {
                    alert('Kata actualizado correctamente');
                    navigate('/katas')
                }
            }).catch(error => {
                throw new Error(`Error al actualizar kata: ${error}`)
            })



        }
    })
    return (
        <div>

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

                            Actualizacion de kata
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
                                        value={kata?.name}
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
                                        value={kata?.Description}
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
                                    value={kata?.Level}
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

                                    value={kata?.solution}
                                    onChange={formik.handleChange}
                                />
                            </Grid>




                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Actualizar kata
                            </Button>



                        </form>



                    </Box>

                </Container>
            </ThemeProvider >


        </div>

    )
}
