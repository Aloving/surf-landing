const gulp =         require('gulp');
const sass =         require('gulp-sass');
const watch =        require('gulp-watch');
const sourcemaps =   require('gulp-sourcemaps');
const source =       require('vinyl-source-stream');
const watchify =     require('watchify');
const uglify =       require('gulp-uglify');
const streamify =    require('gulp-streamify');
const browserify =   require('browserify');
const browserSync =  require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const args =         require('yargs').argv;
const gulpif =       require('gulp-if');
const pug =          require('gulp-pug');
const buffer =       require('vinyl-buffer')
const del =          require('del');
const beautify =     require('gulp-jsbeautifier');
const emit =         require("emit");

const paths = {
  styles: {
    sassPath: './sass',
    destPath: './public/stylesheets',
    maps: './public/stylesheets/*.map'
  },
  js: {
    inputPath: './js',
    outputPath: './public/js'
  },
  pug: {
    inputPath: './pug',
    outputPath: './public/html'
  }
}

//pug preproc
gulp.task('pug', () => {
  gulp.src(`${paths.pug.inputPath}/index.pug`)
      .pipe(pug({pretty: true}).on('error', handleError))
      .pipe(gulp.dest(`${paths.pug.outputPath}`))
});

//js task
const production = (args.env == "production") ? true : false;
const debug = (args.env == "production") ? false : true;

var jsCompile = jsCreateCompile(debug,production);

gulp.task('bundle', () => {
  return jsCompile({
    path: `${paths.js.inputPath}/app.js`,
    name: 'bundle.js',
    sourcePath: `${paths.js.outputPath}`
  });
});

//delete task for clear trash
gulp.task('del',() => {
  del([paths.styles.maps], {force: true});
});

//start server
gulp.task('browser-sync', ['sass','pug','bundle'], () => {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch([`${paths.styles.sassPath}/**/*[^_].scss`, `${paths.styles.sassPath}/**/*[^_].css`], ['sass']);
  gulp.watch([`${paths.pug.inputPath}/**/*.pug`, `${paths.pug.inputPath}/*.html`], ['pug']);
  gulp.watch(`${paths.pug.outputPath}/**/*.html`).on('change', browserSync.reload);
  gulp.watch(`${paths.js.outputPath}/**/*.js`).on('change', browserSync.reload);

});


//style sass compile
gulp.task('sass', () => {

  gulp.src(`${paths.styles.sassPath}/*.scss`)
      .pipe(gulpif(!production, sourcemaps.init({loadMaps: true})))
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(autoprefixer({
          browsers: ['> 1%', 'last 10 versions'],
          cascade: false
        }))
      .pipe(gulpif(!production, sourcemaps.write('.')))
      .pipe(gulp.dest(`${paths.styles.destPath}`))
      .pipe(browserSync.stream({match: '**/*.css'}));
});


//function for js 
function jsCreateCompile(debug, production){

  return function(file){
    let sourcefile = file.path;
    let fileName = file.name;
    let sourcePath = file.sourcePath;

    let bundle = browserify({
        entries: [sourcefile],
        cache: {},
        debug: debug,
        packageCache: {},
        plugin: [watchify]
      });

    bundle.on('update', bundleFunc);
    bundleFunc();

    bundle.on('log', function (msg) {
      let log = [];
      if(msg){
        console.log(`${sourcefile} was written`);
      }
    });

    function bundleFunc() {
      bundle
        .bundle()
        .on('error', handleError)
        .pipe(source(fileName))
        .pipe(buffer())
        .pipe(gulpif(production,streamify(uglify())))
        .pipe(gulp.dest(sourcePath));
    }

    return bundleFunc;
  }

}

//handle error with emit
function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

let tasks = ['browser-sync'];
if( production ) tasks.push('del');

gulp.task('default',tasks);