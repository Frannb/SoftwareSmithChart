import React from 'react';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'


export default function TitleBar() {
    return (
        <AppBar position="static" style={{ backgroundColor: '#009999' }}>
            <Toolbar variant="dense">
                <Typography variant="h6" color="inherit" component="div" sx={{fontWeight: 'Bold'}}>
                    Ferramenta online de Carta de Smith
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
