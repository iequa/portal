import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    document.title = "About";
  }, []);
  return (
    <div>
      <label>ABOUT WHAT?</label>
    </div>
  );
};

export default About;
