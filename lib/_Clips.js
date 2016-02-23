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

var _materialUiLibLeftNav = require('material-ui/lib/left-nav');

var _materialUiLibLeftNav2 = _interopRequireDefault(_materialUiLibLeftNav);

var _materialUiLibAppBar = require('material-ui/lib/app-bar');

var _materialUiLibAppBar2 = _interopRequireDefault(_materialUiLibAppBar);

var _materialUiLibListsList = require('material-ui/lib/lists/list');

var _materialUiLibListsList2 = _interopRequireDefault(_materialUiLibListsList);

var _materialUiLibListsListItem = require('material-ui/lib/lists/list-item');

var _materialUiLibListsListItem2 = _interopRequireDefault(_materialUiLibListsListItem);

var _materialUiLibDivider = require('material-ui/lib/divider');

var _materialUiLibDivider2 = _interopRequireDefault(_materialUiLibDivider);

var _materialUiLibStylesColors = require('material-ui/lib/styles/colors');

var _materialUiLibStylesColors2 = _interopRequireDefault(_materialUiLibStylesColors);

var _materialUiLibIconButton = require('material-ui/lib/icon-button');

var _materialUiLibIconButton2 = _interopRequireDefault(_materialUiLibIconButton);

var _materialUiLibSvgIconsActionTheaters = require('material-ui/lib/svg-icons/action/theaters');

var _materialUiLibSvgIconsActionTheaters2 = _interopRequireDefault(_materialUiLibSvgIconsActionTheaters);

var _materialUiLibSvgIconsNavigationMoreVert = require('material-ui/lib/svg-icons/navigation/more-vert');

var _materialUiLibSvgIconsNavigationMoreVert2 = _interopRequireDefault(_materialUiLibSvgIconsNavigationMoreVert);

var _materialUiLibMenusIconMenu = require('material-ui/lib/menus/icon-menu');

var _materialUiLibMenusIconMenu2 = _interopRequireDefault(_materialUiLibMenusIconMenu);

var _materialUiLibMenusMenuItem = require('material-ui/lib/menus/menu-item');

var _materialUiLibMenusMenuItem2 = _interopRequireDefault(_materialUiLibMenusMenuItem);

var _materialUiLibSvgIconsAvPlayCircleFilled = require('material-ui/lib/svg-icons/av/play-circle-filled');

var _materialUiLibSvgIconsAvPlayCircleFilled2 = _interopRequireDefault(_materialUiLibSvgIconsAvPlayCircleFilled);

var _materialUiLibSvgIconsEditorModeEdit = require('material-ui/lib/svg-icons/editor/mode-edit');

var _materialUiLibSvgIconsEditorModeEdit2 = _interopRequireDefault(_materialUiLibSvgIconsEditorModeEdit);

var _materialUiLibSvgIconsContentRemove = require('material-ui/lib/svg-icons/content/remove');

var _materialUiLibSvgIconsContentRemove2 = _interopRequireDefault(_materialUiLibSvgIconsContentRemove);

var _materialUiLibDialog = require('material-ui/lib/dialog');

var _materialUiLibDialog2 = _interopRequireDefault(_materialUiLibDialog);

var _materialUiLibFlatButton = require('material-ui/lib/flat-button');

var _materialUiLibFlatButton2 = _interopRequireDefault(_materialUiLibFlatButton);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _materialUiLibSvgIconsAvVideocam = require('material-ui/lib/svg-icons/av/videocam');

var _materialUiLibSvgIconsAvVideocam2 = _interopRequireDefault(_materialUiLibSvgIconsAvVideocam);

var _reactTagsinput = require('react-tagsinput');

var _reactTagsinput2 = _interopRequireDefault(_reactTagsinput);

