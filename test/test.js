"use strict"
var ndarray = require("ndarray")
var ops = require("ndarray-ops")
var dt = require("../dt.js")
var zeros = require("zeros")
var almostEqual = require("almost-equal")

require("tape")("distance-transform", function(t) {

  //1D
  var x = zeros([2])
  x.set(0, 1)
  dt(x)
  t.equals(x.get(0), 0)
  t.equals(x.get(1), 1)
  
  ops.assigns(x, 0)
  x.set(0, 1)
  dt(x, 1)
  t.equals(x.get(0), 0)
  t.equals(x.get(1), 1)

  ops.assigns(x, 0)
  x.set(0, 1)
  dt(x, Infinity)
  t.equals(x.get(0), 0)
  t.equals(x.get(1), 1)

  ops.assigns(x, 0)
  x.set(0, 1)
  dt(x, 3)
  t.equals(x.get(0), 0)
  t.equals(x.get(1), 1)
  
  
  //2D
  x = zeros([2, 2])
  x.set(0, 0, 1)
  dt(x)
  t.equals(x.get(1, 1), Math.sqrt(2.0))
  
  ops.assigns(x, 0)
  x.set(0, 0, 1)
  dt(x, 1)
  t.equals(x.get(1, 1), 2)
  
  ops.assigns(x, 0)
  x.set(0, 0, 1)
  dt(x, Infinity)
  t.equals(x.get(1, 1), 1)
  
  ops.assigns(x, 0)
  x.set(0, 0, 1)
  dt(x, 3)
  t.equals(x.get(1, 1), Math.pow(2, 1.0/3.0))

  ops.assigns(x, 0)
  x.set(1, 1, 1)
  dt(x, 3)
  t.equals(x.get(0, 0), Math.pow(2, 1.0/3.0))
  
  
  
  
  //3D
  x = zeros([2,2,2])
  x.set(0, 0, 0, 1)
  dt(x)
  t.assert(almostEqual(x.get(1,1,1), Math.sqrt(3.0), almostEqual.FLT_EPSILON, almostEqual.FLT_EPSILON))
  
  ops.assigns(x, 0)
  x.set(0, 0, 0, 1)
  dt(x, 1)
  t.equals(x.get(1, 1, 1), 3)
  
  ops.assigns(x, 0)
  x.set(0, 0, 0, 1)
  dt(x, Infinity)
  t.equals(x.get(1, 1, 1), 1)
  
  ops.assigns(x, 0)
  x.set(0, 0, 0, 1)
  dt(x, 3)
  t.equals(x.get(1, 1, 1), Math.pow(3, 1.0/3.0))

  
      
  
  //4D
  x = zeros([2,2,2,2])
  x.set(0, 0, 0, 0, 1)
  dt(x)
  t.equals(x.get(1,1,1,1), 2.0)

  ops.assigns(x, 0)
  x.set(0, 0, 0, 0, 1)
  dt(x, 1)
  t.equals(x.get(1, 1, 1, 1), 4)

  ops.assigns(x, 0)
  x.set(0, 0, 0, 0, 1)
  dt(x, Infinity)
  t.equals(x.get(1, 1, 1, 1), 1)

  ops.assigns(x, 0)
  x.set(0, 0, 0, 0, 1)
  dt(x, 3)
  t.equals(x.get(1, 1, 1, 1), Math.pow(4, 1.0/3.0))
  

  t.end()
})