import React, { useEffect, useState } from "react";
import axios from "axios";
import "./pagestyle.css";
import baseUrl from "../../baseUrl";

const items = {
  Albania: 0,
  Algeria: 1,
  Angola: 2,
  Argentina: 3,
  Armenia: 4,
  Australia: 5,
  Austria: 6,
  Azerbaijan: 7,
  Bahamas: 8,
  Bahrain: 9,
  Bangladesh: 10,
  Belarus: 11,
  Belgium: 12,
  Botswana: 13,
  Brazil: 14,
  Bulgaria: 15,
  "Burkina Faso": 16,
  Burundi: 17,
  Cameroon: 18,
  Canada: 19,
  "Central African Republic": 20,
  Chile: 21,
  Colombia: 22,
  Croatia: 23,
  Denmark: 24,
  "Dominican Republic": 25,
  Ecuador: 26,
  Egypt: 27,
  "El Salvador": 28,
  Eritrea: 29,
  Estonia: 30,
  Finland: 31,
  France: 32,
  Germany: 33,
  Ghana: 34,
  Greece: 35,
  Guatemala: 36,
  Guinea: 37,
  Guyana: 38,
  Haiti: 39,
  Honduras: 40,
  Hungary: 41,
  India: 42,
  Indonesia: 43,
  Iraq: 44,
  Ireland: 45,
  Italy: 46,
  Jamaica: 47,
  Japan: 48,
  Kazakhstan: 49,
  Kenya: 50,
  Latvia: 51,
  Lebanon: 52,
  Lesotho: 53,
  Libya: 54,
  Lithuania: 55,
  Madagascar: 56,
  Malawi: 57,
  Malaysia: 58,
  Mali: 59,
  Mauritania: 60,
  Mauritius: 61,
  Mexico: 62,
  Montenegro: 63,
  Morocco: 64,
  Mozambique: 65,
  Namibia: 66,
  Nepal: 67,
  Netherlands: 68,
  "New Zealand": 69,
  Nicaragua: 70,
  Niger: 71,
  Norway: 72,
  Pakistan: 73,
  "Papua New Guinea": 74,
  Peru: 75,
  Poland: 76,
  Portugal: 77,
  Qatar: 78,
  Romania: 79,
  Rwanda: 80,
  "Saudi Arabia": 81,
  Senegal: 82,
  Slovenia: 83,
  "South Africa": 84,
  Spain: 85,
  "Sri Lanka": 86,
  Sudan: 87,
  Suriname: 88,
  Sweden: 89,
  Switzerland: 90,
  Tajikistan: 91,
  Thailand: 92,
  Tunisia: 93,
  Turkey: 94,
  Uganda: 95,
  Ukraine: 96,
  "United Kingdom": 97,
  Uruguay: 98,
  Zambia: 99,
  Zimbabwe: 100,
};

const crops = {
  rice: 0,
  maize: 1,
  chickpea: 2,
  kidneybeans: 3,
  pigeonpeas: 4,
  mothbeans: 5,
  mungbean: 6,
  blackgram: 7,
  lentil: 8,
  pomegranate: 9,
  banana: 10,
  mango: 11,
  grapes: 12,
  watermelon: 13,
  muskmelon: 14,
  apple: 15,
  orange: 16,
  papaya: 17,
  coconut: 18,
  cotton: 19,
  jute: 20,
  coffee: 21,
};

const YieldPred = () => {
  const [values, setValues] = useState({
    area: "0",
    item: "0",
    year: "",
    rainfall: "",
    pesticides: "",
    temperature: "",
  });
  const [result, setResult] = useState(false);
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [setValues]);
  const { area, item, year, rainfall, pesticides, temperature } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(false);
    try {
      // console.log("Under Try");
      const formdata = new FormData();
      formdata.append("area", area);
      formdata.append("item", item);
      formdata.append("year", year);
      formdata.append("pesticides", pesticides);
      formdata.append("temperature", temperature);
      formdata.append("rainfall", rainfall);
      axios
        .post(`${baseUrl()}/predict-yeild`, formdata)
        .then((response) => {
          // console.log("Under Response");
          // console.log("Yield User ==> ", response);
          setResult(response.data);
          document
            .querySelector("#result")
            .scrollIntoView({ behavior: "smooth", block: "start" });
          // console.log("Success");
        });
    } catch (err) {
      console.log("Yield Post Err ", err);
    }
  };

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="page-container yeild-container section">
      <div className="title-container">
        <h1 className="title"> Yield Prediction</h1>{" "}
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>Crop </label>
            <select
              name="item"
              className="form-control"
              value={item}
              onChange={onHandleChange}
            >
              {Object.entries(crops).map((key) => (
                <option key={key} value={key[1]}>
                  {key[0]}
                </option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <label>Area</label>
            <select
              name="area"
              value={area}
              className="form-control"
              onChange={onHandleChange}
            >
              {Object.entries(items).map((key) => (
                <option key={key} value={key[1]}>
                  {key[0]}
                </option>
              ))}
            </select>
          </div>
          <div className="input-container">
            <label>Year </label>
            <input
              className="form-control"
              type="number"
              placeholder="Enter value"
              name="year"
              value={year}
              onChange={onHandleChange}
            />
          </div>
          <div className="input-container">
            <label>Rainfall </label>
            <input
              className="form-control"
              type="number"
              placeholder="Enter value"
              name="rainfall"
              value={rainfall}
              onChange={onHandleChange}
            />
          </div>
          <div className="input-container">
            <label>Temperature </label>
            <input
              className="form-control"
              type="number"
              name="temperature"
              placeholder="Enter value"
              value={temperature}
              onChange={onHandleChange}
            />
          </div>
          <div className="input-container">
            <label>Pesticides </label>
            <input
              className="form-control"
              type="text"
              name="pesticides"
              value={pesticides}
              placeholder="Enter value"
              onChange={onHandleChange}
            />
          </div>

          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
      {result && (
        <div className="result" id="result">
          <h1>
            The expected Yeild considering your Crop, Area and Weather is{" "}
            <span>{result} hg/ha.</span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default YieldPred;
