# __require('.ts');__

**RequireTS** is an nodejs module which allows you to `require()` typescript files.

It provides different approach then other typescript require modules because it compiles all modified scripts before it registers the `.ts` extension loader.

RequireTS is **written in TypeScript** :) 

## Build

RequireTS is written in TypeScript so you can modify it very easily.
If you want to build the library, there is a build script provided.

```sh
sh build.sh
```

## Installation

```sh
npm install require-ts
```

## Usage

```js
require('require-ts')({
  sourcePath: 'path/to/typescript/files/directory',
  buildPath: 'destination/folder/for/compiled/files'
});

//then you can:
require('file.ts');
```

Compiler will compile all **modified** files in sourcePath directory and place their compiled versions inside the buildPath directory. Directory structury should be preserved. 

### __dirname

__dirname will point to typescript file location

## License ISC

RequireTS is distributed under ISC license (which is even simpler MIT style license) so you can use it even in your commercial projects. Just don't delete the LICENSE file.