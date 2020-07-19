# store-renew

when you are coding with redux, you may need to return a new state every time you deel with a reducer, just like this.
```js
const reducer = (state, { payload }) => {
  return {
    ...state,
    list: state.list.concat(payload)
  }
}
```
It's too difficult to produce a state in a new object instance, especially when you are deeling with a property in a deep object "keyPath", `store-renew` is just made to fix this, it allow you to return property's "keyPath" in current state and a new property diffrent from old one in an array, for example.
you can use like this
```js
import { renew } from 'store-renew'
const reducer = (state, { payload }) => renew(state, `list`, state.list.concat(payload))
```
or even like below, they has the same effects
```js
import { reduce } from 'store-renew'
const reducer = reduce((state, { payload }) => [`list`, state.list.concat(payload)])
```
when you need to use dispatch, just as usual.
```js
dispatch({ type: 'add', payload: { id: 1, name: 'King' } })
```
