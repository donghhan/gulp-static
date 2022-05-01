import { src, dest, series, watch, parallel } from "gulp";
import pug from "gulp-pug";
import del from "del";
import webserver from "gulp-webserver";
import image from "gulp-image";
const sass = require("gulp-sass")(require("sass"));
import autoPrefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import sourcemaps from "gulp-sourcemaps";
import source from "vinyl-source-stream";
import tsify from "tsify";
import browserify from "browserify";
import uglify from "gulp-uglify";
import buffer from "vinyl-buffer";

const routes = {
  pug: {
    src: "src/*.pug",
    build: "build",
    watch: "src/pug/**/*.pug",
  },
  image: {
    src: "src/image/*",
    build: "build/image",
  },
  scss: {
    src: "src/scss/style.scss",
    build: "build/css/",
    watch: "src/scss/**/*.scss",
  },
  ts: {
    src: "src/ts/main.ts",
    build: "build/js/",
    watch: "src/ts/**/*.ts",
  },
};

// Deleting all old build files
function Clean() {
  return del(["build/"]);
}

// Live server
function Webserver() {
  return src("build").pipe(webserver({ livereload: true, port: 4500 }));
}

// Compiling Pug into HTML
function PugIntoHTML() {
  return src(routes.pug.src).pipe(pug()).pipe(dest(routes.pug.build));
}

// Image optimization
function Image() {
  return src(routes.image.src).pipe(image()).pipe(dest(routes.image.build));
}

// SCSS to CSS
function SCSStoCSS() {
  return src(routes.scss.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(autoPrefixer())
    .pipe(
      csso({
        sourceMap: true,
        debug: true,
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(dest(routes.scss.build));
}

// TS to JS
function TStoJS() {
  return browserify({
    basedir: ".",
    debug: true,
    entries: ["src/ts/main.ts"],
    cache: {},
    packageCache: {},
  })
    .plugin(tsify)
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(dest(routes.ts.build));
}

function Watch() {
  watch(routes.pug.src, PugIntoHTML);
  watch(routes.image.src, Image);
  watch(routes.scss.src, SCSStoCSS);
  watch(routes.ts.watch, TStoJS);
}

const pre = series([Clean]);
const build = series([PugIntoHTML, Image, SCSStoCSS, TStoJS]);
const post = parallel([Webserver, Watch]);

export const dev = series(pre, build, post);
