export default {
    setStorage(data, key) {
        if (!localStorage.getItem(key)) {
            localStorage.setItem(key, JSON.stringify(data));
        } else {
            localStorage.removeItem(key);
            localStorage.setItem(key, JSON.stringify(data));
        }
    },
    getStorage(key) {
        return JSON.parse(localStorage.getItem(key));
    }
}