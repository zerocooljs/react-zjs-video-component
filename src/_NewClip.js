/**
 * Created by zerocooljs on 2/21/16.
 */
'use strict';
import React from 'react';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import InputMask from 'inputmask-core';
import moment from 'moment';
require('moment-duration-format');

var _NewClip = React.createClass({
    getStartTime(value) {
        let startTime = value;

        if (startTime) {
            startTime = ((value < 3600) ? '00:' : '')
                + ((value < 60) ? '00:' : '')
                + moment.duration(value, 'seconds').format('H:mm:ss', {forceLength: true});
        }
        return startTime;
    },
    getInitialState(){
        let clip = this.props.clip;
        if (!clip) {
            let startTime = this.getStartTime(this.props.startTime);
            return {
                startTime,
                endTime: null,
                name: null,
                errorStart: null,
                errorEnd: null,
                errorName: null,
                canSave: false,
                id: null
            }
        }

        return {
            startTime: clip.startTime,
            endTime: clip.endTime,
            name: clip.name,
            errorStart: null,
            errorEnd: null,
            errorName: null,
            canSave: false,
            id: clip.id
        }


    },
    saveClip(){
        this.props.onOk({
            id: this.state.id,
            name: this.state.name,
            startTime: this.state.startTime,
            endTime: this.state.endTime
        });
        this._resetState();
    },
    componentWillReceiveProps(nextProps){
        let startTime = this.getStartTime(nextProps.startTime);
        let clip      = nextProps.clip;
        if(clip){
            return this.setState({
                startTime: clip.startTime,
                endTime: clip.endTime,
                name: clip.name,
                id: clip.id,
                canSave: true
            });
        }
        this.setState({
            startTime
        });

    },
    _handleChange(e){
        if (e.target.id === 'startTime' || e.target.id === 'endTime') {
            let mask = new InputMask({pattern: '11:11:11'});
            if (!mask.paste(e.target.value)) {
                e.target.value = this.state[ e.target.id ];
            }
        }
        let startTime = (e.target.id === 'startTime') ? e.target.value : this.state.startTime;
        let endTime   = (e.target.id === 'endTime') ? e.target.value : this.state.endTime;
        let name      = (e.target.id === 'name') ? e.target.value : this.state.name;
        this.setState({
            startTime,
            endTime,
            name
        }, this._validate);
    },
    _validate(){
        let name  = this._validateName();
        let start = this._validateStart();
        let end   = this._validateEnd();
        let dates = this._validateDates(start && end);
        this.setState({
            canSave: name && start && end && dates
        });
        return name && start && end && dates;
    },
    _validateName(){
        let errorName = null;
        if (!this.state.name) {
            errorName = "Name can't be empty.";
        }
        this.setState({
            errorName
        });
        return !errorName;
    },
    _validateStart(){
        let errorStart = null;
        if (!this.state.startTime) {
            errorStart = "Start Time  can't be empty.";
        }
        if (!errorStart) {
            if (!/([0-9][0-9])(:[0-5][0-9])(:[0-5][0-9])$/.test(this.state.startTime)) {
                errorStart = 'Start Time must be on HH:mm:ss format.'
            }
        }
        if (!errorStart) {
            let time     = moment(this.state.startTime, 'HH:mm:ss');
            let total    = time.second() + time.minute() * 60 + time.hour() * 3600;
            let duration = ((this.props.duration < 3600) ? '00:' : '')
                + ((this.props.duration < 60) ? '00:' : '')
                + moment.duration(this.props.duration, 'seconds').format('H:mm:ss', {forceLength: true});
            if (total >= this.props.duration) {
                errorStart = `Start Time must be lower than the Video length ${duration}.`
            }
        }
        this.setState({
            errorStart
        });
        return !errorStart;
    },
    _validateEnd(){
        let errorEnd = null;
        if (!this.state.endTime) {
            errorEnd = "End Time can't be empty.";
        }
        if (!errorEnd) {
            if (!/([0-9][0-9])(:[0-5][0-9])(:[0-5][0-9])$/.test(this.state.endTime)) {
                errorEnd = 'End Time must be on HH:mm:ss format.'
            }
        }
        if (!errorEnd) {
            let time     = moment(this.state.endTime, 'HH:mm:ss');
            let total    = time.second() + time.minute() * 60 + time.hour() * 3600;
            let duration = ((this.props.duration < 3600) ? '00:' : '')
                + ((this.props.duration < 60) ? '00:' : '')
                + moment.duration(this.props.duration, 'seconds').format('H:mm:ss', {forceLength: true});
            if (total > this.props.duration) {
                errorEnd = `End Time van't be greater than the Video length ${duration}.`
            }
        }
        this.setState({
            errorEnd
        });
        return !errorEnd;
    },
    _validateDates(exec){
        let errorStart = null;
        let errorEnd   = null;

        if (!exec) {
            return false;
        }

        let startTime  = moment(this.state.startTime, 'HH:mm:ss');
        let startTotal = startTime.second() + startTime.minute() * 60 + startTime.hour() * 3600;
        let endTime    = moment(this.state.endTime, 'HH:mm:ss');
        let endTotal   = endTime.second() + endTime.minute() * 60 + endTime.hour() * 3600;
        if (startTotal > endTotal) {
            errorStart = `Start Time must be lower than End Time ${this.state.endTime}.`;
            errorEnd   = `End Time must be greater than Start Time ${this.state.startTime}.`;
        }
        this.setState({
            errorEnd,
            errorStart
        });
        return !errorEnd || !errorStart;
    }
    ,
    _cancel()
    {
        this._resetState();
        this.props.onClose();
    }
    ,
    _resetState(){
        this.setState({
            startTime: null,
            endTime: null,
            name: null,
            errorStart: null,
            errorEnd: null,
            errorName: null,
            canSave: false,
            id: null
        });
    },
    render()
    {
        const actions    = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this._cancel}
            />,
            <FlatButton
                label={(this.state.id)?'Modify':'Add'}
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.saveClip}
                disabled={!this.state.canSave}
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
                        id="name"
                        hintText="Summer Vacations"
                        errorText={this.state.errorName}
                        floatingLabelText="Name"
                        floatingLabelStyle={floatStyle}
                        value={this.state.name}
                        onChange={this._handleChange}
                        fullWidth={true}
                    />
                    <br />
                    <TextField
                        id="startTime"
                        hintText="00:00:00"
                        errorText={this.state.errorStart}
                        floatingLabelText="Start time"
                        floatingLabelStyle={floatStyle}
                        value={this.state.startTime}
                        onChange={this._handleChange}
                    />
                    <br />
                    <TextField
                        id="endTime"
                        hintText="00:00:00"
                        errorText={this.state.errorEnd}
                        floatingLabelText="End time"
                        floatingLabelStyle={floatStyle}
                        value={this.state.endTime}
                        onChange={this._handleChange}
                    />
                    <br/>
                </div>

            </Dialog>
        );
    }
});

export default _NewClip;
