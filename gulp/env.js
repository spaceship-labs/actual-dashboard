var gulpNgConfig = require('gulp-ng-config');
var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

gulp.task('config', function () {
  var config = require('../src/app/config.json');
  var env = process.env.NODE_ENV || 'dev';
  var envConfig = config[env];
  envConfig.name = env;
  gulp.src(path.join(conf.paths.src, '/app/config.json'))
    .pipe(gulpNgConfig('envconfig', {
      constants: {
        ENV: envConfig
      }
    }))
    .pipe(gulp.dest(path.join(conf.paths.src, '/app/')));
});

