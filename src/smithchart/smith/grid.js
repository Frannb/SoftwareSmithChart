import _ from 'lodash'

import { circle, arc } from 'utils/geometry'
import { linspace } from 'utils/ranges'


export function rCircle(r) {
    return circle({
        center: { x: r / (r + 1), y: 0 },
        radius: Math.abs(1 / (r + 1)),
        numPoints: 64
    })
}


export function xCircle(x) {
    if (x === 0) {
        return [{ x: -1, y: 0 }, { x: 1, y: 0 }]
    }
    return arc({
        center: { x: 1, y: 1 / x },
        startPoint: { x: 1, y: 0 },
        endPoint: { x: (x ** 2 - 1) / (x ** 2 + 1), y: (2 * x) / (x ** 2 + 1) },
        numPoints: 24
    })
}


const rs = _.map(linspace(-1, 1, 13), a => (1 + a) / (1 - a))
export const rGrid = _.map(rs, rCircle)

const xs = _.map(linspace(-1, 1, 19), b => (2 * b) / (1 - b ** 2))
export const xGrid = _.map(xs, xCircle)
