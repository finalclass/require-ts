///<reference path="typings/typings.d.ts"/>

import Config = require('./Config');
import ffs = require('final-fs');
import path = require('path');

class FilesManager {

  private tsStatsHash:HashTable<ffs.FinalStats>;
  private jsStatsHash:HashTable<ffs.FinalStats>;

  constructor(private config:Config) {
    
  }

  public readAll() : void {
    this.tsStatsHash = this.readAndStatByExtension(this.config.sourcePath, 'ts');
    this.jsStatsHash = this.readAndStatByExtension(this.config.buildPath, 'js');
  }

  public findModifiedTSFiles() : string[] {
    return Object.keys(this.tsStatsHash)
      .filter((filePath:string) => this.isModified(this.tsStatsHash[filePath]))
      .map((filePath:string) => this.tsStatsHash[filePath].filePath);
  }

  private toStatHash(stats:ffs.FinalStats[]) : HashTable<ffs.FinalStats> {
    var hash:HashTable<ffs.FinalStats> = {};
    stats.forEach((stat:ffs.FinalStats) => hash[stat.filePath] = stat);
    return hash;
  }

  private readAndStatByExtension(dirPath:string, extension:string) : HashTable<ffs.FinalStats> {
    if (!ffs.existsSync(dirPath)) {
      return {};
    }
    var files:string[] = ffs.readdirRecursiveSync(dirPath, true)
      .filter((file:string) => path.extname(file) === '.' + extension);
    var stats:ffs.FinalStats[] = ffs.statAllSync(files, dirPath);
    return this.toStatHash(stats);
  }

  private isModified(tsStat:ffs.FinalStats) : boolean {
    var tsMTime = tsStat.mtime.getTime();
    var jsPath = this.tsToJsPath(tsStat.filePath);
    var jsStat = this.jsStatsHash[jsPath];
    var jsMTime = 0;

    if (jsStat) {
      jsMTime = jsStat.mtime.getTime();
    }

    return jsMTime < tsMTime;
  }

  public tsToJsPath(tsFilePath:string) : string {
    var out:string = tsFilePath.substr(0, tsFilePath.length - 2) + 'js';
    return out.replace(this.config.sourcePath, this.config.buildPath);
  }

}

export = FilesManager;