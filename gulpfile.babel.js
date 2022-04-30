import { src, dest, series, watch, parallel } from "gulp";
import pug from "gulp-pug";
import del from "del";
import webserver from "gulp-webserver";

const routes = {
  pug: {
    src: "src/*.pug",
    build: "build",
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

function Watch() {
  watch(routes.pug.src, PugIntoHTML);
}

const pre = series([Clean]);
const build = series([PugIntoHTML]);
const post = parallel([Webserver, Watch]);

export const dev = series(pre, build, post);
