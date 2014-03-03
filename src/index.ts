///<reference path="typings/typings.d.ts"/>

import RequireTS = require('./RequireTS');

function init(options:IRTSOptions) : void {
  var rts:RequireTS = new RequireTS(options);
  rts.register();
}

export = init;