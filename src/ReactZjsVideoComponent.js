'use strict';

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/lib/app-bar';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Clips from './_Clips';
import Video from './_Video';
import NewClip from './_NewClip';


injectTapEventPlugin();

var ReactZjsVideoComponent = React.createClass({
    toggleLeftNav(){
        this.setState({
            clipsNav: !this.state.clipsNav
        });
    },
    addClip(){
        this.setState({
            newClip: !this.state.newClip,
            pausedVideo: !this.state.pausedVideo,
            startTimeClip: this.state.currentTime
        });

    },
    saveClip(clip){
        let clips = this.state.clips;
        clips.push(clip);
        this.setState({
            clips
        });
        this.addClip();
    },
    timeChanged(e){
        this.setState({
            currentTime: e.target.currentTime
        })
    },
    getInitialState() {
        return {
            clipsNav: false,
            selectedClip: null,
            videoUrl: this.props.videoUrl,
            clips: [],
            currentTime: null,
            pausedVideo: false,
            newClip: false,
            startTimeClip: null,
            duration: null
        };
    },
    videoData(e){
        this.setState({
            duration: Math.floor(e.target.duration)
        });
    },
    render () {
        return (
            <div>
                <AppBar
                    title="Titulo Video 9"
                    className="app_bar"
                    onLeftIconButtonTouchTap={this.toggleLeftNav}
                    iconElementRight={
                    <FloatingActionButton
                        mini={true}
                        onMouseDown={this.addClip}
                    >
                        <ContentAdd />
                    </FloatingActionButton>
                    }
                />
                <Video
                    videoUrl={this.state.videoUrl}
                    onTimeupdate={this.timeChanged}
                    paused={this.state.pausedVideo}
                    onLoadMetaData={this.videoData}
                />
                <Clips
                    open={this.state.clipsNav}
                    onToggle={this.toggleLeftNav}
                    clips={this.state.clips}
                />
                <NewClip
                    open={this.state.newClip}
                    onClose={this.addClip}
                    startTime={this.state.currentTime}
                    onOk={this.saveClip}
                    duration={this.state.duration}
                />
            </div>
        );
    }
});

export default ReactZjsVideoComponent;
