///<reference path="typings/typings.d.ts"/>
var Config = require('./Config');
var FilesManager = require('./FilesManager');
var Compiler = require('./Compiler');
var ffs = require('final-fs');
var path = require('path');
var vm = require('vm');

var RequireTS = (function () {
    function RequireTS(options) {
        this.config = new Config(options);
        this.files = new FilesManager(this.config);
        this.compiler = new Compiler(this.config);
    }
    RequireTS.prototype.register = function () {
        var _this = this;
        this.files.readAll();
        console.log(this.files.findModifiedTSFiles());
        this.compiler.compileFiles(this.files.findModifiedTSFiles());

        require.extensions['.ts'] = function (module) {
            return _this.onTSExtensionRequire(module);
        };
    };

    RequireTS.prototype.onTSExtensionRequire = function (module) {
        var jsname = this.files.tsToJsPath(module.filename);
        var content = ffs.readFileSync(jsname, 'utf8').toString();

        var sandbox = {};
        for (var k in global) {
            sandbox[k] = global[k];
        }
        sandbox.require = module.require.bind(module);
        sandbox.exports = module.exports;
        sandbox.__filename = jsname;
        sandbox.__dirname = path.dirname(module.filename);
        sandbox.module = module;
        sandbox.global = sandbox;

        // (<any>sandbox).root = root;
        return vm.runInNewContext(content, sandbox, { filename: jsname });
    };
    return RequireTS;
})();

module.exports = RequireTS;
