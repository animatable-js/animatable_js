import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import extensions from "rollup-plugin-extensions"

// The browser global variable name to refer to this package.
const globals = {
    "animatable-js": "AnimJS",
}

export default {
    input: "src/index.ts",
    output: [
        { file: "dist/index.js", format: "esm", sourcemap: true, globals: globals },
    ],
    plugins: [
        extensions({
            extensions: [".ts"],
            resolveIndex: true,
        }),
        typescript({tsconfig: "tsconfig.json", useTsconfigDeclarationDir: true}),
        terser(),
    ]
}