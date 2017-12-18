class Storage {
    constructor(name) {
        this.name = name;
    }

    get() {
        return JSON.parse(localStorage.getItem(this.name));
    }

    save(data) {
        localStorage.setItem(this.name, JSON.stringify(data));
    }
};

export default Storage;