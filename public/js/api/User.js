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
        const data = JSON.stringify(user);
        localStorage.setItem('user', data);
    }

    /**
     * Удаляет информацию об авторизованном
     * пользователе из локального хранилища.
     * */
    static unsetCurrent() {
        localStorage.removeItem('user')
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
    static fetch(callback) {
        createRequest({
            url: this.URL + '/current',
            method: 'GET',
            responseType: 'json',
            callback: (err, response) => {
                if (response && response.user) {
                    this.setCurrent(response.user);
                }
                else this.unsetCurrent();
                callback(err, response)
            },
        })
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
            responseType: 'json',
            data,
            callback: (err, response) => {
                if (response && response.user) {
                    this.setCurrent(response.user);
                }
                callback(err, response);
            }
        });
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
            responseType: "json",
            url: this.URL + "/register",            
            callback: (err, response) => {
                if (response && response.user) {
                    this.setCurrent(response.user)
                }
                callback(err, response);
            },
            data,
        })
    }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
    static logout(data, callback) {
        createRequest({
            method: "POST",
            responseType: "json",
            url: this.URL + "/logout",
            callback: (err, response) => {
                if (response && response.user) {
                    this.unsetCurrent(response.user)
                }
                callback(err, response)
            },
            data, 
        })
    }

}

// const formData = new FormData();
// const data = {
//     name: 'Vlada2',
//     email: 'sestest3@test.ru',
//     password: 'abracadabra'
// }
// for (prop in data) {
//     formData.append(prop, data[prop])
// }

// User.register(formData, myCallback())
// User.login(formData, myCallback());

// function myCallback() {
//     return (err, response) => err ? console.log(err) : console.log(response);
// }