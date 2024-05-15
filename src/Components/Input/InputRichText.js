import React, { useEffect, useState } from "react";

const InputRichText = ({ id, value, onChange, editor }) => {
  const [currValue, setValue] = useState("");

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <textarea
      id={id} 
      className={editor ? "input-comp-str " + editor : "input-comp-str"}
      value={currValue ?? ""}
      onChange={(e) => onChange(e)}
      onInput={(e) => setValue(e.target.value)}
    />
  );
};

export default InputRichText;