import { ContenidoDashboard } from '../components/dashboard/Dashboard';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSessionStorage } from '../components/hooks/useSessionStorage';
import { Kata } from '../config/types/Kata.types';
import { getAllKatas } from '../services/katasService';
import Button from '@mui/material/Button';

export const KatasPage = () => {
    // Verificar si el usuario esta logueado y exixte un JWToken en sesionStorage
    let loggedIn = useSessionStorage('JWToken')
    let navigate = useNavigate();
    // Estado con informacion de katas
    const [katas, setKatas] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => {

        if (!loggedIn) {
            return navigate('/login')
        } else {
            getAllKatas(loggedIn, 10, 1).then((response: AxiosResponse) => {
                if (response.status === 200 && response.data.katas && response.data.totalPages && response.data.currentPage) {
                    // console.table(response.data);
                    // Desestructuracion de campos de response.data
                    let { katas, totalPages, currentPage } = response.data;
                    setKatas(katas);
                    setTotalPages(totalPages);
                    setCurrentPage(currentPage);
                }
                else {
                    throw new Error(`Error con la informacion obtenida: ${response.data}`)
                }
            }).catch((error: any) => {
                console.log(`Error obteniendo kaats de API Rest: ${error}`)
            })
        }

    }, [loggedIn])

    /**
     * Metodo para navegar a los detalles de un kata especifico
     * @param id {number} id del kata seleccionado
     */
    const navigateToKataDetail = (id: any) => {
        navigate(`/katas/${id}`)
    }

    const crearKata = () => {
        navigate('/crearKata');
    }

    return (
        <div>
            <ContenidoDashboard />
            <h1>Katas Page</h1>
            {/**TODO:  Real kata */}
            {
                katas.length > 0 ? (

                    <div>
                        {katas.map((kata: Kata) => (

                            <div key={kata._id}>
                                <h3 onClick={() => {
                                    navigateToKataDetail(kata._id)
                                }}>{kata.name}</h3>
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