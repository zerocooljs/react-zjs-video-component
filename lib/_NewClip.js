/**
 * Created by zerocooljs on 2/21/16.
 */
'use strict';
Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _materialUiLibDialog = require('material-ui/lib/dialog');

var _materialUiLibDialog2 = _interopRequireDefault(_materialUiLibDialog);

var _materialUiLibFlatButton = require('material-ui/lib/flat-button');

var _materialUiLibFlatButton2 = _interopRequireDefault(_materialUiLibFlatButton);

var _materialUiLibTextField = require('material-ui/lib/text-field');

var _materialUiLibTextField2 = _interopRequireDefault(_materialUiLibTextField);

var _inputmaskCore = require('inputmask-core');

var _inputmaskCore2 = _interopRequireDefault(_inputmaskCore);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactTagsinput = require('react-tagsinput');

var _reactTagsinput2 = _interopRequireDefault(_reactTagsinput);

require('moment-duration-format');

var _NewClip = _react2['default'].createClass({
    displayName: '_NewClip',

    getStartTime: function getStartTime(value) {
        var startTime = value;

        if (startTime) {
            startTime = (value < 3600 ? '00:' : '') + (value < 60 ? '00:' : '') + _moment2['default'].duration(value, 'seconds').format('H:mm:ss', { forceLength: true });
        }
        return startTime;
    },
    getInitialState: function getInitialState() {
        var clip = this.props.clip;
        if (!clip) {
            var startTime = this.getStartTime(this.props.startTime);
            return {
                startTime: startTime,
                endTime: null,
                name: null,
                errorStart: null,
                errorEnd: null,
                errorName: null,
                canSave: false,
                id: null,
                tags: []
            };
        }
        return {
            startTime: clip.startTime,
            endTime: clip.endTime,
            name: clip.name,
            errorStart: null,
            errorEnd: null,
            errorName: null,
            canSave: false,
            id: clip.id,
            tags: clip.tags
        };
    },
    saveClip: function saveClip() {
        this.props.onOk({
            id: this.state.id,
            name: this.state.name,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            tags: this.state.tags
        });
        this._resetState();
    },
    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
        var startTime = this.getStartTime(nextProps.startTime);
        var clip = nextProps.clip;
        if (clip) {
            return this.setState({
                startTime: clip.startTime,
                endTime: clip.endTime,
                name: clip.name,
                id: clip.id,
                tags: clip.tags,
                canSave: true
            });
        }
        this.setState({
            startTime: startTime
        });
    },
    _handleChange: function _handleChange(e) {
        if (e.target.id === 'startTime' || e.target.id === 'endTime') {
            var mask = new _inputmaskCore2['default']({ pattern: '11:11:11' });
            if (!mask.paste(e.target.value)) {
                e.target.value = this.state[e.target.id];
            }
        }
        var startTime = e.target.id === 'startTime' ? e.target.value : this.state.startTime;
        var endTime = e.target.id === 'endTime' ? e.target.value : this.state.endTime;
        var name = e.target.id === 'name' ? e.target.value : this.state.name;
        this.setState({
            startTime: startTime,
            endTime: endTime,
            name: name
        }, this._validate);
    },
    _validate: function _validate() {
        var name = this._validateName();
        var start = this._validateStart();
        var end = this._validateEnd();
        var dates = this._validateDates(start && end);
        this.setState({
            canSave: name && start && end && dates
        });
        return name && start && end && dates;
    },
    _validateName: function _validateName() {
        var errorName = null;
        if (!this.state.name) {
            errorName = "Name can't be empty.";
        }
        this.setState({
            errorName: errorName
        });
        return !errorName;
    },
    _validateStart: function _validateStart() {
        var errorStart = null;
        if (!this.state.startTime) {
            errorStart = "Start Time  can't be empty.";
        }
        if (!errorStart) {
            if (!/([0-9][0-9])(:[0-5][0-9])(:[0-5][0-9])$/.test(this.state.startTime)) {
                errorStart = 'Start Time must be on HH:mm:ss format.';
            }
        }
        if (!errorStart) {
            var time = (0, _moment2['default'])(this.state.startTime, 'HH:mm:ss');
            var total = time.second() + time.minute() * 60 + time.hour() * 3600;
            var duration = (this.props.duration < 3600 ? '00:' : '') + (this.props.duration < 60 ? '00:' : '') + _moment2['default'].duration(this.props.duration, 'seconds').format('H:mm:ss', { forceLength: true });
            if (total >= this.props.duration) {
                errorStart = 'Start Time must be lower than the Video length ' + duration + '.';
            }
        }
        this.setState({
            errorStart: errorStart
        });
        return !errorStart;
    },
    _validateEnd: function _validateEnd() {
        var errorEnd = null;
        if (!this.state.endTime) {
            errorEnd = "End Time can't be empty.";
        }
        if (!errorEnd) {
            if (!/([0-9][0-9])(:[0-5][0-9])(:[0-5][0-9])$/.test(this.state.endTime)) {
                errorEnd = 'End Time must be on HH:mm:ss format.';
            }
        }
        if (!errorEnd) {
            var time = (0, _moment2['default'])(this.state.endTime, 'HH:mm:ss');
            var total = time.second() + time.minute() * 60 + time.hour() * 3600;
            var duration = (this.props.duration < 3600 ? '00:' : '') + (this.props.duration < 60 ? '00:' : '') + _moment2['default'].duration(this.props.duration, 'seconds').format('H:mm:ss', { forceLength: true });
            if (total > this.props.duration) {
                errorEnd = 'End Time van\'t be greater than the Video length ' + duration + '.';
            }
        }
        this.setState({
            errorEnd: errorEnd
        });
        return !errorEnd;
    },
    _validateDates: function _validateDates(exec) {
        var errorStart = null;
        var errorEnd = null;

        if (!exec) {
            return false;
        }

        var startTime = (0, _moment2['default'])(this.state.startTime, 'HH:mm:ss');
        var startTotal = startTime.second() + startTime.minute() * 60 + startTime.hour() * 3600;
        var endTime = (0, _moment2['default'])(this.state.endTime, 'HH:mm:ss');
        var endTotal = endTime.second() + endTime.minute() * 60 + endTime.hour() * 3600;
        if (startTotal > endTotal) {
            errorStart = 'Start Time must be lower than End Time ' + this.state.endTime + '.';
            errorEnd = 'End Time must be greater than Start Time ' + this.state.startTime + '.';
        }
        this.setState({
            errorEnd: errorEnd,
            errorStart: errorStart
        });
        return !errorEnd || !errorStart;
    },

    _cancel: function _cancel() {
        this._resetState();
        this.props.onClose();
    },

    _resetState: function _resetState() {
        this.setState({
            startTime: null,
            endTime: null,
            name: null,
            errorStart: null,
            errorEnd: null,
            errorName: null,
            canSave: false,
            id: null,
            tags: []
        });
    },
    _handleTags: function _handleTags(tags) {
        this.setState({
            tags: tags
        });
    },
    render: function render() {
        var actions = [_react2['default'].createElement(_materialUiLibFlatButton2['default'], {
            label: 'Cancel',
            secondary: true,
            onTouchTap: this._cancel
        }), _react2['default'].createElement(_materialUiLibFlatButton2['default'], {
            label: this.state.id ? 'Modify' : 'Add',
            primary: true,
            keyboardFocused: true,
            onTouchTap: this.saveClip,
            disabled: !this.state.canSave
        })];
        var floatStyle = {
            top: 25
        };
        return _react2['default'].createElement(
            _materialUiLibDialog2['default'],
            {
                title: 'New Clip',
                actions: actions,
                open: this.props.open,
                modal: true
            },
            _react2['default'].createElement(
                'div',
                null,
                _react2['default'].createElement(_materialUiLibTextField2['default'], {
                    id: 'name',
                    hintText: 'Summer Vacations',
                    errorText: this.state.errorName,
                    floatingLabelText: 'Name',
                    floatingLabelStyle: floatStyle,
                    value: this.state.name,
                    onChange: this._handleChange,
                    fullWidth: true
                }),
                _react2['default'].createElement('br', null),
                _react2['default'].createElement(_materialUiLibTextField2['default'], {
                    id: 'startTime',
                    hintText: '00:00:00',
                    errorText: this.state.errorStart,
                    floatingLabelText: 'Start time',
                    floatingLabelStyle: floatStyle,
                    value: this.state.startTime,
                    onChange: this._handleChange
                }),
                _react2['default'].createElement('br', null),
                _react2['default'].createElement(_materialUiLibTextField2['default'], {
                    id: 'endTime',
                    hintText: '00:00:00',
                    errorText: this.state.errorEnd,
                    floatingLabelText: 'End time',
                    floatingLabelStyle: floatStyle,
                    value: this.state.endTime,
                    onChange: this._handleChange
                }),
                _react2['default'].createElement('br', null),
                _react2['default'].createElement('br', null),
                _react2['default'].createElement(
                    'label',
                    { 'class': 'mdl-textfield__label', 'for': 'tagsInput' },
                    'Tags...'
                ),
                _react2['default'].createElement(_reactTagsinput2['default'], { id: 'tagsInput', value: this.state.tags, onChange: this._handleTags })
            )
        );
    }
});

exports['default'] = _NewClip;
module.exports = exports['default'];