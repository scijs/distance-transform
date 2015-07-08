distance-transform
==================
[Distance transforms](http://en.wikipedia.org/wiki/Distance_transform) for [Lp metrics](https://en.wikipedia.org/wiki/Lp_space) on binary [ndarrays](https://github.com/mikolalysenko/ndarray).  This code is based on Meijster's algorithm.  For more information see:

* https://github.com/parmanoir/Meijster-distance
* http://dissertations.ub.rug.nl/FILES/faculties/science/2004/a.meijster/c2.pdf

[![build status](https://secure.travis-ci.org/scijs/distance-transform.png)](http://travis-ci.org/scijs/distance-transform)

## Example

```javascript
//Generate some shape as a binary voxel image
var x = require("ndarray").zeros([256, 256])
x.set(128, 128, 1)

//Distance transform x in the Euclidean metric
require("distance-transform")(x)

//Save result
require("save-pixels")(x, "png").pipe(process.stdout)
```

#### Output

<img src="https://raw.github.com/mikolalysenko/distance-transform/master/example/example.png">

## Install
Install using [npm](https://www.npmjs.com/):

    npm install distance-transform

## API
#### `require("distance-transform")(array[, p])`
Performs a distance transform of `array` in place using Meijster's algorithm.

* `array` is the array to transform
* `p` is the exponent for the metric.  (Default 2)

For different values of p you get different transforms

* `p = 1` gives the Manhattan/taxicab distance metric
* `p = 2` gives the Euclidean distance metric
* `p = Infinity` gives the Chebyshev/chessboard distance metric
* Other values of p give various interpolants

`array` is updated in place and gets the distance values.

## License
(c) 2013 Mikola Lysenko. MIT License.
