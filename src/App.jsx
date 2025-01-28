import { useState, useEffect } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import LocationPopup from "./Components/LocationPopup/LocationPopup";
import AppSettings from "./Components/AppSettings/AppSettings";

function App() {
  const countries = [
    { code: "gb", name: "United Kingdom" },
    { code: "us", name: "United States" },
    { code: "at", name: "Austria" },
    { code: "au", name: "Australia" },
    { code: "be", name: "Belgium" },
    { code: "br", name: "Brazil" },
    { code: "ca", name: "Canada" },
    { code: "ch", name: "Switzerland" },
    { code: "de", name: "Germany" },
    { code: "es", name: "Spain" },
    { code: "fr", name: "France" },
    { code: "in", name: "India" },
    { code: "lt", name: "Lithuania" },
    { code: "mx", name: "Mexico" },
    { code: "nl", name: "Netherlands" },
    { code: "nz", name: "New Zealand" },
    { code: "pl", name: "Poland" },
    { code: "sg", name: "Singapore" },
    { code: "za", name: "South Africa" },
  ];
  const [country, setCountry] = useState("");
  const [apiKeys, setApiKeys] = useState({ ipInfoApi: "", deepSeekApi: "" });
  const defaultKeys = {ipInfoApi:import.meta.env.VITE_APP_IPINFO_TOKEN,deepSeekApi:import.meta.env.VITE_APP_DEEPSEEK_KEY};
  return (
    <>
      <Navbar country={country} />
      {/*<LocationPopup setCountry={setCountry} apiKey={apiKeys.ipInfoApi} countries={countries}/>*/}
      <div className="content-container">
        <Routes>
          <Route path="/home" element={<LocationPopup setCountry={setCountry} apiKey={apiKeys.ipInfoApi} countries={countries}/>}/>
          {/*<Route path='/home' element={<Home/>}/>
          <Route path='/search' element={<Search/>}/>*/}
          <Route
            path="/settings"
            element={
              <AppSettings
                apiKeys={apiKeys}
                setApiKeys={setApiKeys}
                countries={countries}
                country = {country}
                setCountry={setCountry}
                defaultKeys={defaultKeys}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
