///<reference path="typings/typings.d.ts"/>

import Config = require('./Config');
import ffs = require('final-fs');
import execSync = require('exec-sync');

class Compiler {

  constructor(private config:Config) {

  }

  private getBuildOptions() : ITSCBuildOptions {
    return {
      module: 'commonjs',
      outDir: this.config.buildPath,
      target: 'es5'
    };
  }

  private getBuildOptionsString() : string {
    var args:string = '';
    var options:ITSCBuildOptions = this.getBuildOptions();

    Object.keys(options).forEach(function (key) {
      args += '--' + key + ' ' + options[key] + ' ';
    });

    return args;
  }

  private getBuildFileContent(files:string[]) : string {
    return this.getBuildOptionsString() + '\n' + files.join('\n');
  }

  private createBuildFile(files:string[]) : void {
    ffs.writeFileSync(this.buildFilePath, this.getBuildFileContent(files));
  }

  private removeBuildFile() : void {
    ffs.unlinkSync(this.buildFilePath);
  }

  private get buildFilePath() : string {
    return __dirname + '/require-ts-build.txt';
  }

  public compileFiles(files:string[]) : void {
    this.createBuildFile(files);
    execSync(__dirname + '/../node_modules/typescript/bin/tsc @' + this.buildFilePath);
    this.removeBuildFile();
  }

}

export = Compiler;