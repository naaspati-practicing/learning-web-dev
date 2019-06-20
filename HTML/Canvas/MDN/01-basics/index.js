class Canvas {
    constructor(width = 300, height = 300) {

      /** @type {HTMLCanvasElement}  */
      this.canvas = document.createElement('canvas');
      this.canvas.height = height;
      this.canvas.width = width;
      
      this.g = this.canvas.getContext("2d");

      document.body.appendChild(this.canvas);
    }
  }


  /**
   *  Rectangular shape example
   *  https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#Rectangular_shape_example
   */
(function() {
    const c = new Canvas(150, 150);
    const g = c.g;

    g.fillRect(25, 25, 100, 100);
    g.clearRect(45, 45, 60, 60);
    g.strokeRect(50, 50, 50, 50);
})();

/**
 * Drawing a triangle
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#Drawing_a_triangle
 */
(function() {
    const c = new Canvas(70, 60);
    const g = c.g;

    g.beginPath();
    g.moveTo(10, 30);
    g.lineTo(50, 5);
    g.lineTo(50, 50);
    g.fill();

})();

/**
 * draw smily face
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#Moving_the_pen
 */
(function() {
    const c = new Canvas(150, 150   );
    const g = c.g;

    g.beginPath();
    g.arc(75, 75, 50, 0, Math.PI * 2, true); // outer circle
    g.moveTo(110, 75);
    g.arc(75, 75, 35, 0, Math.PI, false);

    g.moveTo(65, 65);
    g.arc(60, 65, 5, 0, Math.PI * 2, true); // left eye

    g.moveTo(95, 65);
    g.arc(90, 65, 5, 0, Math.PI * 2, true); // right eye

    g.stroke();
})();

/**
 * Arcs
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#Arcs
 */
(function() {
    const c = new Canvas(160, 210);
    const g = c.g;

    const radius = 20;

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            const x = 25 + j * 50;
            const y = 25 + i * 50;

            const startAngle = 0;
            const endAngle = Math.PI + (Math.PI * j) / 2; 
            const anticlockwise = i % 2 != 0;

            g.beginPath();
            g.arc(x,y,radius, startAngle, endAngle, anticlockwise);

            if(i > 1)
              g.fill();
            else 
              g.stroke();
        }
    }
    
})();

/** 
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes#Bezier_and_quadratic_curves
*/
(function() {
    const c = new Canvas(150, 150);
    const g = c.g;

    g.beginPath();
    g.moveTo(75, 25);

    g.quadraticCurveTo(25, 25, 25, 62.5);
    g.quadraticCurveTo(25, 100, 50, 100);
    g.quadraticCurveTo(50, 120, 30, 125);
    g.quadraticCurveTo(60, 120, 65, 100);
    g.quadraticCurveTo(125, 100, 125, 62.5);
    g.quadraticCurveTo(125, 25, 75, 25);

    g.stroke();
})();

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Applying_styles_and_colors#A_fillStyle_example
 */
(function() {
    const c = new Canvas(155, 155);
    const g = c.g;
    
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
        const r = Math.floor(255 - 42.5 * i);
        const green = Math.floor(255 - 42.5 * j);

      g.fillStyle = `rgb(${r}, ${green}, 0)`;
      g.fillRect(j * 25, i * 25, 25, 25);
    }
}
})();

/* 
(function() {
    const c = new Canvas();
    const g = c.g;
})(); */
