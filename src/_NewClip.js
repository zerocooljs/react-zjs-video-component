/**
 * Created by zerocooljs on 2/21/16.
 */
'use strict';
import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
require('moment-duration-format');
var moment = require('moment');

var _NewClip = React.createClass({
    getStartTime(value) {
        let startTime = value;

        if (startTime) {
            startTime = ((value < 3600) ? '00:' : '')
                + ((value < 60) ? '00:' : '')
                + moment.duration(value, 'seconds').format('H:mm:ss', {forceLength: true});
        }
        return startTime;
    }, getInitialState(){
        let startTime = this.getStartTime(this.props.startTime);
        return {
            startTime,
            endTime: null,
            errorStart: null,
            errorEnd: null
        }
    },
    saveClip(){
        this.props.onOk({
            startTime: this.state.startTime,
            endTime: this.state.endTime
        });
    },
    componentWillReceiveProps(nextProps){
        let startTime = this.getStartTime(nextProps.startTime);
        this.setState({
            startTime
        });
    },
    _handleChangeTime(e){
        let startTime = (e.target.id === 'startTime') ? e.target.value : this.state.startTime;
        let endTime   = (e.target.id === 'endTime') ? e.target.value : this.state.endTime;
        //TODO Validate end and start time.
        this.setState({
            startTime,
            endTime
        });
    },
    render(){
        const actions    = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.props.onClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.saveClip}
            />
        ];
        const floatStyle = {
            top: 25
        };
        return (
            <Dialog
                title="New Clip"
                actions={actions}
                open={this.props.open}
                modal={true}
            >
                <div>
                    <TextField
                        id="startTime"
                        hintText="00:00:00"
                        errorText={this.state.errorStart}
                        floatingLabelText="Start time"
                        floatingLabelStyle={floatStyle}
                        value={this.state.startTime}
                        onChange={this._handleChangeTime}
                    />
                    <br/>
                    <TextField
                        id="endTime"
                        hintText="00:00:00"
                        errorText={this.state.errorEnd}
                        floatingLabelText="End time"
                        floatingLabelStyle={floatStyle}
                        onChange={this._handleChangeTime}
                    />
                    <br/>
                </div>

            </Dialog>
        );
    }
});

export default _NewClip;
