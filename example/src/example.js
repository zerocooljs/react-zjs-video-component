var React = require('react');
var ReactDOM = require('react-dom');
var ReactZjsVideoComponent = require('react-zjs-video-component');
var App = React.createClass({
	render () {
		return (
			<div>
				<ReactZjsVideoComponent />
			</div>
		);
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
