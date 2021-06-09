"use strict"


class User {
    static URL = "/user";

    static setCurrent(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    static unsetCurrent() {
        localStorage.removeItem('user');
    }

    static current() {
        return JSON.parse(localStorage.getItem('user'));
    }



    
    static async fetch() {
        return await createRequest({
            url: this.URL + '/current',
            method: 'GET',
        })
        .catch(err => console.log(err));
    }

    static async login(data) {
        return createRequest({
            url: this.URL + '/login',
            method: 'POST',
            body: data,
        })
        .catch(err => console.log(err));
    }

    static async register(data) {
        return createRequest({
            url: this.URL + "/register",            
            method: "POST",
            body: data,
        })
        .catch(err => console.log(err));
    }

    static async logout(data) {
        return createRequest({
            url: this.URL + "/logout",
            method: "POST",
            body: data, 
        })
        .catch(err => console.log(err));
    }

}

