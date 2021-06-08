"use strict";



/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
    constructor(element) {
        if (!element) {
            throw new Error("data is empty");
        }
        this.element = element;
        this.registerEvents();
    }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
    update() {
        if (this.lastOption) {
            const account_id = this.lastOption;
            this.render({account_id})
        }
    }

    
  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
    registerEvents() {
        const accountButton = document.querySelector(".remove-account");        
        accountButton.addEventListener("click", () => this.removeAccount());
    }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.updateWidgets(),
   * либо обновляйте только виджет со счетами
   * для обновления приложения
   * */
    // removeAccount() {
    //     if (this.lastOption) {
            
    //         if (confirm("Вы точно хотите удалить счёт?")) {
    //             const formData = new FormData();

    //             formData.append("id", this.lastOption);
    //             Account.remove(formData, (err) => {
    //                 if (!err) {
    //                     this.clear();
    //                     App.updateWidgets();
    //                 }
    //             });
                
    //         }
    //     }
    // }
    
    removeAccount() {
        if (this.lastOption) {
            
            const formData = new FormData();

            formData.append("id", this.lastOption);
            Account.remove(formData, (err) => {
                if (!err) {
                    this.clear();
                    App.updateWidgets();
                }
            });    
            
        }
    }
  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update(),
   * либо обновляйте текущую страницу (метод update) и виджет со счетами
   * */
    removeTransaction(id) {
        if (confirm("Вы действительно хотите удалить эту транзакцию?")) {
            const something = new FormData();
            something.append("id", id);
            Transaction.remove(something, (err) => {
                if (!err) {
                    this.update();
                    App.updateWidgets();
                }
            })
        }
    }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
    render(options) {
        const {account_id} = options
        if (account_id) {
            this.lastOption = account_id;

            Account.get(account_id, (err, response) => {
                if (!err) {
                    this.renderTitle(response.data.name);
                }
            }).catch(err => {console.log(err); return})

            Transaction.list({account_id}, (err, response) => {
                if (!err) {
                    this.renderTransactions(response.data)

                    const transactionButtons = document.querySelectorAll(".transaction__remove");
                    
                    transactionButtons.forEach(element => {
                        const id = element.dataset.id;
                        element.addEventListener("click", () => this.removeTransaction(id))
                    }) 
                }
            }).catch(err => {console.log(err); return})
        }
    }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
    clear() {
        this.renderTransactions([]);
        this.renderTitle("Название счета");
        this.lastOption = null;
    }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
    renderTitle(name) {
        const title = document.querySelector(".content-title");
        title.textContent = name;
    }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
    formatDate(date) {
        const newDate = new Date(date);
        const formatter = new Intl.DateTimeFormat('ru', {
            day: "numeric",
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: "2-digit",
            // timeStyle: 'medium'
        })

        const result4 = formatter.formatToParts(newDate);

        return result4.reduce((total, element) => {
            let {type, value} = element;
            
            switch (type) {
                case "month": {
                    if (value == "Март") {
                        return total + value + "а"
                    }
                    else {
                        const stringArr = value.split('');
                        
                        stringArr[stringArr.length - 1] = 'я';
                        return total + stringArr.join('');
                    }
                }

                case "literal": {
                    if (value.includes('г.,')) {
                        return total + ' г. в ';
                    }
                }

                default: {
                    return total + value;
                }
            }

        }, "");

    }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
    getTransactionHTML(item) {
        const {created_at, id, name, sum, type} = item;
        const date = this.formatDate(created_at);

        return `
            <div class="transaction transaction_${type} row">
                <div class="col-md-7 transaction__details">
                    <div class="transaction__icon">
                        <span class="fa fa-money fa-2x"></span>
                    </div>
                    <div class="transaction__info">
                        <h4 class="transaction__title">${name}</h4>
                        <div class="transaction__date">${date}</div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="transaction__summ">${sum}<span class="currency">₽</span></div>
                </div>
                <div class="col-md-2 transaction__controls">
                    <!-- в data-id нужно поместить id -->
                    <button class="btn btn-danger transaction__remove" data-id=${id}>
                        <i class="fa fa-trash"></i>  
                    </button>
                </div>
            </div>
        `
    }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
    renderTransactions(data) {
        const content = document.querySelector(".content");

        // data.forEach(item => this.getTransactionHTML(item))
        const Html = data.map(element => this.getTransactionHTML(element)).join()
        content.innerHTML = Html;
    }
}