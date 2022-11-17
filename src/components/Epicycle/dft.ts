import ComplexNumber from "./complexNumber";

export interface Fourier {
  x: number;
  y: number;
  freq: number;
  phase: number;
  amplitude: number;
}

// Discrete Fourier Transform
// https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Definition
export function dft(x: ComplexNumber[]): Fourier[] {
  let X = [];
  const N = x.length;

  for (let k = 0; k < N; k++) {
    let sum = new ComplexNumber(0, 0);

    for (let n = 0; n < N; n++) {
      const theta = (2 * Math.PI * k * n) / N;
      const c = new ComplexNumber(Math.cos(theta), -Math.sin(theta));
      sum = sum.add(x[n].multiply(c));
    }

    sum.re = sum.re / N;
    sum.im = sum.im / N;

    const freq = k;
    const amplitude = sum.magnitude();
    const phase = sum.angle();

    X.push({ x: sum.re, y: sum.im, freq, amplitude, phase });
  }

  return X;
}
