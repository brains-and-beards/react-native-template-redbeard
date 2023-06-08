import EncryptedStorage from 'react-native-encrypted-storage'
import { MMKV } from 'react-native-mmkv'
import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin'
import { Storage } from 'redux-persist'

const storage = new MMKV()

if (__DEV__) {
  initializeMMKVFlipper({ default: storage })
}

const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value)
    return Promise.resolve(true)
  },
  getItem: key => {
    const value = storage.getString(key)
    return Promise.resolve(value)
  },
  removeItem: key => {
    storage.delete(key)
    return Promise.resolve()
  },
}

export { reduxStorage as storage }
export { default as safeStorage } from 'react-native-encrypted-storage'

export function clearPersistence() {
  storage.clearAll()
  return EncryptedStorage.clear()
}
