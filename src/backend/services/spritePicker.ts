/* if (spriteFilename === "greenForestTile1") {
  tile.tint = 0xffff;
}

if (spriteFilename === "blackForestTile1") {
  tile.tint = 0x8f8f8f;
}

if (spriteFilename === "whiteGroundTile1") {
  tile.tint = 0xa6f6f7;
} */

import { getRandomInt } from "./mapGenService";

export const getSpriteFilename = (terrainColor, terrainType) => {
  switch (terrainColor) {
    case "white":
      return getWhiteSprite(terrainType);
    case "green":
      return getGreenSprite(terrainType);
    case "black":
      return getBlackSprite(terrainType);
  }
};

const getWhiteSprite = (terrainType) => {
  switch (terrainType) {
    case "ground":
      return whiteGroundSprites[getRandomInt(whiteGroundSprites.length)];
    case "mountain":
      return whiteMountainSprites[getRandomInt(whiteMountainSprites.length)];
    case "forest":
      return whiteForestSprites[getRandomInt(whiteForestSprites.length)];
  }
};

const getGreenSprite = (terrainType) => {
  switch (terrainType) {
    case "ground":
      return greenGroundSprites[getRandomInt(greenGroundSprites.length)];
    case "mountain":
      return greenMountainSprites[getRandomInt(greenMountainSprites.length)];
    case "forest":
      return greenForestSprites[getRandomInt(greenForestSprites.length)];
  }
};

const getBlackSprite = (terrainType) => {
  switch (terrainType) {
    case "ground":
      if (Math.random() > 0.8) {
        return blackGroundLavaSprites[
          getRandomInt(blackGroundLavaSprites.length)
        ];
      }
      return blackGroundSprites[getRandomInt(blackGroundSprites.length)];
    case "mountain":
      if (Math.random() > 0.45) {
        return blackVolcanoSprites[1];
      }
      return blackMountainSprites[getRandomInt(blackMountainSprites.length)];
    case "forest":
      return blackForestSprites[getRandomInt(blackForestSprites.length)];
  }
};

const whiteGroundSprites = [
  "whiteGroundTile1",
  "whiteGroundTile2",
  "whiteGroundTile3",
];

const whiteMountainSprites = ["whiteMountainTile1", "whiteMountainTile2"];

const whiteForestSprites = ["whiteForestTile1"];

const greenGroundSprites = [
  "greenGroundTile1",
  "greenGroundTile2",
  "greenGroundTile4",
  "greenGroundTile8",
  "greenGroundTile9",
  "greenGroundTile9",
  "greenGroundTile10",
  "greenGroundTile11",
];

const greenMountainSprites = ["greenMountainTile1", "greenMountainTile2"];

const greenForestSprites = [
  "greenForestTile1",
  "greenForestTile2",
  "greenForestTile3",
];

const blackGroundSprites = [
  "blackGroundTile1",
  "blackGroundTile2",
  "blackGroundTile3",
];

const blackGroundLavaSprites = ["blackGroundLavaTile1", "blackGroundLavaTile2"];

const blackMountainSprites = [
  "blackMountainTile1",
  "blackMountainTile2",
  "blackMountainTile3",
];

const blackVolcanoSprites = ["blackVolcanoTile1", "blackVolcanoTile2"];

const blackForestSprites = ["blackForestTile1"];
