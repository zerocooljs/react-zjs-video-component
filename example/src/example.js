var React = require('react');
var ReactDOM = require('react-dom');
var ReactZjsVideoComponent = require('react-zjs-video-component');
var App = React.createClass({
	render () {
		return (
			<div>
				<ReactZjsVideoComponent videoUrl="http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4" />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
