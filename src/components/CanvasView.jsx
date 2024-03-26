import React, { useEffect, useRef } from "react";
import CanvasEdit from "./CanvasEdit.js";

const CanvasView = React.forwardRef(
  ({ captionText, ctaText, maskImage, logoImage, backgroundColor }, ref) => {
    const canvasRef = useRef(null);

    useEffect(() => {
      // Adjust canvas size when component dimensions change
      const canvas = canvasRef.current;
      canvas.width = 1080;
      canvas.height = 1080;

      // Trigger canvas redraw
      const canvasDrawer = new CanvasEdit(canvas);
      canvasDrawer.drawBackground(backgroundColor);
      canvasDrawer.drawImagesAndTexts({
        logoImage,
        maskImage,
        captionText,
        ctaText,
      });

      return () => {
        canvasDrawer.clear();
      };
    }, [ backgroundColor, captionText, ctaText, maskImage, logoImage]);

    return (
      <canvas
        ref={(canvas) => {
          canvasRef.current = canvas;
          if (typeof ref === "function") {
            ref(canvas);
          } else if (ref) {
            ref.current = canvas;
          }
        }}
        className="w-full h-[400px] md:w-[500px] md:h-[500px]" 
      />
    );
  }
);

export default CanvasView;
