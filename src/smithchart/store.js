import math from 'utils/math'

import { newParameter } from 'parameters'

export const store = {
    lineImpedance: newParameter({
        label: 'Z₀',
        unit: 'Ω',
        textValue: '50',
        parseFunction: textValue => math.number(textValue),
        displayFunction: value => math.string(value),
    }),
    impedance: newParameter({
        label: 'Z',
        unit: 'Ω',
        textValue: '10 - 35i',
        parseFunction: textValue => math.complex(textValue),
        displayFunction: value => value.format(4),
    }),
    frequency: newParameter({
        label: 'Frequência',
        unit: 'Hz',
        textValue: '1000000000',
        parseFunction: textValue => math.complex(textValue),
        displayFunction: value => value.format(4),
    }),
}
