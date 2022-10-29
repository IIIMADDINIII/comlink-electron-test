import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";
import terser from "@rollup/plugin-terser";

export default defineConfig({
  input: "./src/index.ts",
  output: {
    dir: "./",
    format: "commonjs",
    sourcemap: "inline",
  },
  plugins: [typescript({ noEmitOnError: true }), terser()],
});