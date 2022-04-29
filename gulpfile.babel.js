import { src, dest, series } from "gulp";
import pug from "gulp-pug";

const routes = {
  pug: {
    src: "src/*.pug",
    build: "build",
  },
};

// Compiling Pug into HTML
function PugIntoHTML() {
  return src(routes.pug.src).pipe(pug()).pipe(dest(routes.pug.build));
}

export const dev = series([PugIntoHTML]);
