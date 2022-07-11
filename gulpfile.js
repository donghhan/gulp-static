const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const csso = require("gulp-csso");
const autoPrefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const browserify = require("browserify");
const tsify = require("tsify");
const uglify = require("gulp-uglify");
const buffer = require("vinyl-buffer");
const source = require("vinyl-source-stream");
const sourcemaps = require("gulp-sourcemaps");
const image = require("gulp-image");
const { stream } = require("browser-sync");
const uglifycss = require("gulp-uglifycss");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");
const ghPages = require("gulp-gh-pages");

// Routes
const routes = {
  html: {
    src: "src/**/*.html",
    docs: "docs",
  },
  image: {
    src: "src/image/*",
    docs: "docs/image",
  },
  scss: {
    src: "src/scss/**/*.scss",
    docs: "docs/css/",
  },
  ts: {
    src: "src/ts/**/*.ts",
    docs: "docs/js/",
  },
};

// Minifying HTML
function MinifyHTML() {
  return gulp
    .src(routes.html.src)
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(routes.html.docs))
    .pipe(browserSync.stream());
}

// Compiling SCSS into CSS
function SCSStoCSS() {
  return gulp
    .src(routes.scss.src)
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(
      csso({
        sourceMap: false,
        debug: true,
      })
    )
    .pipe(gulp.dest(routes.scss.docs))
    .pipe(browserSync.stream());
}

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
    .pipe(source("js/bundle.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest("docs"))
    .pipe(browserSync.stream());
}

// Image optimization
function Image() {
  return gulp
    .src(routes.image.src)
    .pipe(image())
    .pipe(gulp.dest(routes.image.docs));
}

// Clearing all old files
function Clean() {
  return del(["docs/"]);
}

// Live server configuration
// Watch all changes
function Watch() {
  browserSync.init({
    server: {
      baseDir: "./docs",
    },
  });
  gulp.watch(routes.scss.src, SCSStoCSS);
  gulp.watch(routes.html.src, MinifyHTML);
  gulp.watch(routes.ts.src, TStoJS);
}

// Deploying Github pages
function GhPages() {
  return gulp.src("docs/**/*").pipe(ghPages());
}

// Task serializing
const progress = gulp.series([MinifyHTML, SCSStoCSS, Image, TStoJS]);

exports.dev = gulp.series([Clean, progress, Watch]);
exports.build = gulp.series([Clean, progress]);
exports.deploy = gulp.series([progress, GhPages, Clean]);
