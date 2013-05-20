"use strict"

var bisect = require("bisect")
var pow = Math.pow
var abs = Math.abs
var floor = Math.floor

function dist_p(a, b, p) {
  return pow(abs(a), p) + pow(abs(b), p)
}

module.exports = function phase2_p(array, nrows, ncols, s, t, p) {
  var d, u, v, w, q, y, ptr, i, gi, gu
  
  function f(x) {
    return pow(abs(x-i), p) + pow(abs(gi), p) > pow(abs(x-u), p) + pow(abs(gu), p)
  }
  
  //Not super efficient, but good enough for now
  function dist_p_sep() {
    i = s[q]
    gi = array[ptr+i]
    gu = v
    var t = bisect(f, i, u+1, 0.25)
    return Math.floor(t)
  }
  
  t[0] = 0
  for(y=0; y<nrows; ++y) {
    //Clear stack
    s[0] = q = 0
    ptr = y * ncols
    
    //First pass: generate hull
    for(u=1; u<ncols; ++u) {
      v = array[ptr+u]
      while(q >= 0 && dist_p(s[q] - t[q], array[ptr+s[q]], p) > dist_p(u - t[q], v, p)) {
        --q
      }
      if(q < 0) {
        q = 0
        s[0] = u
      } else {
        w = 1 + dist_p_sep()
        if(w < ncols) {
          ++q
          s[q] = u
          t[q] = w
        }
      }
    }
    
    //Second pass: fill in lower hull
    for(u=ncols-1; u>=0; --u) {
      d = pow(dist_p(s[q] - u, array[ptr+s[q]], p), 1.0/p)
      array[u+ptr] = d
      if(u === t[q]) {
        --q
      }
    }
  }
}