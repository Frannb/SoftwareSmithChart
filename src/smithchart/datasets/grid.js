import _ from 'lodash'

import { rGrid, xGrid } from 'smith/grid'


export default function datasetGrid() {
    const gridCircles = [...rGrid, ...xGrid]
    return _.map(gridCircles, (circle, index) => ({
        data: circle,
        label: 'x',
        borderWidth: 1,
        hoverBorderWidth: 2,
        borderColor: 'rgb(210, 210, 210)',
        pointRadius: 0,
        pointHoverRadius: 0,
        showLine: true,
        moveable: false,
    }))
}
