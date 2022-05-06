import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';

// Importaciones de react-router-dom
import { useNavigate, useParams } from 'react-router-dom';

import { useSessionStorage } from '../components/hooks/useSessionStorage';
import { Kata } from '../config/types/Kata.types';
import { getKataById, borrarKataById } from '../services/katasService';

import Button from '@mui/material/Button';
import { TipTapEditor } from '../components/editor/TipTapEditor';

export const KataDetailsPage = () => {

    // Buscar id 
    let { id } = useParams();
    const [kata, setKata] = useState<Kata | undefined>(undefined);
    // Variable para navegar entre stack de rutas
    let navigate = useNavigate();
    // Token obtenido de sesion de navegador
    let loggedIn = useSessionStorage('JWToken');
    //Id del usuario
    let idUser: string = useSessionStorage('id');

    // Funcion para actualizar kata
    const actualizarKata = () => {
        navigate(`/actualizarKata/${id}`);
    }

    const borrarKata = (kata: any) => {
        let respuesta = window.confirm(`Desea borrar el siguiente kata 
        ${kata?.name}
        ${kata?.Description}
        `);
        if (respuesta === true) {
            borrarKataById(loggedIn, id, idUser);
            navigate(`/katas`);
        }
    }

    // Estado para mostra solucion
    const [showSolution, setShowSolution] = useState(false);
    useEffect(() => {
        //Verificar si esta logueado
        if (!loggedIn) {
            return navigate('/login')
        }
        else {
            if (id) {
                getKataById(loggedIn, id).then((response: AxiosResponse) => {
                    if (response.status === 200 && response.data) {
                        let kata: Kata = {
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
                        setKata(kata);
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

    return (
        <div>
            <h1>KataDetailsPage</h1>
            <div>
                {
                    kata ? (
                        <div className='kata-data'>

                            <h2>{kata?.Description}</h2>
                            <h3>Rating: {kata?.Average}/10</h3>
                        </div>

                    ) : (
                        <div>
                            Cargando kata .....
                        </div>
                    )
                }



                {
                    idUser === kata?.User ?
                        <div>
                            <Button variant="contained" color="primary"
                                onClick={() => {
                                    borrarKata(kata)
                                }}>
                                Borrar Kata
                            </Button>
                            <Button variant="contained" color="primary"
                                onClick={() => {
                                    actualizarKata()
                                }}>
                                Actualizar Kata
                            </Button>


                        </div>


                        : (null)
                }
                <button onClick={() => setShowSolution(!showSolution)} style={{ marginTop: 10, marginBottom: 10 }}>
                    {showSolution ? 'Mostrar solucion' : 'Esconder solucion'}
                </button>
                {showSolution ? null : <TipTapEditor solution={kata?.solution}></TipTapEditor>}
            </div>
        </div>
    )
}