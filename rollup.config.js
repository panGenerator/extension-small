import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import fs from 'fs'
import path from 'path'
import autoExternal from 'rollup-plugin-auto-external'
import sourcemaps from 'rollup-plugin-sourcemaps'
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'
console.log(pkg)

const {
  name,
  main,
  umd,
  module,
} = pkg

const basePlugins = [
  sourcemaps(),
  resolve(),
  commonjs(),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
  })
]

export default {
  input: path.join(__dirname, 'src/index.ts'),
  output: [
    {
      name,
      file: path.join(__dirname, umd),
      format: 'umd',
      sourcemap: true,
    },
    {
      name,
      file: path.join(__dirname, main),
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
    {
      name,
      file: path.join(__dirname, module),
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    autoExternal({
      packagePath: path.join(__dirname, 'package.json'),
    }),
    ...basePlugins,
    typescript({
      tsconfig: fs.existsSync(`${__dirname}/tsconfig.json`)
        ? `${__dirname}/tsconfig.json`
        : 'tsconfig.json',
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          paths: {
            '@tiptap/*': ['packages/*/src'],
          },
        },
        include: fs.existsSync(`${__dirname}/tsconfig.json`)
          ? []
          : null,
      },
    })],
}