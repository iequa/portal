import React, { useEffect, useState } from "react";

const InputString = ({ id, value, onChange, editor, maxLength }) => {
  const [currValue, setValue] = useState("");

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <input
      id={id}
      className={editor ? "input-comp-str " + editor : "input-comp-str"}
      value={currValue ?? ""}
      onChange={(e) => onChange(e)}
      onInput={(e) => setValue(e.target.value)}
      maxLength={maxLength}
    />
  );
};

export default InputString;