"use strict";

let fs = require('fs');
let path = require('path');
let child_process = require('child_process');

let files = fs.readdirSync(__dirname + "/sites");

let exclude = [];

files.forEach((file) => {
    if (!exclude.includes(file)) {
        child_process.exec("node " + "sites/" + file, (err, stdout, stderr) => {
            if (err) {
                console.log("Error scraping " + file);
            } else {
                console.log("Success scraping " + file);
            }
        })
    }
})