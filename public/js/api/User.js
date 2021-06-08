"use strict"
/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */


class User {
    static URL = "/user";
    /**
     * Устанавливает текущего пользователя в
     * локальном хранилище.
     * */
    static setCurrent(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    /**
     * Удаляет информацию об авторизованном
     * пользователе из локального хранилища.
     * */
    static unsetCurrent() {
        localStorage.removeItem('user');
    }

    /**
     * Возвращает текущего авторизованного пользователя
     * из локального хранилища
     * */
    static current() {
        return JSON.parse(localStorage.getItem('user'));
    }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
    static fetch(callback = myCallback()) {
        createRequest({
            url: this.URL + '/current',
            method: 'GET',
            callback: (err, response) => {
                if (response && response.user) {
                    this.setCurrent(response.user);
                }
                else this.unsetCurrent();
                callback(err, response);
            },
        }).catch(err => console.log(err))
    }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
    static login(data, callback) {
        createRequest({
            url: this.URL + '/login',
            method: 'POST',
            data,
            callback: (err, response) => {
                if (response && response.user) {
                    this.setCurrent(response.user);
                }
                callback(err, response);
            }
        }).catch(err => console.log(err));
    }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
    static register(data, callback) {
        createRequest({
            method: "POST",
            url: this.URL + "/register",            
            callback: (err, response) => {
                if (response && response.user) {
                    this.setCurrent(response.user)
                }
                callback(err, response);
            },
            data,
        }).catch(err => console.log(err));
    }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
    static logout(data, callback) {
        createRequest({
            method: "POST",
            url: this.URL + "/logout",
            callback: (err, response) => {
                if (response) {
                    this.unsetCurrent(response.user)
                }
                callback(err, response);
            },
            data, 
        }).catch(err => console.log(err))
    }

}

function myCallback() {
    return (err, response) => err ? console.log(err) : console.log(response);
}
