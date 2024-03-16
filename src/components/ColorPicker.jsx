import React from "react";
import { SketchPicker } from "react-color";

const ColorPicker = ({ color, onChange, open }) => {
  return (
    <>
      {open && (
        <SketchPicker
          color={color}
          onChange={onChange}
          disableAlpha={true}
          className="mb-4"
        />
      )}
    </>
  );
};

export default ColorPicker;
