/**
 * Created by zerocooljs on 2/20/16.
 */
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUiLibCardCard = require('material-ui/lib/card/card');

var _materialUiLibCardCard2 = _interopRequireDefault(_materialUiLibCardCard);

var _materialUiLibCardCardMedia = require('material-ui/lib/card/card-media');

var _materialUiLibCardCardMedia2 = _interopRequireDefault(_materialUiLibCardCardMedia);

var _materialUiLibLinearProgress = require('material-ui/lib/linear-progress');

var _materialUiLibLinearProgress2 = _interopRequireDefault(_materialUiLibLinearProgress);

var _materialUiLibStylesColors = require('material-ui/lib/styles/colors');

var _materialUiLibStylesColors2 = _interopRequireDefault(_materialUiLibStylesColors);

var _Video = _react2['default'].createClass({
    displayName: '_Video',

    componentDidUpdate: function componentDidUpdate() {
        this.pauseVideo();
        this.loadVideo();
    },
    getInitialState: function getInitialState() {
        return {
            loaded: false
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        if (nextProps.forceLoaded && nextProps.forceLoaded === true) {
            this.setState({
                loaded: nextProps.forceLoaded
            });
        }
    },
    pauseVideo: function pauseVideo() {
        if (this.props.paused && !this._video.paused) {
            return this._video.pause();
        }
    },
    loadVideo: function loadVideo() {
        if (this.props.loadVideo) {
            this._video.load();
        }
    },
    startLoaded: function startLoaded() {
        this.setState({
            loaded: true
        });
    },
    endLoaded: function endLoaded() {
        this.setState({
            loaded: false
        });
    },
    _trackLoad: function _trackLoad() {
        var cues = track.track.cues,
            cue,
            df = document.createDocumentFragment(),
            totalWidth = markers.offsetWidth,
            duration = cues[cues.length - 1].endTime;
        for (var i = 0; cue = cues[i]; i++) {
            df.appendChild(createMarker(cue, Math.floor(cue.endTime - cue.startTime) / duration * totalWidth - 1));
        }
        markers.appendChild(df);
    },
    render: function render() {
        var _this = this;

        return _react2['default'].createElement(
            _materialUiLibCardCard2['default'],
            null,
            _react2['default'].createElement(
                _materialUiLibCardCardMedia2['default'],
                null,
                _react2['default'].createElement(
                    'div',
                    null,
                    this.state.loaded ? _react2['default'].createElement(_materialUiLibLinearProgress2['default'], { mode: 'indeterminate', color: _materialUiLibStylesColors2['default'].pinkA700, style: { height: 7 } }) : null,
                    _react2['default'].createElement(
                        'video',
                        {
                            width: '100%',
                            onTimeUpdate: this.props.onTimeupdate,
                            ref: function (c) {
                                _this._video = c;
                            },
                            onLoadedMetadata: this.props.onLoadMetaData,
                            src: this.props.videoUrl,
                            onLoadStart: this.startLoaded,
                            onCanPlay: this.endLoaded,
                            onError: this.endLoaded,
                            onCanPlay: this.endLoaded,
                            onSuspend: this.endLoaded,
                            onPause: this.props.onPause,
                            controls: true,
                            autoPlay: true
                        },
                        _react2['default'].createElement('track', { src: 'chapters.vtt', kind: 'chapters', 'default': true, onloadeddata: this._trackLoad })
                    )
                )
            )
        );
    }
});

exports['default'] = _Video;
module.exports = exports['default'];