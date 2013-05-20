"use strict"

var abs = Math.abs
var max = Math.max
var min = Math.min

function dist_inf(a, b) {
  return max(abs(a), abs(b))
}

function dist_inf_sep(i, u, g_i, g_u) {
  if (g_i <= g_u) {
    return max(i+g_u, (i+u)>>1)
  } else {
    return min(u-g_i, (i+u)>>1)
  }
}

module.exports = function phase2_inf(array, nrows, ncols, s, t) {
  var d, u, v, w, q, y, ptr
  t[0] = 0
  for(y=0; y<nrows; ++y) {
    //Clear stack
    s[0] = q = 0
    ptr = y * ncols
    
    //First pass: generate hull
    for(u=1; u<ncols; ++u) {
      v = array[ptr+u]
      while(q >= 0 && dist_inf(s[q] - t[q], array[ptr+s[q]]) > dist_inf(u - t[q], v)) {
        --q
      }
      if(q < 0) {
        q = 0
        s[0] = u
      } else {
        w = 1 + dist_inf_sep(s[q], u, array[ptr+s[q]], v)
        if(w < ncols) {
          ++q
          s[q] = u
          t[q] = w
        }
      }
    }
    
    //Second pass: fill in lower hull
    for(u=ncols-1; u>=0; --u) {
      d = dist_inf(s[q] - u, array[ptr+s[q]])
      array[u+ptr] = d
      if(u === t[q]) {
        --q
      }
    }
  }
}