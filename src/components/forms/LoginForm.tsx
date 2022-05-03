import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { login } from '../../services/authService';
import * as Yup from 'yup';
import { AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom'

// definir esquema de validacion con yup
const loginSchema = Yup.object().shape({
    // Objeto que contiene formulario --> email: objeto de tipo string que cumple formato email y es obligatorio
    email: Yup.string().email('Email invalido').required('Campo email es obligatorio'),
    password: Yup.string().required('El campo contraseña es obligatorio')
})

// Definicion de componente
export const LoginForm = () => {
    // Campos que se pasan a formik
    const initialCredential = {
        email: '', password: ''
    }
    let navigate = useNavigate();
    return (
        <>
            <h4>Formulario de login</h4>
            {/* Elementos formik*/}
            <Formik
                initialValues={initialCredential}
                validationSchema={loginSchema}
                onSubmit={async (values) => {
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


                }}

            >
                {/** Valores a inyectar en formulario*/}

                {

                    ({ values, isSubmitting, touched, errors, handleChange, handleBlur }) => (
                        // Formulario de formik
                        <Form>
                            {/** Campos de email*/}
                            <label htmlFor="email">Email</label>
                            <Field type="email" id="email" name="email" placeholder="email@example.com" />

                            {/** Errrores de email*/}
                            {
                                // Si existen errores de email y el usuario ha pinchado sobre el input de email
                                errors.email && touched.email && (
                                    <ErrorMessage name="email" component='div'></ErrorMessage>
                                )
                            }
                            {/** Errrores de password*/}
                            <label htmlFor="password">Password</label>
                            <Field type="password" id="password" name="password" placeholder="Ingrese contraseña" />

                            {/** Errrores de Password*/}
                            {
                                // Si existen errores de email y el usuario ha pinchado sobre el input de email
                                errors.password && touched.password && (
                                    <ErrorMessage name="password" component='div'></ErrorMessage>
                                )
                            }

                            {/** Boton de envio*/}
                            <button type='submit'>Login</button>

                            {/** Mensaje al presionar boton de envio*/}
                            {
                                isSubmitting ? (<p>Verificando credenciales ----</p>) : null
                            }
                        </Form>
                    )




                }
            </Formik>
        </>
    )
}