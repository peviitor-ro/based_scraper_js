"use strict";
const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");


const url = 'https://dynata.wd1.myworkdayjobs.com/wday/cxs/dynata/careers/jobs'  
const requestBody = {
  "appliedFacets":{"locations":["67cdbb242c0f01186560ab7ce9361603","67cdbb242c0f01ff4f8eac7ce9361d03"]},"limit":20,"offset":0,"searchText":""
};
const company = { company: "Dynata" };
let finalJobs = [];
fetch(url, {
  method: 'POST',
  body: JSON.stringify(requestBody),
  headers: { 
    'Accept': 'application/json',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'en-US',
    'Connection': 'keep-alive',
    'Content-Length': '141',
    'Content-Type':'application/json',
    'Cookie': 'wday_vps_cookie=3391531530.3635.0000; timezoneOffset=-180; _ga=GA1.4.109040793.1688503556; PLAY_SESSION=125528c863b3d2d69e977b456316cdf664f0f421-dynata_pSessionId=j2bi6v495afti6oveg9bilr6cf&instance=wd1prvps0001g; TS014c1515=01dc4a3ac88ebae27803a55d336307b83f7a3f779357a9d49184256d1613ee4afbd469e7934bc0f7fc4a4ed8fc2996f2bbd2bfc62c; _gat=1; wd-browser-id=e3358515-e402-4498-af7a-cc5c1cc62cde; CALYPSO_CSRF_TOKEN=8009e3f7-5d7f-49cc-bddf-0f1156b09507',
    'Dnt': '1',
    'Host': 'dynata.wd1.myworkdayjobs.com',
    'Origin': 'https://dynata.wd1.myworkdayjobs.com',
    'Referer': 'https://dynata.wd1.myworkdayjobs.com/careers?locations=67cdbb242c0f01186560ab7ce9361603&locations=67cdbb242c0f01ff4f8eac7ce9361d03',
    'Sec-Ch-Ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': 'Windows',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    'X-Calypso-Csrf-Token': '8009e3f7-5d7f-49cc-bddf-0f1156b09507'
  }
})
  .then(response => response.json())
  .then(responseData => {
    delete responseData.facets;
    delete responseData.userAuthenticated;
     const jobPostings = responseData.jobPostings;
     jobPostings.forEach(job => {
       const id = uuid.v4();
       const jobTitle = job.title;
       const externalPath = "https://dynata.wd1.myworkdayjobs.com/en-US/careers" + job.externalPath;
       finalJobs.push({
        id: id,
        job_title: jobTitle,
        job_link: externalPath,
        country: "Romania",
        city: "",
        company: company.company,
      });
     });
   })
   .then(() => {
    console.log(JSON.stringify(finalJobs, null, 2));

    scraper.postApiPeViitor(finalJobs, company);

    let logo =
      "https://www.dynata.com/wp-content/themes/dynata/images/dynata-logo.png";

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: company.company, logo: logo }]));

   })
   .catch(error => {
     console.log(error);
   });












