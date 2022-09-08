import * as React from 'react'
import PropTypes from 'prop-types'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Page from './Page'
import PageCircuit from './PageCircuit'
import Circuit from './Circuit'

function TabPanel(props) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 2 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}


export default function BasicTabs({ tabOne }) {
    const [value, setValue] = React.useState(0)
    const [choice, setChoice] = React.useState(1)
    
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Carta de Smith" />
                    <Tab label="Cálculos teórico e circuito" />
                    <Tab label="Cálculos real e circuito" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Page step={tabOne} choice={choice} setChoice={setChoice}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PageCircuit tab={1}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <PageCircuit tab={2}/>
            </TabPanel>
        </Box>
    )
}
