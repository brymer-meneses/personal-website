import Sketch from 'react-p5'
import p5Types from 'p5';
import { drawEpicycle, processPath, drawPath, Path, getRandomCoords } from './utils';

import { Fourier } from './dft';

let rawPath = getRandomCoords();

function Epicycle() {
  let time = 0;
  let wave: Path[] = [];
  let fourierPath: Fourier[];
  let radius =  1.0 * window.innerHeight / window.innerWidth;

  const windowResize = (p5: p5Types) => {
    p5.resizeCanvas(window.innerWidth/4, window.innerHeight/2);
    radius =  1.0 * window.innerHeight / window.innerWidth;
  }

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(window.innerWidth/4, window.innerHeight/2)
      .parent(canvasParentRef);
    p5.background('#F4F4F0')
    fourierPath = processPath(rawPath);
  }

  const resetDrawing = () => {
    fourierPath = processPath(getRandomCoords());
    time = 0;
    wave = [];
  }

  const draw = (p5: p5Types) => {
    p5.translate(0.1 * window.innerWidth/2, 0.5 * window.innerHeight/2)

    /* p5.background('white'); */
    p5.background('#F4F4F0')

    const v = drawEpicycle(p5, time, { x: 100, y: 0, radius, rotation: 0, fourier: fourierPath});
    wave.unshift(v);
    drawPath(p5, wave);

    const dt = p5.TWO_PI / fourierPath.length;
    time += dt;

    if (time > 1.00 * p5.TWO_PI)
      resetDrawing();
  }

  return <Sketch setup={setup} draw={draw} windowResized={windowResize}/>

}

export default Epicycle;