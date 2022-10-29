import typescript from "@rollup/plugin-typescript";
import { defineConfig, InputPluginOption, PluginHooks } from "rollup";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  input: "./src/index.ts",
  output: {
    dir: "./",
    format: "commonjs",
    sourcemap: "inline",
  },
  external: ["electron"],
  plugins: [typescript({ noEmitOnError: true }), terser(),],
});