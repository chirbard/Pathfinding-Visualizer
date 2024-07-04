import GridNode from "./gridNode";
import Move from "./move";
import { UNVISITED, VISITED, START, END, WALL, PATH } from "./gridConstants";

export default class GridUtils extends Move {
  public static generateGridWithUnvisited(
    xSize: number,
    ySize: number
  ): GridNode[][] {
    let grid: GridNode[][] = [];
    for (let i = 0; i < ySize; i++) grid.push(GridUtils.generateGridRow(xSize));

    return grid;
  }

  public static setGridStart(
    grid: GridNode[][],
    x: number,
    y: number
  ): GridNode[][] {
    const lastStart: [number, number] | undefined = GridUtils.findNodeWithData(
      grid,
      START
    );
    if (lastStart != undefined) {
      grid[lastStart[0]][lastStart[1]].setData(UNVISITED);
    }
    grid[x][y].setData(START);
    return grid;
  }

  public static setGridEnd(
    grid: GridNode[][],
    x: number,
    y: number
  ): GridNode[][] {
    const lastEnd: [number, number] | undefined = GridUtils.findNodeWithData(
      grid,
      END
    );
    if (lastEnd != undefined) {
      grid[lastEnd[0]][lastEnd[1]].setData(UNVISITED);
    }
    grid[x][y].setData(END);
    return grid;
  }

  public static setGridWall(grid: GridNode[][], x: number, y: number) {
    grid[x][y].setData(WALL);
  }

  public static isEnd(
    grid: GridNode[][],
    queue: number[][],
    location: [number, number] | undefined
  ): [number, number] | undefined {
    if (location == undefined) return;
    const x = location[0];
    const y = location[1];
    if (grid[x][y].getData() == END) {
      return [x, y];
    }
    grid[x][y].setData(VISITED);

    queue.push(location);
    return;
  }

  public static breadthFirstSearch(grid: GridNode[][]) {
    const startLocation = GridUtils.findNodeWithData(grid, START);
    if (startLocation == undefined) {
      console.log("Start node not set, exiting.");
      return;
    }
    const endLocation = GridUtils.findNodeWithData(grid, END);
    if (endLocation == undefined) {
      console.log("End node not set, exiting.");
      return;
    }

    let queue: [[number, number]] = [startLocation];
    let currentLocation: [number, number] = startLocation;

    let isEnd = GridUtils.makeMoves(grid, queue, currentLocation);
    if (isEnd != undefined) {
      const x = isEnd[0];
      const y = isEnd[1];
      let locationArray = GridUtils.traverseNodes(grid, [x, y]);
      GridUtils.setPath(grid, locationArray);
      return;
    }

    queue.shift();

    while (queue.length > 0) {
      currentLocation = queue[0];

      isEnd = GridUtils.makeMoves(grid, queue, currentLocation);
      if (isEnd != undefined) {
        const x = isEnd[0];
        const y = isEnd[1];
        let locationArray = GridUtils.traverseNodes(grid, [x, y]);
        GridUtils.setPath(grid, locationArray);
        return;
      }

      queue.shift();
    }
  }

  private static setPath(grid: GridNode[][], locationArray: number[][]) {
    for (let i = 0; i < locationArray.length; i++) {
      const location = locationArray[i];
      const x = location[0];
      const y = location[1];
      if (grid[x][y].getData() == VISITED) grid[x][y].setData(PATH);
    }
  }

  private static makeMoves(
    grid: GridNode[][],
    queue: number[][],
    location: [number, number]
  ): [number, number] | undefined {
    const up = GridUtils.isEnd(grid, queue, Move.up(grid, location));
    const down = GridUtils.isEnd(grid, queue, Move.down(grid, location));
    const left = GridUtils.isEnd(grid, queue, Move.left(grid, location));
    const right = GridUtils.isEnd(grid, queue, Move.right(grid, location));
    if (up != undefined) return up;
    if (down != undefined) return down;
    if (left != undefined) return left;
    if (right != undefined) return right;
  }

  private static traverseNodes(
    grid: GridNode[][],
    startLocation: [number, number]
  ): number[][] {
    let locationArray: number[][] = [startLocation];
    let x = startLocation[0];
    let y = startLocation[1];
    let currentNode = grid[x][y];
    let nextLocation = currentNode.getLast();
    while (nextLocation != undefined) {
      locationArray.push(nextLocation);
      let newX = nextLocation[0];
      let newY = nextLocation[1];
      let currentNode = grid[newX][newY];
      nextLocation = currentNode.getLast();
    }
    return locationArray;
  }

  private static generateGridRow(xSize: number): GridNode[] {
    let row: GridNode[] = [];
    for (let i = 0; i < xSize; i++) row.push(new GridNode(UNVISITED));

    return row;
  }

  private static findNodeWithData(
    grid: GridNode[][],
    data: number
  ): [number, number] | undefined {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (grid[i][j].getData() == data) {
          return [i, j];
        }
      }
    }
  }
}
