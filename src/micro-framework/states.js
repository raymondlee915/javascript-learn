const propsToEffects = {}
const dirtyEffects = []
let queued = false

const state = new Proxy({}, {
  get(obj, prop) {
    onGet(prop)
    return obj[prop]
  },
  set(obj, prop, value) {
    obj[prop] = value
    onSet(prop, value)
    return true
  } })


function onGet(prop) {
  if (currentEffect) {
    const effects = propsToEffects[prop] ?? (propsToEffects[prop] = [])
    effects.push(currentEffect)
  }
}

function flush() {
  while (dirtyEffects.length) {
    dirtyEffects.shift()()
  }
}

function onSet(prop, value) {
  if (propsToEffects[prop]) {
    dirtyEffects.push(...propsToEffects[prop])
    if (!queued) {
      queued = true
      queueMicrotask(() => {
        queued = false
        flush()
      })
    }
  }
}

function createEffect(effect) {
  currentEffect = effect
  effect()
  currentEffect = undefined
}