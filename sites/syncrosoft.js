const uuid = require("uuid");
const scraper = require("../peviitor_scraper.js");

const COMPANY = { company: "SyncRO Soft" };
const URL = "https://www.sync.ro/jobs.html";
const SUFFIX = "#:~:text="
const s = new scraper.Scraper(URL);

const generateJob = (id, job_title, url_suffix) => ({
  id,
  job_title,
  job_link: URL + url_suffix, // all jobs are on same page -> we simply jump to the element containing the job name
  company: COMPANY.company,
  country: "Romania",
  city: "Craiova", // HQ location but might be remote?
});

const publish = (finalJobs) => {
  console.log(JSON.stringify(finalJobs, null, 2));
  scraper.postApiPeViitor(finalJobs, COMPANY);

  const logo =
    "https://www.sync.ro/oxygen-webhelp/template/resources/img/logo_syncrosoft.png";

  const postLogo = new scraper.ApiScraper(
    "https://api.peviitor.ro/v1/logo/add/"
  );
  postLogo.headers.headers["Content-Type"] = "application/json";
  postLogo.post(JSON.stringify([{ id: COMPANY.company, logo }]));
};

s.soup.then((soup) => {
  const divs = soup.findAll("div", { class: "job_title" });
  const finalJobs = [];
  divs.forEach((div) => {
    const id = uuid.v4();
    const job_title = div.text.replace(" New", "");
    const href = job_title.split(" ").join("%20");
    const url_suffix = SUFFIX + href;
    const job = generateJob(id, job_title, url_suffix);
    finalJobs.push(job);
  });
  publish(finalJobs);
});
