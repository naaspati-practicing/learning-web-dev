class Canvas {
  constructor(width = 300, height = 300) {
    /** @type {HTMLCanvasElement}  */
    this.canvas = document.createElement("canvas");
    this.canvas.height = height;
    this.canvas.width = width;

    this.g = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);
  }
}

const sun = new Image(),
  moon = new Image(),
  earth = new Image();

let canvas;
/** @type {CanvasRenderingContext2D} */
let g;


function init() {
  sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
  moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
  earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';

  canvas = new Canvas(300, 300);
  g = canvas.g;

  g.globalCompositeOperation = 'destination-over';

  requestAnimationFrame(draw);
}

function draw() {
  g.clearRect(0, 0, 300, 300);

  g.fillStyle = 'rgba(0,0,0, 0.4)';
  g.strokeStyle = 'rgba(0, 153, 255, 0.4)';
  g.save();

  g.translate(150, 150);
  
  // Earth
  const time = new Date();
  g.rotate((2 * Math.PI / 60) * time.getSeconds()  + ((2 * Math.PI) / 60000) * time.getMilliseconds());
  g.translate(105, 0);
  g.fillRect(0, -12, 40, 24); // shadow
  g.drawImage(earth, -12, -12);

  // Moon
  g.save();
  g.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
  g.translate(0, 28.5);
  g.drawImage(moon, -3.5, -3.5);
  g.restore();

  g.restore();

  g.beginPath();
  g.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
  g.stroke();
 
  g.drawImage(sun, 0, 0, 300, 300);

  requestAnimationFrame(draw);
}

init();


