///<refernece path="when.d.ts"/>

declare module 'final-fs' {
  import when = require('when');
  import fs = require('fs');

  export interface FinalStats extends fs.Stats {
    filePath:string;
    fileName:string;
  }

  export function rename(oldPath:string, newPath:string) : when.Promise<void>;
  export function renameSync(oldPath:string, newPath:string) : void;
  export function ftruncate(fd:number, len:number) : when.Promise<void>;
  export function truncate(path:string, len:number) : when.Promise<void>;
  export function truncateSync(path:string, len:number) : void;
  export function chown(path:string, uid:number, gid:number) : when.Promise<void>;
  export function chownSync(path:string, uid:number, gid:number) : void;
  export function fchown(fd:number, uid:number, gid:number) : when.Promise<void>;
  export function lchown(path:string, uid:number, gid:number) : when.Promise<void>;
  export function lchownSync(path:string, uid:number, gid:number) : void;
  export function chmod(path:string, mode:string) : when.Promise<void>;
  export function chmodSync(path:string, mode:string) : void;
  export function fchmod(fd:number, mode:string) : when.Promise<void>;
  export function lchmod(path:string, mode:string) : when.Promise<void>;
  export function lchmodSync(path:string, mode:string) : void;
  export function stat(path:string) : when.Promise<fs.Stats>;
  export function lstat(path:string) : when.Promise<fs.Stats>;
  export function fstat(fd:number) : when.Promise<fs.Stats>;
  export function statSync(path:string) : fs.Stats;
  export function lstatSync(path:string) : fs.Stats;
  export function link(srcpath:string, dstpath:string) : when.Promise<void>;
  export function linkSync(srcpath:string, dstpath:string) : void;
  export function symlink(srcpath:string, dstpath:string, type) : when.Promise<void>;
  export function symlinkSync(srcpath:string, dstpath:string, type) : void;
  export function readlink(path:string) : when.Promise<string>;
  export function readlinkSync(path:string) : string;
  export function realpath(path:string, cache) : when.Promise<string>;
  export function realpathSync(path:string, cache) : string;
  export function unlink(path:string) : when.Promise<void>;
  export function unlinkSync(path:string) : void;
  export function rmdir(path:string) : when.Promise<void>;
  export function rmdirSync(path:string) : void;
  export function mkdir(path:string, mode) : when.Promise<void>;
  export function mkdirSync(path:string, mode) : void;
  export function readdir(path:string) : when.Promise<string[]>;
  export function readdirSync(path:string) : string[];
  export function close(fd:number) : void;
  export function open(path:string, flags:number, mode:string) : when.Promise<number>;
  export function openSync(path:string, flags:number, mode:string) : number;
  export function utimes(path:string, atime:number, mtime:number) : when.Promise<void>;
  export function utimesSync(path:string, atime:number, mtime:number) : void;
  export function futimes(fd:number, atime:number, mtime:number) : when.Promise<void>;
  export function fsync(fd:number) : void;
  export function write(fd:number, buffer:NodeBuffer, offset:number, length:number, position:number) : when.Promise<number>;
  export function read(fd:number, buffer:NodeBuffer, offset:number, length:number, position:number) : when.Promise<number>;
  export function readFile(path:string, options:{ encoding?: string; flag?: string; }) : when.Promise<NodeBuffer>;
  export function readFileSync(path:string, options:{ encoding?: string; flag?: string; }) : NodeBuffer;
  export function writeFile(path:string, data:NodeBuffer, options:{ encoding?: string; mode?: number; flag?: string; }) : when.Promise<number>;
  export function writeFileSync(path:string, data:NodeBuffer, options:{ encoding?: string; mode?: number; flag?: string; }) : number;
  export function appendFile(path:string, data:NodeBuffer, options:{ encoding?: string; mode?: number; flag?: string; }) : when.Promise<void>;
  export function appendFileSync(path:string, data:NodeBuffer, options:{ encoding?: string; mode?: number; flag?: string; }) : void;
  export function writeFile(filename: string, data: any, callback?: (err: ErrnoException) => void): void;
  export function writeFile(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: (err: ErrnoException) => void): void;
  export function writeFile(filename: string, data: any, options: { encoding?: string; mode?: string; flag?: string; }, callback?: (err: ErrnoException) => void): void;
  export function writeFileSync(filename: string, data: any, options?: { encoding?: string; mode?: number; flag?: string; }): void;
  export function writeFileSync(filename: string, data: any, options?: { encoding?: string; mode?: string; flag?: string; }): void;
  export function watch(filename: string, listener?: (event: string, filename: string) => any): fs.FSWatcher;
  export function watch(filename: string, options: { persistent?: boolean; }, listener?: (event: string, filename: string) => any): fs.FSWatcher;
  export function exists(path:string) : when.Promise<boolean>;
  export function existsSync(path:string) : boolean;
  export function createReadStream(path: string, options?: {
      flags?: string;
      encoding?: string;
      fd?: string;
      mode?: number;
      bufferSize?: number;
  }): fs.ReadStream;
  export function createReadStream(path: string, options?: {
      flags?: string;
      encoding?: string;
      fd?: string;
      mode?: string;
      bufferSize?: number;
  }): fs.ReadStream;
  export function createWriteStream(path: string, options?: {
      flags?: string;
      encoding?: string;
      string?: string;
  }): fs.WriteStream;
  export function mkdirRecursive(dirPath:string, mode) : when.Promise<void>;
  export function mkdirRecursiveSync(dirPath:string, mode) : void;
  export function copy(fromPath, toPath) : void;
  export function rmdirRecursiveSync(dirPath:string) : when.Promise<void>;
  export function rmdirRecursive(dirPath:string) : void;
  export function writeJSON(filePath:string, obj:any) : when.Promise<void>;
  export function writeJSONSync(filePath:string, obj:any) : void;
  export function readJSON(filePath:string) : when.Promise<any>;
  export function readJSONSync(filePath:string) : any;
  export function dirInfo(directoryPath:string) : when.Promise<fs.Stats[]>;
  export function statAllSync(files:string[], rootPath:string) : FinalStats[]
  export function dirFiles(directoryPath:string) : fs.Stats[];
  export function readdirRecursive(directoryPath:string, onlyFiles?:boolean, rootPath?:string) : when.Promise<string[]>;
  export function readdirRecursiveSync(directoryPath:string, onlyFiles?:boolean, rootPath?:string) : string[];
  export function fileNameFilterslugify(text:string) : string;
}