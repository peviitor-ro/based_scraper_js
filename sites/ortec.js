"use strict";
const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url = 'https://ortec.com/api/career'  // Replace with the actual API endpoint

fetch(url, {
  method: 'POST',
  headers: {
'Authority':'ortec.com',
'Method':'POST',
'Path':'/api/career',
'Scheme':'https',
'Accept':'application/json',
'Accept-Encoding':'gzip, deflate, br',
'Accept-Language':'ro-RO,ro;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6,fr;q=0.5,it;q=0.4,pt;q=0.3,tr;q=0.2,es;q=0.1,pl;q=0.1,la;q=0.1',
'Content-Length':'0',
'Content-Type':'application/json',
'Cookie':'visitor_id915011=148877269; visitor_id915011-hash=6b3ab796608742450df49e7504ee893019014387294f0dc46dbf66c3a35ff7ab640281d8aa90faf4e91f951cb74ba3c2a2666717; OptanonAlertBoxClosed=2023-07-04T19:04:49.385Z; _hjSessionUser_2925407=eyJpZCI6IjY5OGMxYjljLWUxZGUtNWU5ZS04ODBiLTZiMjY5YmY0OTM1YSIsImNyZWF0ZWQiOjE2ODg0OTc0ODM5NDksImV4aXN0aW5nIjp0cnVlfQ==; connect.sid=s%3AWJVQGQdpcJfpX1BdubyRC13AcIxbZLkZ.i4eWVxMPQjQLjyIqhWKu2qTgsENkZhKyMI2ppUZhPx4; _hjIncludedInSessionSample_2925407=1; _hjSession_2925407=eyJpZCI6IjNiNDk2YmUzLWY4MzAtNGJkOS04MTU4LTA5OGM1M2E5ZDg0YiIsImNyZWF0ZWQiOjE2ODkyOTE3MTY4MjQsImluU2FtcGxlIjp0cnVlfQ==; ln_or=eyI1ODE0ODQiOiJkIn0%3D; _otpe=https%3A%2F%2Fortec.com%2Fen%2Fcareers%2Ffind-jobs%2Fjobs%3Fcountry%3Dromania; _gid=GA1.2.721961928.1689291718; _gat_UA-1739097-25=1; _ga_C4J8LHBQY2=GS1.1.1689291718.3.1.1689291747.31.0.0; OptanonConsent=isIABGlobal=false&datestamp=Fri+Jul+14+2023+02%3A42%3A27+GMT%2B0300+(Eastern+European+Summer+Time)&version=6.13.0&hosts=&consentId=5079b400-2559-4091-84d0-32c9605f87d6&interactionCount=1&landingPath=NotLandingPage&groups=C0001%3A1%2CC0002%3A1%2CORT01%3A1%2CC0003%3A1%2CC0004%3A1&geolocation=RO%3BB&AwaitingReconsent=false; _ga_L8J2L86T4K=GS1.1.1689291716.3.1.1689291748.28.0.0; _ga=GA1.2.1040928462.1688497484; _ots=4.1689291716713.1689291747637.1689291748452; _otui=513156310.1688497483874.1688502238523.1689291716713.3.23.4306767',
'Dnt':'1',
'Origin':'https://ortec.com',
'Referer':'https://ortec.com/en/careers/find-jobs/jobs?country=romania',
'Sec-Ch-Ua':'"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
'Sec-Ch-Ua-Mobile':'?0',
'Sec-Ch-Ua-Platform':'Windows',
'Sec-Fetch-Dest':'empty',
'Sec-Fetch-Mode':'cors',
'Sec-Fetch-Site':'same-origin',
'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
  }
})
  .then(response => response.json())
  .then(responseData => {
    // const filteredObject = {};
    // responseData.forEach(obj => {
        // Acțiunile pe care dorești să le aplici la fiecare obiect
            // delete obj.langcode;
            // delete obj.jobCategories;
            // delete obj.locations;
            // delete obj.careerLevels;
            // delete obj.sections;
            // delete obj.bannerImageSection
            // delete obj._id;
            // delete obj.hero;
            // delete obj.jobId;
            // delete obj.metadata;
            // delete obj.__v;
            // delete obj.hash;
            // delete obj.image;
            // console.log(obj);
            // const title = obj.title;
            // const country = obj.country;
            // console.log('Tile:' + title, 'Country:' + country);
            // if (obj.country === 'Romania') {
            //     filteredArray.push(obj);
            //   }
            // if (obj.country === 'Romania') {
            //     filteredObject[obj.title] = obj;
            //   }
    //     });
    
    // });
    // console.log(filteredObject);
    // console.log(responseData.length);
//   .catch(error => {
//     console.log(error);
//   });
const filteredArray = responseData
.filter(obj => obj.country === 'Romania')
.map(({ title, country }) => ({ title, country }));

console.log(filteredArray);
console.log(filteredArray.length);

filteredArray.forEach(obj => {
    const id = uuid.v4();
    const jobTitle = obj.title;
    
});
})
.catch(error => {
console.log(error);
});













// const url =
//   "https://recrutare.dedeman.ro/posturi-disponibile.php";

// const company = { company: "Dedeman" };
// let finalJobs = [];
// const s = new scraper.Scraper(url);

// s.soup
//   .then((soup) => {

//     const jobs = soup.findAll("div", {class: "job-list-box"});
//     console.log(jobs)
//     const cityList= soup.findAll("p", { class: "text-muted" });
//     let cities = [];
//     cityList.forEach((x) => {
//       cities.push(x.text.trim());
//     });
//     jobs.forEach((job,index) => {
//       const id = uuid.v4();
//       const job_title = job.text.trim();
//     //   const job_link = "https://recrutare.dedeman.ro" + job.find("a").attrs.href;
//       const city = cities[index];
//       finalJobs.push({
//         id: id,
//         job_title: job_title,
//         // job_link: job_link,
//         company: company.company,
//         city: city,
//         country: "Romania",
//       });
//     });
//   })
//   .then(() => {
//     console.log(JSON.stringify(finalJobs, null, 2));

//     scraper.postApiPeViitor(finalJobs, company);

//     let logo = "https://upload.wikimedia.org/wikipedia/commons/4/4b/BorgWarner.jpg";

//     let postLogo = new scraper.ApiScraper(
//       "https://api.peviitor.ro/v1/logo/add/"
//     );
//     postLogo.headers.headers["Content-Type"] = "application/json";
//     postLogo.post(JSON.stringify([{ id: company.company, logo: logo }]));
//   });