const { src, dest } = require("gulp");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

exports.default = function Scripts() {
  return src("src/*.js").pipe(dest("dist/"));
};
