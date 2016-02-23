'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactTapEventPlugin = require('react-tap-event-plugin');

var _reactTapEventPlugin2 = _interopRequireDefault(_reactTapEventPlugin);

var _materialUiLibAppBar = require('material-ui/lib/app-bar');

var _materialUiLibAppBar2 = _interopRequireDefault(_materialUiLibAppBar);

var _materialUiLibFloatingActionButton = require('material-ui/lib/floating-action-button');

var _materialUiLibFloatingActionButton2 = _interopRequireDefault(_materialUiLibFloatingActionButton);

var _materialUiLibSvgIconsContentAdd = require('material-ui/lib/svg-icons/content/add');

var _materialUiLibSvgIconsContentAdd2 = _interopRequireDefault(_materialUiLibSvgIconsContentAdd);

var _Clips = require('./_Clips');

var _Clips2 = _interopRequireDefault(_Clips);

var _Video = require('./_Video');

var _Video2 = _interopRequireDefault(_Video);

var _NewClip = require('./_NewClip');

var _NewClip2 = _interopRequireDefault(_NewClip);

var _underscore = require('underscore');

var _underscore2 = _interopRequireDefault(_underscore);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactHotkeys = require('react-hotkeys');

var _reactLocalstorage = require('react-localstorage');

var _reactLocalstorage2 = _interopRequireDefault(_reactLocalstorage);

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _materialUiLibBadge = require('material-ui/lib/badge');

var _materialUiLibBadge2 = _interopRequireDefault(_materialUiLibBadge);

var _materialUiLibIconButton = require('material-ui/lib/icon-button');

var _materialUiLibIconButton2 = _interopRequireDefault(_materialUiLibIconButton);

var _materialUiLibSvgIconsAvSubscriptions = require('material-ui/lib/svg-icons/av/subscriptions');

var _materialUiLibSvgIconsAvSubscriptions2 = _interopRequireDefault(_materialUiLibSvgIconsAvSubscriptions);

(0, _reactTapEventPlugin2['default'])();

