import React from 'react'
import { useParams } from 'react-router-dom';
import { ActualizarKataForm } from '../components/forms/ActualizarKataForm';
import { Kata } from '../config/types/Kata.types'

//TODO: formulario de actualizacion de kata
export const ActualizarKata = () => {

    let { id } = useParams();



    return (
        <div>

            <h1>Actualizar Kata</h1>
            <ActualizarKataForm />

        </div>

    )
}
