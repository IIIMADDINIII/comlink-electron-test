import { defineConfig } from "rollup";
import commonjs from '@rollup/plugin-commonjs';
import typescript from "@rollup/plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from "@rollup/plugin-terser";

const emptyFile = "export default {}";
const emptyFileName = "\0rollup_not_allowed_module_";
function allow(list, print = false) {
  return {
    name: "allow",
    resolveId(importee) {
      let block = false;
      if (importee.startsWith("\0rollup_not_allowed_module_")) block = true;
      if (!importee.startsWith(".") && !importee.startsWith("/") && (process.platform != "win32" || !importee.slice(1).startsWith(":\\")) && !list.includes(importee)) block = true;
      if (print) console.log({ importee, block });
      if (block) {
        console.error("Used an not allowed Module " + importee);
        process.exit(-1);
      }
    },
    load(id) {
      return id.startsWith("\0rollup_not_allowed_module_") ? emptyFile : null;
    },
  };
}

export default defineConfig({
  input: "./src/index.ts",
  output: {
    file: "./dist/index.js",
    format: "esm",
    sourcemap: "inline",
  },
  plugins: [
    allow(["@app/common"]),
    //ignore(["electron"]),
    nodeResolve({ resolveOnly: ["electron"] }),
    commonjs(),
    typescript({ noEmitOnError: true, outputToFilesystem: true, noResolve: true }),
    sourceMaps(),
    terser()],
});