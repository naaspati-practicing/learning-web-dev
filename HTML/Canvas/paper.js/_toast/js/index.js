const paper = require('paper'); // do not modify this line, live-server will remove it before serving

const {Path, Point, Size, Project, PaperScope} = paper;
const {Circle, Rectangle} = Path;

class Canvas {
    constructor(element) {
        if(!element)
          throw new Error('no canvas element supplied');
        this.canvas = typeof element === 'string' ? document.getElementById(element) : element;
        this.scope = new PaperScope;
        this.scope.setup(this.canvas); 
    }
}

function scoped(/** @type {Canvas} */ canvas,  callback) {
    if(!(canvas instanceof Canvas))
      throw new Error('canvas of invalid type');
    canvas.scope.activate();

    if(callback.call(canvas.scope, canvas))
      canvas.scope.view.draw();
}

const c1 = new Canvas('canvas1');
const c2 = new Canvas(document.querySelector('#canvas2'));

scoped(c1, function() {
    const circle = new Circle(50, 50, 50);
    circle.fillColor = 'red';
    return true;
});

scoped(c2, function() {
    const r = new Rectangle([10, 10], [100, 100]);
    r.fillColor = 'black';
    return true;
}) ;

