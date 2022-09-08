import math from 'utils/math'

import { smithTransform } from 'smith/transform'

export default function points(situation, choice, z){
    const y = math.divide(1, z)
    const t = smithTransform(z)
   
    let p1 = {};
    let p2 = {};
    let p3 = {};
    let p4 = {};

    switch (situation) {
        case 'A':
            p1 = {
                x: t.re,
                y: t.im
            }
            p2 = {
                x: -p1.x,
                y: -p1.y
            }
            p3 = {
                x: -(1 - y.re) / (3 * y.re + 1),
                y: 2 * math.sqrt(((1 - y.re) * y.re) / (3 * y.re + 1) ** 2)
            }
            if (choice === 2) {
                p3.y *= -1
            }
            p4 = {
                x: -p3.x,
                y: -p3.y
            }    

            return {point1: p1, point2: p2, point3: p3, point4: p4}

        case 'B':
            p1 = {
                x: t.re,
                y: t.im
            }
            p2 = {
                x: -(1 - z.re) / (3 * z.re + 1),
                y: 2 * math.sqrt(((1 - z.re) * z.re) / (3 * z.re + 1) ** 2)
            }
            if (choice === 2) {
                p2.y *= -1
            }
            p3 = {
                x: -p2.x,
                y: -p2.y
            }            
            return {point1: p1, point2: p2, point3: p3}

        case 'C':
            p1 = {
                x: t.re,
                y: t.im
            }
            p2 = {
                x: -p1.x,
                y: -p1.y
            }
        
            if (0 < choice && choice <= 2){
                p3 = {
                    x: -(1 - y.re) / (3 * y.re + 1),
                    y: 2 * math.sqrt(((1 - y.re) * y.re) / (3 * y.re + 1) ** 2)
                }
                if (choice === 2) {
                    p3.y *= -1
                }
                p4 = {
                    x: -p3.x,
                    y: -p3.y
                }
            }else if (choice >= 3){
                p3 = {
                    x: -(1 - z.re) / (3 * z.re + 1),
                    y: 2 * math.sqrt(((1 - z.re) * z.re) / (3 * z.re + 1) ** 2)
                }
                if (choice === 4) {
                    p3.y *= -1
                }
                p4 = {
                    x: -p3.x,
                    y: -p3.y
                }
            }

            return {point1: p1, point2: p2, point3: p3, point4: p4}
        default:
            return []
    }
}