"use strict";
const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url = 'https://www.pentasia.com/_sf/api/v1/jobs/search.json'; 
const company = { company: "Pentasia" };

const fetchJobs = (offset) => {
  const requestBody = {
    "job_search": {
      "query": "",
      "location": {
        "address": "",
        "radius": 0,
        "region": "",
        "radius_units": "miles"
      },
      "filters": {},
      "commute_filter": {},
      "offset": offset,
      "jobs_per_page": 300
    }
  };

  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'content-type': 'application/json',  
      'user-agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' 
    }
  }).then(response => response.json());
};

let finalJobs = [];
const request1 = fetchJobs(0);
const request2 = fetchJobs(100);
const request3 = fetchJobs(200);

Promise.all([request1, request2, request3])
  .then(responseDataArray => {
 
    const concatenatedData = responseDataArray.reduce((result, responseData) => {
      return result.concat(responseData.results);
    }, []);
         const filteredResults = concatenatedData.filter(obj => {
           return obj.job.addresses.toString().includes('Romania') || obj.summary.includes('Romania') || obj.job.url_slug.includes("Romania") || obj.job.description.includes("Romania")  
         });
         let jobTitle={};
         filteredResults.forEach(item => {
           const id = uuid.v4();
           jobTitle = item.job.title;
           const externalPath = "https://www.pentasia.com/jobs/" + item.job.url_slug;
     
           finalJobs.push({
             id: id,
             job_title: jobTitle,
             job_link: externalPath,
             country: "Romania",
             city: "Romania",
             company: company.company,
           });
         })    
  })
 .then(() => {
         console.log(JSON.stringify(finalJobs, null, 2));
     
         scraper.postApiPeViitor(finalJobs, company);
     
         let logo =
           "https://www.pentasia.com/icons/logo.svg";
     
         let postLogo = new scraper.ApiScraper(
           "https://api.peviitor.ro/v1/logo/add/"
         );
         postLogo.headers.headers["Content-Type"] = "application/json";
         postLogo.post(JSON.stringify([{ id: company.company, logo: logo }]));
     
  })
 



