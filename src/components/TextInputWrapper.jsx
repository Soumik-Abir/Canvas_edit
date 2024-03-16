import { Label, TextInput } from "flowbite-react";

const TextInputWrapper = ({ label, icon, defaultValue, onChange }) => (
    <div>
      <div className="mb-2 block">
        <Label value={label} />
      </div>
      <TextInput
        id="small"
        type="text"
        sizing="sm"
        placeholder={`Enter your ${label.toLowerCase()}..`}
        icon={icon}
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );

  export default TextInputWrapper;