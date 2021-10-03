const TILE_WIDTH_HALF = 64;
const TILE_HEIGHT_HALF = 64;
const TILE_Y_OFFSET = 28;
// offsets: 128x128 = 28

interface Point {
  x: number;
  y: number;
}

export const indexToMapPoint = (index: number, mapWidth) => {
  return { x: index % mapWidth, y: Math.floor(index / mapWidth) };
};

export const mapPointToIndex = (mapPoint: Point, mapWidth) => {
  return mapPoint.y * mapWidth + mapPoint.x;
};

export const mapToScreen = (mapPoint: Point) => {
  return {
    x: (mapPoint.x - mapPoint.y) * TILE_WIDTH_HALF,
    y: (mapPoint.x + mapPoint.y) * (TILE_HEIGHT_HALF - TILE_Y_OFFSET),
  };
};

export const screenToMap = (screenPoint: Point) => {
  return {
    x: (screenPoint.x / TILE_WIDTH_HALF + screenPoint.y / TILE_HEIGHT_HALF) / 2,
    y:
      (screenPoint.y / (TILE_HEIGHT_HALF - TILE_Y_OFFSET) -
        screenPoint.x / TILE_WIDTH_HALF) /
      2,
  };
};

// ORIGIN OFFSET: Notice that the "origin" of the isometric tile is the top corner. But usually when we draw a sprite it's from the top-left corner. Before drawing you may want to adjust by the tile's size. Example for regular sized tiles: screen.x -= TILE_WIDTH_HALF;

// These formulas also don't account for a camera. Essentially a camera is a drawing offset, just as in an Orthographic game. The middle of our projected map is at x=0, so if you want it centered on the screen it's like having a camera offset: screen.x += SCREEN_WIDTH_HALF;
