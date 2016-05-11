module.exports = {
    onSameLine: function(line) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(line);
    },
    clearLastLine: function () {
        this.onSameLine('');
    },
    hbar: function() {
        console.log('------------------');
    },
    newLine: function() {
        console.log('');
    },
    startMessage: function() {
        console.log('');
        this.hbar();
        console.log('Benchmark Starting');
        this.hbar();
    },
    endMessage: function(successes, fails) {
        var total = successes + fails
            percentage = function(x, total) {
                return Math.round((x/total)*10000)/100
            };
        this.hbar();
        console.log('Benchmark Finished');
        this.hbar();
        console.log('Successful Requests:\t' + successes + '\t (' + percentage(successes, total) + '%)');
        console.log('Failed Requests:\t' + fails + '\t (' + percentage(fails, total) + '%)');
        this.hbar();
    }
}
