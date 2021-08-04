"use strict";

export default class Storage {

    constructor() {
        this.storage = {};
    }

    addKeyWithTTL(key, value) {
        this.storage[key] = value;
        setTimeout(() => this.deleteKey(key), 10000);     
    }

    addKey(key, value) {
        this.storage[key] = value;
    }

    deleteKey(key) {
        delete this.storage[key];
    }
}