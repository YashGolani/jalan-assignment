import { useDispatch, useSelector } from "react-redux";
import { addCoordinates } from "../features/drawingSlice";
import useCanvas from "../hooks/useCanvas";
import { RootState } from "../store/store";
import { useState } from "react";

interface CanvasProps {
  image: string;
}

const Canvas = ({ image }: CanvasProps) => {
  const dispatch = useDispatch();
  const points = useSelector((state: RootState) => state.drawing.points);
  const [isFirstClick, setIsFirstClick] = useState(true);

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = event.currentTarget;
    const rect = canvas.getBoundingClientRect();
    const newPoint = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    if (isFirstClick) {
      dispatch(addCoordinates(newPoint));
      setIsFirstClick(false);
    } else {
      dispatch(addCoordinates(newPoint));
    }
  };

  const draw = (ctx: CanvasRenderingContext2D) => {
    if (!image) return;

    const img = new Image();
    img.src = image;
    img.onload = () => {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);

      if (points.length === 1) {
        ctx.beginPath();
        ctx.arc(points[0].x, points[0].y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = "lime";
        ctx.fill();
      }

      ctx.strokeStyle = "lime";
      ctx.lineWidth = 2;
      ctx.beginPath();
      points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y);
        } else {
          ctx.lineTo(point.x, point.y);
        }
      });
      if (points.length > 2) {
        ctx.closePath();
      }
      ctx.stroke();
    };
    img.onerror = () => {
      alert("Failed to load image. Please check the URL and try again.");
    };
  };

  const canvasRef = useCanvas(draw);

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth * 0.8}
      height={window.innerHeight * 0.75}
      onMouseDown={handleMouseDown}
      style={{ border: "1px solid black", maxWidth: "100%" }}
    />
  );
};

export default Canvas;
