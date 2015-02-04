var gulp = require('gulp');
var sass = require('gulp-sass');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');
var mainBowerFiles = require('main-bower-files');
var uglify = require('gulp-uglify');
var colors = require('colors');
// var removeEmptyLines = require('gulp-remove-empty-lines');

var errorHandler = function(err) {
	console.log("[SASS Error]".yellow + " " + err.toString().red);
}

gulp.task('bower-files', function(){
	// gulp.src(mainBowerFiles({ filter: /.*\.js$/i }))
	// 	.pipe(concat('vendor.js'))
	// 	.pipe(uglify())
	// 	.pipe(gulp.dest('./lib/js'));
	// CSS
	gulp.src(mainBowerFiles({ filter: /.*\.css$/i }))
		// .pipe(concat('vendor.css'))
		.pipe(gulp.dest('./app')); // OLD PATH = './lib/css'
});

gulp.task('styles', function(){
	return gulp.src('app/scss/app.scss') // OLD PATH = 'lib/css/''
		.pipe(sass({ outputStyle: 'compressed', onError: errorHandler }))
		// .pipe(removeEmptyLines())
		.pipe(gulp.dest('app')) // OLD PATH = 'lib/css'
		.pipe(livereload({ auto: false }));
});

gulp.task('watch', function(){
	livereload.listen();

	gulp.watch([ 'app/scss/**/*.scss' ], ['styles']); // OLD PATH = 'lib/css'

	// gulp.watch('bower.json', ['bower-files']);
});

gulp.task('default', ['styles', 'watch']);