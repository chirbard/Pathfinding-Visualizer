import GridNode from "./gridNode";
import { UNVISITED, END } from "./gridConstants";

export default class Move {
  public static up(
    grid: GridNode[][],
    start: [number, number]
  ): [number, number] | undefined {
    const x = start[0];
    const y = start[1] - 1;
    return Move._validateAndSetVisited(grid, x, y, start);
  }

  public static down(
    grid: GridNode[][],
    start: [number, number]
  ): [number, number] | undefined {
    const x = start[0];
    const y = start[1] + 1;
    return Move._validateAndSetVisited(grid, x, y, start);
  }

  public static left(
    grid: GridNode[][],
    start: [number, number]
  ): [number, number] | undefined {
    const x = start[0] - 1;
    const y = start[1];
    return Move._validateAndSetVisited(grid, x, y, start);
  }

  public static right(
    grid: GridNode[][],
    start: [number, number]
  ): [number, number] | undefined {
    const x = start[0] + 1;
    const y = start[1];
    return Move._validateAndSetVisited(grid, x, y, start);
  }

  private static _setLastNode(
    grid: GridNode[][],
    x: number,
    y: number,
    lastLocation: [number, number]
  ) {
    grid[x][y].setLast(lastLocation);
  }

  private static _validateLocation(
    grid: GridNode[][],
    x: number,
    y: number
  ): [number, number] | undefined {
    const ISONGRIDY = y >= 0 && y < grid.length;
    const ISONGRIDX = x >= 0 && x < grid[0].length;
    if (ISONGRIDY && ISONGRIDX) {
      const ISUNVISITED = grid[x][y].getData() == UNVISITED;
      const ISEND = grid[x][y].getData() == END;
      if (ISUNVISITED || ISEND) {
        return [x, y];
      }
    }
  }

  private static _validateAndSetVisited(
    grid: GridNode[][],
    x: number,
    y: number,
    lastLocation: [number, number]
  ) {
    const newLocation: [number, number] | undefined = Move._validateLocation(
      grid,
      x,
      y
    );
    if (newLocation != undefined) {
      Move._setLastNode(grid, x, y, lastLocation);
      return newLocation;
    }
  }
}
