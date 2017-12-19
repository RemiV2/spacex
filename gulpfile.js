const gulp = require("gulp")
const plumber = require("gulp-plumber")
const rename = require("gulp-rename")
const autoprefixer = require("gulp-autoprefixer")
const babel = require("gulp-babel")
const concat = require("gulp-concat")
const uglify = require("gulp-uglify")
const imagemin = require("gulp-imagemin")
const cache = require("gulp-cache")
const cleancss = require("gulp-clean-css")
const sass = require("gulp-sass")
const browserSync = require("browser-sync")

gulp.task("browser-sync", () => {
  browserSync({
    server: {
      baseDir: "./"
    }
  })
})

gulp.task("bs-reload", () => {
  browserSync.reload()
})

gulp.task("images", () => {
  gulp
    .src("src/images/**/*")
    .pipe(
      cache(
        imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })
      )
    )
    .pipe(gulp.dest("dist/images/"))
})

gulp.task("styles", () => {
  gulp
    .src(["src/sass/**/*.sass"])
    .pipe(
      plumber({
        errorHandler: function(error) {
          console.log(error.message)
          this.emit("end")
        }
      })
    )
    .pipe(sass())
    .pipe(autoprefixer("last 2 versions"))
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/css/"))
    .pipe(cleancss())
    .pipe(gulp.dest("dist/css/"))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task("scripts", () => {
  return gulp
    .src("src/js/**/*.js")
    .pipe(
      plumber({
        errorHandler: (error) => {
          console.log(error.message)
          //this.emit("end")
        }
      })
    )
    .pipe(concat("main.js"))
    .pipe(babel())
    //.pipe(uglify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest("dist/js/"))
    //.pipe(gulp.dest("dist/js/"))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task("default", ["browser-sync"], () => {
  gulp.watch("src/sass/**/*.sass", ["styles"])
  gulp.watch("src/js/**/*.js", ["scripts"])
  gulp.watch("*.html", ["bs-reload"])
})
