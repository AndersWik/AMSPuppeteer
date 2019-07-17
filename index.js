const getJobs = require('./app/getJobs.js');
const setJobs = require('./app/setJobs.js');
const expJobs = require('./app/exportJobs.js');

if(process.argv.length >= 3) {

    if(process.argv[2] === "--get")
    {
        getJobs.run();
    }
    else if(process.argv[2] === "--set")
    {
        setJobs.run();
    }
    else if(process.argv[2] === "--exp")
    {
        expJobs.run();
    }
    else if(process.argv[2] === "--all")
    {
        getJobs.run();
        setJobs.run();
        expJobs.run();
    }
    else
    {
        console.log('Menu',
                "<options>:" + '\n' +
                "--get           Get all ad links" + '\n' +
                "--set           Save all ad content" + '\n' +
                "--exp           Export Json files to Elastic search" + '\n' +
                "--all           Get, save and export all ad content" + '\n' +
                "--help, -h      show help");
    }
}