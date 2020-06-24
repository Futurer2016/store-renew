import { renew } from '../index'

const a = {
  b: { foo: 'foo' },
  c: { bar: 'bar' },
}

const b = renew(a, 'b', {b: 'b'})

const astr = JSON.stringify(a)

console.log('test data: ', a)
console.log('renew data: ', b)
console.log('keyPath b data compare: ', a.b === b.b)
console.log('keyPath c data compare: ', a.c === b.c)
