"use strict"

class AccountsWidget {


    constructor(element) {
        if (!element) {
            throw new Error("empty data");
        }
        this.element = element;
        this.accounts, this.activeAccount;

        this.update();
    }


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

    onSelectAccount(account) {
        const {id} = account.dataset;

        if (this.activeAccount) {
            this.toggleActive();
        }
        this.activeAccount = account;
        this.toggleActive();
        App.showPage('transactions', {account_id: id});
    }

    toggleActive() {
        this.activeAccount.classList.toggle("active")
    }

    // update() {
    //     return new Promise((resolve, reject) => {
    //         const user = User.current();

    //         Account.list(user, (err, response) => {
    //             if (!err) {
    //                 const {data} = response;
    //                 this.clear()
    //                 data.forEach(element => {
    //                     const code = this.getAccountHTML(element)
    //                     this.renderItem(code);
    //                 })
    //                 this.registerEvents();
    //                 resolve(response);
    //             }
    //             else {
    //                 reject(err);
    //             }
    //         })

    //     })
    // }




    async update() {
        const user = User.current();
        let promise = new Promise((resolve, reject) => {

            Account.list(user, (err, response) => {
                if (!err) {
                    const {data} = response;
                    this.clear()
                    data.forEach(element => {
                        const code = this.getAccountHTML(element)
                        this.renderItem(code);
                    })
                    this.registerEvents();
                    resolve(response)
                }
                else {
                    reject(err)
                }
            }).catch(err => console.log(err));

        })

        let result = await promise;
        return result;
    }




    clear() {
        this.getAccounts();
        this.accounts.forEach(element => {
            element.remove();
        });
    }
    
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

    renderItem(data){
        this.element.insertAdjacentHTML("afterBegin", data);
    }
}


















