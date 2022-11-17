class ComplexNumber {
  re: number;
  im: number;

  constructor(re: number, im: number) {
    this.re = re;
    this.im = im;
  }

  multiply(other: ComplexNumber): ComplexNumber {
    // (a+bi)(c+di) = ac-bd + (ad+bc)i
    const re = this.re * other.re - this.im * other.im;
    const im = this.re * other.im + this.im * other.re;
    return new ComplexNumber(re, im);
  }

  add(other: ComplexNumber): ComplexNumber {
    const re = this.re + other.re;
    const im = this.im + other.im;
    return new ComplexNumber(re, im);
  }

  magnitude(): number {
    return Math.sqrt(this.re * this.re + this.im * this.im);
  }

  angle(): number {
    return Math.atan2(this.im, this.re);
  }
}

export default ComplexNumber;
