import React from "react";
import "./service.css";
import { Link } from "react-router-dom";

const Service = ({ color, direction, title, text, img, buttonText, link }) => {
  return (
    <div
      className="service-container container"
      style={{ flexDirection: direction }}
    >
      <div className="explanation">
        <h4 className="title" style={{ backgroundColor: color }}>
          {title}
        </h4>
        <p className="text">{text}</p>
        <Link to={link}>
          <button className="call-button" style={{ backgroundColor: color }}>
            {buttonText}
          </button>
        </Link>
      </div>
      <div className="illustration">
        <img src={img} alt="crop" />
      </div>
    </div>
  );
};

export default Service;
