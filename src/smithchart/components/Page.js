import React from 'react'
import useChange from 'use-change'
import { Box, Container, MenuItem, Stack, Tabs, TextField, Typography } from '@mui/material'
import math from 'utils/math'
import SmithChart from 'components/SmithChart'
import InputParameter from 'parameters/components/InputParameter'
import { store } from 'store'

export const valuesChart = {
    getImpedance: '',
    getLineImpedance: '',
    getSituation: '',
    getFrequency: '',
    getZ: '',
    getChoice: ''
}

export default function Page({ step, choice, setChoice }) {
    const [impedance, setImpedance] = useChange(store, 'impedance')
    const [lineImpedance, setLineImpedance] = useChange(store, 'lineImpedance')
    const [frequency, setFrequency] = useChange(store, 'frequency')

    const z = math.divide(impedance.value, lineImpedance.value)
    const y = math.inv(z)
    const situation = z.re >= 1 ? 'A' : y.re >= 1 ? 'B' : 'C'

    const situationText = {
        A: 'O ponto está dentro do círculo de impedância',
        B: 'O ponto está dentro do círculo de admitância',
        C: 'O ponto está fora dos círculos de impedância e admitância',
    }[situation]

    valuesChart.getImpedance = impedance.value
    valuesChart.getLineImpedance = lineImpedance.value
    valuesChart.getFrequency = frequency.value
    valuesChart.getSituation = situation
    valuesChart.getChoice = choice
    valuesChart.getZ = z

    return (
        <Container fixed>
            <Stack direction="row" spacing={2}>
                <Box sx={{ width: '59%' }}>
                    <SmithChart
                        showSituation={step >= 2}
                        showConstruction={step >= 3}
                        situation={situation}
                        choice={choice}
                    />
                </Box>
                <Stack direction="column" spacing={3} sx={{ p: 2 }}>
                    <InputParameter parameter={lineImpedance} setParameter={setLineImpedance} />
                    <InputParameter parameter={impedance} setParameter={setImpedance} />
                    <InputParameter parameter={frequency} setParameter={setFrequency} />
                    {step >= 1 &&
                        <Typography>
                            <b>z<sub>L</sub>: </b> {z.format(4)}
                        </Typography>
                    }
                    {step >= 2 &&
                        <Typography>
                            <b>Situação: </b>{situationText}
                        </Typography>
                    }

                    {step >= 3 &&
                        <TextField
                            select
                            value={choice}
                            label="Escolha"
                            onChange={event => setChoice(event.target.value)}
                        >
                            <MenuItem value={0}><em>Nenhuma</em></MenuItem>
                            <MenuItem value={1}>Escolha 1</MenuItem>
                            <MenuItem value={2}>Escolha 2</MenuItem>
                            {situation == 'C' &&
                                <MenuItem value={3}>Escolha 3</MenuItem>
                            }
                            {situation == 'C' &&
                                <MenuItem value={4}>Escolha 4</MenuItem>
                            }
                        </TextField>
                    } 
                </Stack>
            </Stack>
        </Container>
    )
}
