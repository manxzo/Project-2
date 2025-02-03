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

[
  {
      "title": "Assistant/ Accounting Manager (Audit, CPA, ISCA)",
      "description": "Responsibilities: Oversee and manage the financial operations of the company, including budgeting, forecasting, and financial reporting. Ensure compliance with regulatory requirements and accounting standards. Manage cash flow and working capital to optimize financial performance. Monitor and analyze financial data, providing insights and recommendations for improvement. Collaborate with internal stakeholders to develop and implement financial strategies and plans. Manage relationships with ext…",
      "id": "4634088673",
      "min_salary": 54000,
      "location": "Central, Singapore",
      "company": "Talent Trader Group",
      "date_posted": "2024-04-03T14:57:01Z",
      "max_salary": 90000,
      "recordId": "recCJKIinjfnkAPjO"
  },
  {
      "title": "Account Manager - PR",
      "description": "At SPAG/ FINN, our public relations and public affairs work impacts real beneficiaries, patients, caregivers and masses, across the India sub-continent, South-East Asia and Asia-Pacific region. We pride ourselves in designing communication strategies that cut across geographies and cultural nuances. Come, be a part of this wonderful journey of bringing a difference to people’s lives, through communication and be a supporting pillar of the team to execute the campaigns. An Account Manager will b…",
      "id": "4796024859",
      "location": "Singapore",
      "company": "Finn Partners",
      "date_posted": "2024-07-26T17:18:18Z",
      "recordId": "recYiB5ZP3BFrNUDF"
  },
  {
      "title": "Electrical Design Engineer (Switchboard Marine)",
      "description": "Responsibilities: Design and develop marine switchboards and electrical systems. Create detailed electrical design drawings. Collaborate with cross-functional teams to ensure design requirements are met. Review and analyze design specifications and standards. Perform engineering calculations to ensure switchboards meet safety and performance standards. Participate in design reviews and provide technical expertise. Assist in the testing and commissioning of marine switchboards. Stay updated with…",
      "id": "4589065710",
      "min_salary": 50400,
      "location": "Central, Singapore",
      "company": "Talent Trader Group",
      "date_posted": "2024-03-02T08:48:55Z",
      "max_salary": 65000,
      "recordId": "reclD7zWWI33Hbxgy"
  }
]
<TableCell>
  <div className="flex items-center justify-center space-x-2">
    <button className="p-2 bg-blue-500 text-white rounded">Edit</button>
    <button className="p-2 bg-red-500 text-white rounded">Delete</button>
    <button className="p-2 bg-green-500 text-white rounded">View</button>
  </div>
</TableCell>
