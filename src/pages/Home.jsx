import React, { useEffect, useState, useRef } from "react";
import { MdOutlineTexture } from "react-icons/md";
import { HiOutlineRectangleGroup } from "react-icons/hi2";
import { data } from "../assets/data.js";
import CanvasView from "../components/CanvasView";
import cake from "../assets/Cake.jpg";
import Image from "../assets/image.png";
import FileInputWrapper from "../components/FileInputWrapper.jsx";
import TextInputWrapper from "../components/TextInputWrapper.jsx";
import ColorPickerSection from "../components/ColorPickerSection.jsx";
import { Button } from "flowbite-react";

const Home = () => {
  const [captionText, setCaptionText] = useState(data.caption.text);
  const [ctaText, setCtaText] = useState(data.cta.text);
  const [maskImage, setMaskImage] = useState(cake);
  const [logoImage, setLogoImage] = useState(Image);
  const [backgroundColor, setBackgroundColor] = useState(
    JSON.parse(localStorage.getItem("recentColors"))?.[0] || "#0369A1"
  );
  const [recentColors, setRecentColors] = useState(
    JSON.parse(localStorage.getItem("recentColors")) ?? []
  );
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const canvasRef = useRef(null);

  const handleImgChange = (setImage) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      reader.onerror = (error) => {
        console.error("Error", error);
      };
    }
  };

  const handleButtonClick = () => {
    setOpenColorPicker(!openColorPicker);
  };

  const handleColorChange = (color) => {
    const updatedRecentColors = [
      color.hex,
      ...recentColors.filter((c) => c !== color.hex),
    ];
    setBackgroundColor(color.hex);
    setRecentColors(updatedRecentColors.slice(0, 5));
  };

  const handleDownloadClick = () => {
    const canvas = canvasRef.current;
    const offscreenCanvas = document.createElement("canvas");
    const offscreenCtx = offscreenCanvas.getContext("2d");

    offscreenCanvas.width = canvas.width; // Set offscreen canvas width to match canvas
    offscreenCanvas.height = canvas.height; // Set offscreen canvas height to match canvas

    offscreenCtx.drawImage(canvas, 0, 0); // Draw the entire canvas content onto the offscreen canvas

    const dataURL = offscreenCanvas.toDataURL("image/png");

    const downloadLink = document.createElement("a");
    downloadLink.href = dataURL;
    downloadLink.download = "canvas_image.png";

    downloadLink.click();
  };

  useEffect(() => {
    localStorage.setItem("recentColors", JSON.stringify(recentColors));
  }, [recentColors]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-evenly gap-10 p-6 md:p-24">
        <div className="w-full flex justify-center">
          <CanvasView
            ref={canvasRef}
            captionText={captionText}
            ctaText={ctaText}
            maskImage={maskImage}
            logoImage={logoImage}
            backgroundColor={backgroundColor}
          />
        </div>
        <div className="w-full flex flex-col">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-blue-900 mb-2">
              Personalize Ad Canvas
            </h3>
            <p className="text-sm text-gray-600">
              Customize the ad banner to match your needs.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <FileInputWrapper
              label="Select Image"
              onChange={handleImgChange(setMaskImage)}
            />
            <FileInputWrapper
              label="Select Logo"
              onChange={handleImgChange(setLogoImage)}
            />
            <div className="text-xs text-gray-600 flex items-center justify-center gap-2">
              <span className="bg-gray-600 w-[50%] h-0.5 rounded-full"></span>
              <span className="w-[40%] flex justify-center">Edit Contents</span>
              <span className="bg-gray-600 w-[50%] h-0.5 rounded-full"></span>
            </div>
            <TextInputWrapper
              label="AD Content"
              icon={MdOutlineTexture}
              defaultValue={captionText}
              onChange={setCaptionText}
            />
            <TextInputWrapper
              label="CTA Text"
              icon={HiOutlineRectangleGroup}
              defaultValue={ctaText}
              onChange={setCtaText}
            />
          </div>
          <div className="flex items-center mt-4">
            <ColorPickerSection
              recentColors={recentColors}
              onButtonClick={handleButtonClick}
              onColorChange={handleColorChange}
              openColorPicker={openColorPicker}
              backgroundColor={backgroundColor}
            />
            <Button
              outline
              gradientDuoTone="purpleToBlue"
              onClick={handleDownloadClick}
              className="mx-auto mr-1"
            >
              Download
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
