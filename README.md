# store-renew

you can use like this
```
import { renew } from 'store-renew'
const reducer = (state, { payload }) => renew(state, `list`, state.list.concat(payload))
```
or even like above, they has the same effects
```
import { reduce } from 'store-renew'
const reducer = reduce((state, { payload }) => [`list`, state.list.concat(payload)])
```
