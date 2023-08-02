# videojs-casting

Video.js plugin for casting via AirPlay and (hopefully soon) Chromecast

## Table of Contents

<!-- START doctoc -->
<!-- END doctoc -->
## Installation

> Temporary until published

```sh
npm install kevireilly/videojs-casting
```

> This plugin isn't published just yet

```sh
npm install --save videojs-casting
```

## Usage

To include videojs-casting on your website or web application, use any of the following methods.

### `<script>` Tag
> For now, you'd need to `npm run build` and use the assets out of the dist, cjs, or es directories.

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-casting.min.js"></script>
<link href="//path/to/videojs-casting.css" rel="stylesheet">
<script>
  var player = videojs('my-video');
  player.casting();
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-casting via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-casting');
var player = videojs('my-video');
player.casting();
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-casting'], function(videojs) {
  var player = videojs('my-video');
  player.casting();
});
```

## Try it
To try AirPlay on a demo video page:
```
git clone https://github.com/kevireilly/videojs-casting.git
cd videojs-casting
npm install
npm start
```
Navigate to `http:1.2.3.4:9999` on your AirPlay capable device or browser (Safari).

## License

UNLICENSED. Copyright (c) Kevin Reilly


[videojs]: http://videojs.com/
