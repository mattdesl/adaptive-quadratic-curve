# adaptive-quadratic-curve

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)


Builds a quadratic curve that is adaptive; that is to say, it has more points along curved corners, and less points along straight lines. This can be used to produce scalable curves that are consistently smooth, while using a small number of steps. Based on [AntiGrain](http://antigrain.com/research/adaptive_bezier/).

Also see [adaptive-bezier-curve](https://nodei.co/npm/adaptive-bezier-curve/).

```js
var quadratic = require('adaptive-quadratic-curve')

var start = [20, 20],
    c1 = [100, 159],
    end = [200, 20],
    scale = 2

var points = quadratic(start, c1, end, scale)

//returns a list of 2d points: [ [x,y], [x,y], [x,y] ... ]
```

See [demo/index.js](demo/index.js) for an example with HTML5 canvas.

![img](http://i.imgur.com/JByqVNI.png)

## Usage

[![NPM](https://nodei.co/npm/adaptive-quadratic-curve.png)](https://nodei.co/npm/adaptive-quadratic-curve/)

#### `quadratic(start, c1, end[, scale, points])`

Returns an adaptive quadratic curve for the given three control points. You can specify a `scale` to produce better smoothing for scaled contexts, otherwise it defaults to 1.0.

If you specify a `points` array, the new points will be pushed onto that array (useful for building paths). If you don't specify `points`, a new array will be used.

## License

The AntiGrain 2.4 code is licensed under BSD-3-Clause, see [LICENSE.md](http://github.com/mattdesl/adaptive-bezier-curve/blob/master/LICENSE.md) for details.
