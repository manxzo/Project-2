const obj = {
  created: "2022-09-13T03:21:39Z",
  contract_time: "full_time",
  location: {
    __CLASS__: "Adzuna::API::Response::Location",
    area: ["Singapore"],
    display_name: "Singapore",
  },
  adref:
    "eyJhbGciOiJIUzI1NiJ9.eyJpIjoiMzQ4MTA3ODM3NCIsInMiOiJlUGUteWtMaDd4R2VZZjZaMkhBLW9BIn0.gH35bHELi3GPWxeBSCtKTd-nf1Xj9DfAXYhQ4N6VMPk",
  category: {
    label: "Hospitality & Catering resumes",
    tag: "hospitality-catering-resumes",
    __CLASS__: "Adzuna::API::Response::Category",
  },
  description:
    "We’re looking for someone energetic, proactive and meticulous to ensure the smooth and efficient running of our delivery operations. If you love delighting customers, take complete ownership of your duties, and strive for excellence, we want to hear from you. You will: Pack, deliver, set up and tear down catering buffets/mini buffets in a timely and organised manner. Pack and deliver general meal box orders in a timely and organised manner. Achieve a high level of customer satisfaction and serv…",
  title: "Catering Specialist / Driver",
  redirect_url:
    "https://www.adzuna.sg/details/3481078374?utm_medium=api&utm_source=054e2057",
  __CLASS__: "Adzuna::API::Response::resume",
  company: {
    display_name: "Grain",
    __CLASS__: "Adzuna::API::Response::Company",
  },
  id: "3481078374",
  salary_is_predicted: "0",
};


const saveResume = (resume: Resume) => {
    setConfig((prev) => {
      const isAlreadySaved = prev.saved.resumes.some(
        (savedResume) => savedResume.id === resume.id
      );
  
      if (!isAlreadyFavorited) {
        return {
          ...prev,
          saved: {
            ...prev.saved,
            resumes: [...prev.saved.resumes, resume],
          },
        };
      }
      return prev;
    });
  };
  {
    "data": {
        "records": [
            {
                "id": "recPua40BFxTg1p42",
                "createdTime": "2025-02-02T17:31:58.000Z",
                "fields": {
                    "id": "3481078374",
                    "title": "Catering Specialist / Driver",
                    "description": "We’re looking for someone energetic, proactive and meticulous to ensure the smooth and efficient running of our delivery operations. If you love delighting customers, take complete ownership of your duties, and strive for excellence, we want to hear from you. You will: Pack, deliver, set up and tear down catering buffets/mini buffets in a timely and organised manner. Pack and deliver general meal box orders in a timely and organised manner. Achieve a high level of customer satisfaction and serv…",
                    "company": "Grain",
                    "location": "Singapore",
                    "date_posted": "2022-09-13T03:21:39Z"
                }
            }
        ]
    },
    "status": 200,
    "statusText": "",
    "headers": {
        "content-length": "493",
        "content-type": "application/json; charset=utf-8"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "adapter": [
            "xhr",
            "http",
            "fetch"
        ],
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "env": {},
        "headers": {
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "Authorization": "Bearer patKLKB5122AuU3sv.63059ccb20726e4338d9a8031daf28e7f14ddeb2a427711834b2bba9d941d40e"
        },
        "method": "post",
        "url": "https://thingproxy.freeboard.io/fetch/https://api.airtable.com/v0/appMqg7UiHbPo4w8g/Jobs",
        "data": "{\"records\":[{\"fields\":{\"title\":\"Catering Specialist / Driver\",\"company\":\"Grain\",\"description\":\"We’re looking for someone energetic, proactive and meticulous to ensure the smooth and efficient running of our delivery operations. If you love delighting customers, take complete ownership of your duties, and strive for excellence, we want to hear from you. You will: Pack, deliver, set up and tear down catering buffets/mini buffets in a timely and organised manner. Pack and deliver general meal box orders in a timely and organised manner. Achieve a high level of customer satisfaction and serv…\",\"id\":\"3481078374\",\"location\":\"Singapore\",\"date_posted\":\"2022-09-13T03:21:39Z\"}}]}"
    },
    "request": {
        "requestMethod": "POST",
        "__METHOD__": "POST",
        "__URL__": "https://thingproxy.freeboard.io/fetch/https://api.airtable.com/v0/appMqg7UiHbPo4w8g/Jobs"
    }
}