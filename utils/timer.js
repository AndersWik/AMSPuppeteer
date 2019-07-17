
var start;
var stop;

module.exports = {
    start: function () {
        start = new Date();
    },
    stop: function () {
        stop = new Date();
    },
    print: function () {
        console.log('Start: '+start.toLocaleString());
        console.log('Stop: '+stop.toLocaleString());
    }
};