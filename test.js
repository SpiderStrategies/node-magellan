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

  it('no overlays', function () {
    var magellan = new Magellan({top: 100, left: 100, width: 100, height: 100},
                                {top: 500, left: 500, width: 100, height: 100})
    var connections = magellan.explore(magellan.objs[0])
    assert.equal(connections.length, 1)
    assert.deepEqual(connections[0], {top: 100, left: 100, width: 100, height: 100})
    assert.deepEqual(connections[0], magellan.objs[0])
  })

  it('simple overlay condition', function () {
    var first = magellan.objs[0]
    var connections = magellan.explore(first)
    assert.equal(connections.length, 2)

    assert.deepEqual(connections[0], {top: 100, left: 100, width: 100, height: 100})
    assert.deepEqual(connections[1], {top: 100, left: 150, width: 200, height: 100})
  })

  it('3 connected', function () {
    magellan.add({top: 100, left: 300, width: 100, height: 100})
    var connections = magellan.explore(magellan.objs[0])
    assert.equal(connections.length, 3)
    assert.deepEqual(connections[0], {top: 100, left: 100, width: 100, height: 100})
    assert.deepEqual(connections[1], {top: 100, left: 150, width: 200, height: 100})
    assert.deepEqual(connections[2], {top: 100, left: 300, width: 100, height: 100})
  })

  it('base wob with two direct connections', function () {
    var magellan = new Magellan({height: 226, width: 217, top: 89, left: 512},
                                {left: 337, top: 229, width:214, height: 322},
                                {height: 200, width: 200, top: 150, left: 180})
    var connections = magellan.explore(magellan.objs[1])

    assert.equal(connections.length, 3)

  })

  beforeEach(function () {
    magellan = new Magellan({top: 100, left: 100, width: 100, height: 100},
                            {top: 500, left: 500, width: 100, height: 100},
                            {top: 100, left: 150, width: 200, height: 100})
  })

})
