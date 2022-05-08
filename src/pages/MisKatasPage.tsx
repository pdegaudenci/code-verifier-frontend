import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../components/hooks/useSessionStorage'
import { obtenerKatasDeUsuario } from '../services/katasService';
import { ContenidoDashboard } from '../components/dashboard/Dashboard';
import { Kata } from '../config/types/Kata.types';
import Button from '@mui/material/Button';

export const MisKatasPage = () => {
    let id = useSessionStorage('id');
    let token = useSessionStorage('JWToken')
    let navigate = useNavigate();
    const [katas, setKatas] = useState([])

    useEffect(() => {
        if (!token) {
            navigate('/login')

        }
        else {
            obtenerKatasDeUsuario(token, id).then(response => {
                if (response.status === 200 && response.data.katas && response.data.totalPages && response.data.currentPage) {
                    // console.table(response.data);
                    // Desestructuracion de campos de response.data
                    let { katasFound } = response.data;

                    setKatas(katasFound);

                }
                else {
                    throw new Error(`Error con la informacion obtenida: ${response.data}`)
                }
            }).catch((error: any) => {
                console.log(`Error obteniendo kaats de API Rest: ${error}`)
            })
        }


    }, [token])

    const crearKata = () => {
        navigate('/crearKata');

    }

    return (
        <div>
            <ContenidoDashboard />

            <h1>Mis katas</h1>
            {/**TODO:  Real kata */}
            {
                katas.length > 0 ? (

                    <div>
                        {katas.map((kata: Kata) => (

                            <div key={kata._id}>
                                <h3>{kata.name}</h3>
                                <h4>{kata.Description}</h4>
                                <h5>Creador: {kata.User}</h5>
                                <h6>Rating: {kata.Average}</h6>

                            </div>
                        )

                        )
                        }


                    </div>


                ) :
                    (
                        <div>
                            <h5>No hay kaats disponibles</h5>
                        </div>
                    )
            }

            <Button variant="contained" color="primary"
                onClick={() => {
                    crearKata()
                }}>
                Crear Kata
            </Button>

        </div>

    )
}

