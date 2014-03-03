///<reference path="typings/typings.d.ts"/>

class Config {

  constructor(private options:IRTSOptions) {

  }

  public get sourcePath() : string {
    return this.options.sourcePath || process.cwd();
  }

  public get buildPath() : string {
    return this.options.buildPath || process.cwd() + '/build';
  }

}

export = Config;