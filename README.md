# AMS Puppet

The AMS Puppet app will fetch all jobs from the Data/IT section from `ams.se`. All job ad's can be fetched and saved as json without Elasticsearch. Elasticsearch is needed to export the json files. All example diagrams are from Kibana.

## Options

* `--get` The get option is used to fetch all job links from the ams site.
* `--set` The set option check if a json file with the job id exist. If not it will fetch the json file from the ams site.
* `--exp` Will export all json files to Elastic search.
* `--all` Get, set and export all ad content

## Config

If we add a `puppeteer.json` file in the config folder we can make some configuration. We can set values for `headless` and `executablePath`. The `executablePath` can be used if we want to use a different browser than Chromium like Google Chrome.

``` json
{
    "headless": false,
    "executablePath": "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
}
```

If we add a `elasticsearch.json` file in the config folder we can set what node elasticsearch is listening to and what the index name is.

``` json
{ 
    "node": "http://127.0.0.1:9200",
    "index": "ams"
}
```

## Installation

``` bash
$ npm install
```

## Dependencies

### Elasticsearch

https://www.elastic.co/downloads/elasticsearch

``` bash
$ bin/elasticsearch
```

Test Elasticsearch

``` bash
$ curl http://127.0.0.1:9200
```

By default Elasticsearch will use an index called elastic and guess the mapping. This will become a problem when displaying the jobs on a map since the geo points arent added correctly. There is a alternativ mapping in `docs/elasticsearch.md`. Use the Kibana Dev tools console to add this mapping.

### Kibana

https://www.elastic.co/downloads/kibana

``` bash
$ bin/kibana
```
When Kibana is started it will display what url Kibana can be accessed from.

``` bash
Server running at http://localhost:5601
```

When Kibana is running the data can be displayed in different types of diagrams.

* <img src="https://github.com/AndersWik/AMSPuppeteer/raw/develop/docs/kibana-diagrams.png?sanitize=true" alt="diagrams" width="600">

* <img src="https://github.com/AndersWik/AMSPuppeteer/raw/develop/docs/kibana-map.png?sanitize=true" alt="map" width="600">

To display the geo points correctly go to the Kibana dev tools console. Then copy paste the commands from `docs/elasticsearch.md` into the command promt. This will add a `index` called `ams` and the mapping for the index. Since we are using a different index name then the deafult `elasticsearch` name we need to add a `elasticsearch.json` config file. Create a file called `elasticsearch.json` in the config folder and add the following.

``` bash
{ 
    "node": "http://127.0.0.1:9200",
    "index": "ams"
}
```


