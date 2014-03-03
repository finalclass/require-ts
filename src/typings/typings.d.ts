///<reference path="node.d.ts"/>
///<reference path="final-fs.d.ts"/>
///<reference path="exec-sync.d.ts"/>

interface IRTSOptions {
  sourcePath?:string;
  buildPath?:string;
}

interface HashTable<T> {
  [key: string]: T;
}

interface ITSCBuildOptions {
  module?:string;
  outDir?:string;
  target?:string
}