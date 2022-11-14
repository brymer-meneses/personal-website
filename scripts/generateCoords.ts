import fs from 'node:fs';
import inquirer from 'inquirer';
import { load } from 'cheerio';
import { svgPathProperties } from "svg-path-properties";

interface Coordinate {
  x: number;
  y: number;
}

enum PreprocessingOps {
  TRANSLATE_TO_CENTER_OF_MASS,
  ROTATE_BY_AN_ANGLE,
  SCALE,
  ADD_OFFSET,
  CONFIGURE_NUMBER_OF_POINTS,
}



async function askFilename() {
  const answer = await inquirer.prompt({
    name: 'filename',
    type: 'input',
    message: 'SVG Filename:',
    validate(filename) {
      if (!fs.existsSync(filename))
        return `Cannot find file: ${filename}`
      if (!filename.endsWith("svg"))
        return `Invalid file format, must be an svg!`
      return true;
    }
  })
  return answer.filename;
}

async function askOutputFilename(defaultFilename: string) {
  const filename = defaultFilename.split('/').pop(); // get last element of the array
  const answer = await inquirer.prompt({
    name: 'outputFilename',
    type: 'input',
    message: 'Output filename:',
    default: "src/components/Epicycle/paths/" + filename!.split('.')[0] + '.json',
  })
  return answer.outputFilename;
}

async function askNumberOfPoints() {
  const answer = await inquirer.prompt({
    name: 'numberOfPoints',
    type: 'input',
    message: 'Number of points:',
  })
  return answer.numberOfPoints;
}

async function askAngle() {
  const answer = await inquirer.prompt({
    name: 'angle',
    type: 'input',
    message: 'Angle to Scale With:',
    default: 90,
  })
  return Math.sin(answer.angle * (Math.PI/180));
}

async function askScalingFactor() {
  const answer = await inquirer.prompt({
    name: 'scalingFactor',
    type: 'input',
    message: 'Factor to scale with:',
    default: 1,
  })
  return answer.scalingFactor;
}


async function askCoordinateOffset() {
  const offset_x = await inquirer.prompt(
    {
      name: 'value',
      type: 'input',
      message: 'Offset X:',
    },
  )
  const offset_y = await inquirer.prompt(
    {
      name: 'value',
      type: 'input',
      message: 'Offset Y:',
    },
  )
  return {x: offset_x.value, y: offset_y.value };
}


async function askPreprocessOptions() {
  const options = await inquirer.prompt({
    name: 'options',
    type: 'checkbox',
    message: 'Peprocessing Options',
    default: [
      PreprocessingOps.TRANSLATE_TO_CENTER_OF_MASS
    ],
    choices: [
      { 
        name: 'Translate to center of mass',
        value: PreprocessingOps.TRANSLATE_TO_CENTER_OF_MASS,
      },
      { 
        name: 'Rotate by an angle',
        value: PreprocessingOps.ROTATE_BY_AN_ANGLE,
      },
      { 
        name: 'Scale',
        value: PreprocessingOps.SCALE,
      },
      { 
        name: 'Offset by a point',
        value: PreprocessingOps.ADD_OFFSET,
      },
    ]
  })

  return options;
}


function translateToCenterOfMass(coords: Coordinate[]) {
  const N = coords.length;
  let sum_x = 0;
  let sum_y = 0;

  for (let i=0; i<N; i++) {
    sum_x += coords[i].x;
    sum_y += coords[i].y;
  }

  sum_x = sum_x/N;
  sum_y = sum_y/N;

  let translatedCoords = [];
  for (let i=0; i<N; i++) {
    translatedCoords[i] = { x: coords[i].x - sum_x, y: coords[i].y - sum_y };
  }

  return translatedCoords;
}

function writeCoordsToFile(coords: Coordinate[], outputFilename: string) {

  
  fs.writeFileSync(outputFilename, "")
  fs.appendFileSync(outputFilename, "[\n")

  for (let i=0; i<coords.length-1; i++) {
    fs.appendFileSync(outputFilename, `\t[${coords[i].x}, ${coords[i].y}],\n`)
  }
  fs.appendFileSync(outputFilename, `\t[${coords[coords.length-1].x}, ${coords[coords.length-1].y}]\n`)

  fs.appendFileSync(outputFilename, "]")
}

function computeCartesianCoordinates(filename: number, ops: { numPoints: number, scale:number, translateX:number, translateY:number }) {
  const contents = fs.readFileSync(filename);
  const $ = load(contents, {xmlMode: true})
  const path = $('svg path').attr('d')!.toString();


  const properties = new svgPathProperties(path);
  const length = properties.getTotalLength();

  // https://github.com/spotify/coordinator/blob/master/src/js/polygonize.js
  let array = [];
  for (let i=0; i< ops.numPoints; i++) {
    const point = properties.getPointAtLength(length * i / ops.numPoints);
    array.push( { x: point.x * ops.scale + ops.translateX, y: point.y * ops.scale + ops.translateY });
  }
  return array;
}

function rotateCoordinates(coords: Coordinate[], angle: number) {
  let phi = angle % 360;
  // Use the rotation matrix to rotate each point
  return coords.map((coord) => {
    const x = coord.x * (Math.sin(phi) + Math.cos(phi));
    const y = coord.y * (Math.cos(phi) - Math.sin(phi));
    return {x, y};
  })
}

async function main() {

  let opts: {
    numPoints: number,
    scale: number,
    translateX: number,
    translateY: number,
    angle: number,
    translateToCenterOfMass: boolean,
  } = {
    numPoints: 600,
    scale: 1,
    translateX: 1,
    translateY: 1,
    angle: 0,
    translateToCenterOfMass: true,
  };


  const filename = await askFilename();
  const inputOpts = await askPreprocessOptions();

  for (const opt of inputOpts.options) {
    switch (opt) {
      case PreprocessingOps.TRANSLATE_TO_CENTER_OF_MASS:
        opts.translateToCenterOfMass = true;
        break;
      case PreprocessingOps.ROTATE_BY_AN_ANGLE:
        opts.angle = await askAngle();
        break;
      case PreprocessingOps.ADD_OFFSET:
        const coord = await askCoordinateOffset();
        opts.translateX = coord.x;
        opts.translateY = coord.y;
        break;
      case PreprocessingOps.SCALE:
        opts.scale = await askScalingFactor();
        break;
      case PreprocessingOps.CONFIGURE_NUMBER_OF_POINTS:
        opts.numPoints = await askNumberOfPoints();
        break;
    }
  }

  const outputFilename = await askOutputFilename(filename);
  let coords = computeCartesianCoordinates(filename, { ...opts });

  if (opts.angle !== 0)
    coords = rotateCoordinates(coords, opts.angle)
  if (opts.translateToCenterOfMass)
    coords = translateToCenterOfMass(coords);

  writeCoordsToFile(coords, outputFilename);
}

// @ts-ignore
await main();

