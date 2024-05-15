import React, { useEffect } from "react";

const Stats = () => {
  useEffect(() => {
    document.title = "Stats";
  }, []);
  return (
    <div>
      <label>STAATS?</label>
    </div>
  );
};

export default Stats;
