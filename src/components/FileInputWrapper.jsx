import { FileInput, Label } from "flowbite-react";

const FileInputWrapper = ({ label, onChange }) => (
    <div id="fileUpload">
      <div className="mb-2 block">
        <Label htmlFor="file" value={label} />
      </div>
      <FileInput id="file" sizing="sm" onChange={onChange} />
    </div>
  );

  export default FileInputWrapper;