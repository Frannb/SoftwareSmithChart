import datasetConstructionA from './constructionA'
import datasetConstructionB from './constructionB'
import datasetConstructionC from './constructionC'


export default function datasetConstruction(situation, choice, z) {
    switch (situation) {
        case 'A':
            return datasetConstructionA(choice, z)
        case 'B':
            return datasetConstructionB(choice, z)
        case 'C':
            return datasetConstructionC(choice, z)
        default:
            return []
    }
}
