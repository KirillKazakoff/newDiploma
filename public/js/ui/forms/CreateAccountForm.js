"use strict"

class CreateAccountForm extends AsyncForm {

    async onSubmit(data) {
        const result = await Account.create(data);

        if (result.success) {            
            const modal = App.getModal('createAccount');
            modal.close();
    
            const form = this.element;
            form.reset();
            
            App.updateForms()

            App.updateWidgets().then(() => {
                const {id} = result.account;
                const account = document.querySelector(`.account[data-id="${id}"]`);
                const event = new Event("click", {bubbles: true});

                account.dispatchEvent(event);
            })
        }
        else {
            alert("Такой счет уже существует");  
        }

    }

}
