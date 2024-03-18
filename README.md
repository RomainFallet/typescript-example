# typescript-example

This repository is meant to show a simple example of how to transpile and test a simple TypeScript application with the less tools and configuration possible.

## Usage

### Lint

```bash
npm run lint
```

It uses `tsc` with the "noEmit" option to true to disable completely JavaScript transpilation and keep only the type-checking part.

### Build

```bash
npm run build
```

It uses `swc` to transpile TypeScript source files into JavaScript files without the type-checking part. It's similar to `Babel` but is 20x faster on a single thread and 70x faster on four cores.

Because SWC is only a transpiler and not a Web bundler, all your imports in your TypeScript source files must be ESM compatible.

```typescript
// ✘ Directory imports is a TypeScript feature that is not compatible with ECMAScript modules
import { foo } from './'

// ✘ Imports without extensions is a TypeScript feature that is not compatible with ECMAScript modules
import { foo } from './bar'

// ✘ Absolute imports related to the main entry point of application is a TypeScript feature that is not compatible with ECMAScript modules
import { foo } from 'src/bar.js'

// ✔ Relative import with '.js' extension is a standard way to import ECMAScript modules
import { foo } from './bar.js'
```

Note that TypeScript has no trouble having imports with '.js' extension in it.

### Test

```bash
npm run test
```

It uses native test runner that comes with NodeJS 20. Though, it requires NodeJS 21 to support glob patterns on the CLI.

Note that tests are executed on JavaScript files transpiled in the dist folder (because TypeScript files cannot be executed). Popular tools that takes TypeScript files as input are type-checking and transpiling them under the hood at runtime (which is slow).

We are doing the same steps but at build time and without the type-checking part, which is not necessary for running tests (by the way, with a dedicated lint command, the type-checking part can be run in parrallel for better CI speed).
