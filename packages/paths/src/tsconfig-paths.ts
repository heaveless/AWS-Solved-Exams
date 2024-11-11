import { OnLoadArgs, Plugin } from "esbuild";
import { dirname, relative, resolve } from "path";
import { existsSync, readFileSync } from "fs";

interface TSConfig {
  baseUrl: string;
  rootDir: string;
  outDir: string;
  paths: { [key: string]: string[] };
}

interface RawTSConfig {
  compilerOptions: TSConfig;
}

const tsConfigPath = "tsconfig.json";
const extensions = [".ts", ".d.ts", ".json"];
const requireRegex = /(?:import|require)\(['"]([^'"]*)['"]\)/g;
const importRegex = /(?:import|from) ['"]([^'"]*)['"]/g;

const loadConfiguration = (file: string): TSConfig => {
  const { compilerOptions: opts } = require(file) as RawTSConfig;

  if (!opts.baseUrl) {
    throw new Error("compilerOptions.baseUrl is not set");
  }

  if (!opts.rootDir) {
    throw new Error("compilerOptions.rootDir is not set");
  }

  if (!opts.outDir) {
    throw new Error("compilerOptions.outDir is not set");
  }

  if (!opts.paths) {
    throw new Error("compilerOptions.paths is not set");
  }

  return opts;
};

const toRelative = (from: string, x: string): string => {
  const rel = relative(from, x);
  return (rel.startsWith(".") ? rel : `./${rel}`).replace(/\\/g, "/");
};

const absToRel = (modulePath: string, sourcePath: string): string => {
  const { baseUrl, rootDir, outDir, paths } = loadConfiguration(tsConfigPath);
  const configDir = dirname(tsConfigPath);
  const basePath = resolve(configDir, baseUrl!);

  const outFileToSrcFile = (x: string): string =>
    resolve(rootDir, relative(outDir, x));

  const aliases = Object.keys(paths!)
    .map((alias) => ({
      prefix: alias.replace(/\*$/, ""),
      aliasPaths: paths![alias as keyof typeof paths].map((p) =>
        resolve(basePath, p.replace(/\*$/, ""))
      ),
    }))
    .filter(({ prefix }) => prefix);

  for (const { prefix, aliasPaths } of aliases) {
    if (modulePath.startsWith(prefix)) {
      const modulePathRel = modulePath.substring(prefix.length);
      const srcFile = outFileToSrcFile(sourcePath);

      for (const apath of aliasPaths) {
        const moduleSrc = resolve(apath, modulePathRel);
        if (
          existsSync(moduleSrc) ||
          extensions.some((ext) => existsSync(moduleSrc + ext))
        ) {
          return toRelative(dirname(srcFile), moduleSrc);
        }
      }
    }
  }

  return modulePath;
};

const replaceImportStatement = (
  origin: string,
  matched: string,
  sourcePath: string
): string => {
  const index = origin.indexOf(matched);
  return (
    origin.substring(0, index) +
    absToRel(matched, sourcePath) +
    origin.substring(index + matched.length)
  );
};

const replaceAlias = (content: string, sourcePath: string): string =>
  content
    .replace(requireRegex, (origin, matched) =>
      replaceImportStatement(origin, matched, sourcePath)
    )
    .replace(importRegex, (origin, matched) =>
      replaceImportStatement(origin, matched, sourcePath)
    );

export const tsConfigPathsPlugin = (): Plugin => ({
  name: "tsconfig-paths",
  setup(build) {
    build.onLoad({ filter: /\.ts$/ }, (args: OnLoadArgs) => {
      const content = readFileSync(args.path, "utf8");
      const newContent = replaceAlias(content, args.path);
      return {
        contents: newContent,
        loader: "ts",
      };
    });
  },
});
