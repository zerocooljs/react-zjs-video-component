var gulp          = require('gulp');
var initGulpTasks = require('react-component-gulp-tasks');
var less          = require('gulp-less');
var rename        = require('gulp-rename');
var connect       = require('gulp-connect');


/**
 * Tasks are added by the react-component-gulp-tasks package
 *
 * See https://github.com/JedWatson/react-component-gulp-tasks
 * for documentation.
 *
 * You can also add your own additional gulp tasks if you like.
 */

var config = {

    component: {
        name: 'ReactZjsVideoComponent',
        dependencies: [
            'classnames',
            'react',
            'react-dom',
            'material-ui/lib/app-bar'
        ],
        less: {
            path: 'less',
            entry: 'ReactZjsVideoComponent.less'
        },
        lib: 'lib'
    },

    example: {
        src: 'example/src',
        dist: 'example/dist',
        files: [
            'index.html',
            '.gitignore'
        ],
        scripts: [
            'example.js'
        ],
        less: [
            'example.less'
        ]
    }

};

initGulpTasks(gulp, config);
gulp.task('slpa:dev:css', function () {
    if (config.component.less && config.component.less.entry) {
        return gulp.src(config.component.less.path + '/' + config.component.less.entry)
            .pipe(less())
            .pipe(rename('bundle.css'))
            .pipe(gulp.dest(config.example.dist))
            .pipe(connect.reload());
    }
});
gulp.task('slpa:dev:reload', [ 'build:example:scripts' ], function () {
    connect.reload();
});
gulp.task('slpa:dev:watch', function () {
    gulp.watch(config.component.src + '/**/*.js', [ 'slpa:dev:reload' ]);
});
gulp.task('start', [ 'dev', 'slpa:dev:css', 'slpa:dev:watch' ]);
