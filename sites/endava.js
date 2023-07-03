"use strict";
const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url =
  "https://careers.endava.com/en/search-job?region&locations=Brasov,Bucharest,Cluj-Napoca,Craiova,Iasi,Other%20Romanian%20Locations,Pitesti,Sibiu,Suceava,Targu%20Mures,Timisoara";

const company = { company: "Endava" };
let finalJobs = [];
const s = new scraper.Scraper(url);

s.soup
  .then((soup) => {

    const jobs = soup.findAll("span", { class: "bold" });

    jobs.forEach((job) => {
        const id = uuid.v4();
        const job_title = job.text.trim();
    //   const job_link = "careers.endava.com" + job.find("a").attrs.href;
    //   console.log(job_link);
        const cityList= soup.findAll("span", { class: "light" });
        console.log(cityList);
        let city = "";
        cityList.forEach((x) => {
        city = x.text.trim();
        console.log(city);
        })

        finalJobs.push({
        id: id,
        job_title: job_title,
        // job_link: job_link,
        company: company.company,
        city: city,
        country: "Romania",
      });
    });
  })
  .then(() => {
    console.log(JSON.stringify(finalJobs, null, 2));

    scraper.postApiPeViitor(finalJobs, company);

    let logo = "https://upload.wikimedia.org/wikipedia/commons/4/4b/BorgWarner.jpg";
    
    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: company.company, logo: logo }]));
  });
