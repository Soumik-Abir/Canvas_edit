import { Button } from "flowbite-react";
import { TbPlus } from "react-icons/tb";
import ColorPicker from "./ColorPicker";

const ColorPickerSection = ({
  recentColors,
  onButtonClick,
  onColorChange,
  openColorPicker,
  backgroundColor,
}) => (
  <div className="relative">
    <div className="flex items-center">
      {recentColors.map((color, index) => (
        <div
          key={index}
          style={{
            backgroundColor: color,
          }}
          className="w-[30px] h-[30px] m-1 cursor-pointer rounded-full"
          onClick={() => onColorChange({ hex: color })}
        />
      ))}
      <div className="flex flex-wrap gap-2 mb-4 mt-4">
        <Button
          pill
          color="light"
          onClick={onButtonClick}
          className="w-[36px] h-[36px]"
        >
          <TbPlus className="text-base" />
        </Button>
      </div>
    </div>
    {openColorPicker && (
      <div className="absolute">
        <ColorPicker
          color={backgroundColor}
          onChange={onColorChange}
          open={openColorPicker}
          disableAlpha={true}
        />
      </div>
    )}
  </div>
);

export default ColorPickerSection;
