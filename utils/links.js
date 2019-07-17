
var links = [];
var linkCounter = 0;

module.exports = {

    linksSet: function (arr) {
        links = arr;
    },
    linksGet: function () {
        return links;
    },
    linkSet: function (link) {
        let added = false;
        if(links.indexOf(link) === -1)
        {
            links.push(link);
            added = true;
        }
        console.log("Link set value: "+link);
        console.log("Link set value: "+added);
        return added;
    },
    linkGet: function (number) {
        let link = null;
        if(number < links.length)
        {
            link = links[number];
        }
        return link;
    },
    linkGetNext: function () {
        let link = null;
        if(linkCounter < links.length)
        {
            link = links[linkCounter];
            console.log(link);
            console.log("Link counter: "+linkCounter);
            linkCounter = linkCounter+1;
        }
        return link;
    },
    linkCounterReSet: function () {
        linkCounter = 0;
    },
    linksLength: function () {
        return links.length;
    }
};