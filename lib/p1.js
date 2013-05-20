"use strict"

var abs = Math.abs

function dist_1(a, b) {
  return abs(a) + abs(b)
}

function dist_1_sep(i, u, g_i, g_u) {
  if (g_u >= (g_i + u - i)) {
    return 1<<30
  } else if (g_i > (g_u + u - i)) {
    return -(1<<30)
  } else {
    return (g_u - g_i + u + i)>>1
  }
}

module.exports = function phase2_1(array, nrows, ncols, s, t) {
  var d, u, v, w, q, y, ptr
  t[0] = 0
  for(y=0; y<nrows; ++y) {
    //Clear stack
    s[0] = q = 0
    ptr = y * ncols
    
    //First pass: generate hull
    for(u=1; u<ncols; ++u) {
      v = array[ptr+u]
      while(q >= 0 && dist_1(s[q] - t[q], array[ptr+s[q]]) > dist_1(u - t[q], v)) {
        --q
      }
      if(q < 0) {
        q = 0
        s[0] = u
      } else {
        w = 1 + dist_1_sep(s[q], u, array[ptr+s[q]], v)
        if(w < ncols) {
          ++q
          s[q] = u
          t[q] = w
        }
      }
    }
    
    //Second pass: fill in lower hull
    for(u=ncols-1; u>=0; --u) {
      d = dist_1(s[q] - u, array[ptr+s[q]])
      array[u+ptr] = d
      if(u === t[q]) {
        --q
      }
    }
  }
}