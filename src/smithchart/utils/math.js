import _ from 'lodash'
import { create, all } from 'mathjs'


const math = create(all, {})

math.import({
    clip: (x, minimum, maximum) => math.min(math.max(x, minimum), maximum),
    step: x => x > 0 ? 1 : 0,
    rect: x => -0.5 <= x && x < 0.5 ? 1.0 : 0.0,
    sinc: x => (x == 0) ? 1 : math.sin(math.pi * x) / (math.pi * x),
})

export default math
