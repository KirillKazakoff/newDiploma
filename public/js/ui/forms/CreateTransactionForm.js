"use strict"

class CreateTransactionForm extends AsyncForm {
  
    constructor(element) {
        super(element);
        this.renderAccountsList()
    }

    async renderAccountsList() {
        const user = User.current();
        const result = await Account.list(user);

        if (result.success) {
            const accounts = result.data.map(account => {
                return this.renderAccount(account);
            })
            const selectField = this.element.account_id;
            selectField.innerHTML = accounts.join("");
        }

    }

    renderAccount(account) {
        const {id, name} = account;
        return `<option value="${id}">${name}</option>`;
    }

    async onSubmit(data) { 
        const result = await Transaction.create(data);

        if (result.success) {
            const type = this.element.id.includes("income") ?
                "newIncome" : "newExpense";
            const modal = App.getModal(type)

            this.element.reset();
            modal.close();
            App.update()
        }
        
    }

}