import React, { useState } from "react";
import { TbPlus, TbTextCaption } from "react-icons/tb";
import { HiOutlineRectangleGroup } from "react-icons/hi2";
import { Button, FileInput, Label, TextInput } from "flowbite-react";
import { data } from "../assets/data";

import cake from "../assets/Cake.jpg";
import { ChromePicker } from "react-color";

const Home = () => {
  const [captionText, setCaptionText] = useState(data.caption.text);
  const [ctaText, setCtaText] = useState(data.cta.text);
//   const [maskImage, setMaskImage] = useState(cake);
  const [backgroundColor, setBackgroundColor] = useState("#0369A1");



  return (
    <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-24 p-8 md:p-24">
      <div className="w-full md:w-1/2">Hello Canvas</div>
      <div className="w-full md:w-1/2">
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            Ad Customization
          </h3>
          <span className="text-sm text-gray-600">
            Customize your canvas and get the output accordingly
          </span>
        </div>
        <div className="flex max-w-md flex-col gap-4">
          <div id="fileUpload" className="max-w-md">
            <div className="mb-2 block">
              <Label htmlFor="file" value="Select Image" />
            </div>
            <FileInput
              id="file"
              sizing="sm"
              //   onChange={handleFileChange}
            />
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
              //   onChange={handleCaptionTextChange}
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
              //   onChange={handleCtaTextChange}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4 mt-4">
          <Button outline gradientDuoTone="purpleToBlue">
            <TbPlus className="text-base" />
          </Button>
        </div>
        <ChromePicker
          color={backgroundColor}
        //   onChange={handleColorChange}
          disableAlpha={true}
        />
      </div>
    </div>
  );
};

export default Home;
