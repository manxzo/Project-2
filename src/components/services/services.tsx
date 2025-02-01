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
    Object.entries(params).filter(
      ([key, value]) =>
        value !== "" && value !== 0 && value !== null && value[0] !== false
    )
  );

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

import axios from "axios";

export const fetchAiResponse = async (job,resume,deepseekApiKey) => {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "deepseek/deepseek-r1:free",
      messages: [
        {
          role: "user",
          content: `You are an expert in Applicant Tracking Systems (ATS) and resume optimization. 
          Your task is to rewrite and enhance a resume to increase its chances of passing ATS filters by incorporating relevant keywords, skills, and formatting best practices.
          ### Instructions:
          - Extract important skills, technologies, and keywords from the job posting.
          - Naturally integrate these keywords into the resume without keyword stuffing.
          - Ensure the resume follows ATS-friendly formatting (no tables, images, or fancy formatting).
          - Use action verbs and quantify achievements where possible.
          - Improve job titles, descriptions, and bullet points to align with the job posting.

          ### Job Posting:
          ${job}

          ### Candidate Resume:
          ${resume}

          ### Output Format:
          1. **Optimized Resume:** (Plain text, ready for ATS submission)
          2. **List of Added/Improved ATS Keywords**`,
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${deepseekApiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};
