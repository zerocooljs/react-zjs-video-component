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


var _Clips = React.createClass({
    toggleLeftNav(){
        "use strict";
        this.props.onToggle();
    },
    render () {
        const iconButtonElement = (
            <IconButton
                touch={true}
                tooltip="more"
                tooltipPosition="bottom-left"
            >
                <MoreVertIcon color={Colors.grey400} />
            </IconButton>
        );

        const rightIconMenu = (
            <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem>Play</MenuItem>
                <MenuItem>Edit</MenuItem>
                <MenuItem>Delete</MenuItem>
            </IconMenu>
        );
        let clips = this.props.clips.map( (clip, index) => {
            return (
                <ListItem
                    key={clip.id}
                    id={index}
                    rightIconButton={rightIconMenu}
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
                        primaryText="Full Video"
                    />
                </List>
                <Divider />
                <List subheader="Clips">
                    {clips}
                </List>
            </LeftNav>
        );
    }
});

export default _Clips;