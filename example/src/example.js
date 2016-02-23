var React = require('react');
var ReactDOM = require('react-dom');
var ZjsReactVideo = require('zjs-react-video');
var App = React.createClass({
	render () {
		return (
			<div>
				<ZjsReactVideo
					videoUrl="http://grochtdreis.de/fuer-jsfiddle/video/sintel_trailer-480.mp4"
					title="Demo Title"
					name="demo"
					edit={true}
				/>
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
