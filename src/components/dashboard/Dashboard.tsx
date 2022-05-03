import React, { useState } from 'react'
import { styled, createTheme, ThemeProvider, Theme } from '@mui/material/styles'

// CSS && Drawer
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'

//  Barra de navegacion
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import ToolBar from '@mui/material/Toolbar'

// Material Listas
import List from '@mui/material/List'

// Material Grids & Box
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'


// Iconos
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import LogoutIcon from '@mui/icons-material/Logout'
import NotificationIcon from '@mui/icons-material/Notifications'

// Lista del menu (Componente MenuItems)
import { MenuItems } from './MenuItems'
import { boolean } from 'yup/lib/locale'
import { Typography } from '@mui/material'
import { NuevoEditor } from '../editor/NuevoEditor'
import { TipTapEditor } from '../editor/TipTapEditor'

// Propiedades del menu
// Ancho del Drawer
const anchoDrawer: number = 240;

// Props del appBar
// Props form AppBar
interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}


// BarraNavegacion --> Con styled aplico stilo a componente de material MuiAppBar
const BarraNav = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => (
    // Agrego 2 transiciones --> metodo create se le pasa dos parametros : array de propiedades a modificar y la transicion a aplicar
    {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        ... (open && {
            marginLeft: anchoDrawer,
            width: `calc(100% - ${anchoDrawer}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            }),
        }),
    }
));

// Menu Drawer

const Menu = styled(MuiDrawer, {
    // Controlar si esta desplegado o no
    shouldForwardProp: (prop) => prop !== 'open',
})
    (
        ({ theme, open }) => ({
            // defino propiedades del paper 
            '& .MuiDrawer-paper': {
                position: 'relativa',
                // No se tendra en cuenta espacios en blanco
                whiteSpace: 'nowrap',
                width: anchoDrawer,
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen
                }),
                boxSizing: 'border-box',
                // En caso de que este cerrado el menu --> se le añaden las siguientes propiedadea de estilos
                ...(!open && {
                    // Ocultar 
                    overflowX: 'hidden',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen
                    }),
                    width: theme.spacing(7),
                    // Establezco resoluciones o tamaños de pantalla de dispositivos a traves breakpoint para hacerlo mas responsive
                    // Similar a las @media query de css
                    [theme.breakpoints.up('sm')]: {
                        width: theme.spacing(9)
                    }

                })

            }

        })

    )

/**
 *  El tema especifica el color de los componentes, las obscuridad de las superficies, 
 * nivel de la sombra, opacidad apropiada de la tinta de los elementos, etc. Los temas 
 *  permiten aplicar un tono consistente a la aplicación.
 * Defino TEMA con metodo createTheme
 */

const tema = createTheme();

// Contenido del dashboard (Componentes de navegacion)

export const ContenidoDashboard = () => {



    // Almacena info  de abierto/cerrado  del menu lateral en un estado
    const [abierto, setAbierto] = useState(true);

    // Mostrar/ocultar menu
    const manejadorDrawer = () => {
        setAbierto(!abierto);
    }
    // Contenido a renderizar
    return (
        <ThemeProvider theme={tema}>
            <Box sx={{ display: 'flex' }}>
                <BarraNav position='absolute' open={abierto}>
                    {/**Acciones */}
                    <ToolBar sx={{ pr: '20px' }}>
                        {/**Iconos */}
                        {/**ICono para mostrar menu */}
                        <IconButton
                            edge='start'
                            color='inherit'
                            arial-label='Abrir menu'
                            onClick={manejadorDrawer}
                            sx={{
                                marginRight: '35px',
                                ...(
                                    abierto && {
                                        display: 'none'
                                    }
                                )

                            }}

                        >
                            <MenuIcon />

                        </IconButton>
                        {/**Titulo de la aplicacion */}
                        <Typography
                            component='h1'
                            variant='h6'
                            color='inherit'
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Katas
                        </Typography>

                        {/**Icono para mostrar notificaciones */}
                        <IconButton color='inherit'>
                            <Badge badgeContent={10} color='secondary'>
                                <NotificationIcon />

                            </Badge>
                        </IconButton>
                        {/**Icono para logout */}
                        <IconButton color='inherit'>
                            <Badge badgeContent={10} color='secondary'>
                                <NotificationIcon />

                            </Badge>
                        </IconButton>
                    </ToolBar>


                </BarraNav>
                {/**Menu desplegable */}
                <Menu variant='permanent' open={abierto}>
                    <ToolBar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1]

                        }}
                    >
                        {/**Icono para mostrar/ocultar menu */}
                        <IconButton color='inherit' onClick={manejadorDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </ToolBar>

                    {/**Division entre navBar y contenido */}
                    <Divider />
                    {/**Lista de los elementos del menu (Componente menuItems.jsx) */}
                    <List component='nav'>
                        {MenuItems}


                    </List>


                </Menu>
                {/**Contenido del dashboard */}
                <Box
                    component='main'
                    sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto'
                    }}
                >
                    <ToolBar />
                    {/**Contenedor de elementos de dashboard */}
                    <Container maxWidth='lg' sx={{ mx: 4 }}>
                        {/**Estructura de tipo rejilla (GRID) . Para pantallas grandes : 9 columnas / pequeñas :12 columnas y medianas: 8 columnas */}

                        <Grid item xs={12} md={12} lg={12}>
                            {/**Bloque Paper con contenido con distribucion flex en modo de columnas */}
                            <Paper sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                height: 400
                            }}>
                                {/**Editores de codigo */}
                                <NuevoEditor />
                                {/**<TipTapEditor /> */}
                            </Paper>

                        </Grid>



                    </Container>


                </Box>
            </Box>

        </ThemeProvider >

    )

}
