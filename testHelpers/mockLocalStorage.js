export default class LocalStorageMock {
    constructor() {
        this.store = {};
    }
  
    clear() {
        this.store = {};
    }
  
    getItem(key) {
        return this.store[key] || null;
    }
  
    setItem(value, key) {
        this.store[key] = value;
    }
  
    removeItem(key) {
        delete this.store[key];
    }
  };