module.exports = function(args)
{
    var o = {};
    args.slice(2).forEach(function (a) {
        var kv = a.split('='),
        v = kv[1];
        v = v === 'true'
            ? true
            : (v === 'false' ? false : v);
        o[kv[0]] = v;
    });
    return o;
};
