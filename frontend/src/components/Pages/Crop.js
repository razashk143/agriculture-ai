import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pagestyle.css";
import baseUrl from "../../baseUrl";

const CropPred = () => {
  const [values, setValues] = useState({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });
  const [result, setResult] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const { N, P, K, temperature, humidity, ph, rainfall } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(false);

    try {
      // console.log("Under Try");
      const formdata = new FormData();
      formdata.append("N", N);
      formdata.append("P", P);
      formdata.append("K", K);
      formdata.append("temperature", temperature);
      formdata.append("humidity", humidity);
      formdata.append("ph", ph);
      formdata.append("rainfall", rainfall);
      axios
        .post(`${baseUrl()}/recomend-crop`, formdata)
        .then((response) => {
          // console.log("Crop User ==> ", response.data);
          setResult(response.data);
          setTimeout(() => {
            document
              .querySelector("#result")
              .scrollIntoView({ behavior: "smooth", block: "start" });
          }, 500);
        });
    } catch (err) {
      // console.log("Crop Post Err ", err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  // const CropPat = (props) => {
  //   return (
  //     <div className="input-container">
  //       <div>
  //         <label>{props.Mname}</label>
  //       </div>
  //       <div>
  //         <input
  //           type="number"
  //           className="form-control"
  //           name={props.fname}
  //           placeholder="Enter Value"
  //           value={props.value}
  //           onChange={handleChange}
  //         />
  //       </div>
  //     </div>
  //   );
  // };

  return (
    <div className="page-container section">
      <div className="title-container">
        <h1 className="title"> Crop Recomendation</h1>{" "}
      </div>

      <div className="form-container">
        {/* <form onSubmit={handleSubmit}>
          <CropPat
            onSubmit={handleSubmit}
            Mname="Nitrogen"
            fname="N"
            value={N}
          />
          <CropPat
            onSubmit={handleSubmit}
            Mname="Potassium"
            fname="P"
            value={P}
          />
          <CropPat
            onSubmit={handleSubmit}
            Mname="Phosphorous"
            fname="K"
            value={K}
          />
          <CropPat
            onSubmit={handleSubmit}
            Mname="Temperature"
            fname="temperature"
            value={temperature}
          />
          <CropPat
            onSubmit={handleSubmit}
            Mname="Humidity"
            fname="humidity"
            value={humidity}
          />
          <CropPat onSubmit={handleSubmit} Mname="PH" fname="ph" value={ph} />
          <CropPat
            onSubmit={handleSubmit}
            Mname="Rainfall"
            fname="rainfall"
            value={rainfall}
          />

          <button
            type="submit"
            className="submit-button"
            disabled={
              !N || !P || !K || !temperature || !ph || !rainfall || !humidity
            }
          >
            Submit
          </button>
        </form> */}

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
              <label>Potassium</label>
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
              <label>Phosphorous</label>
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
              <label>Rainfall (in mm)</label>
            </div>
            <div>
              <input
                type="number"
                className="form-control"
                name="rainfall"
                placeholder="Enter Value"
                value={rainfall}
                onChange={handleChange}
              />
            </div>
          </div>{" "}
          <div className="input-container">
            <div>
              <label>PH</label>
            </div>
            <div>
              <input
                type="number"
                className="form-control"
                name={"ph"}
                placeholder="Enter Value"
                value={ph}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="submit-button"
            disabled={
              !N || !P || !K || !temperature || !ph || !rainfall || !humidity
            }
          >
            Submit
          </button>
        </form>
      </div>
      {result && (
        <div className="result" id="result">
          <h1>
            The Best Crop to Grow considering your Weather and Soil condition is{" "}
            <span>{result}</span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default CropPred;
