import React from 'react'
import { Box, Button, Stepper, Step, StepButton } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Page from 'components/Page'
import Tabs from 'components/Tabs'

const steps = [
    'Fornecer impedâncias da linha, da carga e frequência',
    'Normalizar a carga',
    'Identificar a situação de casamento',
    'Cálculos',
]

const theme1 = createTheme({
    palette: {
        primary: {
            main: '#ffffff',
            contrastText: '#fff',
        },
    },
})

const theme2 = createTheme({
    palette: {
        primary: {
            main: '#009999',
            contrastText: '#fff',
        },
    },
})


export default function Stepper_() {
    const [activeStep, setActiveStep] = React.useState(0)

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1)
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <ThemeProvider theme={theme2}>
            {activeStep <= 2 && <Page step={activeStep} /> }
            {activeStep >= 3 && <Tabs tabOne={activeStep} /> }
                {/* <Page step={activeStep} /> */}
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => (
                        <Step key={label} completed={index < activeStep} >
                            <StepButton color="primary">
                                {label}
                            </StepButton>
                        </Step>
                    ))}
                </Stepper>
            </ThemeProvider>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                <ThemeProvider theme={theme1}>
                    <Button
                        color="primary"
                        style={{ backgroundColor: '#009999' }}
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}>
                        Anterior
                    </Button>
                </ThemeProvider>
                <Box sx={{ flex: '1 1 auto' }} />
                <ThemeProvider theme={theme1}>
                    <Button
                        color="primary"
                        style={{ backgroundColor: '#009999' }}
                        disabled={activeStep === steps.length - 1}
                        onClick={handleNext}
                        sx={{ mr: 1 }}>
                        Próximo
                    </Button>
                </ThemeProvider>
            </Box>
        </Box>
    )
}
