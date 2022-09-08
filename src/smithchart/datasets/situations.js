import _ from 'lodash'

import { circle } from 'utils/geometry'


export default function datasetSituations(situation) {
    const circulos = {
        'A': circle({  // Círculo 1 ± jb
            center: { x: 0.5, y: 0 },
            radius: 0.5,
            numPoints: 64
        }),
        'B': circle({  // Círculo girado
            center: { x: -0.5, y: 0 },
            radius: 0.5,
            numPoints: 64
        }),
        'C': circle({  // Circulo 0 ± jb
            center: { x: 0, y: 0 },
            radius: 1,
            numPoints: 64
        })
    }
    return _.map(circulos, (circulo, key) => ({
        data: circulo,
        borderWidth: key === situation ? 2 : 1,
        backgroundColor: 'rgb(0, 153, 153)',
        borderColor: 'rgb(0, 153, 153)',
        pointRadius: 0,
        pointHoverRadius: 0,
        showLine: true,
        borderDash: key === situation ? undefined : [10, 5],
    }))
}
