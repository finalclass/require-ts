///<reference path="typings/typings.d.ts"/>

class Config implements IRTSOptions {

  constructor(private options:IRTSOptions) {

  }

  public get excludeDeclarationFiles() : boolean {
    return this.options.excludeDeclarationFiles === undefined 
      ? true : this.options.excludeDeclarationFiles;
  }

  public get sourcePath() : string {
    return this.options.sourcePath || process.cwd();
  }

  public get buildPath() : string {
    return this.options.buildPath || process.cwd() + '/build';
  }

}

export = Config;