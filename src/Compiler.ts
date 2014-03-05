///<reference path="typings/typings.d.ts"/>

import Config = require('./Config');
import ffs = require('final-fs');
import execSync = require('exec-sync');
import path = require('path');

class Compiler {

  constructor(private config:Config) {

  }

  private getBuildOptions(options?:ITSCBuildOptions) : ITSCBuildOptions {
    options = options || {};
    return {
      module: options.module || 'commonjs',
      outDir: options.outDir || this.config.buildPath,
      target: options.target || 'es5'
    };
  }

  private getBuildOptionsString(opts?:ITSCBuildOptions) : string {
    var args:string = '';
    var options:ITSCBuildOptions = this.getBuildOptions(opts);

    Object.keys(options).forEach(function (key) {
      args += '--' + key + ' ' + options[key] + ' ';
    });

    return args;
  }

  private getBuildFileContent(files:string[]) : string {
    var options:ITSCBuildOptions = Object.create(null);
    
    options.outDir = path.join(this.config.buildPath, this.fixOutDir(files));
    console.log(options.outDir);
    return this.getBuildOptionsString(options) + '\n' + files.join('\n');
  }

  private isSameOnEveryIndex(array:string[][], index:number) : boolean {
    if (!array[0]) {
      return true;
    }

    var prev:string = array[0][index];

    for (var i:number = 0; i < array.length; i += 1) {
      if (array[i][index] !== prev) {
        return false;
      }
    }

    return true;
  }

  private findMaxSameIndex(dirs:string[][]) : number {
    for (var maxSameIndex:number = 0; maxSameIndex < dirs[0].length; maxSameIndex += 1) {
      if (!this.isSameOnEveryIndex(dirs, maxSameIndex)) {
        break;
      }
    }
    return maxSameIndex;
  }

  private fixOutDir(files:string[]) : string {
    if (files.length === 0) {
      return '';
    }

    var dirs:string[][] = files.map((file:string) => {
      var pathSplitted:string[] = file.replace(this.config.sourcePath, '').split('/');
      return pathSplitted.slice(0, pathSplitted.length - 1);
    });

    var maxSameIndex = this.findMaxSameIndex(dirs);
    var sameDir:string = dirs[0].slice(0, maxSameIndex).join('/');
    return sameDir
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
    var tsc:string = __dirname + '/../node_modules/typescript/bin/tsc';
    this.createBuildFile(files);
    execSync(tsc + ' @' + this.buildFilePath);
    this.removeBuildFile();
  }

}

export = Compiler;