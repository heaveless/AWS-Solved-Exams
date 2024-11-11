import { BuildOptions, build } from "esbuild";
import { resolve } from "path";
import { globSync } from "glob";
import { compilerOptions } from "./tsconfig.json";
import { tsConfigPathsPlugin } from "@heaveless/paths";

const sourcePath = resolve(__dirname, compilerOptions.rootDir);
const distributionPath = resolve(__dirname, compilerOptions.outDir);

const entryPoints = globSync("**/*.ts", {
  cwd: sourcePath,
}).map((file) => resolve(sourcePath, file));

const buildOptions: BuildOptions = {
  entryPoints,
  bundle: false,
  platform: "node",
  outdir: distributionPath,
  external: [],
  format: "cjs",
  plugins: [tsConfigPathsPlugin()],
};

build(buildOptions);
