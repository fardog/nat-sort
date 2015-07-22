import test from 'tape'

import nsort from './lib'
import {compare, _arrayify, _process} from './lib'

import fixture from './test/fixture.json'

test('_process strips strings as necessary', function(t) {
  t.equal(_process('The Thing'), 'Thing')
  t.equal(_process('A Thing 1'), 'Thing 1')
  t.equal(_process('a thing and an apple'), 'thing and an apple')
  t.equal(_process(1), '1')
  t.equal(_process('a good   thing'), 'good thing')
  t.equal(_process('good   thing  too'), 'good thing too')
  t.equal(_process('(1997)'), '1997')

  t.end()
})

test('_arrayify makes arrays from not arrays', function(t) {
  t.deepEqual(_arrayify([]), [])
  t.deepEqual(_arrayify(1), [1])
  t.deepEqual(_arrayify('something'), ['something'])
  t.deepEqual(_arrayify(['a', 'b']), ['a', 'b'])
  t.deepEqual(_arrayify({beep: 'boop'}), [{beep: 'boop'}])

  t.end()
})

test('compares correctly', function(t) {
  t.equal(compare('A Thing', 'thing'), 0)
  t.equal(compare('A Banana', 'An Apple'), 1)
  t.equal(compare('banana', 'An Apple'), 1)
  t.equal(compare('Apple Sauce', 'Apple Juice'), 1)
  t.equal(compare('Apple Juice', 'Apple Sauce'), -1)
  t.equal(compare('1997', '1998'), -1)
  t.equal(compare('1', '20'), -1)
  t.equal(compare('file 20', 'file 100'), -1)
  t.equal(compare('file 100', 'file 20'), 1)
  t.equal(compare('file 20', 'file 20.01'), -1)
  t.equal(compare('file 20.01', 'file 20.001'), 1)
  t.equal(compare('file 20.01', 'file 21'), -1)
  t.equal(compare('file 20.01 21', 'file 21'), -1)
  t.equal(compare('file 21 20.01', 'file 21'), 1)
  t.equal(compare('beep 22', 'boop 21'), -1)

  t.end()
})

test('sorts arrays', function(t) {
  t.deepEqual(nsort(fixture.first.test), fixture.first.expected)
  t.deepEqual(nsort(fixture.second.test), fixture.second.expected)

  t.end()
})

test('can use comparison function directly', function(t) {
  t.deepEqual(fixture.first.test.sort(compare), fixture.first.expected)

  t.end()
})
