/**
 * Created by zerocooljs on 2/20/16.
 */
'use strict';
import React from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';

var _Video = React.createClass({
    componentDidMount(){
        this.pauseVideo();
    },
    componentDidUpdate(){
        this.pauseVideo();
    },
    pauseVideo(){
        if(this.props.paused && !this._video.paused){
            return this._video.pause();
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
                            controls
                        >
                            <source src={this.props.videoUrl}/>
                        </video>
                    </div>
                </CardMedia>
            </Card>
        );
    }
});

export default _Video;