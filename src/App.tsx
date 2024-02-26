import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [textPrice, setTextPrice] = useState("");
  const [disclaimer, setDisclaimer] = useState("");

  const endpoint = "https://api.coindesk.com/v1/bpi/currentprice.json";

  async function getPrice() {
    try {
      // using axios
      const response = await axios.get(endpoint);
      const data = await response.data;

      // using vanilla js and fetch api
      // const response = await fetch(endpoint);
      // const data = await response.json();
      
      setTextPrice(data.bpi.USD.rate);
      setDisclaimer(data.disclaimer)
    } catch {
      throw new Error();
    } finally {
      console.log("Request completed");
    }
  }

  useEffect(() => {
    getPrice();

    const intervalId = setInterval(() => {
      getPrice();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="main-container">
      <div className="header"><h1>BITCOIN CURRENT PRICE</h1></div>
      <div className="btc-price"><p>Bitcoin Price: <span>${textPrice}</span></p></div>
      <div className="footer">{disclaimer}</div>
    </div>
  );
}

export default App;
