from schemdraw import Drawing
from schemdraw.elements import Dot, Line, ZLabel, Inductor, Capacitor, ResistorIEC

with Drawing(file='circuit5.svg') as d:
    d += ZLabel(at=(0, -2)).label('$Z_{in}$')
    d += Dot()
    d += Capacitor().label('VAL_C1')
    d.push()
    d += Capacitor().down().label('VAL_C2', loc='bottom')
    d.pop()
    d += Line().right()
    d += ResistorIEC().down().label('Z_L', loc='bottom')
    d += Line().left()
    d += Line().left()
    d += Dot()