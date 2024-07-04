import { useRef, useEffect } from "react";

const useCanvas = (draw) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement | null;
    if (canvas == null) throw new Error("canvas is null");
    canvas.width = 375;
    canvas.height = 375;
    const context = canvas.getContext("2d");
    if (context == null) throw new Error("context is null");

    let frameCount = 0;
    let animationFrameId: number;

    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]);

  return canvasRef;
};

export default useCanvas;
