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
      ([_, value]) =>
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

export const fetchAiResponse = async (job, resume, deepseekApiKey) => {
  const response = await axios.post(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      model: "google/gemini-pro",
      messages: [
        {
          role: "user",
          content: `You are an **expert in Applicant Tracking Systems (ATS) and resume optimization**. 
Your role is to **rewrite and enhance resumes** to increase their chances of passing ATS filters by integrating relevant keywords, skills, and formatting best practices.

---

### **Instructions:**

1. **Job Posting Extraction & Analysis:**
   - If a **job posting URL** is provided, extract **all relevant job details** from the page.  
   - Identify key **skills, technologies, and important keywords** required for the job.  
   - If the job link is inaccessible, rely on the provided job description.

2. **Resume Optimization:**
   - Naturally integrate **essential keywords & skills** from the job posting into the resume **without keyword stuffing**.
   - Improve **job titles, descriptions, and bullet points** to better align with the job posting.
   - Use **action verbs** and quantify achievements where possible.
   - Ensure **ATS-friendly formatting** (no tables, images, columns, or special formatting).
   - Rewrite the resume to **emphasize relevant experiences** and make it **more compelling**.

---

### **Input Data:**
#### **Job Posting:**
${JSON.stringify(job)}

#### **Job URL:** 
${job.link}

#### **Candidate Resume:**
${resume}

---

### **Output Format:**
1. **Optimized Resume** (Plain text, ready for ATS submission).
2. **List of Added & Improved ATS Keywords**.
3. **Full Job Info Extracted from the Provided Link** (if available).
`,
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

export const fetchAirtableData = async (
  airtableBase,
  airtableLabel,
  airtableApiKey
) => {
  try {
    const url = `https://api.airtable.com/v0/${airtableBase}/${airtableLabel}`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${airtableApiKey}` },
    });

    return response.data.records
      .filter((record) => record.fields && record.id)
      .map((record) => ({
        ...record.fields,
        id: record.fields?.id,
        recordId: record.id,
      }));
  } catch (error) {
    console.error(`Airtable fetch error (${airtableLabel}):`, error.message);
    throw new Error(`Failed to fetch ${airtableLabel} data`);
  }
};

export const postDataToAirtable = async (
  airtableBase,
  airtableLabel,
  airtableApiKey,
  newRecord
) => {
  const url = `https://api.airtable.com/v0/${airtableBase}/${airtableLabel}`;
  const response = await axios.post(
    url,
    { records: [{ fields: newRecord }] },
    {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.records[0].id;
};

export const editDataInAirtable = async (
  airtableBase,
  airtableLabel,
  airtableApiKey,
  recordId,
  updatedFields
) => {
  const url = `https://api.airtable.com/v0/${airtableBase}/${airtableLabel}/${recordId}`;
  const response = await axios.patch(
    url,
    { fields: updatedFields },
    {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const deleteDataFromAirtable = async (
  airtableBase,
  airtableLabel,
  airtableApiKey,
  recordId
) => {
  const url = `https://api.airtable.com/v0/${airtableBase}/${airtableLabel}/${recordId}`;
  const response = await axios.delete(url, {
    headers: { Authorization: `Bearer ${airtableApiKey}` },
  });
  return response.data;
};
