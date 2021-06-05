"use strict"
/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
    onSubmit(data) {
        Account.create(data, (err, response) => {
            if (!err) {
                const modal = App.getModal('createAccount');
                modal.close();
        
                const form = App.getForm("createAccount").element;
                form.reset();
                
                App.updateForms()

                App.updateWidgets({
                    callback: (id) => {
                        const account = document.querySelector(`.account[data-id="${id}"]`)
                        const event = new Event("click");

                        account.dispatchEvent(event);
                    },
                    id: response.account.id
                });

            }
            else alert("Такой счет уже существует");
        });          
    }

    // clickAccount(id) {
    //     const account = document.querySelector(`.account[data-id="${id}"]`)
    //     console.log(account)
    // }

}

// const closure = function() {
//     const account = document.querySelector(`.account[data-id="${id}"]`)
//     console.log(account)
// }