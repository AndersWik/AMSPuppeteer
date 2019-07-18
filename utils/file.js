
const fs = require('fs');

module.exports = {
    linksPath: function ()
    {
        return './links.txt';
    },
    dirPath: function ()
    {
        return './jobs/';
    },
    dirPathExported: function ()
    {
        return './jobs/exported/';
    },
    filePath: function (id)
    {
        return './jobs/'+id+'.json';
    },
    filePathExported: function (id)
    {
        return './jobs/exported/'+id+'.json';
    },
    amsConfig: function ()
    {
        return './config/ams.json';
    },
    puppeteerConfig: function ()
    {
        return './config/puppeteer.json';
    },
    elasticsearchConfig: function ()
    {
        return './config/elasticsearch.json';
    },
    readFiles: function (dirname)
    {
        return new Promise((resolve, reject) => {
            fs.readdir(dirname, function(err, filenames) {
                if (err)
                {
                    return reject(err);
                } 
                return resolve(filenames);
            });
      });
    },
    readFile: function (filepath)
    {
        return new Promise((resolve, reject) => {
            fs.readFile(filepath, "utf8", function(err, content) {
                if (err)
                {
                    return reject(err);
                }
                return resolve(content);
            });
      });
    },
    writeFile: function (filepath, content)
    {
        return new Promise((resolve, reject) => {
            fs.writeFile(filepath, content, 'utf8', function(err) {
                if (err)
                {
                    return reject(err);
                }
                return resolve(true);
            });
        });
    },
    moveFile: function (oldpath, newpath)
    {
        return new Promise((resolve, reject) => {
            fs.rename(oldpath, newpath, function(err){
                if (err)
                {
                    return reject(err);
                } 
                return resolve(true);
            });
        });
    },
    fileExist: function (filepath)
    {
        return new Promise((resolve, reject) => {
            fs.stat(filepath, function(err, stat) {
                if(err == null) {
                    return resolve(true);
                } else if(err.code === 'ENOENT') {
                    return resolve(false);
                } else {
                    return reject(err.code);
                }
            });
        });
    }
};