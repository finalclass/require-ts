///<reference path="typings/typings.d.ts"/>

import Config = require('./Config');
import FilesManager = require('./FilesManager');
import Compiler = require('./Compiler');
import ffs = require('final-fs');
import path = require('path');
import vm = require('vm');

class RequireTS {

  private config:Config;
  private files:FilesManager;
  private compiler:Compiler;

  constructor(options:IRTSOptions) {
    this.config = new Config(options);
    this.files = new FilesManager(this.config);
    this.compiler = new Compiler(this.config);
  }

  public register() : void {
    this.files.readAll();
    this.compiler.compileFiles(this.files.findModifiedTSFiles());

    require.extensions['.ts'] = (module) => this.onTSExtensionRequire(module);
  }

  private onTSExtensionRequire(module:any) : void {
    var jsname:string = this.files.tsToJsPath(module.filename);
    var content:string = ffs.readFileSync(jsname, 'utf8').toString();

    var sandbox = {};
    for (var k in global) {
      sandbox[k] = global[k];
    }

    (<any>sandbox).require = module.require.bind(module);
    (<any>sandbox).exports = module.exports;
    (<any>sandbox).__filename = jsname;
    (<any>sandbox).__dirname = path.dirname(module.filename);
    (<any>sandbox).module = module;
    (<any>sandbox).global = (<any>sandbox);
    // (<any>sandbox).root = root;

    return vm.runInNewContext(content, (<any>sandbox), { filename: jsname });
  }

}

export = RequireTS;