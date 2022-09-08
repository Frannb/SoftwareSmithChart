import React from 'react'
import { Typography } from '@mui/material'

import Circuit1 from 'circuito/Circuit1'
import Circuit2 from 'circuito/Circuit2'
import Circuit3 from 'circuito/Circuit3'
import Circuit4 from 'circuito/Circuit4'
import Circuit5 from 'circuito/Circuit5'
import Circuit6 from 'circuito/Circuit6'
import Circuit7 from 'circuito/Circuit7'
import Circuit8 from 'circuito/Circuit8'

import CircuitCalculation from './CircuitCalculation'
import { formatNum } from '../format/formatElements'


export default function Circuit({ tab }) {
    const e = CircuitCalculation()

    switch (e.caseCircuit) {
        case 'caso1-escolha1':
            //case 'caso3-escolha1-parteSuperior':
            return <Typography>
                {tab == 1 &&
                    <Typography>
                        <Circuit1
                            Zin={e.valueZinTheoretical}
                            valC={formatNum(e.valueElementTheoretical1.format(4)) + 'F'}
                            valL={formatNum(e.valueElementTheoretical2.format(4)) + 'H'}
                            valZL={e.valueElementZL.format(4)}
                        />
                        <div><br />
                            <b>Coeficiente de reflexão: </b> {e.reflectionCoefficient1}
                        </div><br /><br /><br />
                    </Typography>
                }
                {tab == 2 &&
                    <Typography>
                        <Circuit1
                            Zin={e.valueZinReal.format(2)}
                            valC={formatNum(e.valueElementReal1) + 'F'}
                            valL={formatNum(e.valueElementReal2) + 'H'}
                            valZL={e.valueElementZL.format(4)}
                        />
                        <div><br />
                            <b>Coeficiente de reflexão: </b> {e.reflectionCoefficient2}
                        </div><br /><br /><br />
                    </Typography>
                }
            </Typography>

        case 'caso1-escolha2':
            //case 'caso3-escolha2-parteInferior':
            return <Typography>
                {tab == 1 &&
                    <Typography>
                        <Circuit2
                            Zin={e.valueZinTheoretical}
                            valC={formatNum(e.valueElementTheoretical2.format(4)) + 'F'}
                            valL={formatNum(e.valueElementTheoretical1.format(4)) + 'H'}
                            valZL={e.valueElementZL.format(4)}
                        />
                        <div><br />
                            <b>Coeficiente de reflexão: </b> {e.reflectionCoefficient1}
                        </div><br /><br /><br />
                    </Typography>
                }
                {tab == 2 &&
                    <Typography>
                        <Circuit2
                            Zin={e.valueZinReal.format(2)}
                            valC={formatNum(e.valueElementReal2) + 'F'}
                            valL={formatNum(e.valueElementReal1) + 'H'}
                            valZL={e.valueElementZL.format(4)}
                        />
                        <div><br />
                            <b>Coeficiente de reflexão: </b> {e.reflectionCoefficient2}
                        </div><br /><br /><br />
                    </Typography>
                }
            </Typography>

        case 'caso2-escolha1':
            //case 'caso3-escolha3-parteInferior':
            return <Typography>
                {tab == 1 &&
                    <Typography>
                        <Circuit3
                            Zin={e.valueZinTheoretical}
                            valC={formatNum(e.valueElementTheoretical2.format(4)) + 'F'}
                            valL={formatNum(e.valueElementTheoretical1.format(4)) + 'H'}
                            valZL={e.valueElementZL.format(4)}
                        />
                        <div><br />
                            <b>Coeficiente de reflexão: </b> {e.reflectionCoefficient1}
                        </div><br /><br /><br />
                    </Typography>
                }
                {tab == 2 &&
                    <Typography>
                        <Circuit3
                            Zin={e.valueZinReal.format(2)}
                            valC={formatNum(e.valueElementReal2) + 'F'}
                            valL={formatNum(e.valueElementReal1) + 'H'}
                            valZL={e.valueElementZL.format(4)}
                        />
                        <div><br />
                            <b>Coeficiente de reflexão: </b> {e.reflectionCoefficient2}
                        </div><br /><br /><br />
                    </Typography>
                }
            </Typography>

        case 'caso2-escolha2':
            //case 'caso3-escolha4-parteSuperior':
            return <Typography>
                {tab == 1 &&
                    <Typography>
                        <Circuit4
                            Zin={e.valueZinTheoretical}
                            valC={formatNum(e.valueElementTheoretical1.format(4)) + 'F'}
                            valL={formatNum(e.valueElementTheoretical2.format(4)) + 'H'}
                            valZL={e.valueElementZL.format(4)}
                        />
                        <div><br />
                            <b>Coeficiente de reflexão: </b> {e.reflectionCoefficient1}
                        </div><br /><br /><br />
                    </Typography>
                }
                {tab == 2 &&
                    <Typography>
                        <Circuit4
                            Zin={e.valueZinReal.format(2)}
                            valC={formatNum(e.valueElementReal1) + 'F'}
                            valL={formatNum(e.valueElementReal2) + 'H'}
                            valZL={e.valueElementZL.format(4)}
                        />
                        <div><br />
                            <b>Coeficiente de reflexão: </b> {e.reflectionCoefficient2}
                        </div><br /><br /><br />
                    </Typography>
                }
            </Typography>

        case 'caso3-escolha2-parteSuperior':
            return <Typography>
                {tab == 1 &&
                    <Typography>
                        <Circuit5
                            Zin={e.valueZinTheoretical}
                            valC1={formatNum(e.valueElementTheoretical2.format(4)) + 'F'}
                            valC2={formatNum(e.valueElementTheoretical1.format(4)) + 'F'}
                            valZL={e.valueElementZL.format(4)}
                        />
                        <div><br />
                            <b>Coeficiente de reflexão: </b> {e.reflectionCoefficient1}
                        </div><br /><br /><br />
                    </Typography>
                }
                {tab == 2 &&
                    <Typography>
                        <Circuit5
                            Zin={e.valueZinReal.format(2)}
                            valC1={formatNum(e.valueElementReal2) + 'F'}
                            valC2={formatNum(e.valueElementReal1) + 'F'}
                            valZL={e.valueElementZL.format(4)}
                        />
                        <div><br />
                            <b>Coeficiente de reflexão: </b> {e.reflectionCoefficient2}
                        </div><br /><br /><br />
                    </Typography>
                }
            </Typography>

        case 'caso3-escolha3-parteSuperior':
            return <Typography>
                {tab == 1 &&
                    <Typography>
                        <Circuit6
                            Zin={e.valueZinTheoretical}
                            valC1={formatNum(e.valueElementTheoretical2.format(4)) + 'F'}
                            valC2={formatNum(e.valueElementTheoretical1.format(4)) + 'F'}
                            valZL={e.valueElementZL.format(4)}
                        />
                        <div><br />
                            <b>Coeficiente de reflexão: </b> {e.reflectionCoefficient1}
                        </div><br /><br /><br />
                    </Typography>
                }
                {tab == 2 &&
                    <Typography>
                        <Circuit6
                            Zin={e.valueZinReal.format(2)}
                            valC1={formatNum(e.valueElementReal2) + 'F'}
                            valC2={formatNum(e.valueElementReal1) + 'F'}
                            valZL={e.valueElementZL.format(4)}
                        />
                        <div><br />
                            <b>Coeficiente de reflexão: </b> {e.reflectionCoefficient2}
                        </div><br /><br /><br />
                    </Typography>
                }
            </Typography>

        case 'caso3-escolha1-parteInferior':
            return <Typography>
                {tab == 1 &&
                    <Typography>
                        <Circuit7
                            Zin={e.valueZinTheoretical}
                            valL1={formatNum(e.valueElementTheoretical2.format(4)) + 'H'}
                            valL2={formatNum(e.valueElementTheoretical1.format(4)) + 'H'}
                            valZL={e.valueElementZL.format(4)}
                        />
                        <div><br />
                            <b>Coeficiente de reflexão: </b> {e.reflectionCoefficient1}
                        </div><br /><br /><br />
                    </Typography>
                }
                {tab == 2 &&
                    <Typography>
                        <Circuit7
                            Zin={e.valueZinReal.format(2)}
                            valL1={formatNum(e.valueElementReal2) + 'H'}
                            valL2={formatNum(e.valueElementReal1) + 'H'}
                            valZL={e.valueElementZL.format(4)}
                        />
                        <div><br />
                            <b>Coeficiente de reflexão: </b> {e.reflectionCoefficient2}
                        </div><br /><br /><br />
                    </Typography>
                }
            </Typography>

        case 'caso3-escolha4-parteInferior':
            return <Typography>
                {tab == 1 &&
                    <Typography>
                        <Circuit8
                            Zin={e.valueZinTheoretical}
                            valL1={formatNum(e.valueElementTheoretical2.format(4)) + 'H'}
                            valL2={formatNum(e.valueElementTheoretical1.format(4)) + 'H'}
                            valZL={e.valueElementZL.format(4)}
                        />
                        <div><br />
                            <b>Coeficiente de reflexão: </b> {e.reflectionCoefficient1}
                        </div><br /><br /><br />
                    </Typography>
                }
                {tab == 2 &&
                    <Typography>
                        <Circuit8
                            Zin={e.valueZinReal.format(2)}
                            valL1={formatNum(e.valueElementReal2) + 'H'}
                            valL2={formatNum(e.valueElementReal1) + 'H'}
                            valZL={e.valueElementZL.format(4)}
                        />
                        <div><br />
                            <b>Coeficiente de reflexão: </b> {e.reflectionCoefficient2}
                        </div><br /><br /><br />
                    </Typography>
                }
            </Typography>
    }
}
