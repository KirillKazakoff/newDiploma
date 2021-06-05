/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */

class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
    constructor(element) {
        if (!element) {
            throw new Error("empty data");
        }
        this.element = element;
        this.registerEvents()
    }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
    registerEvents() {
        const income = document.querySelector(".create-income-button");
        const expense = document.querySelector(".create-expense-button");

        function showModal(button) {
            button.addEventListener("click", () => {
                const type = button.className.includes("income") ?
                    "newIncome" : "newExpense";
                const modal = App.getModal(type);
                modal.open();
            })
        }

        [income, expense].forEach(element => showModal(element));
    }
}
