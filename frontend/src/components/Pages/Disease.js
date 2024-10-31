import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pagestyle.css";
import baseUrl from "../../baseUrl";
const DiseaseDetect = () => {
  const [image, setImage] = useState(null);

  const [name, setName] = useState(false);
  const [disease, setDisease] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    try {
      await axios
        .post(`${baseUrl()}/detect-disease`, formData)
        .then((response) => {
          // console.log("Image User ==> ", response);
          // console.log(response);
          setName(response.data.split("---")[0]);
          setDisease(response.data.split("---")[1]);
          document
            .querySelector("#result")
            .scrollIntoView({ behavior: "smooth", block: "start" });
        });
    } catch (err) {
      // console.log("Image Post Error ", err);
    }
  };

  return (
    <div className="img-upload disease-container section">
      <div className="title-container">
        <h1 className="title">Disease Detection</h1>{" "}
      </div>
      <div className="input-container-disease ">
        <label for="images" class="drop-container">
          <span class="drop-title">Drop files here</span>
          or
          <input
            type="file"
            id="images"
            accept="image/*"
            required
            onChange={handleImageChange}
            onClick={() => {
              setName(false);
              setImage(null);
            }}
          />
        </label>
        {/* {image && <img className="img-preview" src={URL.createObjectURL(image)} alt="img" />} */}
        <button
          className="submit-button"
          disabled={!image}
          onClick={handleUpload}
        >
          Upload Image
        </button>
      </div>
      {name && (
        <div className="result" id="result">
          {disease.includes("healthy") ? (
            <h1>
              Good News! Your Plant <span>{name}</span> is <span>Healthy</span>
            </h1>
          ) : (
            <h1>
              Your <span>{name}</span> Plant has a disease named{" "}
              <span>{disease}</span>
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default DiseaseDetect;
