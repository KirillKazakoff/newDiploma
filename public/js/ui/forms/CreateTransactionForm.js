"use strict"
/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */



class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  
    constructor(element) {
        super(element);
        this.renderAccountsList()
        // console.log(this.element);
    }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
    renderAccountsList() {
        const user = User.current();
        console.log(user)

        Account.list(user, (err, response) => {
            if (!err) {     
                const accounts = response.data.map(account => {
                   return this.renderAccount(account);
                })
                const selectField = this.element.account_id;
                selectField.innerHTML = accounts.join("");
                console.log("cool");
            }
            else console.log(err)
        })
        //При обновлении что-то сделать
    }

    renderAccount(account) {
        const {id, name} = account;
        return `<option value="${id}">${name}</option>`;
    }
  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
    onSubmit(data) {
        Transaction.create(data, (err) => {
            if (!err) {
                const type = this.element.id.includes("income") ?
                    "newIncome" : "newExpense";
                const modal = App.getModal(type)

                this.element.reset();
                modal.close();
                App.update()
            }
        });

    }
}