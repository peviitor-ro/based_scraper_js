"use strict";
const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url = "https://jobs.majorel.com/romania/en/jobs?lang=en&api=jobs&site=28&_";

const company = { company: "Majorel" };
let finalJobs = [];
let pages = 1;

const fetchData = (pages) => {
  return new Promise((resolve, reject) => {
    const url = `https://jobs.majorel.com/romania/en/jobs?pg=${pages}&lang=en&api=jobs&site=28&_`;
    const s = new scraper.ApiScraper(url);

    s.get().then((response) => {
      resolve(response); // Resolve with the response directly
    });
  });
};

async function data() {
  let jobs = [];
  let fetchedJobs;

  do {
    fetchedJobs = await fetchData(pages);
    jobs = jobs.concat(fetchedJobs);
    pages++;
  } while (fetchedJobs.length > 0);

  console.log(jobs.length);
  return jobs;
}

data();



// const s = new scraper.ApiScraper(url)
// s.get().then((response)=>{

//     const jobs = response
//     console.log(jobs.length)

//     jobs.forEach(job => {

//         const id = uuid.v4();
//       const job_title = job.name
//       const job_link = job.url
//       let city = "Romania"

//          if(job.location != null){
//              if(job.location.name != ""){
//                  city = job.location.name
//              }
                    
//             } 

//         //console.log(job.location)



//       finalJobs.push({
//         id: id,
//         job_title: job_title,
//         job_link: job_link,
//         company: company.company,
//         city: city,
//         country: "Romania",
//       })
        
//     });

// }).then(() =>{
//     // console.log(finalJobs.length)
//     // console.log(JSON.stringify(finalJobs, null, 2))
// })

