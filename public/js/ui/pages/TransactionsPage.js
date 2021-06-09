"use strict";

class TransactionsPage {
    constructor(element) {
        if (!element) {
            throw new Error("data is empty");
        }
        this.element = element;

        this.registerEvents();
    }

    registerEvents() {
        this.element.addEventListener("click", (event) => {
            const {target} = event;
            const button = target.closest("button");
      
            if (button) {
                if (button.classList.contains("remove-account")) {
                    this.removeAccount();
                }
                else if (button.classList.contains("transaction__remove")) {
                    const {id} = button.dataset;
                    this.removeTransaction(id)
                }
            }
        })
    }

    update() {
        if (this.lastOption) {
            const account_id = this.lastOption;
            this.render({account_id})
        }
    }

    removeAccount() {
        if (this.lastOption) {
            const formData = new FormData();

            formData.append("id", this.lastOption);
            Account.remove(formData).then(result => {
                if (result.success) {
                    this.clear();
                    App.updateWidgets();
                }
            })
        }
    }

    removeTransaction(id) {
        if (confirm("Вы действительно хотите удалить эту транзакцию?")) {
            const formData = new FormData();

            formData.append("id", id);
            Transaction.remove(formData).then(result => {
                if (result.success) {
                    this.update();
                    App.updateWidgets();
                }
            })
        }
    }

    render(options) {
        const {account_id} = options
        if (account_id) {
            this.lastOption = account_id;

            Account.get(account_id).then(result => {
                if (result.success) {
                    this.renderTitle(result.data.name)
                }
            })

            Transaction.list({account_id}).then(result => {
                if (result.success) {
                    this.renderTransactions(result.data)
                }
            })
        }
    }

    clear() {
        this.renderTransactions([]);
        this.renderTitle("Название счета");
        this.lastOption = null;
    }

    renderTitle(name) {
        const title = document.querySelector(".content-title");
        title.textContent = name;
    }

    formatDate(option) {
        const date = new Date(option);

        const dateFormatter = new Intl.DateTimeFormat('ru', {
            year: "numeric",
            month: "long",
            day: "numeric",
        })

        const timeFormatter = new Intl.DateTimeFormat('ru', {
            hour: "numeric",
            minute: "numeric",
        })

        return dateFormatter.format(date) + " в " + timeFormatter.format(date);
    }

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

    renderTransactions(data) {
        const content = document.querySelector(".content");

        const Html = data.map(element => this.getTransactionHTML(element)).join();
        content.innerHTML = Html;
    }
}

























        // const newDate = new Date(date);
        // const formatter = new Intl.DateTimeFormat('ru', {
        //     day: "numeric",
        //     month: 'long',
        //     year: 'numeric',
        //     hour: '2-digit',
        //     minute: "2-digit",
        //     // timeStyle: 'medium'
        // })

        // const result = formatter.formatToParts(newDate);

        // return result.reduce((total, element) => {
        //     let {type, value} = element;
            
        //     switch (type) {
        //         case "month": {
        //             if (value == "Март") {
        //                 return total + value + "а"
        //             }
        //             else {
        //                 const stringArr = value.split('');
                        
        //                 stringArr[stringArr.length - 1] = 'я';
        //                 return total + stringArr.join('');
        //             }
        //         }

        //         case "literal": {
        //             if (value.includes('г.,')) {
        //                 return total + ' г. в ';
        //             }
        //         }

        //         default: {
        //             return total + value;
        //         }
        //     }

        // }, "");