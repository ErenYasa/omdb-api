/* eslint-disable import/no-cycle */
import { toastr } from '../components/toastr';

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
      if (serializedValue === null || serializedValue === '') return false;
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

  static setAsArray(key, data) {
    try {
      let existingData = LocalStorageService.get(key);
      if (existingData === null) existingData = [];

      const updatedData = Array.isArray(existingData) ? [...existingData, data] : [data];
      LocalStorageService.set(key, updatedData);
      return true;
    } catch (error) {
      console.error('LocalStorage error:', error);
      return false;
    }
  }

  static removeFromArray(key, item) {
    try {
      const existingData = LocalStorageService.get(key);

      if (!Array.isArray(existingData)) {
        toastr('LocalStorage error: The value for the given key is not an array.', 'error');
        return false;
      }

      const updatedData = existingData.filter(value => value !== item);
      LocalStorageService.set(key, updatedData);
      return true;
    } catch (error) {
      console.error('LocalStorage error:', error);
      return false;
    }
  }

  static addToSpecificDate(date, id) {
    try {
      const filmList = LocalStorageService.get('filmList');

      if (filmList) {
        const parsedList = JSON.parse(filmList);

        if (parsedList[date] !== undefined) {
          if (!parsedList[date].includes(id)) parsedList[date].push(id);
        } else parsedList[date] = [id];

        LocalStorageService.set('filmList', JSON.stringify(parsedList));

        return;
      }

      const newList = {};
      newList[date] = [id];

      LocalStorageService.set('filmList', JSON.stringify(newList));
    } catch (error) {
      console.error('LocalStorage error:', error);
    }
  }

  static removeToSpecificDate(date, value) {
    try {
      const filmList = LocalStorageService.get('filmList') || {};
      const parsedList = JSON.parse(filmList);

      parsedList[date] = parsedList[date].filter(id => id !== value);

      if (parsedList[date].length === 0) delete parsedList[date];

      LocalStorageService.set('filmList', JSON.stringify(parsedList));
      return true;
    } catch (error) {
      console.error('LocalStorage error:', error);
      return false;
    }
  }
}
