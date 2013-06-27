"use strict"

var ndarray = require("ndarray")
var cwise = require("cwise")
var ops = require("ndarray-ops")
var pool = require("typedarray-pool")

var phase2_1 = require("./lib/p1.js")
var phase2_2 = require("./lib/p2.js")
var phase2_inf = require("./lib/pinf.js")
var phase2_p = require("./lib/pp.js")

var binarize = cwise({
  args: ["array", "array", "scalar"],
  body: function(out, a, inf) {
    out = a ? 0 : inf
  }
})

function phase1(array, nrows, ncols) {
  var i, j, ptr=0, d, min = Math.min
  for(i=0; i<nrows; ++i) {
    d = array[ptr++]
    for(j=1; j<ncols; ++j) {
      d = min(array[ptr], d+1)
      array[ptr++] = d
    }
    for(j=0; j<ncols; ++j) {
      d = min(array[--ptr], d+1)
      array[ptr] = d
    }
    ptr += ncols
  }
}

module.exports = function distanceTransform(array, p) {
  var d = array.shape.length
    , shape = array.shape.slice(0)
    , stride = new Array(d)
    , size = 1
    , stack_size = 0
    , inf = 0
    , i, j, n, s, tmp, m
  p = p || 2
  for(i=d-1; i>=0; --i) {
    stride[i] = size
    size *= shape[i]
    inf += shape[i]
    stack_size = Math.max(stack_size, shape[i])
  }
  
  //Allocate scratch buffers
  var b0_t = pool.mallocDouble(size)
    , b0 = ndarray(b0_t, shape.slice(0), stride.slice(0), 0)
    , b1_t = pool.mallocDouble(size)
    , b1 = ndarray(b1_t, shape.slice(0), stride.slice(0), 0)
    , s_q = pool.mallocUint32(stack_size)
    , t_q = pool.mallocUint32(stack_size)
  
  //Perform first phase of distance transform
  binarize(b0, array, inf)
  phase1(b0.data, (size/shape[d-1])|0, shape[d-1]|0)
  
  //Second passes
  for(i=d-1; i>0; --i) {
    s = b1.stride
    n = 1
    for(j=i-1; j<d; ++j) {
      s[j] = n
      n *= shape[j]
    }
    for(j=i-2; j>=0; --j) {
      s[j] = n
      n *= shape[j]
    }
    ops.assign(b1, b0)
    
    //Execute phase 2
    m = shape[i-1]
    if(!isFinite(p)) {
      phase2_inf(b1.data, (size/m)|0, m|0, s_q, t_q)
    } else if(p === 1) {
      phase2_1(b1.data, (size/m)|0, m|0, s_q, t_q)
    } else if(p === 2) {
      phase2_2(b1.data, (size/m)|0, m|0, s_q, t_q)
    } else if(p < 1) {
      throw new Error("Values of p < 1 are not supported")
    } else {
      phase2_p(b1.data, (size/m)|0, m|0, s_q, t_q, p)
    }
    
    //Swap buffers
    tmp = b0
    b0 = b1
    b1 = tmp
  }
  
  //Copy b0 to result
  ops.assign(array, b0)
  
  pool.freeDouble(b0_t)
  pool.freeDouble(b1_t)
  pool.freeUint32(s_q)
  pool.freeUint32(t_q)
  return array
}