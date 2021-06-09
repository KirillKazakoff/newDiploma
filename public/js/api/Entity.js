"use strict"

class Entity {
    static URL = "";

    static async list(data) {
        return createRequest({
            url: this.URL,
            method: "GET",
            body: data,
        })
        .catch(err => console.log(err))
    }

    static async create(data) {
        return createRequest({
            url: this.URL,
            method: "PUT",
            body: data,
        })
        .catch(err => console.log(err))
    }

    static async remove(data) {
        return createRequest({
            url: this.URL,
            method: "DELETE",
            body: data,
        })
        .catch(err => console.log(err))
    }

}
