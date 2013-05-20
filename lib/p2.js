"use strict"

function dist_2(a, b) {
  return a * a + b * b
}

function dist_2_sep(i, u, g_i, g_u) {
  return ((u*u - i*i + g_u*g_u - g_i*g_i) / (2*(u-i)))|0
}

module.exports = function phase2_2(array, nrows, ncols, s, t) {
  var d, u, v, w, q, y, ptr
  t[0] = 0
  for(y=0; y<nrows; ++y) {
    //Clear stack
    s[0] = q = 0
    ptr = y * ncols
    
    //First pass: generate hull
    for(u=1; u<ncols; ++u) {
      v = array[ptr+u]
      while(q >= 0 && dist_2(s[q] - t[q], array[ptr+s[q]]) > dist_2(u - t[q], v)) {
        --q
      }
      if(q < 0) {
        q = 0
        s[0] = u
      } else {
        w = 1 + dist_2_sep(s[q], u, array[ptr+s[q]], v)
        if(w < ncols) {
          ++q
          s[q] = u
          t[q] = w
        }
      }
    }
    
    //Second pass: fill in lower hull
    for(u=ncols-1; u>=0; --u) {
      d = Math.sqrt(dist_2(s[q] - u, array[ptr+s[q]]))
      array[u+ptr] = d
      if(u === t[q]) {
        --q
      }
    }
  }
}