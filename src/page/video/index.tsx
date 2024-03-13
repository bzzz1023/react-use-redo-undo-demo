import React, { useEffect, useRef } from "react";
import "./index.less";
import { func } from "./utils/index";
const App = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    func(canvasRef.current);
  }, []);
  return (
    <div>
      <canvas
        ref={canvasRef}
        height={300}
        width={300}
        style={{ border: "1px solid red" }}
      ></canvas>
    </div>
  );
};

export default App;
