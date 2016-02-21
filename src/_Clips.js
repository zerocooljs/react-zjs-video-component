/**
 * Created by zerocooljs on 2/20/16.
 */
'use strict';
import React from 'react';
import LeftNav from 'material-ui/lib/left-nav';
import AppBar from 'material-ui/lib/app-bar';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';

var _Clips = React.createClass({
    toggleLeftNav(){
        "use strict";
        this.props.onToggle();
    },
    render () {
        let clips = this.props.clips.map(function (clip) {
            return (
                <ListItem
                    primaryText={
                    <div>
                        <span>{clip.startTime}</span>
                        <span>{clip.endTime}</span>
                    </div>
                    }
                />
            );
        });
        return (
            <LeftNav width={400} docked={false} openRight={true} open={this.props.open}>
                <AppBar title="Clips" onLeftIconButtonTouchTap={this.toggleLeftNav}/>
                <List subheader="Recent chats">
                    {clips}
                </List>
            </LeftNav>
        );
    }
});

export default _Clips;