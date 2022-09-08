from schemdraw import Drawing
from schemdraw.elements import Dot, Line, ZLabel, Inductor, Capacitor, ResistorIEC

with Drawing(file='circuit8.svg') as d:
    d += ZLabel(at=(0, -2)).label('$Z_{in}$')
    d += Dot()
    d += Line().right()
    d.push()
    d += Inductor().down().label('VAL_L1', loc='bottom')
    d.pop()
    d += Inductor().right().label('VAL_L2')
    d += ResistorIEC().down().label('Z_L', loc='bottom')
    d += Line().left()
    d += Line().left()
    d += Dot()