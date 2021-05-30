"use strict"
/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
    static URL = "";
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
    static list(data, callback) {
        createRequest({
            method: "GET",
            body: data,
            responseType: "json",
            callback: callback,
            url: this.URL
        })
    }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
    // static create(data, callback) {
    //     createRequest({
    //         method: "PUT",
    //         body: data,
    //         responseType: "json",
    //         callback: callback,
    //         url: this.URL
    //     })
    // }

    static create(data) {
        createRequest({
            method: "PUT",
            body: data,
            responseType: "json",
            url: this.URL
        })
    }
  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
    static remove(data, callback ) {
        createRequest({
            method: "DELETE",
            body: data,
            responseType: "json",
            callback: callback,
            url: this.URL
        })
    }
}
