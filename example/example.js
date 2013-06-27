//Generate some shape as a binary voxel image
var x = require("zeros")([256, 256])
x.set(128, 128, 1)

//Distance transform
require("../dt.js")(x)

//Save result
require("save-pixels")(x, "png").pipe(process.stdout)