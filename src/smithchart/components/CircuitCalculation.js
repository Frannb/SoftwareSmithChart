import { valuesChart } from './Page'
import points from '../datasets/points'
import math from 'utils/math'
import { smithTransformInv } from 'smith/transform'
import { v } from './PageCircuit'
import { formatNum } from '../format/formatElements'
import { findElement } from '../format/FindElement'
import { multiply } from 'mathjs'

function xyToComplex({ x, y }) {
    return math.complex({ re: x, im: y })
}

export default function CircuitCalculation() {

    const value = points(valuesChart.getSituation, valuesChart.getChoice, valuesChart.getZ)

    let caseType
    let xC1, xC2
    let xL1, xL2
    let W

    let elementTheoretical1, elementTheoretical2
    let XeqTheoretical
    let reflectionCoefficientTheoretical
    let ZinTheoretical

    let elementReal1, elementReal2
    let XeqReal
    let reflectionCoefficientReal
    let ZinReal
    let xC1real, xC2real
    let xL1real, xL2real

    let pointCenter = math.complex({
        re: 1,
        im: 0
    })

    let j = math.complex({
        re: 0,
        im: 1
    })

    if (valuesChart.getSituation + valuesChart.getChoice === 'A1') {
        caseType = 'A1'
    } else if (valuesChart.getSituation + valuesChart.getChoice === 'A2') {
        caseType = 'A2'
    } else if (valuesChart.getSituation + valuesChart.getChoice === 'B1') {
        caseType = 'B1'
    } else if (valuesChart.getSituation + valuesChart.getChoice === 'B2') {
        caseType = 'B2'
    } else if (valuesChart.getSituation + valuesChart.getChoice === 'C1') {
        if (valuesChart.getZ.im < 0) {
            caseType = 'C1'
        } else {
            caseType = 'A1'
        }
    } else if (valuesChart.getSituation + valuesChart.getChoice === 'C2') {
        if (valuesChart.getZ.im < 0) {
            caseType = 'A2'
        } else {
            caseType = 'C2'
        }
    } else if (valuesChart.getSituation + valuesChart.getChoice === 'C3') {
        if (valuesChart.getZ.im < 0) {
            caseType = 'C3I'
        } else {
            caseType = 'C3S'
        }

    } else if (valuesChart.getSituation + valuesChart.getChoice === 'C4') {
        if (valuesChart.getZ.im < 0) {
            caseType = 'C4I' //NÃO FUNCIONA - CASO C4 INFERIOR
        } else {
            caseType = 'C4S'
        }
    }

    switch (caseType) {
        case 'A1':
            xC1 = math.subtract(
                smithTransformInv(xyToComplex(value.point3)),
                smithTransformInv(xyToComplex(value.point2)))

            xL1 = math.subtract(
                pointCenter,
                smithTransformInv(xyToComplex(value.point4)))

            W = 2 * Math.PI * valuesChart.getFrequency.re

            elementTheoretical1 = math.divide(
                xC1,
                math.multiply(j, math.multiply(W, valuesChart.getLineImpedance)))

            elementTheoretical2 = math.divide(
                math.multiply(xL1, valuesChart.getLineImpedance),
                math.multiply(j, W))

            XeqTheoretical = Math.round(
                math.sum(xL1,
                    math.divide(pointCenter,
                        math.sum(xC1,
                            math.divide(pointCenter, valuesChart.getZ)))))

            ZinTheoretical = math.multiply(
                XeqTheoretical, valuesChart.getLineImpedance)

            reflectionCoefficientTheoretical = math.divide(
                math.subtract(ZinTheoretical, valuesChart.getLineImpedance),
                math.sum(ZinTheoretical, valuesChart.getLineImpedance))

            elementReal1 = findElement(elementTheoretical1.re, v.getSerie)
            elementReal2 = findElement(elementTheoretical2.re, v.getSerie)

            xC1real = math.multiply(j, 
                math.multiply(W, 
                    math.multiply(elementReal1, valuesChart.getLineImpedance)))
            
            xL1real = math.divide(
                math.multiply(j, math.multiply(W, elementReal2)),
                valuesChart.getLineImpedance)


            XeqReal = math.sum(xL1real,
                math.divide(pointCenter,
                    math.sum(xC1real,
                        math.divide(pointCenter, valuesChart.getZ))))  

            ZinReal = math.multiply(
                XeqReal, valuesChart.getLineImpedance)

            reflectionCoefficientReal = math.abs(
                math.divide(
                    math.subtract(ZinReal, valuesChart.getLineImpedance),
                    math.sum(ZinReal, valuesChart.getLineImpedance)
                )
            )

            return {
                caseCircuit: 'caso1-escolha1',
                valueElementZL: valuesChart.getImpedance,
                valueElementTheoretical1: elementTheoretical1,
                valueElementTheoretical2: elementTheoretical2,
                reflectionCoefficient1: reflectionCoefficientTheoretical,
                valueZinTheoretical: ZinTheoretical,

                valueElementReal1: elementReal1,
                valueElementReal2: elementReal2,
                reflectionCoefficient2: reflectionCoefficientReal,
                valueZinReal: ZinReal
            }

        case 'A2':
            //================== PROBLEMA ==================
            xL1 = math.subtract(
                smithTransformInv(xyToComplex(value.point3)),
                smithTransformInv(xyToComplex(value.point2)))

            xC1 = math.subtract(
                pointCenter,
                smithTransformInv(xyToComplex(value.point4)))

            W = 2 * Math.PI * valuesChart.getFrequency.re

            elementTheoretical1 = math.divide(
                math.multiply(math.multiply(j, -1), valuesChart.getLineImpedance),
                math.multiply(W, xL1))

            elementTheoretical2 = math.divide(
                math.multiply(j, -1),
                math.multiply(valuesChart.getLineImpedance, math.multiply(W, xC1)))

            XeqTheoretical = Math.round(
                math.sum(xC1,
                    math.divide(pointCenter,
                        math.sum(xL1,
                            math.divide(pointCenter, valuesChart.getZ)))))

            ZinTheoretical = math.multiply(
                XeqTheoretical, valuesChart.getLineImpedance)

            reflectionCoefficientTheoretical = math.divide(
                math.subtract(ZinTheoretical, valuesChart.getLineImpedance),
                math.sum(ZinTheoretical, valuesChart.getLineImpedance))

            elementReal1 = findElement(elementTheoretical1.re, v.getSerie)
            elementReal2 = findElement(elementTheoretical2.re, v.getSerie)

            xL1real = math.divide(
                math.multiply(math.multiply(j, -1), valuesChart.getLineImpedance),
                math.multiply(W, elementReal1))

            xC1real = math.divide(math.multiply(j, -1), 
                math.multiply(valuesChart.getLineImpedance, 
                    math.multiply(W, elementReal2)))

            XeqReal = math.sum(xC1real,
                math.divide(pointCenter,
                    math.sum(xL1real,
                        math.divide(pointCenter, valuesChart.getZ))))

            ZinReal = math.multiply(
                XeqReal, valuesChart.getLineImpedance)

            console.log(elementReal1 + "\n" +
                elementReal2 + "\n" +
                xL1real + "\n" +
                xC1real + "\n" +
                XeqReal + "\n" +
                ZinReal
            )

            reflectionCoefficientReal = math.abs(
                math.divide(
                    math.subtract(ZinReal, valuesChart.getLineImpedance),
                    math.sum(ZinReal, valuesChart.getLineImpedance)
                )
            )

            return {
                caseCircuit: 'caso1-escolha2',
                valueElementTheoretical1: elementTheoretical1,
                valueElementTheoretical2: elementTheoretical2,
                valueElementZL: valuesChart.getImpedance,
                reflectionCoefficient1: reflectionCoefficientTheoretical,
                valueZinTheoretical: ZinTheoretical,

                valueElementReal1: elementReal1,
                valueElementReal2: elementReal2,
                reflectionCoefficient2: reflectionCoefficientReal,
                valueZinReal: ZinReal
            }

        case 'B1':
            xL1 = math.subtract(
                smithTransformInv(xyToComplex(value.point2)),
                smithTransformInv(xyToComplex(value.point1)))

            xC1 = math.subtract(
                pointCenter,
                smithTransformInv(xyToComplex(value.point3)))

            W = 2 * Math.PI * valuesChart.getFrequency.re

            elementTheoretical1 = math.divide(
                math.multiply(xL1, valuesChart.getLineImpedance),
                math.multiply(j, W))

            elementTheoretical2 = math.divide(
                xC1,
                math.multiply(j, math.multiply(W, valuesChart.getLineImpedance)))

            XeqTheoretical = Math.round(
                math.sum(math.divide(pointCenter,
                    math.sum(valuesChart.getZ, xL1)), xC1))

            ZinTheoretical = math.multiply(
                XeqTheoretical, valuesChart.getLineImpedance)

            reflectionCoefficientTheoretical = math.divide(
                math.subtract(ZinTheoretical, valuesChart.getLineImpedance),
                math.sum(ZinTheoretical, valuesChart.getLineImpedance))

            elementReal1 = findElement(elementTheoretical1.re, v.getSerie)
            elementReal2 = findElement(elementTheoretical2.re, v.getSerie)

            xL1real = math.divide(
                math.multiply(j, math.multiply(W, elementReal1)),
                valuesChart.getLineImpedance)

            xC1real = math.multiply(j, 
                math.multiply(W, 
                    math.multiply(elementReal2, valuesChart.getLineImpedance)))

            XeqReal = math.sum(math.divide(pointCenter,
                math.sum(valuesChart.getZ, xL1real)), xC1real)

            ZinReal = math.multiply(
                XeqReal, valuesChart.getLineImpedance)

            reflectionCoefficientReal = math.abs(
                math.divide(
                    math.subtract(ZinReal, valuesChart.getLineImpedance),
                    math.sum(ZinReal, valuesChart.getLineImpedance)
                )
            )

            return {
                caseCircuit: 'caso2-escolha1',
                valueElementTheoretical1: elementTheoretical1,
                valueElementTheoretical2: elementTheoretical2,
                valueElementZL: valuesChart.getImpedance,
                reflectionCoefficient1: reflectionCoefficientTheoretical,
                valueZinTheoretical: ZinTheoretical,

                valueElementReal1: elementReal1,
                valueElementReal2: elementReal2,
                reflectionCoefficient2: reflectionCoefficientReal,
                valueZinReal: ZinReal
            }

        case 'B2':
            //================== PROBLEMA ==================
            xC1 = math.subtract(
                smithTransformInv(xyToComplex(value.point2)),
                smithTransformInv(xyToComplex(value.point1)))

            xL1 = math.subtract(
                pointCenter,
                smithTransformInv(xyToComplex(value.point3)))

            W = 2 * Math.PI * valuesChart.getFrequency.re

            elementTheoretical1 = math.divide(
                math.multiply(j, -1),
                math.multiply(valuesChart.getLineImpedance, math.multiply(W, xC1)))

            elementTheoretical2 = math.divide(
                math.multiply(math.multiply(j, -1), valuesChart.getLineImpedance),
                math.multiply(W, xL1))

            XeqTheoretical = Math.round(
                math.sum(math.divide(pointCenter,
                    math.sum(valuesChart.getZ, xC1)), xL1))

            ZinTheoretical = math.multiply(
                XeqTheoretical, valuesChart.getLineImpedance)

            reflectionCoefficientTheoretical = math.divide(
                math.subtract(ZinTheoretical, valuesChart.getLineImpedance),
                math.sum(ZinTheoretical, valuesChart.getLineImpedance))

            elementReal1 = findElement(elementTheoretical1.re, v.getSerie)
            elementReal2 = findElement(elementTheoretical2.re, v.getSerie)

            xC1real = math.divide(math.multiply(j, -1),
                math.multiply(valuesChart.getLineImpedance, math.multiply(W, elementReal1)))
            
            xL1real = math.divide(
                math.multiply(math.multiply(j, -1), valuesChart.getLineImpedance),
                math.multiply(W, elementReal2))

            XeqReal = math.sum(math.divide(pointCenter,
                math.sum(valuesChart.getZ, xC1real)), xL1real)

            ZinReal = math.multiply(
                XeqReal, valuesChart.getLineImpedance)

            reflectionCoefficientReal = math.abs(
                math.divide(
                    math.subtract(ZinReal, valuesChart.getLineImpedance),
                    math.sum(ZinReal, valuesChart.getLineImpedance)
                )
            )

            return {
                caseCircuit: 'caso2-escolha2',
                valueElementTheoretical1: elementTheoretical1,
                valueElementTheoretical2: elementTheoretical2,
                valueElementZL: valuesChart.getImpedance,
                reflectionCoefficient1: reflectionCoefficientTheoretical,
                valueZinTheoretical: ZinTheoretical,

                valueElementReal1: elementReal1,
                valueElementReal2: elementReal2,
                reflectionCoefficient2: reflectionCoefficientReal,
                valueZinReal: ZinReal
            }

        case 'C1':
            //================== PROBLEMA ==================
            xL1 = math.subtract(
                smithTransformInv(xyToComplex(value.point3)),
                smithTransformInv(xyToComplex(value.point2)))

            xL2 = math.subtract(
                pointCenter,
                smithTransformInv(xyToComplex(value.point4)))

            W = 2 * Math.PI * valuesChart.getFrequency.re

            elementTheoretical1 = math.divide(
                math.multiply(math.multiply(j, -1), valuesChart.getLineImpedance),
                math.multiply(W, xL1))

            elementTheoretical2 = math.divide(
                math.multiply(xL2, valuesChart.getLineImpedance),
                math.multiply(j, W))

            XeqTheoretical = Math.round(
                math.sum(xL2,
                    math.divide(pointCenter,
                        math.sum(xL1,
                            math.divide(pointCenter, valuesChart.getZ)))))

            ZinTheoretical = math.multiply(
                XeqTheoretical, valuesChart.getLineImpedance)

            reflectionCoefficientTheoretical = math.divide(
                math.subtract(ZinTheoretical, valuesChart.getLineImpedance),
                math.sum(ZinTheoretical, valuesChart.getLineImpedance))

            elementReal1 = findElement(elementTheoretical1.re, v.getSerie)
            elementReal2 = findElement(elementTheoretical2.re, v.getSerie)

            xL1real = math.divide(
                math.multiply(math.multiply(j, -1), valuesChart.getLineImpedance),
                math.multiply(W, elementReal1))

            xL2real = math.divide(
                math.multiply(j, math.multiply(W, elementReal1)),
                valuesChart.getLineImpedance)

            XeqReal = math.sum(xL2real,
                math.divide(pointCenter,
                    math.sum(xL1real,
                        math.divide(pointCenter, valuesChart.getZ))))

            ZinReal = math.multiply(
                XeqReal, valuesChart.getLineImpedance)

            reflectionCoefficientReal = math.abs(
                math.divide(
                    math.subtract(ZinReal, valuesChart.getLineImpedance),
                    math.sum(ZinReal, valuesChart.getLineImpedance)
                )
            )

            return {
                caseCircuit: 'caso3-escolha1-parteInferior',
                valueElementTheoretical1: elementTheoretical1,
                valueElementTheoretical2: elementTheoretical2,
                valueElementZL: valuesChart.getImpedance,
                reflectionCoefficient1: reflectionCoefficientTheoretical,
                valueZinTheoretical: ZinTheoretical,

                valueElementReal1: elementReal1,
                valueElementReal2: elementReal2,
                reflectionCoefficient2: reflectionCoefficientReal,
                valueZinReal: ZinReal
            }

        case 'C2':
            //================== PROBLEMA ==================
            xC1 = math.subtract(
                smithTransformInv(xyToComplex(value.point3)),
                smithTransformInv(xyToComplex(value.point2)))

            xC2 = math.subtract(
                pointCenter,
                smithTransformInv(xyToComplex(value.point4)))

            W = 2 * Math.PI * valuesChart.getFrequency.re

            elementTheoretical1 = math.divide(
                xC1,
                math.multiply(j, math.multiply(W, valuesChart.getLineImpedance))
            )

            elementTheoretical2 = math.divide(
                math.multiply(j, -1),
                math.multiply(valuesChart.getLineImpedance, math.multiply(W, xC2))
            )

            XeqTheoretical = Math.round(
                math.sum(xC2,
                    math.divide(pointCenter,
                        math.sum(xC1,
                            math.divide(pointCenter, valuesChart.getZ)))))

            ZinTheoretical = math.multiply(
                XeqTheoretical, valuesChart.getLineImpedance)

            reflectionCoefficientTheoretical = math.divide(
                math.subtract(ZinTheoretical, valuesChart.getLineImpedance),
                math.sum(ZinTheoretical, valuesChart.getLineImpedance))

            elementReal1 = findElement(elementTheoretical1.re, v.getSerie)
            elementReal2 = findElement(elementTheoretical2.re, v.getSerie)

            xC1real = math.multiply(j, 
                math.multiply(W, 
                    math.multiply(elementReal1, valuesChart.getLineImpedance)))

            xC2real = math.divide(math.multiply(j, -1),
                math.multiply(valuesChart.getLineImpedance,
                     math.multiply(W, elementReal2)))

            XeqReal = math.sum(xC2real,
                math.divide(pointCenter,
                    math.sum(xC1real,
                        math.divide(pointCenter, valuesChart.getZ))))

            ZinReal = math.multiply(
                XeqReal, valuesChart.getLineImpedance)

            reflectionCoefficientReal = math.abs(
                math.divide(
                    math.subtract(ZinReal, valuesChart.getLineImpedance),
                    math.sum(ZinReal, valuesChart.getLineImpedance)
                )
            )

            return {
                caseCircuit: 'caso3-escolha2-parteSuperior',
                valueElementTheoretical1: elementTheoretical1,
                valueElementTheoretical2: elementTheoretical2,
                valueElementZL: valuesChart.getImpedance,
                reflectionCoefficient1: reflectionCoefficientTheoretical,
                valueZinTheoretical: ZinTheoretical,

                valueElementReal1: elementReal1,
                valueElementReal2: elementReal2,
                reflectionCoefficient2: reflectionCoefficientReal,
                valueZinReal: ZinReal
            }

        case 'C3S':
            //================== PROBLEMA ==================
            xC1 = math.subtract(
                smithTransformInv(xyToComplex(value.point3)),
                smithTransformInv(xyToComplex(value.point1)))

            xC2 = math.subtract(
                pointCenter,
                smithTransformInv(xyToComplex(value.point4)))

            W = 2 * Math.PI * valuesChart.getFrequency.re

            elementTheoretical1 = math.divide(
                math.multiply(j, -1),
                math.multiply(valuesChart.getLineImpedance, math.multiply(W, xC1)))

            elementTheoretical2 = math.divide(
                xC2,
                math.multiply(j, math.multiply(W, valuesChart.getLineImpedance)))

            XeqTheoretical = Math.round(
                math.sum(math.divide(pointCenter,
                    math.sum(valuesChart.getZ, xC1)), xC2))

            ZinTheoretical = math.multiply(
                XeqTheoretical, valuesChart.getLineImpedance)

            reflectionCoefficientTheoretical = math.divide(
                math.subtract(ZinTheoretical, valuesChart.getLineImpedance),
                math.sum(ZinTheoretical, valuesChart.getLineImpedance))

            elementReal1 = findElement(elementTheoretical1.re, v.getSerie)
            elementReal2 = findElement(elementTheoretical2.re, v.getSerie)

            xC1real = math.divide(math.multiply(j, -1),
                math.multiply(valuesChart.getLineImpedance,
                     math.multiply(W, elementReal2)))

            xC2real =  math.multiply(j, 
                math.multiply(W, 
                    math.multiply(elementReal1, valuesChart.getLineImpedance)))

            XeqReal =  math.sum(math.divide(pointCenter,
                math.sum(valuesChart.getZ, xC1real)), xC2real)

            ZinReal = math.multiply(
                XeqReal, valuesChart.getLineImpedance)

            reflectionCoefficientReal = math.abs(
                math.divide(
                    math.subtract(ZinReal, valuesChart.getLineImpedance),
                    math.sum(ZinReal, valuesChart.getLineImpedance)
                )
            )

            return {
                caseCircuit: 'caso3-escolha3-parteSuperior',
                valueElementTheoretical1: elementTheoretical1,
                valueElementTheoretical2: elementTheoretical2,
                valueElementZL: valuesChart.getImpedance,
                reflectionCoefficient1: reflectionCoefficientTheoretical,
                valueZinTheoretical: ZinTheoretical,

                valueElementReal1: elementReal1,
                valueElementReal2: elementReal2,
                reflectionCoefficient2: reflectionCoefficientReal,
                valueZinReal: ZinReal
            }

        case 'C3I':
            //================== PROBLEMA ==================
            xL1 = math.subtract(
                smithTransformInv(xyToComplex(value.point3)),
                smithTransformInv(xyToComplex(value.point1)))

            xC1 = math.subtract(
                pointCenter,
                smithTransformInv(xyToComplex(value.point4)))

            W = 2 * Math.PI * valuesChart.getFrequency.re

            elementTheoretical1 = math.divide(
                math.multiply(xL1, valuesChart.getLineImpedance),
                math.multiply(j, W))

            elementTheoretical2 = math.divide(
                xC1,
                math.multiply(j, math.multiply(W, valuesChart.getLineImpedance)))

            XeqTheoretical = Math.round(
                math.sum(math.divide(pointCenter,
                    math.sum(valuesChart.getZ, xL1)), xC1))

            ZinTheoretical = math.multiply(
                XeqTheoretical, valuesChart.getLineImpedance)

            reflectionCoefficientTheoretical = math.divide(
                math.subtract(ZinTheoretical, valuesChart.getLineImpedance),
                math.sum(ZinTheoretical, valuesChart.getLineImpedance))

            elementReal1 = findElement(elementTheoretical1.re, v.getSerie)
            elementReal2 = findElement(elementTheoretical2.re, v.getSerie)

            xL1real = math.divide(
                math.multiply(j, math.multiply(W, elementReal1)),
                valuesChart.getLineImpedance)

            xC1real = math.multiply(j, 
                math.multiply(W, 
                    math.multiply(elementReal1, valuesChart.getLineImpedance)))

            XeqReal = math.sum(math.divide(pointCenter,
                math.sum(valuesChart.getZ, xL1real)), xC1real)

            ZinReal = math.multiply(
                XeqReal, valuesChart.getLineImpedance)

            reflectionCoefficientReal = math.abs(
                math.divide(
                    math.subtract(ZinReal, valuesChart.getLineImpedance),
                    math.sum(ZinReal, valuesChart.getLineImpedance)
                )
            )

            return {
                caseCircuit: 'caso2-escolha1',
                valueElementTheoretical1: elementTheoretical1,
                valueElementTheoretical2: elementTheoretical2,
                valueElementZL: valuesChart.getImpedance,
                reflectionCoefficient1: reflectionCoefficientTheoretical,
                valueZinTheoretical: ZinTheoretical,

                valueElementReal1: elementReal1,
                valueElementReal2: elementReal2,
                reflectionCoefficient2: reflectionCoefficientReal,
                valueZinReal: ZinReal
            }

        case 'C4S':
            //================== PROBLEMA ==================
            xC1 = math.subtract(
                smithTransformInv(xyToComplex(value.point3)),
                smithTransformInv(xyToComplex(value.point1)))

            xL1 = math.subtract(
                pointCenter,
                smithTransformInv(xyToComplex(value.point4)))

            W = 2 * Math.PI * valuesChart.getFrequency.re

            elementTheoretical2 = math.divide(
                math.multiply(j, -1),
                math.multiply(valuesChart.getLineImpedance, math.multiply(W, xC1)))

            elementTheoretical1 = math.divide(
                math.multiply(math.multiply(j, -1), valuesChart.getLineImpedance),
                math.multiply(W, xL1))

            XeqTheoretical = Math.round(
                math.sum(math.divide(pointCenter,
                    math.sum(valuesChart.getZ, xC1)), xL1))

            ZinTheoretical = math.multiply(
                XeqTheoretical, valuesChart.getLineImpedance)

            reflectionCoefficientTheoretical = math.divide(
                math.subtract(ZinTheoretical, valuesChart.getLineImpedance),
                math.sum(ZinTheoretical, valuesChart.getLineImpedance))

            elementReal1 = findElement(elementTheoretical1.re, v.getSerie)
            elementReal2 = findElement(elementTheoretical2.re, v.getSerie)

            xC1real = math.divide(math.multiply(j, -1), 
                math.multiply(valuesChart.getLineImpedance, math.multiply(W, elementReal1)))

            xL1real = math.divide(math.multiply(math.multiply(j, -1), valuesChart.getLineImpedance),
                math.multiply(W, elementReal2))

            XeqReal = math.sum(math.divide(pointCenter,
                math.sum(valuesChart.getZ, xC1real)), xL1real)

            ZinReal = math.multiply(
                XeqReal, valuesChart.getLineImpedance)

            reflectionCoefficientReal = math.abs(
                math.divide(
                    math.subtract(ZinReal, valuesChart.getLineImpedance),
                    math.sum(ZinReal, valuesChart.getLineImpedance)
                )
            )

            return {
                caseCircuit: 'caso2-escolha2',
                valueElementTheoretical1: elementTheoretical1,
                valueElementTheoretical2: elementTheoretical2,
                valueElementZL: valuesChart.getImpedance,
                reflectionCoefficient1: reflectionCoefficientTheoretical,
                valueZinTheoretical: ZinTheoretical,

                valueElementReal1: elementReal1,
                valueElementReal2: elementReal2,
                reflectionCoefficient2: reflectionCoefficientReal,
                valueZinReal: ZinReal
            }

        case 'C4I':
            //================== PROBLEMA ==================
            xL1 = math.subtract(
                smithTransformInv(xyToComplex(value.point3)),
                smithTransformInv(xyToComplex(value.point1)))

            xL2 = math.subtract(
                pointCenter,
                smithTransformInv(xyToComplex(value.point4)))

            W = 2 * Math.PI * valuesChart.getFrequency.re

            elementTheoretical1 = math.divide(
                math.multiply(xL1, valuesChart.getLineImpedance),
                math.multiply(j, W))

            elementTheoretical2 = math.divide(
                math.multiply(math.multiply(j, -1), valuesChart.getLineImpedance),
                math.multiply(W, xL2))

            XeqTheoretical = Math.round(
                math.sum(math.divide(pointCenter,
                    math.sum(valuesChart.getZ, xL1)), xL2))

            ZinTheoretical = math.multiply(
                XeqTheoretical, valuesChart.getLineImpedance)

            reflectionCoefficientTheoretical = math.divide(
                math.subtract(ZinTheoretical, valuesChart.getLineImpedance),
                math.sum(ZinTheoretical, valuesChart.getLineImpedance))

            elementReal1 = findElement(elementTheoretical1.re, v.getSerie)
            elementReal2 = findElement(elementTheoretical2.re, v.getSerie)

            xL1real = math.divide(
                math.multiply(j, math.multiply(W, elementReal1)),
                valuesChart.getLineImpedance)

            xL2real = math.divide(
                math.multiply(math.multiply(j, -1),valuesChart.getLineImpedance),
                math.multiply(W, elementReal1))

            XeqReal = math.sum(math.divide(pointCenter,
                math.sum(valuesChart.getZ, xL1real)), xL2real)

            ZinReal = math.multiply(
                XeqReal, valuesChart.getLineImpedance)

            reflectionCoefficientReal = math.abs(
                math.divide(
                    math.subtract(ZinReal, valuesChart.getLineImpedance),
                    math.sum(ZinReal, valuesChart.getLineImpedance)
                )
            )
            
            return {
                caseCircuit: 'caso3-escolha4-parteInferior',
                valueElementTheoretical1: elementTheoretical1,
                valueElementTheoretical2: elementTheoretical2,
                valueElementZL: valuesChart.getImpedance,
                reflectionCoefficient1: reflectionCoefficientTheoretical,
                valueZinTheoretical: ZinTheoretical,

                valueElementReal1: elementReal1,
                valueElementReal2: elementReal2,
                reflectionCoefficient2: reflectionCoefficientReal,
                valueZinReal: ZinReal
            }
    }
}
