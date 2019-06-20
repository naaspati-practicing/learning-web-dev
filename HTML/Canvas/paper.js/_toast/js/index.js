const paper = require('paper'); // do not modify this line, live-server will remove it before serving

const {Path, Point} = paper;
paper.setup(document.getElementById('canvas1'));

const path = new Path();
path.strokeColor = 'black';
const start = new Point(100, 100);

path.moveTo(start);
path.lineTo(start.add([200, -50]));

paper.view.draw();


