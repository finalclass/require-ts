///<reference path="typings/typings.d.ts"/>
var ffs = require('final-fs');
var execSync = require('exec-sync');

var Compiler = (function () {
    function Compiler(config) {
        this.config = config;
    }
    Compiler.prototype.getBuildOptions = function () {
        return {
            module: 'commonjs',
            outDir: this.config.buildPath,
            target: 'es5'
        };
    };

    Compiler.prototype.getBuildOptionsString = function () {
        var args = '';
        var options = this.getBuildOptions();

        Object.keys(options).forEach(function (key) {
            args += '--' + key + ' ' + options[key] + ' ';
        });

        return args;
    };

    Compiler.prototype.getBuildFileContent = function (files) {
        return this.getBuildOptionsString() + '\n' + files.join('\n');
    };

    Compiler.prototype.createBuildFile = function (files) {
        ffs.writeFileSync(this.buildFilePath, this.getBuildFileContent(files));
    };

    Compiler.prototype.removeBuildFile = function () {
        ffs.unlinkSync(this.buildFilePath);
    };

    Object.defineProperty(Compiler.prototype, "buildFilePath", {
        get: function () {
            return __dirname + '/require-ts-build.txt';
        },
        enumerable: true,
        configurable: true
    });

    Compiler.prototype.compileFiles = function (files) {
        this.createBuildFile(files);
        execSync(__dirname + '/../node_modules/typescript/bin/tsc @' + this.buildFilePath);
        this.removeBuildFile();
    };
    return Compiler;
})();

module.exports = Compiler;
