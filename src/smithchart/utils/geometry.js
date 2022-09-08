import _ from 'lodash'

import math from 'utils/math'

import { linspace } from 'utils/ranges'


export function circle({ center, radius, numPoints }) {
    return _.map(linspace(0, 2 * Math.PI, numPoints), angle => ({
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
    }))
}


export function arc({ center, startPoint, endPoint, numPoints }) {
    let startAngle = math.atan2(startPoint.y - center.y, startPoint.x - center.x)
    if (startAngle < 0) {
        startAngle += 2 * Math.PI
    }
    let endAngle = math.atan2(endPoint.y - center.y, endPoint.x - center.x)
    if (endAngle < 0) {
        endAngle += 2 * Math.PI
    }
    const angles = linspace(startAngle, endAngle, numPoints)
    const radius = math.hypot(startPoint.x - center.x, startPoint.y - center.y)

    return _.map(angles, angle => ({
        x: center.x + radius * Math.cos(angle),
        y: center.y + radius * Math.sin(angle)
    }))
}
