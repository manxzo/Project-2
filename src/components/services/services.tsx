// @ts-nocheck
import axios from "axios";
import qs from "qs";
const AdzunaURL = "https://api.adzuna.com/v1/api/jobs";

export const fetchCategories = async (country, adzunaApiId, adzunaApiKey) => {
  const url = `${AdzunaURL}/${country}/categories`;
  const response = await axios.get(url, {
    params: {
      app_id: adzunaApiId,
      app_key: adzunaApiKey,
    },
  });
  return response.data;
};

export const fetchSearchResults = async (
  params,
  country,
  page,
  adzunaApiId,
  adzunaApiKey
) => {
  const url = `${AdzunaURL}/${country}/search/${page}`;
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([key , value]) => value !== "" && value !== 0 && value !== null && value[0] !== false));
  

  const response = await axios.get(url, {
    params: {
      ...filteredParams,
      app_id: adzunaApiId,
      app_key: adzunaApiKey,
    },
    paramsSerializer: (params) =>
      qs.stringify(params, { arrayFormat: "repeat" }),
  });

  return response.data;
};

