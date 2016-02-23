/**
 * Created by zerocooljs on 2/20/16.
 */
'use strict';
import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import LinearProgress from 'material-ui/lib/linear-progress';
import Colors from 'material-ui/lib/styles/colors';


var _Video = React.createClass({
    componentDidUpdate(){
        this.pauseVideo();
        this.loadVideo();
    },
    getInitialState() {
      return {
          loaded: false
      }
    },
    componentWillReceiveProps(nextProps){
        if(nextProps.forceLoaded && nextProps.forceLoaded === true){
            this.setState({
                loaded: nextProps.forceLoaded
            });
        }
    },
    pauseVideo(){
        if(this.props.paused && !this._video.paused){
            return this._video.pause();
        }
    },
    loadVideo(){
        if(this.props.loadVideo){
            this._video.load();
        }
    },
    startLoaded(){
      this.setState({
          loaded: true
      });
    },
    endLoaded(){
        this.setState({
            loaded: false
        });
    },
    _trackLoad() {
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
    render(){
        return (
            <Card>
                <CardMedia>
                    <div>
                        {(this.state.loaded)?<LinearProgress mode="indeterminate" color={Colors.pinkA700} style={{height: 7}} />:null}
                        <video
                            width="100%"
                            onTimeUpdate={this.props.onTimeupdate}
                            ref={c=>{this._video = c}}
                            onLoadedMetadata={this.props.onLoadMetaData}
                            src={this.props.videoUrl}
                            onLoadStart={this.startLoaded}
                            onCanPlay={this.endLoaded}
                            onError={this.endLoaded}
                            onCanPlay={this.endLoaded}
                            onSuspend={this.endLoaded}
                            onPause={this.props.onPause}
                            controls
                            autoPlay
                        >
                            <track src="chapters.vtt" kind="chapters" default onloadeddata={this._trackLoad} />
                        </video>
                    </div>
                </CardMedia>
            </Card>
        );
    }
});

export default _Video;