'use strict';

import React from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppBar from 'material-ui/lib/app-bar';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Clips from './_Clips';
import Video from './_Video';
import NewClip from './_NewClip';
import _ from 'underscore';
import moment from 'moment';
import {HotKeys} from 'react-hotkeys';
import LocalStorageMixin from 'react-localstorage';
import shortid from 'shortid';


injectTapEventPlugin();

var ReactZjsVideoComponent = React.createClass({
    mixins: [LocalStorageMixin],
    toggleLeftNav(force){
        if (typeof force !== 'undefined') {
            return this.setState({
                clipsNav: force
            });
        }
        this.setState({
            clipsNav: !this.state.clipsNav
        });
    },
    getLocalStorageKey(){
        return `zjs-video-${this.props.name}`;
    },
    addClip(){
        this.setState({
            newClip: !this.state.newClip,
            pausedVideo: !this.state.pausedVideo,
            modifyClip: null
        });
    },
    saveClip(clip){
        let clips = this.state.clips;
        clip.id   = (clip.id) ? clip.id : `zjs-clip-${shortid.generate()}`;
        let exist = _.findIndex(clips, (obj)=> {
            return clip.id === obj.id;
        });
        if (exist === -1) {
            clips.push(clip);
        } else {
            clips[ exist ] = clip;
        }
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
            duration: null,
            suffixUrl: '',
            loadClip: false,
            clipSelected: null
        };
    },
    getDefaultProps(){
        return {
            edit: true,
            stateFilterKeys: ['clips']
        }
    },
    videoData(e){
        this.setState({
            duration: Math.floor(e.target.duration)
        });
    },
    clipTap(e){
        this.clipPlay(e.currentTarget.id);
    },
    clipPlay(index){
        let clip = this.state.clips[ index ];
        this.setState({
            loadClip: true,
            suffixUrl: `#t=${clip.startTime},${clip.endTime}`,
            clipSelected: clip
        }, ()=> {
            this.toggleLeftNav(false);
            this.setState({
                loadClip: false
            });
        });
    },
    fullPlay(){
        this.setState({
            loadClip: true,
            suffixUrl: '',
            clipSelected: null
        }, ()=> {
            this.toggleLeftNav();
            this.setState({
                loadClip: false
            });
        });
    },
    editClip(e){
        let clip = this.state.clips[ e.currentTarget.id ];
        this.setState({
            newClip: !this.state.newClip,
            pausedVideo: !this.state.pausedVideo,
            modifyClip: clip
        }, ()=> {
            this.toggleLeftNav();
        });
    },
    deleteClip(index){
        let clips = this.state.clips;
        clips.splice(index,1);
        this.setState({
            clips
        });
    },
    pauseVideo(){
        if (this.state.clipSelected) {
            let time  = moment(this.state.clipSelected.endTime, 'HH:mm:ss');
            let total = time.second() + time.minute() * 60 + time.hour() * 3600;
            if (Math.abs(this.state.currentTime - total) < 0.99999) {
                this.nextClip(true);
            }
        }
    },
    nextClip(wait){
        if (!this.state.clipSelected) {
            return;
        }
        let index = _.findIndex(this.state.clips, (obj)=> {
            return this.state.clipSelected.id === obj.id;
        });
        index++;
        if (index === this.state.clips.length) {
            return;
        }
        this.setState({
            forceLoaded: true
        }, ()=> {
            this.setState({
                forceLoaded: false
            });
            if(wait) {
                return setTimeout(()=> {
                    this.clipPlay(index)
                }, 3000);
            }
            this.clipPlay(index)
        });


    },
    previousClip(){
        if (!this.state.clipSelected) {
            return;
        }
        let index = _.findIndex(this.state.clips, (obj)=> {
            return this.state.clipSelected.id === obj.id;
        });
        index--;
        if (index === -1) {
            return;
        }
        this.setState({
            forceLoaded: true
        }, ()=> {
            this.setState({
                forceLoaded: false
            });
            this.clipPlay(index);
        });


    },
    render () {
        const keyMap   = {
            'nextClip': 'shift+ctrl+right',
            'previousClip': 'shift+ctrl+left'
        };
        const handlers = {
            'nextClip': this.nextClip,
            'previousClip': this.previousClip
        };
        return (
            <HotKeys keyMap={keyMap} handlers={handlers}>
                <div>
                    <AppBar
                        title={this.props.title}
                        className="app_bar"
                        onLeftIconButtonTouchTap={this.toggleLeftNav}
                        iconElementRight={
                    <FloatingActionButton
                        mini={true}
                        onMouseDown={this.addClip}
                        disabled={!this.props.edit}
                    >
                        <ContentAdd />
                    </FloatingActionButton>
                    }
                    />
                    <Video
                        videoUrl={this.state.videoUrl + this.state.suffixUrl}
                        onTimeupdate={this.timeChanged}
                        paused={this.state.pausedVideo}
                        onLoadMetaData={this.videoData}
                        loadVideo={this.state.loadClip}
                        onPause={this.pauseVideo}
                        forceLoaded={this.state.forceLoaded}
                    />
                    <Clips
                        open={this.state.clipsNav}
                        onToggle={this.toggleLeftNav}
                        clips={this.state.clips}
                        onFullTap={this.fullPlay}
                        onClipTap={this.clipTap}
                        onClipEdit={this.editClip}
                        onClipDelete={this.deleteClip}
                        fullTitle={this.props.title}
                        fullDuration={this.state.duration}
                        edit={this.props.edit}
                    />
                    <NewClip
                        open={this.state.newClip}
                        onClose={this.addClip}
                        startTime={this.state.currentTime}
                        onOk={this.saveClip}
                        duration={this.state.duration}
                        clip={this.state.modifyClip}
                    />
                </div>
            </HotKeys>
        );
    }
});

export default ReactZjsVideoComponent;
