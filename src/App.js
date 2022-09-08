import React from 'react'
import { Container, Typography } from '@mui/material'
import { Box } from '@mui/system'

import TitleBar from 'components/TitleBar'
import Stepper from 'components/Stepper'

export default function App() {
    return (
        <Container fixed>
            <Box sx={{ width: '100%' }}>
                <TitleBar />
            </Box>
            <Box sx={{ width: '100%', minHeight: '1vh', display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h6" sx={{ p: 3, fontWeight: 'Bold' }}>
                    Casamento de impedância por elementos concentrados em L
                </Typography>
            </Box>
            <Box sx={{ width: '100%' }}>
                <Stepper />
            </Box>
        </Container>
    )
}
