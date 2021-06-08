// "use strict"

// class CreateAccountForm extends AsyncForm {

//     onSubmit(data) {
//         Account.create(data, (err, response) => {
//             if (!err) {
//                 const modal = App.getModal('createAccount');
//                 modal.close();
        
//                 const form = App.getForm("createAccount").element;
//                 form.reset();
                
//                 App.updateForms()

//                 App.updateWidgets().then(() => {
//                     const {id} = response.account;
//                     const account = document.querySelector(`.account[data-id="${id}"]`);
//                     const event = new Event("click");

//                     account.dispatchEvent(event);
//                 })
//             }
//             else {
//                 alert("Такой счет уже существует");  
//             }
//         });          
//     }


// }

"use strict"

class CreateAccountForm extends AsyncForm {

    onSubmit(data) {
        Account.create(data, (err, response) => {
            if (!err) {
                const modal = App.getModal('createAccount');
                modal.close();
        
                const form = App.getForm("createAccount").element;
                form.reset();
                
                App.updateForms()

                App.updateWidgets().then(() => {
                    const {id} = response.account;
                    const account = document.querySelector(`.account[data-id="${id}"]`);
                    const event = new Event("click");

                    account.dispatchEvent(event);
                })
            }
            else {
                alert("Такой счет уже существует");  
            }
        });          
    }


}
