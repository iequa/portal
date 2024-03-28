import React, { useEffect, useState } from "react";

const InputNumber = ({ value, onChange }) => {
  const [currValue, setValue] = useState(0);

  useEffect(() => {
    setValue(value);
  }, [value]);

  return (
    <input
      type="number"
      className="input-comp-num"
      value={currValue ?? 0}
      onChange={onChange}
      onInput={(e) => setValue(Number(e.target.value))}
    />
  );
};

export default InputNumber;