var _Clips = _react2['default'].createClass({
    displayName: '_Clips',

    toggleLeftNav: function toggleLeftNav() {
        "use strict";
        this.props.onToggle();
        this.handleClose();
    },
    confirmDelete: function confirmDelete(e) {
        this.setState({
            'delete': true,
            deleteItem: e.currentTarget.id
        });
    },
    getInitialState: function getInitialState() {
        return {
            'delete': false,
            deleteItem: null,
            tags: [],
            clips: this.props.clips
        };
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        this.setState({
            clips: nextProps.clips
        });
    },
    formatTime: function formatTime(value) {
        var startTime = value;

        if (startTime) {
            startTime = (value < 3600 ? '00:' : '') + (value < 60 ? '00:' : '') + _moment2['default'].duration(value, 'seconds').format('H:mm:ss', { forceLength: true });
        }
        return startTime;
    },
    handleClose: function handleClose() {
        var clips = this.state.clips.map(function (clip) {
            delete clip.hide;
            return clip;
        });
        this.setState({
            'delete': false,
            deleteItem: null,
            clips: clips,
            tags: []
        });
    },
    handleDelete: function handleDelete() {
        this.props.onClipDelete(this.state.deleteItem);
        this.handleClose();
    },
    _filterClips: function _filterClips(tags) {
        this.setState({
            tags: tags
        });
        var init = true;
        if (tags.length === 0) {
            init = false;
        }
        var clips = this.state.clips.map(function (clip) {
            clip.hide = init;
            return clip;
        });
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            var _loop = function () {
                var tag = _step.value;

                clips = clips.map(function (clip) {
                    if (clip.tags.indexOf(tag) !== -1) {
                        clip.hide = false;
                    }
                    return clip;
                });
            };

            for (var _iterator = tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                _loop();
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        this.setState({
            clips: clips
        });
    },
    render: function render() {
        var _this = this;

        var iconButtonElement = _react2['default'].createElement(
            _materialUiLibIconButton2['default'],
            {
                touch: true,
                tooltip: 'more',
                tooltipPosition: 'bottom-left',
                disabled: !this.props.edit
            },
            _react2['default'].createElement(_materialUiLibSvgIconsNavigationMoreVert2['default'], { color: _materialUiLibStylesColors2['default'].grey400 })
        );

        var actions = [_react2['default'].createElement(_materialUiLibFlatButton2['default'], {
            label: 'Cancel',
            secondary: true,
            onTouchTap: this.handleClose
        }), _react2['default'].createElement(_materialUiLibFlatButton2['default'], {
            label: 'Ok',
            primary: true,
            keyboardFocused: true,
            onTouchTap: this.handleDelete
        })];

        var clips = this.state.clips.map(function (clip, index) {
            return !clip.hide ? _react2['default'].createElement(_materialUiLibListsListItem2['default'], {
                key: clip.id,
                id: index,
                rightIconButton: _react2['default'].createElement(
                    _materialUiLibMenusIconMenu2['default'],
                    { iconButtonElement: iconButtonElement },
                    _react2['default'].createElement(_materialUiLibMenusMenuItem2['default'], { id: index, primaryText: 'Play', leftIcon: _react2['default'].createElement(_materialUiLibSvgIconsAvPlayCircleFilled2['default'], null), onTouchTap: _this.props.onClipTap }),
                    _react2['default'].createElement(_materialUiLibMenusMenuItem2['default'], { id: index, primaryText: 'Edit', leftIcon: _react2['default'].createElement(_materialUiLibSvgIconsEditorModeEdit2['default'], null), onTouchTap: _this.props.onClipEdit }),
                    _react2['default'].createElement(_materialUiLibMenusMenuItem2['default'], { id: index, primaryText: 'Delete', leftIcon: _react2['default'].createElement(_materialUiLibSvgIconsContentRemove2['default'], null), onTouchTap: _this.confirmDelete })
                ),
                leftIcon: _react2['default'].createElement(_materialUiLibSvgIconsActionTheaters2['default'], { color: _materialUiLibStylesColors2['default'].darkBlack }),
                onTouchTap: _this.props.onClipTap,
                secondaryTextLines: 2,
                primaryText: clip.name,
                secondaryText: _react2['default'].createElement(
                    'p',
                    null,
                    clip.startTime,
                    ' / ',
                    clip.endTime,
                    _react2['default'].createElement('br', null),
                    clip.tags.join()
                )
            }) : null;
        });
        return _react2['default'].createElement(
            _materialUiLibLeftNav2['default'],
            { width: 400, docked: false, openRight: true, open: this.props.open },
            _react2['default'].createElement(_materialUiLibAppBar2['default'], { title: 'Clips', onLeftIconButtonTouchTap: this.toggleLeftNav }),
            _react2['default'].createElement(
                _materialUiLibListsList2['default'],
                { subheader: 'Search by tag...' },
                _react2['default'].createElement(
                    _materialUiLibListsListItem2['default'],
                    null,
                    _react2['default'].createElement(_reactTagsinput2['default'], { value: this.state.tags, onChange: this._filterClips })
                )
            ),
            _react2['default'].createElement(_materialUiLibDivider2['default'], null),
            _react2['default'].createElement(
                _materialUiLibListsList2['default'],
                { subheader: 'Full Video' },
                _react2['default'].createElement(_materialUiLibListsListItem2['default'], {
                    leftIcon: _react2['default'].createElement(_materialUiLibSvgIconsAvVideocam2['default'], { color: _materialUiLibStylesColors2['default'].darkBlack }),
                    onTouchTap: this.props.onFullTap,
                    secondaryTextLines: 1,
                    primaryText: this.props.fullTitle,
                    secondaryText: _react2['default'].createElement(
                        'p',
                        null,
                        this.formatTime(this.props.fullDuration)
                    )
                })
            ),
            _react2['default'].createElement(_materialUiLibDivider2['default'], null),
            _react2['default'].createElement(
                _materialUiLibListsList2['default'],
                { subheader: 'Clips' },
                clips
            ),
            _react2['default'].createElement(_materialUiLibDialog2['default'], {
                title: 'Are you sure?',
                actions: actions,
                modal: false,
                open: this.state['delete'],
                onRequestClose: this.handleClose
            })
        );
    }
});

exports['default'] = _Clips;
module.exports = exports['default'];