var Magellan = require('./index')
  , assert = require('assert')

describe('magellan', function () {
  var magellan

  it('function adds', function () {
    assert.equal(magellan.objs.length, 3)
    magellan.add({top: 300, left: 0, width: 100, height: 100})
    assert.equal(magellan.objs.length, 4)
  })

  it('throws error if object is missing properties', function () {
    assert.throws(function () { magellan.add({}) })
  })

  it.only('simple overlay condition', function () {
    var connections = magellan.explore({top: 100, left: 100, width: 100, height: 100})
    assert.equal(connections.length, 2)

    assert.deepEqual(connections[0], {top: 100, left: 100, width: 100, height: 100})
    assert.deepEqual(connections[1], {top: 100, left: 150, width: 200, height: 100})
  })

  it('3 connected', function () {
    magellan.add({top: 100, left: 300, width: 100, height: 100})
    var connections = magellan.explore({top: 100, left: 100, width: 100, height: 100})
    assert.equal(connections.length, 3)
    assert.deepEqual(connections[0], {top: 100, left: 100, width: 100, height: 100})
    assert.deepEqual(connections[1], {top: 100, left: 150, width: 200, height: 100})
    assert.deepEqual(connections[1], {top: 100, left: 300, width: 100, height: 100})
  })

  beforeEach(function () {
    magellan = new Magellan({top: 100, left: 100, width: 100, height: 100},
                                {top: 500, left: 500, width: 100, height: 100},
                                {top: 100, left: 150, width: 200, height: 100})
  })

})
