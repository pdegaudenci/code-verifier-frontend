import React from 'react'

// Material Item components
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

// Material icons
import PeopleIcon from '@mui/icons-material/People';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import BarChartIcon from '@mui/icons-material/BarChart';


export const MenuItems = (
    <React.Fragment>
        <ListItemButton>

            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>


            <Link to='/katas' className="menuLink"> Katas </Link>

        </ListItemButton>
        <ListItemButton>


            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>

            <Link to='/misKatas' className="menuLink">Mis Katas </Link>

        </ListItemButton>

        <ListItemButton>
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <Link to='/katas' > Usuarios </Link>
        </ListItemButton>

        <ListItemButton>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>

            <Link to='/ranking' > Ranking </Link>
        </ListItemButton>
    </React.Fragment>

)

export default MenuItems