import { Fourier, dft } from "./dft";
import ComplexNumber from './complexNumber';
import p5Types from "p5"

import piPath from './paths/pi.json';
import summationPath from './paths/summation.json'
import integralPath from './paths/integral.json';
import zetaPath from './paths/zeta.json';
import xPath from './paths/x.json';

export interface EpicycleOps {
  x: number; 
  y: number; 
  fourier: Fourier[]; 
  radius: number; 
  rotation: number;
}

export interface Path {
  x: number; 
  y: number; 
}


export function processPath(pathJson: [number,number][]) : Fourier[] {
  let fourierPath: Fourier[] = [];
  let complexPath: ComplexNumber[] = [];

  for (let i=0; i < pathJson.length; i++) {
    complexPath.push(new ComplexNumber(pathJson[i][0], pathJson[i][1]));
  }
  fourierPath = dft(complexPath);
  fourierPath.sort((a,b) => b.amplitude - a.amplitude) // sort by amplitude

  return fourierPath;
}

export function getRandomCoords() : [number,number][] {
  // @ts-ignore
  const paths: [number,number][][] = [piPath, summationPath, integralPath, zetaPath, xPath];

  return paths[Math.floor(Math.random() * paths.length)];

}

export function drawEpicycle(p5: p5Types, time:number, ops: EpicycleOps) : Path {
  for (let i = 0; i < ops.fourier.length; i++) {
    const prevx = ops.x;
    const prevy = ops.y;

    const freq = ops.fourier[i].freq;
    const radius = ops.radius * ops.fourier[i].amplitude;
    const phase = ops.fourier[i].phase;

    p5.strokeWeight(0.8);
    p5.stroke("#1E1E1E");
    p5.noFill();
    p5.circle(prevx, prevy, radius * 2);

    ops.x += radius * p5.cos(freq * time + phase + ops.rotation);
    ops.y += radius * p5.sin(freq * time + phase + ops.rotation);

    p5.fill("#1E1E1E");
    p5.stroke("#1E1E1E");
    p5.strokeWeight(1.5);
    p5.line(prevx, prevy, ops.x, ops.y);
  }

  return { x: ops.x, y: ops.y };
}

export function drawPath(p5: p5Types, path: Path[]) {
  p5.beginShape();
  p5.noFill();
  p5.strokeWeight(2);
  for (let i = 0; i < path.length; i++) {
    p5.vertex(path[i].x, path[i].y);
  }
  p5.endShape();
}

