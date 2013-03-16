var _ = require('underscore')

/*
 * Returns whether d1 and d2 overlap
 */
var overlap = function (d1, d2) {
  return (d1.left + d1.width) > d2.left &&
         d1.left < (d2.left + d2.width) &&
         (d1.top + d1.height) > d2.top &&
         d1.top < (d2.top + d2.height)
}

var overlaps = function (candidate, others) {
  var overlapped = []
  others.forEach(function (other) {
    if (overlap(other, candidate)) {
      // If it's overlapped and add it to the set
      overlapped.push(other)
    }
  })

  // Now remove all from others
  overlapped.forEach(function (overlapped) {
    others.splice(others.indexOf(overlapped), 1)
  })

  return overlapped
}

var search = function s(candidates, others) {
  var results = candidates

  if (candidates.length === 0) return results

  candidates.forEach(function (candidate) {
    var immediateBastards = overlaps(candidate, others)
    results = results.concat(s(immediateBastards, others))
  })

  return results
}

/*
 * Initialize magellan with some objects.
 * Each object needs to have top, left, width, and height properties
 */
var Magellan = function (objs) {
  objs = Array.prototype.slice.call(arguments)
  this.objs = []
  if (objs && this.validate(objs)) {
    this.objs = objs
  }
}

/*
 * Add an object to the set of all objects we track
 * Again, it needs to have top, left, width and height properties
 */
Magellan.prototype.add = function () {
  var objs = Array.prototype.slice.call(arguments)
  if (this.validate(objs)) {
    this.objs = this.objs.concat(objs)
  }
}

/*
 * Returns all objects which are connected to the received
 * test candidates. They are connected if their areas intersect.
 */
Magellan.prototype.explore = function () {
  var candidates = Array.prototype.slice.call(arguments)
    , others =  _.difference(this.objs, candidates) // Others contains all the objects we need to test -- it shrinks over time

  return _.uniq(search(candidates, others))
}

/*
 * Validate each object has the necessary properties for determing if
 * they are connected
 */
Magellan.prototype.validate = function (objs) {
  objs.forEach(function (obj) {
    var props = ['top', 'left', 'width', 'height']
    props.forEach(function (prop) {
      if (!obj.hasOwnProperty(prop)) {
        throw new Error('Missing needed property ' + prop)
      }
    })
  })
  return true
}

module.exports = Magellan
