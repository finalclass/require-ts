///<reference path="typings/typings.d.ts"/>
var ffs = require('final-fs');
var path = require('path');

var FilesManager = (function () {
    function FilesManager(config) {
        this.config = config;
    }
    FilesManager.prototype.readAll = function () {
        this.tsStatsHash = this.readAndStatByExtension(this.config.sourcePath, 'ts');
        this.jsStatsHash = this.readAndStatByExtension(this.config.buildPath, 'js');
    };

    FilesManager.prototype.findModifiedTSFiles = function () {
        var _this = this;
        return Object.keys(this.tsStatsHash).filter(function (filePath) {
            return _this.isModified(_this.tsStatsHash[filePath]) && !(_this.config.excludeDeclarationFiles && _this.isDeclarationFile(filePath));
        }).map(function (filePath) {
            return _this.tsStatsHash[filePath].filePath;
        });
    };

    FilesManager.prototype.isDeclarationFile = function (filePath) {
        return filePath.indexOf('.d.ts') === filePath.length - 5;
    };

    FilesManager.prototype.toStatHash = function (stats) {
        var hash = {};
        stats.forEach(function (stat) {
            return hash[stat.filePath] = stat;
        });
        return hash;
    };

    FilesManager.prototype.readAndStatByExtension = function (dirPath, extension) {
        if (!ffs.existsSync(dirPath)) {
            return {};
        }
        var files = ffs.readdirRecursiveSync(dirPath, true).filter(function (file) {
            return path.extname(file) === '.' + extension;
        });
        var stats = ffs.statAllSync(files, dirPath);
        return this.toStatHash(stats);
    };

    FilesManager.prototype.isModified = function (tsStat) {
        var tsMTime = tsStat.mtime.getTime();
        var jsPath = this.tsToJsPath(tsStat.filePath);
        var jsStat = this.jsStatsHash[jsPath];
        var jsMTime = 0;

        if (jsStat) {
            jsMTime = jsStat.mtime.getTime();
        }

        return jsMTime < tsMTime;
    };

    FilesManager.prototype.tsToJsPath = function (tsFilePath) {
        var out = tsFilePath.substr(0, tsFilePath.length - 2) + 'js';
        return out.replace(this.config.sourcePath, this.config.buildPath);
    };
    return FilesManager;
})();

module.exports = FilesManager;
