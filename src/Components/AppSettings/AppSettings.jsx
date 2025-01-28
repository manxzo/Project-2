import { useState } from "react";

const AppSettings = (props) => {
  const [config, setConfig] = useState({
    ipInfoApi: props.apiKeys.ipInfoApi,
    deepSeekApi: props.apiKeys.deepSeekApi,
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
    });
  };
  const findDefaultKeys = (event) => {
    event.preventDefault();
    for (const [key, value] of Object.entries(props.defaultKeys)) {
      if (value) {
        setConfig((prev) => ({ ...prev, [key]: value }));
      } else {
        setConfig((prev) => ({ ...prev, [key]: "KEY NOT FOUND" }));
      }
    }
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
        <label htmlFor="ipInfoApi">IP Info Key:</label>
        <input
          id="ipInfoApi"
          name="ipInfoApi"
          value={config.ipInfoApi}
          onChange={handleInputChange}
        ></input>
        <label htmlFor="deepSeekApi">Deepseek AI API Key:</label>
        <input
          id="deepSeekApi"
          name="deepSeekApi"
          value={config.deepSeekApi}
          onChange={handleInputChange}
        ></input>
        <button onClick={findDefaultKeys}>
          Use Default Keys(if available)
        </button>
      </div>
      <button type="submit">Confirm</button>
    </form>
  );
};
export default AppSettings;
