/* eslint-disable no-console */
export class LocalStorageService {
    static set(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
            return true;
        } catch (error) {
            console.error('LocalStorage error:', error);
            return false;
        }
    }

    static get(key) {
        try {
            const serializedValue = localStorage.getItem(key);
            if (serializedValue === null) return null;
            return JSON.parse(serializedValue);
        } catch (error) {
            console.error('LocalStorage error:', error);
            return null;
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('LocalStorage error:', error);
            return false;
        }
    }

    static clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('LocalStorage error:', error);
            return false;
        }
    }
}
