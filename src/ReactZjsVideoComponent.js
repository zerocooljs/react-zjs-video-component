'use strict';

import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';

var ReactZjsVideoComponent = React.createClass({
    render () {
        let cardStyle = {
            paddingTop: 50
        };
        return (
            <div>
                <Card>
                    <CardHeader>
                        <AppBar
                            title="Titulo Video 7"
                            className="app_bar"
                        />
                    </CardHeader>
                    <CardMedia>
                        <div style={cardStyle}>
                            <video width="100%" controls>
                                <source src="http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4"/>
                            </video>
                        </div>
                    </CardMedia>
                </Card>
            </div>);
    }
});

export default ReactZjsVideoComponent;
