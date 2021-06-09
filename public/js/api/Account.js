"use strict"

class Account extends Entity {
    static URL = "/account";

    static get(id = '') {
        return createRequest({
            url: this.URL,
            method: "GET",
            body: id,
        })
    }
}
