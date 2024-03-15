import React, { useEffect, useRef, useState } from "react";
import { TbPlus, TbTextCaption } from "react-icons/tb";
import { HiOutlineRectangleGroup } from "react-icons/hi2";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { data } from "../assets/data.js";

import cake from "../assets/Cake.jpg";
import Image from "../assets/image.png";
import { SketchPicker } from "react-color";
import CanvasView from "../components/CanvasView";

const Home = () => {
  const [captionText, setCaptionText] = useState(data.caption.text);
  const [ctaText, setCtaText] = useState(data.cta.text);
  const [maskImage, setMaskImage] = useState(cake);
  const [logoImage, setLogoImage] = useState(Image);
  const [backgroundColor, setBackgroundColor] = useState(
    JSON.parse(localStorage.getItem("recentColors")) &&
      JSON.parse(localStorage.getItem("recentColors")).length > 0
      ? JSON.parse(localStorage.getItem("recentColors"))[0]
      : "#0369A1"
  );
  const [recentColors, setRecentColors] = useState(
    JSON.parse(localStorage.getItem("recentColors")) ?? []
  );
  const canvasRef = useRef(null);
  const [openColorPicker, setOpenColorPicker] = useState(false);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const content = reader.result;
        setMaskImage(content);
      };
      reader.readAsDataURL(file);

      reader.onerror = (error) => {
        console.error("Error", error);
      };
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const content = reader.result;
        setLogoImage(content); // Update the logo image state
      };
      reader.readAsDataURL(file);

      reader.onerror = (error) => {
        console.error("Error", error);
      };
    }
  };

  const handleButtonClick = () => {
    setOpenColorPicker(!openColorPicker); // Toggle the visibility of the color picker
  };

  const handleColorChange = (color) => {
    setBackgroundColor(color.hex);
    if (!recentColors.includes(color.hex)) {
      setRecentColors((prevColors) => [color.hex, ...prevColors.slice(0, 4)]);
    }
    setOpenColorPicker(false); // Hide the color picker after selecting a color
  };

  const handleDownloadClick = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.download = "canvas_image.png";
      link.href = canvas.toDataURL("image/png");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      console.error("Canvas element not found.");
    }
  };

  useEffect(() => {
    localStorage.setItem("recentColors", JSON.stringify(recentColors));
  }, [recentColors]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-evenly gap-10 p-6 md:p-16">
        <div className="w-full flex justify-center">
          <CanvasView
            ref={canvasRef}
            captionText={captionText}
            ctaText={ctaText}
            maskImage={maskImage}
            logoImage={logoImage}
            backgroundColor={backgroundColor}
            handleDownloadClick={handleDownloadClick}
          />
        </div>
        <div className="w-full flex flex-col">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              Ad Customization
            </h3>
            <span className="text-sm text-gray-600">
              Customize your canvas and get the output accordingly
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <div id="fileUpload">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Select Image" />
              </div>
              <FileInput id="file" sizing="sm" onChange={handleImgChange} />
            </div>
            <div id="fileUpload">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Select Logo" />
              </div>
              <FileInput id="file" sizing="sm" onChange={handleLogoChange} />
            </div>
            <div className="text-xs text-gray-600 flex items-center justify-center gap-2">
              <span className="bg-gray-600 w-[50%] h-0.5 rounded-full"></span>
              <span className="w-[40%] flex justify-center">Edit Contents</span>
              <span className="bg-gray-600 w-[50%] h-0.5 rounded-full"></span>
            </div>

            <div>
              <div className="mb-2 block">
                <Label value="AD Content" />
              </div>
              <TextInput
                id="small"
                type="text"
                sizing="sm"
                placeholder="Enter your caption text.."
                icon={TbTextCaption}
                defaultValue={captionText}
                onChange={(e) => setCaptionText(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label value="CTA Text" />
              </div>
              <TextInput
                id="small"
                type="text"
                sizing="sm"
                placeholder="Enter your cta text.."
                icon={HiOutlineRectangleGroup}
                defaultValue={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center">
            {recentColors.map((color, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: color,
                }}
                className="w-[30px] h-[30px] m-1 cursor-pointer rounded-full"
                onClick={() => setBackgroundColor(color)}
              />
            ))}
            <div className="flex flex-wrap gap-2 mb-4 mt-4">
              <Button
                outline
                gradientDuoTone="purpleToBlue"
                onClick={handleButtonClick}
              >
                <TbPlus className="text-base" />
              </Button>
            </div>
          </div>
          {openColorPicker && (
            <SketchPicker
              color={backgroundColor}
              onChange={handleColorChange}
              disableAlpha={true}
            />
          )}
        </div>
      </div>
      <div>
        <Button
          outline
          gradientDuoTone="purpleToBlue"
          onClick={handleDownloadClick}
          className="mx-auto my-10"
        >
          Download
        </Button>
      </div>
    </>
  );
};

export default Home;
