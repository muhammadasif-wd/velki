import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="absolute top-[45%] right-[45%]">
      <svg className="loader" viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};

export default Loader;
