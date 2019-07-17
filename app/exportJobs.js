const fileHelper = require('../utils/file.js');
const configHelper = require('./../utils/config.js');
const { Client: Client7 } = require('@elastic/elasticsearch')
var client;

module.exports = {
    run: async function () {

        let config = {};

        let json = await configHelper.getElasticsearchConfig();

        if(json.node !== undefined)
        {
            config.node = json.node;
        }

        client = new Client7(config);
        client.info(console.log);

        let dir = fileHelper.dirPath();
        let dirExp = fileHelper.dirPathExported();

        let files = await fileHelper.readFiles(dir);

        for(var i = 0; i < files.length; i++)
        {
            if(files[i].endsWith('.json'))
            {
                let fileId = files[i].replace(".json", "");
                let fileContent = await fileHelper.readFile(dir+files[i]);
                fileContent = addPosition(fileContent);

                if(await exportFile(fileId, fileContent, json))
                {
                    await fileHelper.moveFile(dir+files[i], dirExp+files[i]);
                }
            }
        }
    }
};

function addPosition(fileContent)
{
    let json = JSON.parse(fileContent);

    if(json['erbjudenArbetsplats'] !== undefined &&
       json['erbjudenArbetsplats']['geoPosition'] !== undefined)
    {

        if(json['erbjudenArbetsplats']['geoPosition']['longitud'] !== undefined &&
           json['erbjudenArbetsplats']['geoPosition']['latitud'] !== undefined)
        {
            if(json['erbjudenArbetsplats']['geoPosition']['longitud'] !== null &&
               json['erbjudenArbetsplats']['geoPosition']['latitud'] !== null)
            {
                json.location = {};
                json.location.lat = json['erbjudenArbetsplats']['geoPosition']['latitud'];
                json.location.lon = json['erbjudenArbetsplats']['geoPosition']['longitud'];
            }
        }
    }
    return JSON.stringify(json);
}

function exportFile(fileId, fileContent, json) {
    return new Promise((resolve, reject) => {

        let config = {};

        if(json.index !== undefined)
        {
            config.index = json.index;
        }
        else
        {
            config.index = 'elasticsearch';
        }

        config.id = fileId;
        config.body = fileContent;

        client.index(config, function(err, resp, status) {

            console.log(resp);
        
            if(err)
            {
                return reject(err);
            }
            else
            {
                return resolve(true);
            }
        }); 
    });
}