import { useState } from "react";

const AppSettings = (props) => {
  const [config, setConfig] = useState({
    ipInfoApi: props.apiKeys.ipInfoApi,
    deepSeekApi: props.apiKeys.deepSeekApi,
    adzunaApiId: props.apiKeys.adzunaApiId,
    adzunaApiKey: props.apiKeys.adzunaApiKey,
    country: props.country,
  });

  const handleInputChange = (event) => {
    setConfig((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.setCountry(config.country);
    props.setApiKeys({
      ipInfoApi: config.ipInfoApi,
      deepSeekApi: config.deepSeekApi,
      adzunaApiId: config.adzunaApiId,
      adzunaApiKey: config.adzunaApiKey,
    });
  };

  const findDefaultKeys = (event) => {
    event.preventDefault();
    setConfig(prev => ({
      ...prev,
      ...Object.fromEntries(
        Object.entries(props.defaultKeys).map(([key, value]) => [
          key, 
          value || "KEY NOT FOUND"
        ])
      )
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="country">Select Country</label>
      <select
        name="country"
        id="country"
        value={config.country}
        onChange={handleInputChange}
      >
        {props.countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      
      <div>
        <ul>
          {Object.entries(config).map(([key, value]) => {
            if (key === "country") return null;
            return (
              <li key={key}>
                <label htmlFor={key}>{key}:</label>
                <input
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleInputChange}
                />
              </li>
            );
          })}
        </ul>
        
        <button onClick={findDefaultKeys} type="button">
          Use Default Keys (if available)
        </button>
      </div>
      
      <button type="submit">Confirm</button>
    </form>
  );
};

export default AppSettings;