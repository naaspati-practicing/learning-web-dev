const paper = require('paper'); // do not modify this line, live-server will remove it before serving

const {Path, Point, Size, PointText, Group} = paper;
const {Circle, Rectangle} = Path;

paper.setup(document.getElementById('canvas1'));
const view = paper.view;

const text = new PointText({
    position: view.center,
    fillColor: 'black',
    justification: 'center',
    fontSize: 20
});

const originals = new Group({insert: false}); // dont insert in DOM

const square = new Rectangle({
    position: view.center,
    size: 300,
    parent: originals,
    fillColor: 'green',
    selected:true
});

// Make a ring using subtraction of two circles:
const inner =  new Circle({
    center: view.center,
    radius: 100,
    parent: originals,
    fillColor: 'white',
    selected:true
});

const outer =  new Circle({
    center: view.center,
    radius: 140,
    parent: originals,
    fillColor: 'white',
    selected:true
});

const ring   = outer.subtract(inner);
const operations = ['unite', 'intersect', 'subtract', 'exclude', 'divide'];
const colors = ['red', 'green', 'blue', 'black'];

let curIndex = -1;
let operation, result, activeItem;

function setMode() {
    curIndex++;
    if(curIndex === operations.length)
      curIndex = 0;

    operation = operations[curIndex];
}

setMode();
setInterval(setMode, 3000);

paper.view.onFrame = event => {
    if(activeItem != ring) {
        // Move the ring around:
        const offset = new Point(140, 80).multiply([Math.sin(event.count / 60), Math.sin(event.count / 40)]);
        ring.position = view.center.add(offset);
    }

    if(result)
    result.remove();

    if(curIndex < operations.length) {
        result = square[operation](ring);
        text.content = 'square.' + operation + '(ring)';
    } else {
        result = ring[operation](square);
        text.content = 'ring.' + operation + '(square)';
    }

    result.selected = true;
    result.fillColor =  colors[curIndex % colors.length];
    result.moveBelow(text);

    // If the result is a group, color each of its children differently:
    if (result instanceof Group) {
        for (var i = 0; i < result.children.length; i++) {
            result.children[i].fillColor = colors[i];
        }
    }
};


paper.view.onResize = function () {
    text.position = view.center + [0, 200];
    square.position = view.center;
}

paper.view.onMouseDown =  function (event) {
    var hitResult = originals.hitTest(event.point);
    activeItem = hitResult && hitResult.item;
}

paper.view.onMouseDrag = function (event) {
    if (activeItem)
        activeItem.position = event.point;
}

paper.view.onMouseUp = function () {
    activeItem = null;
    square.position = view.center;
}


paper.view.draw();
