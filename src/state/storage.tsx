import {MMKV} from 'react-native-mmkv'

// Creating a storage instance for token storage
export const tokenStorage = new MMKV({
    id: 'token-storage',
    encryptionKey: 'some-secret-key'
})

// Creating a storage instance for the app's general storage
export const storage = new MMKV({
    id: 'my-app-storage',
    encryptionKey: 'some-secret-key'
})

// Exporting a utility object for easier storage operations
export const mmkvStorage ={
    // Method to set a key-value pair in storage
    setItem: (key:string, value:string) => storage.set(key,value),
    // Method to get a value from storage by key
    getItem: (key:string) =>{
        const value = storage.getString(key);   
        // Attempting to parse the value as JSON and returning null if it fails
        return value ? JSON.parse(value) : null;
    },
    // Method to remove a key-value pair from storage
    removeItem: (key:string) => storage.delete(key)
}