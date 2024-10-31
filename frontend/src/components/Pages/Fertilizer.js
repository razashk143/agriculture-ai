import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pagestyle.css";
import baseUrl from "../../baseUrl";

const crops = {
  Maize: 0,
  Sugarcane: 1,
  Cotton: 2,
  Tobacco: 3,
  Paddy: 4,
  Barley: 5,
  Wheat: 6,
  Millets: 7,
  "Oil seeds": 8,
  Pulses: 9,
  "Ground Nuts": 10,
};

const soils = {
  Sandy: 0,
  Loamy: 0,
  Black: 2,
  Red: 3,
  Clayey: 4,
};

const FertilizerSuggestion = () => {
  const [values, setValues] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    soil_type: "0",
    crop_type: "0",
    humidity: "",
    moisture: "",
  });
  const [result, setResult] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const { N, P, K, temperature, moisture, humidity, crop_type, soil_type } =
    values;

  // const FertilizerPat = (props) => {
  //   return (
  //     <div className="input-container">
  //       <div>
  //         <label>{props.Mname}</label>
  //       </div>
  //       <div className="col-auto">
  //         <input
  //           type="number"
  //           className="form-control"
  //           name={props.fname}
  //           placeholder="Enter Value"
  //           value={props.value}
  //           onChange={props.onChange}
  //         />
  //       </div>
  //     </div>
  //   );
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setResult(false);

      // console.log("Under Try");
      const formdata = new FormData();
      formdata.append("N", N);
      formdata.append("P", P);
      formdata.append("K", K);
      formdata.append("temperature", temperature);
      formdata.append("soil_type", soil_type);
      formdata.append("crop_type", crop_type);
      formdata.append("humidity", humidity);
      formdata.append("moisture", moisture);
      axios
        .post(`${baseUrl()}/recomend-fertilizer`, formdata)
        .then((response) => {
          // console.log("Under Response");
          // console.log("Fertilizer User ==> ", response);
          setResult(response.data);
          document
            .querySelector("#result")
            .scrollIntoView({ behavior: "smooth", block: "start" });
          // console.log("Success");
        });
    } catch (err) {
      // console.log("Fertilizer post error ", err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="page-container section">
      <div className="title-container">
        <h1 className="title">Fertilizer Suggestion</h1>{" "}
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <div>
              <label>Nitrogen</label>
            </div>
            <div>
              <input
                type="number"
                className="form-control"
                name={"N"}
                placeholder="Enter Value"
                value={N}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-container">
            <div>
              <label> Phosphorous</label>
            </div>
            <div>
              <input
                type="number"
                className="form-control"
                name={"P"}
                placeholder="Enter Value"
                value={P}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-container">
            <div>
              <label>Potassium</label>
            </div>
            <div>
              <input
                type="number"
                className="form-control"
                name="K"
                placeholder="Enter Value"
                value={K}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-container">
            <div>
              <label>Temperature</label>
            </div>
            <div>
              <input
                type="number"
                className="form-control"
                name="temperature"
                placeholder="Enter Value"
                value={temperature}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-container">
            <div>
              <label>Humidity</label>
            </div>
            <div>
              <input
                type="number"
                className="form-control"
                name={"humidity"}
                placeholder="Enter Value"
                value={humidity}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="input-container">
            <div>
              <label>Moisture</label>
            </div>
            <div>
              <input
                type="number"
                className="form-control"
                name={"moisture"}
                placeholder="Enter Value"
                value={moisture}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="input-container">
            <div>
              <label>Crop Type</label>
            </div>
            <div className="col-auto">
              <select
                name="crop_type"
                className="form-control"
                value={crop_type}
                onChange={handleChange}
              >
                {Object.entries(crops).map((key) => (
                  <option key={key} value={key[1]}>
                    {key[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="input-container">
            <div>
              <label>Soil Type</label>
            </div>
            <div className="col-auto">
              <select
                name="soil_type"
                className="form-control"
                value={soil_type}
                onChange={handleChange}
              >
                {Object.entries(soils).map((key) => (
                  <option className="items" key={key} value={key[1]}>
                    {key[0]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={
              !N ||
              !P ||
              !K ||
              !temperature ||
              !soil_type ||
              !crop_type ||
              !humidity ||
              !moisture
            }
          >
            Submit
          </button>
        </form>
      </div>
      {result && (
        <div className="result" id="result">
          <h1>
            The Best Fertilizer for your particular Crop and Weather condition
            is <span>{result}</span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default FertilizerSuggestion;
