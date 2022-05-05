
// React Router DOM imports
import { Routes, Route, Navigate } from "react-router-dom"
// Paginas o Vistas
import { HomePage } from "../pages/HomePage"
import { KataDetailsPage } from "../pages/KataDetailsPage"
import { KatasPage } from "../pages/KatasPage"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"
import { CrearKata } from "../pages/CrearKata"
import { ActualizarKata } from "../pages/ActualizarKata"

export const AppRoutes = () => {
    return (
        <Routes>

            {/**Creacion de nuestro sistema de enrutado (URLS y sus componentes o pages asociados) */}
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/katas' element={<KatasPage />}></Route>
            <Route path='/katas/:id' element={<KataDetailsPage />}></Route>
            <Route path='/actualizarKata/:id' element={<ActualizarKata />}></Route>
            <Route path='/crearKata' element={<CrearKata />}></Route>


            {/**Redireccion de ruta no encontrada */}
            <Route path='*'
                element={<Navigate to="/" />}></Route>
        </Routes>
    )
}