import { smithTransform } from 'smith/transform'


export default function datasetImpedance(z) {
    const t = smithTransform(z)
    return {
        data: [{ x: t.re, y: t.im }],
        label: 'impedance',
        borderWidth: 0,
        backgroundColor: 'rgb(0, 153, 153)',
        borderColor: 'rgb(0, 153, 153)',
        pointRadius: 7,
        pointHoverRadius: 8,
        showLine: true,
        moveable: true,
        customLabel: '1'
    }
}
