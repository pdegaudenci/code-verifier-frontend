import React from 'react'
import { useSessionStorage } from '../components/hooks/useSessionStorage'

export const MisKatasPage = () => {
    let id = useSessionStorage('id');

    return (
        <div>Mis Katas</div>

    )
}

