///<reference path="typings/typings.d.ts"/>
var RequireTS = require('./RequireTS');

function init(options) {
    var rts = new RequireTS(options);
    rts.register();
}

module.exports = init;
