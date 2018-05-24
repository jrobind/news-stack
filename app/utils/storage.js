export default {
    setStorage(data) {
        if (!localStorage.getItem('weather')) {
            localStorage.setItem('weather', JSON.stringify(data));
        } else {
            localStorage.removeItem('weather');
            localStorage.setItem('weather', JSON.stringify(data));
        }
    },
    getStorage() {
        return JSON.parse(localStorage.getItem('weather'));
    }
}