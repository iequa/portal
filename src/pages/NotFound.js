import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h1>Ooops.</h1>
      <h2>This uri does not exists.</h2>
      <Link to="/home">Home</Link>
      <p />
      <Link to="/about">About</Link>
      <p />
    </div>
  );
}

export default NotFound;
