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
const emit =         require('emit');
const svgSprite  =   require('gulp-svg-sprite');
const svgmin =       require('gulp-svgmin');
const imagemin =     require('gulp-imagemin');
const chokidar =     require('chokidar');

const paths = {
	bundleFolder: '../public',
	styles: {
		sassPath: './sass',
		destPath: '../public/stylesheets',
		maps: '../public/stylesheets/*.map'
	},
	js: {
		inputPath: './js',
		outputPath: '../public/js'
	},
	pug: {
		inputPath: '../views',
		outputPath: './public/html'
	},
	images: {
		inputPath: './source_images',
		inputSvg: './source_images/svg',
		outputPath: '../public/images'
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
	del(`${paths.bundleFolder}/*`, {force: true});
});

//start server
gulp.task('browser-sync', ['sass','bundle','img-min','svg-sprites'], () => {
	browserSync.init({
			proxy: "localhost:8000"
	});

	gulp.watch([`${paths.styles.sassPath}/**/*[^_].scss`, `${paths.styles.sassPath}/**/*[^_].css`], ['sass']);
	gulp.watch([`${paths.pug.inputPath}/**/*.pug`, `${paths.pug.inputPath}/**/*.html`]).on('change', browserSync.reload);
	gulp.watch(`${paths.js.outputPath}/*.js`).on('change', browserSync.reload);

	chokidar.watch(`${paths.images.inputSvg}/*.svg`)
		.on('add', () => {gulp.run('svg-sprites');})
		.on('change', () => {gulp.run('svg-sprites');})
		.on('unlink', () => {gulp.run('svg-sprites');})

	chokidar.watch(`${paths.images.inputPath}/**/*.{png,jpg,jpeg,gif}`)
		.on('add', () => {gulp.run('img-min');})
		.on('unlink', () => {gulp.run('img-min');});
		
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


//function for js compile
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

//svg sprites
gulp.task('svg-sprites', () => {
	 gulp.src(`${paths.images.inputSvg}/*.svg`)
		.pipe(svgmin()).on('error', (err) => {console.log(err)})
		.pipe(svgSprite({
			 mode: {
				symbol: true
			}
		}))
		.pipe(gulp.dest('../views/includes'));  
});

gulp.task('img-min', () =>
		gulp.src(`${paths.images.inputPath}/*.{png,jpeg,jpg,gif}`)
				.pipe(imagemin({
					interlaced: true,
					progressive: true,
					optimizationLevel: 5
				}))
				.pipe(gulp.dest(`${paths.images.outputPath}`))
);

//handle error with emit
function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

let tasks = ['del','browser-sync'];

gulp.task('default',tasks);