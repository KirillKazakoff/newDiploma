/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */

class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */

    static get(id = '', callback) {
        createRequest({
            method: "GET",
            responseType: "json",
            body: id,
            callback: callback,
            url: "/account"
        })
    }
}
