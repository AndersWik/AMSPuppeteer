
const fileHelper = require('./file.js');

module.exports = {
    getPuppeteerConfig: async function ()
    {
        let path = await fileHelper.puppeteerConfig();
        let json = await getConfig(path);
        return json;
    },
    getElasticsearchConfig: async function ()
    {
        let path = await fileHelper.elasticsearchConfig();
        let json = await getConfig(path);

        if(json === undefined || json === "")
        {
            json = '{ "node": "http://127.0.0.1:9200" }';
        }
        return json;
    },
};

async function getConfig (path)
{
    let json = {};
    if(await fileHelper.fileExist(path))
    {
        json = await fileHelper.readFile(path);
        json = JSON.parse(json);
    }
    return json;
}