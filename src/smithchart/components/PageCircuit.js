import React from 'react'
import Circuit from './Circuit'
import { Box, Container, MenuItem, Stack } from '@mui/material'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export const v = {
    getSerie: ''
}

export default function PageCircuit({ tab }) {
    const [choiceSerie, setChoice] = React.useState('E96')
    v.getSerie = choiceSerie

    return (
        <Container fixed>
            <Stack direction="row" spacing={2}>
                <Box sx={{ width: '59%' }}>
                    <Circuit tab={tab} />
                </Box>
                {tab == 2 &&
                    <Stack direction="column" spacing={3} sx={{ p: 2 }}>
                        <Box sx={{ minWidth: 200 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Série</InputLabel>
                                <Select
                                    label={"Série"}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={choiceSerie}
                                    onChange={event => setChoice(event.target.value)}
                                >
                                    <MenuItem value={'E3'}>E3</MenuItem>
                                    <MenuItem value={'E6'}>E6</MenuItem>
                                    <MenuItem value={'E12'}>E12</MenuItem>
                                    <MenuItem value={'E24'}>E24</MenuItem>
                                    <MenuItem value={'E48'}>E48</MenuItem>
                                    <MenuItem value={'E96'}>E96</MenuItem>
                                    <MenuItem value={'E192'}>E192</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Stack>
                }
            </Stack>
        </Container>
    )
}
