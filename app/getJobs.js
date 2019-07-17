const puppeteer = require('puppeteer');
const pathHelper = require('./../utils/paths.js');
const linksHelper = require('./../utils/links.js');
const timeHelper = require('./../utils/timer.js');
const fileHelper = require('./../utils/file.js');
const configHelper = require('./../utils/config.js');

module.exports = {
    run: function () {

        (async () => {

            timeHelper.start();

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
        
            let number = 1;
            let run = true;
        
            while(run)
            {
                try
                {
                    let url = pathHelper.jobIndexPages(number);
                    await page.goto(url, {waitUntil: 'networkidle2'});
                    await page.waitFor(1000);
        
                    let cards = await page.$$eval('.result-container .card-content h2 a', as => as.map(a => a.href));
        
                    console.log("Cards length: "+cards.length);
        
                    if(Array.isArray(cards))
                    {
                        let duplicates = 0;
        
                        for (let i = 0; i < cards.length; i++)
                        {
                            duplicates += linksHelper.linkSet(cards[i]) ? 0 : 1;
                        }
        
                        console.log('Found '+duplicates+' duplicates')
        
                        if(duplicates == cards.length)
                        {
                            run = false;
                        }
                    }
        
                    console.log('Page: '+number+' Current link list length: '+linksHelper.linksLength()+' is running '+run);
                    number++;
                }
                catch (err)
                {
                    break;
                }
            }

            let linksPath = fileHelper.linksPath();
            let linksContent = linksHelper.linksGet().join('\n');
            await fileHelper.writeFile(linksPath, linksContent);

            await browser.close();
            timeHelper.stop();
            timeHelper.print();
        })();
    }
};