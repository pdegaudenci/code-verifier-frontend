import React, { useEffect, useState } from 'react';
import { ContenidoDashboard } from '../components/dashboard/Dashboard';
import { useSessionStorage } from '../components/hooks/useSessionStorage';
import { useNavigate } from 'react-router-dom';
export const HomePage = () => {
    let navigate = useNavigate();
    // Token obtenido de sesion de navegador
    let loggedIn = useSessionStorage('JWToken');

    useEffect(() => {

        if (!loggedIn) {
            return navigate('/login')
        }

    }, [loggedIn])
    return (
        <ContenidoDashboard />
    )
}