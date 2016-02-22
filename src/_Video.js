/**
 * Created by zerocooljs on 2/20/16.
 */
'use strict';
import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';

var _Video = React.createClass({
    componentDidMount(){
//         this._video.load();
//         this.pauseVideo();
    },
    componentDidUpdate(){
//         this._video.load();
        this.pauseVideo();
        this.loadVideo();
    },
    pauseVideo(){
        if(this.props.paused && !this._video.paused){
            return this._video.pause();
        }
    },
    loadVideo(){
        if(this.props.loadVideo){
            this._video.load();
            this._video.play();
        }
    },
    render(){
        return (
            <Card>
                <CardMedia>
                    <div>
                        <video
                            width="100%"
                            onTimeUpdate={this.props.onTimeupdate}
                            ref={c=>{this._video = c}}
                            onLoadedMetadata={this.props.onLoadMetaData}
                            src={this.props.videoUrl}
                            controls
                            autoPlay
                        >
                        </video>
                    </div>
                </CardMedia>
            </Card>
        );
    }
});

export default _Video;