"use strict";

const scraper = require("../peviitor_scraper.js");
const uuid = require("uuid");

const url =
  "https://preh8-portal.rexx-recruitment.com//job-offers.html?start=0&filter[volltext]=&filter[countr][]=Brasov&filter[countr][]=Iasi";

const company = { company: "Preh" };
let finalJobs = [];

const s = new scraper.Scraper(url);

s.soup.then((soup) => {
  const totalJobs = parseInt(soup.find("div", { id: "countjobs" }).text.trim());
  const pages = scraper.range(0, totalJobs, 20);

  const fetchData = () => {
    return new Promise((resolve, reject) => {
      pages.forEach((page) => {
        let url = `https://preh8-portal.rexx-recruitment.com//job-offers.html?start=${page}&filter[volltext]=&filter[countr][]=Brasov&filter[countr][]=Iasi`;
        const s = new scraper.Scraper(url);
        s.soup.then((soup) => {
          const jobs = soup.find("tbody").findAll("tr").slice(1);

          jobs.forEach((job) => {
            const id = uuid.v4();
            const job_title = job.find("a").text.trim();
            const job_link =
              "https://preh8-portal.rexx-recruitment.com/" +
              job.find("a").attrs.href;
            const company = "Preh";
            const country = "Romania";
            const city = job
              .find("td", { class: "real_table_col3" })
              .text.trim();

            console.log(job_title + " -> " + city);

            const jobObj = {
              id: id,
              job_title: job_title,
              job_link: job_link,
              company: company,
              city: city,
              country: country,
            };

            finalJobs.push(jobObj);

            if (finalJobs.length === totalJobs) {
              resolve(finalJobs);
            }
          });
        });
      });
    });
  };

  fetchData().then((finalJobs) => {
    console.log("Total jobs: " + finalJobs.length);

    const apiKey = "182b157-bb68-e3c5-5146-5f27dcd7a4c8";
    const postPeviitor = scraper.postApiPeViitor(apiKey, finalJobs, company);

    let logo =
      "https://career.preh.com/fileadmin/templates/website/media/images/preh_logo.png";

    let postLogo = new scraper.ApiScraper(
      "https://api.peviitor.ro/v1/logo/add/"
    );
    postLogo.headers.headers["Content-Type"] = "application/json";
    postLogo.post(JSON.stringify([{ id: "Preh", logo: logo }]));
  });
});
