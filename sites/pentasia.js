"use strict";
const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url = 'https://www.pentasia.com/_sf/api/v1/jobs/search.json'  // Replace with the actual API endpoint
const requestBody = {
  "job_search":{"query":"","location":{"address":"","radius":0,"region":"","radius_units":"miles"},"filters":{},"commute_filter":{},"offset":0,"jobs_per_page":261}
};
let finalJobs = [];
const company = { company: "Dynata" };
const country = { country: "Romania" };
fetch(url, {
  method: 'POST',
  body: JSON.stringify(requestBody),
  headers: {
   'authority': 'www.pentasia.com', 
   'accept': '*/*' ,
   'accept-language': 'ro-RO,ro;q=0.9,en-US;q=0.8,en;q=0.7,de;q=0.6,fr;q=0.5,it;q=0.4,pt;q=0.3,tr;q=0.2,es;q=0.1,pl;q=0.1,la;q=0.1',
   'content-type': 'application/json', 
   'cookie': '_ga=GA1.1.1363648337.1689058080; _ga_8PCZNQ7K62=GS1.1.1689060395.2.1.1689061342.0.0.0', 
   'dnt': '1', 
   'origin': 'https://www.pentasia.com',
   'referer': 'https://www.pentasia.com/jobs/', 
   'sec-ch-ua': '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"', 
   'sec-ch-ua-mobile': '?0', 
   'sec-ch-ua-platform':'"Windows"',
   'sec-fetch-dest': 'empty', 
   'sec-fetch-mode': 'cors', 
   'sec-fetch-site': 'same-origin', 
   'user-agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36' 
  }
})
  .then(response => response.json())
  .then(responseData => {
    // Handle the JSON response data here
    const jobObject = responseData.results;
    jobObject.forEach(item => {
    delete item.job.id;
    delete item.job.description;
    delete item.job.language_code;
    delete item.job.url_slug;
    delete item.job.salary_package;
    delete item.job.created_at;
    delete item.job.published_at;
    delete item.job.updated_at;

    delete item.job.expires_at;
    delete item.job.featured;
    delete item.title_snippet;
    delete item.summary;
    delete item.job.derived_info.job_categories;
    delete item.text_snippet;
    delete item.commute_info;
    delete item.job.categories;
    })
    
    console.log(jobObject.length);

    const filteredResults = jobObject.filter(obj => {
      return obj.job.addresses.toString().includes('Romania');
        
    });
    
    console.log(filteredResults);

    filteredResults.forEach(item => {
      const id = uuid.v4();
      const jobTitle = item.job.title;
      console.log(jobTitle);
      const jobCountry = item.job.addresses[0];
      console.log(jobCountry);




    //   finalJobs.push({
    //     id: id,
    //     job_title: jobTitle,
    //     job_link: externalPath,
    //     country: "Romania",
    //     city: "",
    //     company: company.company,
    //   });

    })
   
  })
  // .then(() => {
  //   console.log(JSON.stringify(finalJobs, null, 2));

  //   scraper.postApiPeViitor(finalJobs, company);

  //   let logo =
  //     "https://evolvetoday.ro/wp-content/uploads/2019/09/logo.svg";

  //   let postLogo = new scraper.ApiScraper(
  //     "https://api.peviitor.ro/v1/logo/add/"
  //   );
  //   postLogo.headers.headers["Content-Type"] = "application/json";
  //   postLogo.post(JSON.stringify([{ id: company.company, logo: logo }]));

  //  })
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