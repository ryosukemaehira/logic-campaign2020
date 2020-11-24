const gulp         = require('gulp');
const fileInclude  = require('gulp-file-include');
const browsersync  = require("browser-sync").create();
const $            = require('gulp-load-plugins')();
const tinyping = require("gulp-tinypng-compress");

gulp.task("tinypng", function() {
  gulp.src(["./src/assets/images/*.{png,jpg,jpeg}", ])
    .pipe(tinyping({
        key: "wLtvDnj89pbk88mSLj7sK28Cr695vLtN" // TinyPNGのAPI Key
      }))
    .pipe(gulp.dest("./src/assets/images/"));
});

gulp.task('transfarPhp', function(){
  return gulp.src(['./src/form/*', './src/form/**/*'])
    .pipe(gulp.dest('./dist/form/'))
});

gulp.task('transfarImage', function(){
  return gulp.src(['./src/assets/images/*', './src/assets/images/**/*'])
    .pipe(gulp.dest('./dist/assets/images/'))
});

gulp.task('transfarFonts', function(){
  return gulp.src('./src/assets/fonts/*')
    .pipe(gulp.dest('./dist/assets/fonts/'))
});

gulp.task('transfarJs', function(){
  return gulp.src(['./src/assets/js/*', './src/assets/js/**/*'])
    .pipe(gulp.dest('./dist/assets/js/'))
});

gulp.task('transfar-html', function () {
  return gulp.src(['./src/template/*','./src/template/**/*'])
    .pipe(gulp.dest('./dist'));
})

gulp.task('inject-html', function () {
  return gulp.src(['./dist/*.html', './dist/**/*.html', './dist/**/**/*.html'])
    .pipe($.plumber({
      errorHandler: $.notify.onError('<%= error.message %>')
    }))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/'));
})

gulp.task('compile-scss', function () {
  return gulp.src(['./src/assets/scss/*.scss'])
    .pipe($.plumber({
      errorHandler: $.notify.onError('<%= error.message %>')
    })) 
    .pipe($.scss())
    .pipe(gulp.dest('./dist/assets/css/'))
})



gulp.task('build',
  gulp.series(
    gulp.parallel(
      'transfar-html', 
      'transfarPhp', 
      'transfarJs', 
      'transfarImage', 
      'transfarFonts', 
      'compile-scss', 
    ),
    'inject-html', 
    function(done) {
      done();
    }
  )
);

gulp.task('browsersync', function () {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    },
    host: '0.0.0.0',
    port: 5000
  })
})

gulp.task('watch', function () {
  gulp.watch(["./src/**/*"]).on("change", 
    gulp.series(
      'build',
      browsersync.reload
    )
  )
})

gulp.task('development',
  gulp.series(
    'build',
    gulp.parallel(
      'browsersync',
      'watch'
    )
  )
)
