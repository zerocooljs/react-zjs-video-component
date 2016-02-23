# zjs-react-videoComponent

__React component with the feature of save clips.__


## Demo & Examples

Live demo: [zerocooljs.github.io/react-zjs-video-component](http://zerocooljs.github.io/react-zjs-video-component/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use zjs-react-videoComponent is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-zjs-video-component.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install zjs-react-videoComponent --save
```


## Usage

__You only have to import the component and use it.__

```
import ZjsReactVideoComponent from 'zjs-react-videoComponent';

<ZjsReactVideoComponent
	videoUrl="path/to/video.mp4"
	title="Title of Video"
	name="demo"
	edit={true}
/>
```

### Properties

* __*videoUrl:* Path or URL of the video.__
* __*title:* Title for the interface.__
* __*name:* Unique name to keep persitent of clips.__
* __*edit:* Set if you want that the component only reproduce clips.__

### Notes

__Please include these 2 tags at the HEAD__

```
<link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Roboto:300,400,500,700" type="text/css">
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
```

## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

## License

__MIT__

Copyright (c) 2016 Jose Santacruz.

