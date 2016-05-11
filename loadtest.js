var requestBody = require('./post-request'),
    print = require('./print'),
    argsBuilder = require('./argsBuilder'),
    request = require('superagent'),
    Promise = require('bluebird'),
    successes = 0,
    fails = 0,
    args = argsBuilder(process.argv),
    config = {
        endPoint: args.endpoint,
        requestBody: require('./' + args.requestbody)
            || function(){return {}},
        timeout: parseInt(args.timeout || 500),
        totalRuns: parseInt(args.totalruns || 5000),
        concurrent: parseInt(args.concurrent || 50),
    },
    incrementSuccess = function() {
        successes += 1;
    },
    incrementFail = function() {
        fails += 1;
    },
    makeRequest = function(resolve, reject) {
        request('POST', config.endPoint)
            .set('Content-Type', 'application/json')
            .accept('application/json')
            .send(config.requestBody())
            .end(function(err, res) {
                if (err) {
                    return reject(err);
                }
                if (res) {
                    return resolve(res);
                }
            });
    },
    makeBatchRequest = function(next, end, timeout, batchSize, total, runsComplete) {
        runsComplete = runsComplete !== undefined
            ? runsComplete
            : 0;

        setTimeout(function() {
            for (var run = 0; run < batchSize; run += 1) {
                makeRequest(incrementSuccess, incrementFail);
            }

            runsComplete += batchSize;
            percentageDone = Math.round((runsComplete/total)*10000)/100;
            print.onSameLine(
                "Completed requests:\t" + runsComplete + '\t(' + percentageDone + '%)'
            );

            if (runsComplete < total) {
                next(next, end, timeout, batchSize, total, runsComplete);
            } else {
                print.newLine();
                print.hbar();
                end();
            }
        }, timeout);
    };

print.startMessage();

makeBatchRequest(
    makeBatchRequest,
    function() {
        var dots = 0,
            totalDots = 4,
            interval = 250,
            wait = 5000,
            printWaitMessage = function() {
                print.onSameLine(
                    'Pausing to end benchmark' + '...'.slice(0, dots++ %totalDots)
                );
            },
            printWaitMessageInterval;

        print.newLine();
        printWaitMessageInterval = setInterval(printWaitMessage, interval);

        setTimeout(function() {
            clearInterval(printWaitMessageInterval);
            print.clearLastLine();
            print.endMessage(successes, fails);
        }, wait)
    },
    config.timeout,
    config.concurrent,
    config.totalRuns
);
