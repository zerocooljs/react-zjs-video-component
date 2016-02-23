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
        name: 'ZjsReactVideo',
        dependencies: [
            'classnames',
            'react',
            'react-dom',
            'react-tap-event-plugin',
            'material-ui/lib/app-bar',
            'material-ui/lib/floating-action-button',
            'material-ui/lib/svg-icons/content/add',
            'material-ui/lib/dialog',
            'material-ui/lib/flat-button',
            'material-ui/lib/card/card',
            'material-ui/lib/card/card-media',
            'material-ui/lib/text-field',
            'material-ui/lib/lists/list',
            'material-ui/lib/lists/list-item',
            'material-ui/lib/divider',
            'inputmask-core',
            'material-ui/lib/styles/colors',
            'material-ui/lib/icon-button',
            'material-ui/lib/svg-icons/navigation/more-vert',
            'material-ui/lib/menus/icon-menu',
            'material-ui/lib/menus/menu-item',
            'material-ui/lib/svg-icons/action/theaters',
            'material-ui/lib/svg-icons/av/play-circle-filled',
            'material-ui/lib/svg-icons/editor/mode-edit',
            'material-ui/lib/svg-icons/content/remove',
            'material-ui/lib/svg-icons/av/videocam',
            'material-ui/lib/linear-progress',
            'react-hotkeys',
            'react-localstorage',
            'react-tagsinput',
            'material-ui/lib/badge'
        ],
        less: {
            path: 'less',
            entry: 'ZjsReactVideo.js.less'
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
