/**
 * store renew utils
 * @param {*} state
 * @param {*} keyPath
 * @param {*} data
 */
export const renew = (state, keyPath, data) => {
  const keyArr = keyPath.split('.')
  if (keyArr.length === 1) {
    // 数组类型
    if (Array.isArray(state)) {
      const copyState = state.slice()
      typeof data === 'undefined' ? copyState.splice(keyPath, 1) : copyState.splice(keyPath, 1, data)
      return copyState
    }
    // 对象类型
    // data删除
    if (typeof data === 'undefined') {
      return Object.keys(state).reduce((pre, key) => {
        if (key !== keyPath) {
          pre[key] = state[key]
        }
        return pre
      }, {})
    }
    // data替换
    return { ...state, [keyPath]: data }
  }
  const property = keyArr[0]
  const newState = replace(state[property], keyArr.slice(1).join('.'), data)
  if (newState === state[property]) {
    return state
  }
  return { ...state, [property]: newState }
}
// store reducer proxy
export const reduce = (reducer) => {
	return (state, action) => {
	  const [keyPath, newState] = reducer(state, action)
		return renew(state, keyPath, newState)
	}
}
