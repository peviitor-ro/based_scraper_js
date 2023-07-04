"use strict";

let fs = require('fs');
let path = require('path');
let child_process = require('child_process');
let axios = require('axios');

let files = fs.readdirSync(__dirname + "/sites");

let exclude = [];

files.forEach((file) => {
    if (!exclude.includes(file)) {
        child_process.exec("node " + "sites/" + file, (err, stdout, stderr) => {
            if (stderr) {
                console.log("Error scraping " + file);
                console.log("Sending Trigger to API ...");
                axios.post("https://dev.laurentiumarian.ro/scraper/based_scraper_js/", {
                    "file": file,
                }).then((response) => {
                    if (response.data.success){
                        console.log("Success Scraping " + file + " after trigger");
                    } else {
                        console.log("Both scraping and trigger failed for " + file);
                        console.log(response.data.error);
                    }
                }).catch((error) => {
                    console.log("Error sending trigger for " + file);
                    console.log(error);
                });
            } 
            if (stdout) {
                console.log("Success scraping " + file);
            }
        })
    }
})