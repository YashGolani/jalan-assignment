import React, { useState } from "react";
import Canvas from "./components/Canvas";
import { exportCanvasAsImage } from "./utils/imageExport";
import { useDispatch } from "react-redux";
import { clearCoordinates, undo } from "./features/drawingSlice";
import defaultImage from "./assets/aerial-multipleroofs.webp";

const App = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState<string>(defaultImage);

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      exportCanvasAsImage(canvas);
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center bg-[#EEE0C9]">
      <h1 className="text-2xl font-bold mb-10 mt-14">Roof Drawing App</h1>
      <Canvas image={image} />
      <div className="flex space-x-2 m-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="upload-image"
        />
        <label htmlFor="upload-image" className="cursor-pointer">
          <div
            className="bg-blue-500 hover:bg-blue-700 text-center text-sm lg:text-base text-white font-bold py-2 
            px-4 rounded"
          >
            Upload Image
          </div>
        </label>
        <button
          onClick={() => dispatch(undo())}
          className="bg-blue-500 hover:bg-blue-700 text-sm lg:text-base text-white font-bold py-2 px-4 rounded"
        >
          Undo
        </button>
        <button
          onClick={() => dispatch(clearCoordinates())}
          className="bg-blue-500 hover:bg-blue-700 text-sm lg:text-base text-white font-bold py-2 px-4 rounded"
        >
          Clear Drawing
        </button>
        <button
          onClick={handleDownload}
          className="bg-blue-500 hover:bg-blue-700 text-sm lg:text-base text-white font-bold py-2 px-4 rounded"
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default App;
