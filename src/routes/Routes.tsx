
// React Router DOM imports
import { Routes, Route, Navigate } from "react-router-dom"
// Paginas o Vistas
import { HomePage } from "../pages/HomePage"
import { KataDetailsPage } from "../pages/KataDetailsPage"
import { KatasPage } from "../pages/KatasPage"
import { LoginPage } from "../pages/LoginPage"
import { RegisterPage } from "../pages/RegisterPage"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />}></Route>
            <Route path='/register' element={<RegisterPage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/katas' element={<KatasPage />}></Route>
            <Route path='/katas/:id' element={<KataDetailsPage />}></Route>
            <Route path='/katas/:id' element={<KataDetailsPage />}></Route>
            {/**Redireccion de ruta no encontrada */}
            <Route path='*'
                element={<Navigate to="/" />}></Route>
        </Routes>
    )
}