var ReactZjsVideoComponent = _react2['default'].createClass({
    displayName: 'ReactZjsVideoComponent',

    mixins: [_reactLocalstorage2['default']],
    toggleLeftNav: function toggleLeftNav(force) {
        if (typeof force !== 'undefined') {
            return this.setState({
                clipsNav: force
            });
        }
        this.setState({
            clipsNav: !this.state.clipsNav
        });
    },
    getLocalStorageKey: function getLocalStorageKey() {
        return 'zjs-video-' + this.props.name;
    },
    addClip: function addClip() {
        this.setState({
            newClip: !this.state.newClip,
            pausedVideo: !this.state.pausedVideo,
            modifyClip: null
        });
    },
    saveClip: function saveClip(clip) {
        var clips = this.state.clips;
        clip.id = clip.id ? clip.id : 'zjs-clip-' + _shortid2['default'].generate();
        var exist = _underscore2['default'].findIndex(clips, function (obj) {
            return clip.id === obj.id;
        });
        if (exist === -1) {
            clips.push(clip);
        } else {
            clips[exist] = clip;
        }
        this.setState({
            clips: clips
        });
        this.addClip();
    },
    timeChanged: function timeChanged(e) {
        this.setState({
            currentTime: e.target.currentTime
        });
    },
    getInitialState: function getInitialState() {
        return {
            clipsNav: false,
            selectedClip: null,
            videoUrl: this.props.videoUrl,
            clips: [],
            currentTime: null,
            pausedVideo: false,
            newClip: false,
            duration: null,
            suffixUrl: '',
            loadClip: false,
            clipSelected: null
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            edit: true,
            stateFilterKeys: ['clips']
        };
    },
    videoData: function videoData(e) {
        this.setState({
            duration: Math.floor(e.target.duration)
        });
    },
    clipTap: function clipTap(e) {
        this.clipPlay(e.currentTarget.id);
    },
    clipPlay: function clipPlay(index) {
        var _this = this;

        var clip = this.state.clips[index];
        this.setState({
            loadClip: true,
            suffixUrl: '#t=' + clip.startTime + ',' + clip.endTime,
            clipSelected: clip
        }, function () {
            _this.toggleLeftNav(false);
            _this.setState({
                loadClip: false
            });
        });
    },
    fullPlay: function fullPlay() {
        var _this2 = this;

        this.setState({
            loadClip: true,
            suffixUrl: '',
            clipSelected: null
        }, function () {
            _this2.toggleLeftNav();
            _this2.setState({
                loadClip: false
            });
        });
    },
    editClip: function editClip(e) {
        var _this3 = this;

        var clip = this.state.clips[e.currentTarget.id];
        this.setState({
            newClip: !this.state.newClip,
            pausedVideo: !this.state.pausedVideo,
            modifyClip: clip
        }, function () {
            _this3.toggleLeftNav();
        });
    },
    deleteClip: function deleteClip(index) {
        var clips = this.state.clips;
        clips.splice(index, 1);
        this.setState({
            clips: clips
        });
    },
    pauseVideo: function pauseVideo() {
        if (this.state.clipSelected) {
            var time = (0, _moment2['default'])(this.state.clipSelected.endTime, 'HH:mm:ss');
            var total = time.second() + time.minute() * 60 + time.hour() * 3600;
            if (Math.abs(this.state.currentTime - total) < 0.99999) {
                this.nextClip(true);
            }
        }
    },
    nextClip: function nextClip(wait) {
        var _this4 = this;

        if (!this.state.clipSelected) {
            return;
        }
        var index = _underscore2['default'].findIndex(this.state.clips, function (obj) {
            return _this4.state.clipSelected.id === obj.id;
        });
        index++;
        if (index === this.state.clips.length) {
            return;
        }
        this.setState({
            forceLoaded: true
        }, function () {
            _this4.setState({
                forceLoaded: false
            });
            if (wait) {
                return setTimeout(function () {
                    _this4.clipPlay(index);
                }, 3000);
            }
            _this4.clipPlay(index);
        });
    },
    previousClip: function previousClip() {
        var _this5 = this;

        if (!this.state.clipSelected) {
            return;
        }
        var index = _underscore2['default'].findIndex(this.state.clips, function (obj) {
            return _this5.state.clipSelected.id === obj.id;
        });
        index--;
        if (index === -1) {
            return;
        }
        this.setState({
            forceLoaded: true
        }, function () {
            _this5.setState({
                forceLoaded: false
            });
            _this5.clipPlay(index);
        });
    },
    render: function render() {
        var keyMap = {
            'nextClip': 'shift+ctrl+right',
            'previousClip': 'shift+ctrl+left'
        };
        var handlers = {
            'nextClip': this.nextClip,
            'previousClip': this.previousClip
        };
        return _react2['default'].createElement(
            _reactHotkeys.HotKeys,
            { keyMap: keyMap, handlers: handlers },
            _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(_materialUiLibAppBar2['default'], {
                    title: this.props.title,
                    className: 'app_bar',
                    onLeftIconButtonTouchTap: this.toggleLeftNav,
                    iconElementRight: _react2['default'].createElement(
                        _materialUiLibFloatingActionButton2['default'],
                        {
                            mini: true,
                            onMouseDown: this.addClip,
                            disabled: !this.props.edit
                        },
                        _react2['default'].createElement(_materialUiLibSvgIconsContentAdd2['default'], null)
                    )
                }),
                _react2['default'].createElement(_Video2['default'], {
                    videoUrl: this.state.videoUrl + this.state.suffixUrl,
                    onTimeupdate: this.timeChanged,
                    paused: this.state.pausedVideo,
                    onLoadMetaData: this.videoData,
                    loadVideo: this.state.loadClip,
                    onPause: this.pauseVideo,
                    forceLoaded: this.state.forceLoaded
                }),
                _react2['default'].createElement(_Clips2['default'], {
                    open: this.state.clipsNav,
                    onToggle: this.toggleLeftNav,
                    clips: this.state.clips,
                    onFullTap: this.fullPlay,
                    onClipTap: this.clipTap,
                    onClipEdit: this.editClip,
                    onClipDelete: this.deleteClip,
                    fullTitle: this.props.title,
                    fullDuration: this.state.duration,
                    edit: this.props.edit
                }),
                _react2['default'].createElement(_NewClip2['default'], {
                    open: this.state.newClip,
                    onClose: this.addClip,
                    startTime: this.state.currentTime,
                    onOk: this.saveClip,
                    duration: this.state.duration,
                    clip: this.state.modifyClip
                })
            )
        );
    }
});

exports['default'] = ReactZjsVideoComponent;
module.exports = exports['default'];