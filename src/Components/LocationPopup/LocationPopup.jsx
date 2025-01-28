import { useEffect, useState } from "react";

const LocationPopup = (props) => {
  const countries = props.countries;

  const countryCodes = countries.map((country) => country.code);
  const [selectedCountry, setSelectedCountry] = useState("");

  const [message, setMessage] = useState("");
  const token = import.meta.env.VITE_APP_IPINFO_TOKEN
    ? import.meta.env.VITE_APP_IPINFO_TOKEN
    : props.apiKey;

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await fetch(`https://ipinfo.io/json?token=${token}`);
        if (!response.ok)
          throw new Error(`Location detection failed (${response.status})`);

        const data = await response.json();
        const countryCode = data.country.toLowerCase();

        if (countryCodes.includes(countryCode)) {
          setSelectedCountry(countryCode);
          setMessage(`Auto-Detected Country:${countryCode.toUpperCase()}`);
        } else {
          setSelectedCountry("sg");
          setMessage(
            `Country not supported:${countryCode.toUpperCase()} - Default set to: SG`
          );
        }
      } catch (error) {
        console.error("Geolocation fetch failed:", error);
        setMessage("Could not detect your location. Please select manually.");
        setSelectedCountry("sg");
      }
    };

    getCountry();
  }, []);

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setMessage("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.setCountry(selectedCountry);
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && <h3>{message}</h3>}
      <label htmlFor="country">Select Country:</label>
      <select id="country" name="country" value={selectedCountry} onChange={handleCountryChange}>
        <option value="">Select your country</option>
        {countries.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>

      <div>
        <h4>Selected Country:{selectedCountry.toUpperCase()}</h4>
      </div>
      <button type="submit">Confirm Country</button>
    </form>
  );
};

export default LocationPopup;
