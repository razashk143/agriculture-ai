import React from "react";
import Service from "./ServiceSection";
import img1 from "../../assets/images/services/1.svg";
import img2 from "../../assets/images/services/2.svg";
import img3 from "../../assets/images/services/3.svg";
import img4 from "../../assets/images/services/4.svg";
import img5 from "../../assets/images/services/5.svg";

const Index = () => {
  const data = [
    {
      title: "Crop Recomendation",
      text: "This model helps farmers choose the best crops for their land by considering factors like weather, soil and environment. It gives suggestions on which crops will do well in a specific area. This model uses data on local weather and soil, as well as machine learning techniques to give the most accurate suggestions.",
      color: "var(--green)",
      direction: "row",
      img: img1,
      buttonText: "Predict Now",
      link: "/crop",
    },
    {
      title: "Fertilizer Recomendation",
      text: "This fertilizer recommendation system utilizes Moisture, Humidity, Temperature, Soil Type, Nitrogen, Potassium and Phrosphorous values and suggests the optimal fertilizer for optimal growth and yield.",
      color: "var(--orange)",
      direction: "row-reverse",
      img: img2,
      buttonText: "Predict Now",
      link: "/fertilizer",
    },
    {
      title: "Yield Prediction",
      text: "This model helps farmers predict how much their crops will yield by using information about the weather, soil, area and other such various factors. It can help farmers make better decisions about how much yield would be gained and thus increase profit and productivity. The model is made by using historical data and machine learning techniques.",
      color: "var(--light-yellow)",
      direction: "row",
      img: img3,
      buttonText: "Predict Now",
      link: "/yeild",
    },
    {
      title: "Disease Detection",
      text: "This model uses computer vision technology to detect different plant diseases by analyzing images of crops. It helps farmers identify problems early on and take necessary actions to treat it, which in turn reduces crop loss and improves overall yields. The model is trained on a dataset of images of diseased and healthy plants, and can then be applied to new images to make predictions.",
      color: "#E38B0E",
      direction: "row-reverse",
      img: img4,
      buttonText: "Detect Now",
      link: "/disease",
    },
    {
      title: "AgriBot",
      text: "This is an AI-based chatbot that offers expert advice and answers farmers' questions on crop management. It can provide farmers with information on topics such as planting and harvesting schedules, pest control, and other important aspects of crop management. This is a web-based chatbot (Chat GPT) and voicebot that farmers can access through the provided tool and get advised from the same.",
      color: "#24D275",
      direction: "row",
      img: img5,
      buttonText: "Chat Now",
    },
  ];
  return (
    <div id="service">
      {data.map((i, key) => (
        <Service
          key={key}
          color={i.color}
          direction={i.direction}
          title={i.title}
          text={i.text}
          img={i.img}
          buttonText={i.buttonText}
          link={i.link}
        />
      ))}
    </div>
  );
};

export default Index;
