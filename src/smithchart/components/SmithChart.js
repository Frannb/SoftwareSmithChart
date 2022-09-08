import React from 'react'
import useChange from 'use-change'

import Chart from 'chart.js/auto'
import { Scatter } from 'react-chartjs-2'
import 'chartjs-plugin-dragdata'
import annotationPlugin from 'chartjs-plugin-annotation'
Chart.register(annotationPlugin)

import math from 'utils/math'
import { smithTransformInv } from 'smith/transform'

import { store } from 'store'
import { getUpdatedParameter } from 'parameters'

import datasetImpedance from 'datasets/impedance'
import datasetGrid from 'datasets/grid'
import datasetSituations from 'datasets/situations'
import datasetConstruction from 'datasets/construction'


export default function SmithChart({ showSituation, showConstruction, situation, choice }) {
    const [impedance, setImpedance] = useChange(store, 'impedance')
    const [lineImpedance, setLineImpedance] = useChange(store, 'lineImpedance')

    const z = math.divide(math.complex(impedance.value), lineImpedance.value)

    function onDrag(value) {
        const new_z = math.complex(value.x, value.y)
        const new_t = smithTransformInv(new_z)
        if (new_t.re < 0) {
            new_t.re = 0
        }
        const newImpedanceValue = math.multiply(new_t, lineImpedance.value)
        setImpedance(impedance => getUpdatedParameter(
            impedance,
            newImpedanceValue.format(4)
        ))
    }

    const datasets = [
        datasetImpedance(z),
        ...(showConstruction ? datasetConstruction(situation, choice, z) : []),
        ...(showSituation ? datasetSituations(situation) : []),
        ...datasetGrid(),
    ]

    const annotations = {}
    for (const dataset of datasets) {
        if (dataset.customLabel) {
            annotations[dataset.customLabel] = {
                type: 'label',
                xValue: dataset.data[0].x,
                yValue: dataset.data[0].y,
                content: dataset.customLabel,
                font: { size: 10 },
                color: 'white',
            }
        }
    }

    const options = {
        scales: {
            y: { min: -1.05, max: 1.05, display: false },
            x: { min: -1.05, max: 1.05, display: false },
        },
        aspectRatio: 1,
        maintainAspectRatio: true,
        animation: {
            duration: 0
        },
        hover: {
            mode: 'dataset'
        },
        interaction: {
            intersect: false,
            mode: 'dataset'
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                enabled: false,
                callbacks: {
                },
                mode: 'dataset'
            },
            dragData: {
                dragX: true,
                onDragStart: function (event, datasetIndex, index, value) {
                    if (!datasets[datasetIndex].moveable) {
                        return false
                    }
                },
                onDrag: function (event, datasetIndex, index, value) {
                    if (!datasets[datasetIndex].moveable) {
                        return false
                    }
                    onDrag(value)
                    event.target.style.cursor = 'grabbing'
                },
                onDragEnd: function (event, datasetIndex, index, value) {
                    event.target.style.cursor = 'default'
                },
            },
            annotation: {
                annotations: annotations
            }
        }
    }

    return <Scatter options={options} data={{ datasets: datasets }} />
}
