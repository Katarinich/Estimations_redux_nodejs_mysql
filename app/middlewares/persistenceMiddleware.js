import { syncAuth } from 'actions/auth'

const authKey = 'auth'

const descriptors = [
  {
    stateKey: 'auth',
    storageKey: authKey,
    syncActionCreator: syncAuth
  }
]

function loadRaw(key) {
  return localStorage.getItem(key)
}

function saveRaw(key, value) {
  localStorage.setItem(key, value)
}

function deserialize(serializedValue) {
  return JSON.parse(serializedValue)
}

function serialize(value) {
  return JSON.stringify(value)
}

function load(key) {
  const serializedValue = loadRaw(key)
  return deserialize(serializedValue)
}

function dataChanged(key, storageEvent) {
  if (storageEvent.key !== key) {
    return false
  }

  return storageEvent.oldValue !== storageEvent.newValue
}

function syncIfStorageEntryChanged(key, storageEvent, store, syncActionCreator) {
  if (!dataChanged(key, storageEvent)) {
    return false
  }

  const savedData = load(key)
  store.dispatch(syncActionCreator(savedData))

  return true
}

function flushStateChanges(prevState = {}, nextState = {}) {
  descriptors.forEach(descriptor => {
    const { stateKey, storageKey } = descriptor

    const prevStateValue = prevState[stateKey]
    const serializedPrevStateValue = serialize(prevStateValue)

    const nextStateValue = nextState[stateKey]
    const serializedNextStateValue = serialize(nextStateValue)

    if (serializedNextStateValue !== serializedPrevStateValue) {
      saveRaw(storageKey, serializedNextStateValue)
    }
  })
}

export function loadInitialState() {
  const savedAuth = load(authKey)

  const auth = savedAuth || {}

  const initialState = {
    auth
  }

  return initialState
}

export const persistChanges = store => next => action => {
  const prevState = store.getState()

  const result = next(action)

  const nextState = store.getState()

  flushStateChanges(prevState, nextState)

  return result
}

export function bindStoreToStorageUpdates(store) {
  //window.addEventListener('storage', handleStorageUpdate(store))
}

function handleStorageUpdate(store) {
  return storageEvent => {
    descriptors.forEach(descriptor => {
      const { storageKey, syncActionCreator } = descriptor

      const updated = syncIfStorageEntryChanged(storageKey, storageEvent, store, syncActionCreator)
    })
  }
}


