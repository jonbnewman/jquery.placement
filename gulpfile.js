var gulp = require('gulp');
var header = require('gulp-header');
var fileImports = require('gulp-imports');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var bump = require('gulp-bump');
var size = require('gulp-size');
var mochaPhantomJS = require('gulp-mocha-phantomjs');
var merge = require('merge-stream');
var runSequence = require('run-sequence');

var pkg = require('./package.json');
var reporter = 'list';
var args   = require('yargs').argv;

var headerBanner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * Author: <%= pkg.author %>',
  ' * Version: v<%= pkg.version %>',
  ' * Url: <%= pkg.homepage %>',
  ' * License(s): <% pkg.licenses.forEach(function( license, idx ){ %><%= license.type %><% if(idx !== pkg.licenses.length-1) { %>, <% } %><% }); %>',
  ' */',
  '', ''
];

gulp.task('default', ['build-and-test']);

// Testing tasks
gulp.task('ci', ['build-and-test']);

gulp.task('build-and-test', ['test']);
gulp.task('test', ['build'], function() {
  return gulp
    .src('spec/runner.html')
    .pipe(mochaPhantomJS({ reporter: reporter }));
});

gulp.task('build', function() {
  var banner = headerBanner.join('\n');
  return gulp
    .src(['source/jquery.placement.js'])
    .pipe(header(banner, { year: (new Date()).getFullYear(), pkg: pkg }))
    .pipe(fileImports())
    .pipe(size())
    .pipe(gulp.dest('dist/'))
    .pipe(uglify({
      compress: { negate_iife: false }
    }))
    .pipe(header(banner, { year: (new Date()).getFullYear(), pkg: pkg }))
    .pipe(rename('jquery.placement.min.js'))
    .pipe(size({ title: 'Minified' }))
    .pipe(size({ title: 'Minified', gzip: true }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('readyRelease', function(callback) {
  runSequence('set_version', 'test', callback);
});

gulp.task('set_version', function() {
  var version = pkg.version;
  if(typeof args.ver !== 'undefined') {
    version = args.ver;
    pkg.version = version;
  }

  return merge(
    gulp.src(['docs/package.json', 'docs/bower.json'])
      .pipe(bump({ version: version }))
      .pipe(gulp.dest('./docs')),
    gulp.src(['./package.json', './bower.json'])
      .pipe(bump({ version: version }))
      .pipe(gulp.dest('./'))
  );
});

gulp.task('bump', function () {
  return gulp.src(['./package.json', './bower.json'])
    .pipe(bump())
    .pipe(gulp.dest('./'));
});