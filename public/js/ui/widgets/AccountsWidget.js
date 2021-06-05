"use strict"
/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */

class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
    constructor(element) {
        if (!element) {
            throw new Error("empty data");
        }
        this.element = element;
        this.accounts, this.activeAccount;

        this.update();
    }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
    registerEvents() {
        const createButton = document.querySelector(".create-account");
        createButton.addEventListener("click", () => {
            const modal = App.getModal("createAccount");
            modal.open();
        })
        
        this.getAccounts();
        this.accounts.forEach(account => {
            account.addEventListener("click", () => this.onSelectAccount(account))
        })
    }

    getAccounts() {
        this.accounts = document.querySelectorAll(".account");
        this.activeAccount = document.querySelector(".active account");
    }
  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
    onSelectAccount(account) {
        const {id} = account.dataset;

        if (this.activeAccount) {
            this.toggleActive();
        }
        this.activeAccount = account;
        this.toggleActive();
        App.showPage('transactions', {account_id: id});
        // App.showPage('transaction', id)
    }

    toggleActive() {
        this.activeAccount.classList.toggle("active")
    }

    update(callbackOptions) { //Сюда колбэк
        const user = User.current()
        if (user) {
            Account.list(user, ((err, response) => {
                if (!err) {
                    const {data} = response;
                    this.clear()
                    data.forEach(element => {
                        const code = this.getAccountHTML(element)
                        this.renderItem(code);
                    })
                    this.registerEvents();
                    if (callbackOptions) {
                        const {id, callback} = callbackOptions;
                        callback(id);
                    };
                }
                else console.log(err)
            }))
        }
    }

    // hello() {
    //     console.log("Hello");
    // }
  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
    clear() {
        this.getAccounts();
        this.accounts.forEach(element => {
            element.remove();
        });
    }
    
  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage('transactions', { account_id: id_счёта });
   * */


  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
    getAccountHTML(item){
        const {id, name, sum} = item;

        return `
        <li class="account" data-id=${id}>
            <a href="#">
                <span>${name}/</span>
                <span>${sum} ₽</span>
            </a>
        </li>`
    }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
    renderItem(data){
        this.element.insertAdjacentHTML("afterBegin", data);
    }
}

