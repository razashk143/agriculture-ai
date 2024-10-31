import React from "react";
import { HashLink as Link } from "react-router-hash-link";

import "./hero.css";
const Hero = () => {
  return (
    <div className="hero-container section">
      <div className="title-container">
        <h1 className="title"> AIRRIGATE - ONE STOP SOLUTION</h1>{" "}
      </div>
      <div className="image-container">
        <img src={require("../../assets/images/hero.jpg")} alt="hero" />
        <div className="img-content">
          <div className="options">
            <div className="option">🟠 Crop Selection Optimization Model</div>
            <div className="option">🟢 Crop Fertilizer Advisory Tool </div>
            <div className="option">🔵 Crop Yield Forecasting System</div>
            <div className="option">
              🟡 Computer Vision-based Plant Disease Diagnosis Framework{" "}
            </div>
            <div className="option">🔴 Agri-Advisor (AI-Chatbot)</div>
          </div>
          <Link to="#service" className="hero-button">
            Explore
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
