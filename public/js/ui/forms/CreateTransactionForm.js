"use strict"

class CreateTransactionForm extends AsyncForm {
  
    constructor(element) {
        super(element);
        this.renderAccountsList()
    }

    renderAccountsList() {
        const user = User.current();

        Account.list(user, (err, response) => {   
            const accounts = response.data.map(account => {
                return this.renderAccount(account);
            })
            const selectField = this.element.account_id;
            selectField.innerHTML = accounts.join("");
        })

    }

    renderAccount(account) {
        const {id, name} = account;
        return `<option value="${id}">${name}</option>`;
    }

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