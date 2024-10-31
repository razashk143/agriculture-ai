import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import CropPred from "./components/Pages/Crop";
import FertilizerSug from "./components/Pages/Fertilizer";
import YieldPred from "./components/Pages/Yield";
import DiseaseDetect from "./components/Pages/Disease";
import NavBar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
// import Chat from "./components/Chat/Chat";
import React, { useEffect } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
// import chatIcon from "./assets/images/chat.png";
import "react-chat-widget/lib/styles.css";
import axios from "axios";
import baseUrl from "./baseUrl";
function App() {
  useEffect(() => {
    addResponseMessage("Welcome to this Go on and ask a question!");
  }, []);
  const handleNewUserMessage = (newMessage) => {
    // console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    const formdata = new FormData();
    formdata.append("prompt", newMessage);
    axios
      .post(`${baseUrl()}/chat`, formdata)
      .then((response) => {
        // console.log(response.data.response);
        addResponseMessage(response.data.response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <BrowserRouter>
      <NavBar />
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        title="AIRRIGATE"
        subtitle="Resolve all your doubts here"
      />

      {/* <Chat /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/crop" component={CropPred} />
        <Route exact path="/fertilizer" component={FertilizerSug} />
        <Route exact path="/disease" component={DiseaseDetect} />
        <Route exact path="/yield" component={YieldPred} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
