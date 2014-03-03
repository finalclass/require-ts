///<reference path="typings/typings.d.ts"/>
var Config = (function () {
    function Config(options) {
        this.options = options;
    }
    Object.defineProperty(Config.prototype, "excludeDeclarationFiles", {
        get: function () {
            return this.options.excludeDeclarationFiles === undefined ? true : this.options.excludeDeclarationFiles;
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Config.prototype, "sourcePath", {
        get: function () {
            return this.options.sourcePath || process.cwd();
        },
        enumerable: true,
        configurable: true
    });

    Object.defineProperty(Config.prototype, "buildPath", {
        get: function () {
            return this.options.buildPath || process.cwd() + '/build';
        },
        enumerable: true,
        configurable: true
    });
    return Config;
})();

module.exports = Config;
