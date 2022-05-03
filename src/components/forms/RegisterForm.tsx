import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { register } from '../../services/authService';
import * as Yup from 'yup';
import { AxiosResponse } from 'axios';

// Definicion de componente
export const RegisterForm = () => {

    // Campos que se pasan a formik
    const initialCredential = {
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


    return (
        <div>
            <h4>Formulario de registro de nuevo usuario</h4>
            {/* Encapsulacion de Formik (Wrapper)*/}
            <Formik
                initialValues={initialCredential}
                validationSchema={registerSchema}
                onSubmit={async (values) => {

                    register(values.email, values.password, values.name, values.age)
                        .then((response: AxiosResponse) => {

                            if (response.status === 200) {
                                console.log('User registered correctly')
                                console.log(response.data);
                                alert('Usuario registrado correctamente');
                            } else {
                                throw new Error('Error in registry')
                            }

                        }).catch((error) => {
                            console.log(`Error de registro:  ${error}`)
                        })





                }

                }

            >
                {/** Valores a inyectar en formulario*/}

                {

                    ({ values, isSubmitting, touched, errors, handleChange, handleBlur }) => (
                        // Formulario de formik
                        <Form>
                            {/** Campos de nombre*/}
                            <label htmlFor="name">Nombre</label>
                            <Field type="text" id="name" name="name" placeholder="Escribe tu nombre" />

                            {/** Errrores de nombre*/}
                            {
                                errors.name && touched.name && (
                                    <ErrorMessage name="name" component='div'></ErrorMessage>
                                )
                            }
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

                            {/** Errrores de password*/}
                            <label htmlFor="confirm">Confirm Password</label>
                            <Field type="password" id="confirm" name="confirm" placeholder="Ingrese contraseña" />

                            {/** Errrores de Password*/}
                            {
                                // Si existen errores de email y el usuario ha pinchado sobre el input de email
                                errors.confirm && touched.confirm && (
                                    <ErrorMessage name="confirm" component='div'></ErrorMessage>
                                )
                            }

                            <label htmlFor="age">Edad</label>
                            <Field type="number" id="age" name="age" placeholder="Ingrese edad" />

                            {/** Errrores de Password*/}
                            {
                                // Si existen errores de email y el usuario ha pinchado sobre el input de email
                                errors.age && touched.age && (
                                    <ErrorMessage name="edad" component='div'></ErrorMessage>
                                )
                            }

                            {/** Boton de envio*/}
                            <button type="submit">Register</button>

                            {/** Mensaje al presionar boton de envio*/}
                            {
                                isSubmitting ? (
                                    <p>Registrando</p>
                                ) : null
                            }
                        </Form>
                    )




                }
            </Formik>
        </div>
    )
}