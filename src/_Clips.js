/**
 * Created by zerocooljs on 2/20/16.
 */
'use strict';
import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import AppBar from 'material-ui/lib/app-bar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import Theaters from 'material-ui/lib/svg-icons/action/theaters';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import PlayCircleFilled from 'material-ui/lib/svg-icons/av/play-circle-filled';
import ModeEdit from 'material-ui/lib/svg-icons/editor/mode-edit';
import Remove from 'material-ui/lib/svg-icons/content/remove';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import moment from 'moment';
import VideoCam from 'material-ui/lib/svg-icons/av/videocam';


var _Clips = React.createClass({
    toggleLeftNav(){
        "use strict";
        this.props.onToggle();
    },
    confirmDelete(e){
        this.setState({
            delete: true,
            deleteItem: e.currentTarget.id
        });
    },
    getInitialState(){
        return {
            delete: false,
            deleteItem: null
        };
    },
    formatTime(value) {
        let startTime = value;

        if (startTime) {
            startTime = ((value < 3600) ? '00:' : '')
                + ((value < 60) ? '00:' : '')
                + moment.duration(value, 'seconds').format('H:mm:ss', {forceLength: true});
        }
        return startTime;
    },
    handleClose(){
        this.setState({
            delete: false,
            deleteItem: null
        });
    },
    handleDelete(){
        this.props.onClipDelete(this.state.deleteItem);
        this.handleClose();
    },
    render () {
        const iconButtonElement = (
            <IconButton
                touch={true}
                tooltip="more"
                tooltipPosition="bottom-left"
                disabled={!this.props.edit}
            >
                <MoreVertIcon color={Colors.grey400}/>
            </IconButton>
        );

        const actions = [
            <FlatButton
                label="Cancel"
                secondary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Ok"
                primary={true}
                keyboardFocused={true}
                onTouchTap={this.handleDelete}
            />
        ];

        let clips = this.props.clips.map((clip, index) => {
            return (
                <ListItem
                    key={clip.id}
                    id={index}
                    rightIconButton={
                    <IconMenu iconButtonElement={iconButtonElement}>
                        <MenuItem id={index} primaryText="Play" leftIcon={<PlayCircleFilled />} onTouchTap={this.props.onClipTap} />
                        <MenuItem id={index} primaryText="Edit" leftIcon={<ModeEdit />} onTouchTap={this.props.onClipEdit} />
                        <MenuItem id={index} primaryText="Delete" leftIcon={<Remove />} onTouchTap={this.confirmDelete} />
                    </IconMenu>
                    }
                    leftIcon={<Theaters color={Colors.darkBlack} />}
                    onTouchTap={this.props.onClipTap}
                    secondaryTextLines={1}
                    primaryText={clip.name}
                    secondaryText={
                        <p>
                          {clip.startTime} / {clip.endTime}
                        </p>
                    }
                />
            );
        });
        return (
            <LeftNav width={400} docked={false} openRight={true} open={this.props.open}>
                <AppBar title="Clips" onLeftIconButtonTouchTap={this.toggleLeftNav}/>
                <List subheader="Full Video">
                    <ListItem
                        leftIcon={<VideoCam color={Colors.darkBlack} />}
                        onTouchTap={this.props.onFullTap}
                        secondaryTextLines={1}
                        primaryText={this.props.fullTitle}
                        secondaryText={
                            <p>
                              {this.formatTime(this.props.fullDuration)}
                            </p>
                        }
                    />
                </List>
                <Divider />
                <List subheader="Clips">
                    {clips}
                </List>
                <Dialog
                    title="Are you sure?"
                    actions={actions}
                    modal={false}
                    open={this.state.delete}
                    onRequestClose={this.handleClose}
                />
            </LeftNav>
        );
    }
});

export default _Clips;