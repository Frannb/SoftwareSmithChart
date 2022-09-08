from schemdraw import Drawing
from schemdraw.elements import Dot, Line, ZLabel, Inductor, Capacitor, ResistorIEC

with Drawing(file='circuit7.svg') as d:
    d += ZLabel(at=(0, -2)).label('$Z_{in}$')
    d += Dot()
    d += Inductor().label('VAL_L1')
    d.push()
    d += Inductor().down().label('VAL_L2', loc='bottom')
    d.pop()
    d += Line().right()
    d += ResistorIEC().down().label('Z_L', loc='bottom')
    d += Line().left()
    d += Line().left()
    d += Dot()