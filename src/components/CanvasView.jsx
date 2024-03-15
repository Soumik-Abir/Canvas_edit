import React, { useEffect, useRef } from "react";
import CanvasEdit from "./CanvasEdit.js";
import DesignPattern from "../assets/Design_Pattern.png";
import Mask from "../assets/mask.png";
import MaskStroke from "../assets/Mask_stroke.png";
import { data as templateData } from "../assets/data.js";

const CanvasView = ({
  captionText,
  ctaText,
  maskImage,
  logoImage,
  backgroundColor,
  handleDownloadClick,
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasDrawer = new CanvasEdit(canvas);

    canvasDrawer.draw(backgroundColor); // Initial drawing

    canvasDrawer.drawImageInRectangle(DesignPattern, 0, 0, 1080, 1080);
    canvasDrawer.drawImageInRectangle(logoImage, 820, 30, 160, 140);
    canvasDrawer.drawImageInMask(Mask, 0, 0, 1080, 1080);
    canvasDrawer.drawImageInMask(MaskStroke, 0, 0, 1080, 1080);

    canvasDrawer.drawCaption(templateData.caption, captionText);
    canvasDrawer.drawCTA(templateData.cta, ctaText);

    canvasDrawer.drawImageOverMask(maskImage, 56, 442, 970, 600);

    // Cleanup function
    return () => {
      canvasDrawer.clear();
    };
  }, [captionText, ctaText, maskImage, logoImage, backgroundColor]);

  return (
    <>
      <canvas
        className="w-[600px] h-[600px]"
        ref={canvasRef}
        width={1080}
        height={1080}
      />
    </>
  );
};

export default CanvasView;
