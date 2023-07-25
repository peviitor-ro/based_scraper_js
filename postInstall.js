const fs = require("fs");
const { execSync } = require("child_process");

const removeDirectorySync = (path) => {
  if (fs.existsSync(path)) {
    const files = fs.readdirSync(path);

    files.forEach((file) => {
      const curPath = path + "/" + file;
      if (fs.lstatSync(curPath).isDirectory()) {
        removeDirectorySync(curPath); // Recursive call for subdirectories
      } else {
        fs.unlinkSync(curPath); // Delete files
      }
    });

    fs.rmdirSync(path); // Remove the empty directory
  }
};

const run = () => {
  if (!process.env.GITHUB_ACTIONS) {
    if (fs.existsSync("sites")) {
      removeDirectorySync("sites");
    }
    console.log("Waiting 10 seconds...."); // If someone figures out how to disable the git filter-branch warning, let us know
    execSync(
      "git clone https://github.com/peviitor-ro/scrapers.js.git sites && cd sites && git filter-branch --prune-empty --subdirectory-filter sites HEAD && cd ../"
    );
  }
};

run();
