import math from 'utils/math'
import { arc } from 'utils/geometry'

import points from './points'

export default function datasetConstructionC(choice, z) {
    const y = math.divide(1, z)

    const values = points('C', choice, z)

    if (0 < choice && choice <= 2){
        return [
            // Ponto 2: Ponto da admitância
            {
                data: [values.point2],
                borderWidth: 0,
                backgroundColor: 'rgb(238, 173, 45)',
                borderColor: 'rgb(238, 173, 45)',
                pointRadius: 7,
                pointHoverRadius: 8,
                customLabel: '2',
            },
            // Ponto 3: Ponto que percorre a carta até o circulo
            {
                data: [values.point3],
                borderWidth: 0,
                backgroundColor: 'rgb(255, 0, 0)',
                borderColor: 'rgb(255, 0, 0)',
                pointRadius: 7,
                pointHoverRadius: 8,
                customLabel: '3'
            },
            // Ponto 4: Ponto inverso do ponto 3
            {
                data: [values.point4],
                borderWidth: 0,
                backgroundColor: 'rgb(255, 0, 0)',
                borderColor: 'rgb(255, 0, 0)',
                pointRadius: 7,
                pointHoverRadius: 8,
                customLabel: '4'
            },
            // Segmento de reta do ponto 1 até o ponto 2.
            {
                data: [values.point1, values.point2],
                borderWidth: 1,
                borderColor: 'rgb(153, 0, 153)',
                pointRadius: 0,
                pointHoverRadius: 0,
                borderDash: [10, 5],
                showLine: true,
            },
            // Arco do ponto 2 até o ponto 3.
            {
                data: arc({
                    center: { x: y.re / (y.re + 1), y: 0 },
                    startPoint: values.point2,
                    endPoint: values.point3,
                    numPoints: 40
                }),
                borderWidth: 2,
                borderColor: 'rgb(0, 255, 0)',
                pointRadius: 0,
                pointHoverRadius: 0,
                showLine: true,
            },
            // Segmento de reta do ponto 3 até o ponto 4.
            {
                data: [values.point3, values.point4],
                borderWidth: 1,
                borderColor: 'rgb(255, 0, 0)',
                pointRadius: 0,
                pointHoverRadius: 0,
                borderDash: [10, 5],
                showLine: true,
            },
            // Arco do ponto 4 até a origem.
            {
                data: arc({
                    center: { x: 0.5, y: 0 },
                    startPoint: values.point4,
                    endPoint: {x: 0, y: 0},
                    numPoints: 40
                }),
                borderWidth: 2,
                borderColor: 'rgb(0, 255, 0)',
                pointRadius: 0,
                pointHoverRadius: 0,
                showLine: true,
            },
        ]
    }else if (choice >= 3){
        return [
            {  
                data: [values.point3],
                borderWidth: 0,
                backgroundColor: 'rgb(255, 0, 0)',
                borderColor: 'rgb(255, 0, 0)',
                pointRadius: 7,
                pointHoverRadius: 8,
                customLabel: '2'
            },
            // Ponto 4: Ponto inverso do ponto 3
            {
                data: [values.point4],
                borderWidth: 0,
                backgroundColor: 'rgb(255, 0, 0)',
                borderColor: 'rgb(255, 0, 0)',
                pointRadius: 7,
                pointHoverRadius: 8,
                customLabel: '3'
            },
            {
                data: arc({
                    center: { x: z.re / (z.re + 1), y: 0 },
                    startPoint: values.point1,
                    endPoint: values.point3,
                    numPoints: 40
                }),
                borderWidth: 2,
                borderColor: 'rgb(0, 255, 0)',
                pointRadius: 0,
                pointHoverRadius: 0,
                showLine: true,
            },
            // Segmento de reta do ponto 3 até o ponto 4.
            {
                data: [values.point3, values.point4],
                borderWidth: 1,
                borderColor: 'rgb(255, 0, 0)',
                pointRadius: 0,
                pointHoverRadius: 0,
                borderDash: [10, 5],
                showLine: true,
            },
            // Arco do ponto 4 até a origem.
            {
                data: arc({
                    center: { x: 0.5, y: 0 },
                    startPoint: values.point4,
                    endPoint: {x: 0, y: 0},
                    numPoints: 40
                }),
                borderWidth: 2,
                borderColor: 'rgb(0, 255, 0)',
                pointRadius: 0,
                pointHoverRadius: 0,
                showLine: true,
            },
        ]
    }else{
        return [
            {
                data: [values.point1],
                borderWidth: 1,
                borderColor: 'rgb(153, 0, 153)',
                pointRadius: 0,
                pointHoverRadius: 0,
                showLine: true,
            }
        ]
    }
}
