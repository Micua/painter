/**
 * Gulp File
 * @Author: iceStone
 * @Date:   2015-11-25 22:37:51
 * @Last Modified by:   iceStone
 * @Last Modified time: 2016-02-20 10:59:42
 */

'use strict';

const gulp = require('gulp');
const asar = require('asar');
const electron = require('gulp-electron');
const clean = require('gulp-clean');
const packageJson = require('./package.json');

gulp.task('dist', () => {
  asar.createPackage('./app', './dist/app.asar', () => {
    console.log('done core asar.');
  });
});

gulp.task('release', () => {
  gulp.src('')
    .pipe(electron({
      src: './dist/',
      packageJson: packageJson,
      release: './release',
      cache: './cache',
      version: 'v0.36.10',
      packaging: true,
      platforms: ['darwin-x64'],
      platformResources: {
        darwin: {
          CFBundleDisplayName: packageJson.name,
          CFBundleIdentifier: packageJson.name,
          CFBundleName: packageJson.name,
          CFBundleVersion: packageJson.version,
          icon: 'icon/app.icns'
        }
      }
    }))
    .pipe(gulp.dest(''));
});

gulp.task('clean', () => {
  gulp.src(['./release', './app.asar'], { read: false })
    .pipe(clean({ force: true }));
});
