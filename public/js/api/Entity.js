"use strict"

class Entity {
    static URL = "";

    static list(data, callback) {
        return createRequest({
            method: "GET",
            callback: callback,
            url: this.URL,
            data
        }).catch(err => console.log(err))
    }

    static create(data, callback) {
        createRequest({
            method: "PUT",
            url: this.URL,
            callback: callback,
            data
        })
    }

    static remove(data, callback) {
        createRequest({
            method: "DELETE",
            callback: callback,
            url: this.URL,
            data
        })
    }
}
