import React, { useEffect, useState } from "react";

const InputString = ({ id, value, onChange }) => {
  const [currValue, setValue] = useState("");

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <input
      id={id} 
      className="input-comp-str"
      value={currValue ?? ""}
      onChange={(e) => onChange(e)}
      onInput={(e) => setValue(e.target.value)}
    />
  );
};

export default InputString;