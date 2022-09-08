import math from 'utils/math'


export function smithTransform(z) {
    return math.divide(math.subtract(z, 1), math.add(z, 1))
}

export function smithTransformInv(t) {
    return math.divide(math.add(1, t), math.subtract(1, t))
}
