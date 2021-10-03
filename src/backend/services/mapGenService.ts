import SimplexNoise from "simplex-noise";
import { mapPointToIndex } from "../../utils";

export const generateNoiseMap = (width, height) => {
  let gen = new SimplexNoise();
  function noise(nx, ny) {
    // Rescale from -1.0:+1.0 to 0.0:1.0
    return gen.noise2D(nx, ny) / 2 + 0.5;
  }
  let value = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let nx = x / width - 0.5,
        ny = y / height - 0.5;
      value[mapPointToIndex({ x, y }, width)] = noise(nx * 6, ny * 6).toFixed(
        2
      );
    }
  }
  return value;
};

export const getTerrainType = (color, noiseValue) => {
  switch (color) {
    case "white":
      if (noiseValue < 0.5 && Math.random() > 0.7) return "forest";
      if (noiseValue > 0.5 && Math.random() > 0.7) return "mountain";

      return "ground";

    case "green":
      if (noiseValue <= 0.7 && Math.random() > 0.75) return "forest";
      if (noiseValue > 0.7 && Math.random() > 0.7) return "mountain";

      return "ground";

    case "black":
      if (noiseValue < 0.1 && Math.random() > 0.6) return "forest";
      if (noiseValue > 0.6 && Math.random() > 0.5) return "mountain";

      return "ground";
  }
};

export const generateVoronoiMap = (
  numRandomPoints = 2 /* 2 or more */,
  mapWidth = 5,
  mapHeight = 5,
  values,
  predeterminedPoints = null
) => {
  if (numRandomPoints === 1) {
    return Array.from(
      new Array(mapWidth * mapHeight),
      (val, index) => values[0]
    );
  }

  if (numRandomPoints === 0) {
    return fillInVoronoiMap(predeterminedPoints, mapWidth, mapHeight, values);
  }

  const randomPoints = getRandomPoints(numRandomPoints, mapWidth, mapHeight);
  return fillInVoronoiMap(randomPoints, mapWidth, mapHeight, values);
};

export const fillInVoronoiMap = (randomPoints, mapWidth, mapHeight, values) => {
  const result = [];
  for (let x = 0; x < mapWidth; x += 1) {
    for (let y = 0; y < mapHeight; y += 1) {
      const closestPointIndex = findClosestPointIndex({ x, y }, randomPoints);
      result[mapPointToIndex({ x, y }, mapWidth)] = values[closestPointIndex];
    }
  }
  return result;
};

export const findClosestPointIndex = (
  comparisonPoint,
  pointsToCompareAgainst
) => {
  let closestPointIndex = 0;
  let lowestDistance = Infinity;

  for (let i = 0; i < pointsToCompareAgainst.length; i += 1) {
    const distance = calculateDistance(
      comparisonPoint,
      pointsToCompareAgainst[i]
    );
    /*
    more than 2 less than distance, set the new one
    if its within distance + 2 and distance - 2, flip a coin: 25%
    if its within distance + 1 and distance - 1, flip a coin: 50%
    */
    if (distance < lowestDistance) {
      lowestDistance = distance;
      closestPointIndex = i;
    }

    /* if (
      distance >= lowestDistance - 2 &&
      distance < lowestDistance - 1 &&
      Math.random() > 0.25
    ) {
      lowestDistance = distance;
      closestPointIndex = i;
    } */

    /* if (
      distance >= lowestDistance - 1 &&
      distance <= lowestDistance + 1 &&
      Math.random() > 0.5
    ) {
      lowestDistance = distance;
      closestPointIndex = i;
    } */

    /* if (
      distance > lowestDistance + 1 &&
      distance <= lowestDistance + 2 &&
      Math.random() > 0.75
    ) {
      lowestDistance = distance;
      closestPointIndex = i;
    } */
  }
  return closestPointIndex;
};

export const getRandomPoints = (numRandomPoints, mapWidth, mapHeight) => {
  let randomPoints = [];
  let isFull = false;

  while (!isFull) {
    const randomPoint = getRandomPoint(mapWidth, mapHeight);
    if (isPointUnique(randomPoint, randomPoints)) {
      randomPoints.push(randomPoint);
      if (randomPoints.length === numRandomPoints) {
        isFull = true;
      }
    }
  }
  console.log("randomPoints :>> ", randomPoints);

  return randomPoints;
};

export const isPointUnique = (pointToTest, points) => {
  let unique = true;

  if (points.length === 0) return true;

  for (let point of points) {
    if (pointToTest.x === point.x && pointToTest.y === point.y) {
      unique = false;
    }
  }
  return unique;
};

export const getRandomPoint = (mapWidth, mapHeight) => {
  return { x: getRandomInt(mapWidth), y: getRandomInt(mapHeight) };
};

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export const calculateDistance = (point1, point2) => {
  return Math.sqrt(square(point2.x - point1.x) + square(point2.y - point1.y));
};

export const square = (num) => {
  return num * num;
};
/**
 * set map shape = circle, triangle, square, rectangle, pentagon, hexagon
 * generate noise
 * generate voronoi
 * generate spawn cities
 * apply tribe territory with voronoi
 * apply trees/mountains using noise values at certain ranges
 * add void tiles
 * add rivers/lakes (water, ice, lava)
 */
