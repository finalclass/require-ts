///<reference path="typings/typings.d.ts"/>
var ffs = require('final-fs');
var execSync = require('exec-sync');
var path = require('path');

var Compiler = (function () {
    function Compiler(config) {
        this.config = config;
    }
    Compiler.prototype.getBuildOptions = function (options) {
        options = options || {};
        return {
            module: options.module || 'commonjs',
            outDir: options.outDir || this.config.buildPath,
            target: options.target || 'es5'
        };
    };

    Compiler.prototype.getBuildOptionsString = function (opts) {
        var args = '';
        var options = this.getBuildOptions(opts);

        Object.keys(options).forEach(function (key) {
            args += '--' + key + ' ' + options[key] + ' ';
        });

        return args;
    };

    Compiler.prototype.getBuildFileContent = function (files) {
        var options = Object.create(null);

        options.outDir = path.join(this.config.buildPath, this.fixOutDir(files));
        return this.getBuildOptionsString(options) + '\n' + files.join('\n');
    };

    Compiler.prototype.isSameOnEveryIndex = function (array, index) {
        if (!array[0]) {
            return true;
        }

        var prev = array[0][index];

        for (var i = 0; i < array.length; i += 1) {
            if (array[i][index] !== prev) {
                return false;
            }
        }

        return true;
    };

    Compiler.prototype.findMaxSameIndex = function (dirs) {
        for (var maxSameIndex = 0; maxSameIndex < dirs[0].length; maxSameIndex += 1) {
            if (!this.isSameOnEveryIndex(dirs, maxSameIndex)) {
                break;
            }
        }
        return maxSameIndex;
    };

    Compiler.prototype.fixOutDir = function (files) {
        var _this = this;
        if (files.length === 0) {
            return '';
        }

        var dirs = files.map(function (file) {
            var pathSplitted = file.replace(_this.config.sourcePath, '').split('/');
            return pathSplitted.slice(0, pathSplitted.length - 1);
        });

        var maxSameIndex = this.findMaxSameIndex(dirs);
        var sameDir = dirs[0].slice(0, maxSameIndex).join('/');
        return sameDir;
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
        var tsc = __dirname + '/../node_modules/typescript/bin/tsc';
        this.createBuildFile(files);
        execSync(tsc + ' @' + this.buildFilePath);
        this.removeBuildFile();
    };
    return Compiler;
})();

module.exports = Compiler;
