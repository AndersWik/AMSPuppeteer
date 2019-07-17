const puppeteer = require('puppeteer');
const pathHelper = require('../utils/paths.js');
const linksHelper = require('../utils/links.js');
const fileHelper = require('../utils/file.js');
const timeHelper = require('../utils/timer.js');
const configHelper = require('./../utils/config.js');

let fileCounter = 0;

module.exports = {
    run: function () {

        (async () => {

            timeHelper.start();

            let links = await fileHelper.readFile(fileHelper.linksPath());

            if(links == undefined) {
                links = '';
            }

            linksHelper.linksSet(links.split('\n'));

            let config = {};

            let json = await configHelper.getPuppeteerConfig();

            if(json.headless !== undefined)
            {
                config.headless = json.headless;
            }

            if(json.executablePath !== undefined)
            {
                config.executablePath = json.executablePath;
            }

            const browser = await puppeteer.launch(config);
            const page = await browser.newPage();

            let link = linksHelper.linkGetNext();

            while((link = linksHelper.linkGetNext()) !== null)
            {
                var parts = link.split('/');

                if(parts.length > 0)
                {
                    let id = parts[parts.length-1];
                    let path = fileHelper.filePath(id);
                    let pathExp = fileHelper.filePathExported(id);

                    let pathExist = await fileHelper.fileExist(path);
                    let pathExpExist = await fileHelper.fileExist(pathExp);

                    if(!pathExist && !pathExpExist)
                    {
                        await page.on('response', response => {

                            if (response.url().endsWith(pathHelper.jobPage(id)))
                            {
                                console.log("Response code: ", response.status());

                                if (response.status() === 200)
                                {
                                    (async () => {
                                        try {
                                            await fileHelper.writeFile(path, await response.text())
                                            await increaseFileCount();
                                        } catch (err) {
                                            // ignore
                                        }
                                    })();
                                }
                            }
                        });

                        try {

                            await page.goto(link, {waitUntil: 'networkidle2'});
                            await page.waitFor(1000);

                        } catch (err) {

                            // Ignore
                        }
                    }
                    else
                    {
                        console.log("File exist");
                    }
                }
            }

            console.log("Link list length:"+linksHelper.linksLength());
            console.log("Total number of files saved:"+fileCounter);

            await browser.close();
            timeHelper.stop();
            timeHelper.print();
        })();
    }
};

async function increaseFileCount() {
    fileCounter++;
    console.log("Current file count: "+fileCounter);
}