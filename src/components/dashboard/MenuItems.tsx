import React from 'react'

// Material Item components
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// Material icons
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { BrowserRouter as Router, Link } from 'react-router-dom';

export const MenuItems = (
    <React.Fragment>
        <ListItemButton>



            <Link to='/katas' className="menuLink"> Katas </Link>

        </ListItemButton>
        <ListItemButton>



            <Link to='/misKatas' className="menuLink">Mis Katas </Link>

        </ListItemButton>

        <ListItemButton>

            <Link to='/katas' > Usuarios </Link>
        </ListItemButton>

        <ListItemButton>

            <Link to='/ranking' > Ranking </Link>
        </ListItemButton>
    </React.Fragment>

)

export default MenuItems