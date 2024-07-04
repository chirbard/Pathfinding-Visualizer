import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import background from "./assets/bg.png";
import Canvas from "./Canvas";
import GridUtils from "./pathfinding/gridUtils";
import {
  UNVISITED,
  VISITED,
  START,
  END,
  WALL,
  PATH,
} from "./pathfinding/gridConstants";

function App() {
  const grid = GridUtils.generateGridWithUnvisited(15, 15);
  GridUtils.setGridStart(grid, 1, 7);
  GridUtils.setGridEnd(grid, 13, 5);
  GridUtils.setGridWall(grid, 4, 5);
  GridUtils.breadthFirstSearch(grid);

  const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const cellSize = 24;
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[0].length; y++) {
        const cellData: number = grid[y][x].getData();
        switch (cellData) {
          case VISITED: {
            ctx.fillStyle = "#ffffff";
            break;
          }
          case START: {
            ctx.fillStyle = "#0000ff";
            break;
          }
          case END: {
            ctx.fillStyle = "#00ff00";
            break;
          }
          case WALL: {
            ctx.fillStyle = "#ff0000";
            break;
          }
          case UNVISITED: {
            ctx.fillStyle = "#000000";
            break;
          }
          case PATH: {
            ctx.fillStyle = "#0044aa";
            break;
          }
          default: {
            throw new Error("Invalid cell data");
          }
        }

        ctx.fillRect(
          x * (cellSize + 1),
          y * (cellSize + 1),
          cellSize,
          cellSize
        );
      }
    }
    ctx.fill();
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center background-pattern, bg-gray-900"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="flex-col flex items-center justify-center rounded-xl p-8
      bg-gray-500 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-600"
      >
        <Canvas draw={draw} />
      </div>
    </div>
  );
}

export default App;
